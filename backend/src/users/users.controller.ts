import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { CurrentUser } from './users.decorator';
import { JWTUser } from 'src/auth/types';
import { UsersService } from './users.service';
import { omit } from 'lodash';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @UseGuards(AuthGuard)
  async me(@CurrentUser() user: JWTUser) {
    const foundUser = await this.usersService.findOne(user.id);

    return omit(foundUser, ['password']);
  }
}
