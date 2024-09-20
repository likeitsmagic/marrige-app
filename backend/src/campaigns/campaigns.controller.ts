import { Controller, Get, Post, Body, UseGuards, UsePipes, ValidationPipe, Logger } from '@nestjs/common';
import { CampaignsService } from './campaigns.service';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { PermissionAuthGuard } from 'src/auth/permission-auth.guard';
import { CurrentUser } from 'src/users/users.decorator';
import { Permission } from 'src/users/enums/permissions/permission.enum';
import { Permissions } from 'src/users/permissions.decorator';
import { JWTUser } from 'src/auth/types';

@Controller('campaigns')
export class CampaignsController {
  private readonly logger = new Logger(CampaignsController.name);

  constructor(private readonly campaignsService: CampaignsService) {}

  @Post()
  @UseGuards(PermissionAuthGuard)
  @Permissions(Permission.BUSINESS)
  @UsePipes(ValidationPipe)
  async create(
    @CurrentUser() user: JWTUser,
    @Body() createCampaignDto: CreateCampaignDto,
  ) {
    return this.campaignsService.create(user.id, createCampaignDto);
  }

  @Get()
  async getMany() {
    return this.campaignsService.findAll();
  }
}
