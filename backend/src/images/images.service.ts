import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ImagesService {
  private readonly logger = new Logger(ImagesService.name);

  constructor(private readonly configService: ConfigService) {}

  YANDEX_S3_BUCKET = this.configService.get('S3_BUCKET');
  yandexBucket = new S3Client({
    credentials: {
      accessKeyId: this.configService.get('S3_ACCESS_KEY'),
      secretAccessKey: this.configService.get('S3_SECRET_ACCESS_KEY'),
    },
    region: this.configService.get('S3_REGION'),
    endpoint: this.configService.get('S3_ENDPOINT'),
  });

  async uploadImage(file: Express.Multer.File) {
    try {
      const key = uuidv4() + file.mimetype.replace('/', '.');
      const command = new PutObjectCommand({
        Bucket: this.YANDEX_S3_BUCKET,
        Key: key,
        Body: file.buffer,
        ACL: 'public-read',
      });

      await this.yandexBucket.send(command);

      const url = `${this.configService.get('S3_ENDPOINT')}/${this.YANDEX_S3_BUCKET}/${key}`;

      return { url };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
