import {
  BadRequestException,
  Controller,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { PermissionAuthGuard } from 'src/auth/permission-auth.guard';
import { Permission } from 'src/users/enums/permissions/permission.enum';
import { Permissions } from 'src/users/permissions.decorator';
import { ImagesService } from './images.service';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post()
  @UseGuards(PermissionAuthGuard)
  @Permissions(Permission.BUSINESS)
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'files', maxCount: 5 }], {
      fileFilter: (_, file, cb) => {
        if (
          ['image/jpeg', 'image/png', 'image/webp'].some((type) =>
            file.mimetype.startsWith(type),
          )
        ) {
          if (file.size > 5 * 1024 * 1024) {
            cb(new BadRequestException('File size exceeds limit'), false);
            return;
          }
          cb(null, true);
        } else {
          cb(new BadRequestException('Invalid file type'), false);
        }
      },
    }),
  )
  async uploadImages(
    @UploadedFiles()
    { files }: { files: Express.Multer.File[] },
  ) {
    const uploadPromises = files.map((file) =>
      this.imagesService.uploadImage(file),
    );
    return Promise.all(uploadPromises);
  }
}
