import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PermissionAuthGuard } from 'src/auth/permission-auth.guard';
import { AdvantagesService } from './advantages.service';
import { CreateAdvantageDto } from './dto/create-advantage.dto';
import { Permissions } from 'src/users/permissions.decorator';
import { Permission } from 'src/users/enums/permissions/permission.enum';

@Controller('advantages')
export class AdvantagesController {
  constructor(private readonly advantagesService: AdvantagesService) {}

  @Post()
  @UseGuards(PermissionAuthGuard)
  @Permissions(Permission.WRITE_ADVANTAGES)
  @UsePipes(ValidationPipe)
  create(@Body() createAdvantageDto: CreateAdvantageDto) {
    return this.advantagesService.create(createAdvantageDto);
  }

  @Get()
  findAll() {
    return this.advantagesService.findAll();
  }
}
