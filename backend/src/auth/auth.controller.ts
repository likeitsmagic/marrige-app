import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RefreshTokensDto } from './dto/refresh-tokens.dto';
import { SignInUserDto } from './dto/sign-in-user.dto';
import { SignUpUserDto } from './dto/sign-up-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  @UsePipes(ValidationPipe)
  async signIn(@Body() signInUserDto: SignInUserDto) {
    return await this.authService.signIn(signInUserDto);
  }

  @Post('sign-up')
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(ValidationPipe)
  async signUp(@Body() signUpUserDto: SignUpUserDto) {
    return await this.authService.signUp(signUpUserDto);
  }

  @Post('sign-up-business')
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(ValidationPipe)
  async signUpBusiness(@Body() signUpUserDto: SignUpUserDto) {
    return await this.authService.signUpBusiness(signUpUserDto);
  }

  @Post('refresh-tokens')
  @HttpCode(HttpStatus.OK)
  @UsePipes(ValidationPipe)
  async refreshTokens(@Body() refreshTokensDto: RefreshTokensDto) {
    return await this.authService.refreshTokens(refreshTokensDto);
  }
}
