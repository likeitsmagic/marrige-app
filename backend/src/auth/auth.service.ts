import {
  BadRequestException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { hash, verify } from 'argon2';
import { I18nService } from 'nestjs-i18n';
import { Permission } from 'src/users/enums/permissions/permission.enum';
import { UsersService } from 'src/users/users.service';
import { QueryFailedError, Repository } from 'typeorm';
import { RefreshTokensDto } from './dto/refresh-tokens.dto';
import { SignInUserDto } from './dto/sign-in-user.dto';
import { SignUpUserDto } from './dto/sign-up-user.dto';
import { RefreshToken } from './entities/refresh-token.entity';
import { SignInOAuthDto } from './dto/sign-in-oauth.dto';
import { HttpService } from '@nestjs/axios';
import { YandexOAuthUser } from './types';
import { CreateUserYandexDto } from 'src/users/dto/create-user-yandex';
import { firstValueFrom } from 'rxjs';
import { getYandexUserAvatar } from './helpers/get-yandex-user-avatar.helper';
import { AuthProvider } from 'src/users/enums/auth-providers/auth-provider.enum';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @InjectRepository(RefreshToken)
    private readonly refreshTokenRepository: Repository<RefreshToken>,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly i18n: I18nService,
    private readonly httpService: HttpService,
  ) {}

  async signIn(signInData: SignInUserDto): Promise<any> {
    const user = await this.usersService.findOneByEmail(signInData.email);

    if (!user) {
      throw new UnauthorizedException(
        this.i18n.t('translation.auth.signin.incorrect_credentials'),
      );
    }

    const isPasswordValid = await verify(user.password, signInData.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException(
        this.i18n.t('translation.auth.signin.incorrect_credentials'),
      );
    }

    const payload = {
      sub: user.id,
      email: user.email,
      permissions: user.permissions,
    };

    const refreshTokenData = await this.saveRefreshToken(user.id);

    return {
      accessToken: await this.jwtService.signAsync(payload, {
        expiresIn: '3m',
        secret: this.configService.get('JWT_SECRET'),
      }),
      refreshToken: refreshTokenData.token,
    };
  }

  async signInOAuth(signInOAuthDto: SignInOAuthDto) {
    const { oauthToken } = signInOAuthDto;
    try {
      const user = await this.verifyYandexOAuthToken(oauthToken);

      const existingUser = await this.usersService.findOneByExternalId(
        user.externalId,
      );

      if (existingUser) {
        const payload = {
          sub: existingUser.id,
          email: existingUser.email,
          permissions: existingUser.permissions,
        };

        const refreshTokenData = await this.saveRefreshToken(existingUser.id);

        return {
          accessToken: await this.jwtService.signAsync(payload, {
            expiresIn: '3m',
            secret: this.configService.get('JWT_SECRET'),
          }),
          refreshToken: refreshTokenData.token,
        };
      }

      const newUser = await this.usersService.createFromYandex(user);

      const payload = {
        sub: newUser.id,
        email: newUser.email,
        permissions: newUser.permissions,
      };

      const refreshTokenData = await this.saveRefreshToken(newUser.id);

      return {
        accessToken: await this.jwtService.signAsync(payload, {
          expiresIn: '3m',
          secret: this.configService.get('JWT_SECRET'),
        }),
        refreshToken: refreshTokenData.token,
      };
    } catch (error) {
      this.logger.error('cant verify yandex oauth token', error);
      throw new UnauthorizedException();
    }
  }

  async signUp(signUpData: SignUpUserDto) {
    const password = await hash(signUpData.password);
    try {
      const user = await this.usersService.create({
        ...signUpData,
        password,
        permissions: [],
      });

      return this.signIn({ email: user.email, password: signUpData.password });
    } catch (error) {
      if (error instanceof QueryFailedError) {
        if (error.message.includes('duplicate key value')) {
          throw new BadRequestException(
            this.i18n.t('translation.auth.signup.email_already_in_use'),
          );
        }
      }
    }
  }

  async signUpBusiness(signUpData: SignUpUserDto) {
    const password = await hash(signUpData.password);

    try {
      const user = await this.usersService.create({
        ...signUpData,
        password,
        permissions: [Permission.BUSINESS],
      });

      return this.signIn({ email: user.email, password: signUpData.password });
    } catch (error) {
      if (error instanceof QueryFailedError) {
        if (error.message.includes('duplicate key value')) {
          throw new BadRequestException(
            this.i18n.t('translation.auth.signup.email_already_in_use'),
          );
        }
      }
    }
  }

  async saveRefreshToken(userId: string) {
    const token = await this.jwtService.signAsync(
      {},
      {
        expiresIn: '30d',
        secret: this.configService.get('JWT_REFRESH_SECRET'),
      },
    );

    return this.refreshTokenRepository.save({
      token,
      userId,
    });
  }

  async refreshTokens(refreshTokensData: RefreshTokensDto) {
    const { refreshToken } = refreshTokensData;

    try {
      await this.jwtService.verifyAsync(refreshToken, {
        secret: this.configService.get('JWT_REFRESH_SECRET'),
      });
    } catch (error) {
      this.logger.debug('cant verify refresh token', error);
      throw new UnauthorizedException();
    }

    const { userId } = await this.refreshTokenRepository.findOne({
      where: { token: refreshToken },
      order: { createdAt: 'DESC' },
    });

    if (!userId) {
      throw new UnauthorizedException();
    }

    const user = await this.usersService.findOne(userId);

    if (!user) {
      throw new UnauthorizedException();
    }

    const payload = {
      sub: user.id,
      email: user.email,
      permissions: user.permissions,
    };

    const newRefreshToken = await this.saveRefreshToken(user.id);

    return {
      accessToken: await this.jwtService.signAsync(payload, {
        expiresIn: '3m',
        secret: this.configService.get('JWT_SECRET'),
      }),
      refreshToken: newRefreshToken.token,
    };
  }

  private async verifyYandexOAuthToken(
    oauthToken: string,
  ): Promise<CreateUserYandexDto> {
    try {
      const { data } = await firstValueFrom(
        this.httpService.get<YandexOAuthUser>(
          `https://login.yandex.ru/info?format=json`,
          {
            headers: {
              Authorization: `OAuth ${oauthToken}`,
            },
          },
        ),
      );

      if (!data) {
        throw new UnauthorizedException();
      }

      return {
        externalId: data.id,
        email: data.default_email,
        firstName: data.first_name,
        lastName: data.last_name,
        avatarUrl: getYandexUserAvatar(data.id, data.default_avatar_id),
        birthDate: data.birthday,
        authProvider: AuthProvider.YANDEX,
      };
    } catch {
      throw new UnauthorizedException();
    }
  }
}
