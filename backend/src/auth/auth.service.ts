import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { SignInUserDto } from './dto/sign-in-user.dto';
import { hash, verify } from 'argon2';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { RefreshToken } from './entities/refresh-token.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { SignUpUserDto } from './dto/sign-up-user.dto';
import { RefreshTokensDto } from './dto/refresh-tokens.dto';
import { Permission } from 'src/users/enums/permissions/permission.enum';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @InjectRepository(RefreshToken)
    private readonly refreshTokenRepository: Repository<RefreshToken>,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async signIn(signInData: SignInUserDto): Promise<any> {
    const user = await this.usersService.findOneByEmail(signInData.email);

    if (!user) {
      throw new UnauthorizedException();
    }

    const isPasswordValid = await verify(user.password, signInData.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException();
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

  async signUp(signUpData: SignUpUserDto) {
    const password = await hash(signUpData.password);
    const user = await this.usersService.create({
      ...signUpData,
      password,
      permissions: [],
    });

    return this.signIn({ email: user.email, password: signUpData.password });
  }

  async signUpBusiness(signUpData: SignUpUserDto) {
    const password = await hash(signUpData.password);

    const user = await this.usersService.create({
      ...signUpData,
      password,
      permissions: [Permission.BUSINESS],
    });

    return this.signIn({ email: user.email, password: signUpData.password });
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
}
