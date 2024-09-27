import {
  IsArray,
  IsObject,
  IsPhoneNumber,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Point } from 'typeorm';

export class CreateCampaignDto {
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  name: string;

  @IsString()
  @IsPhoneNumber('RU')
  phone: string;

  @IsObject()
  location: Point;

  @IsArray()
  @IsString({ each: true })
  @IsUUID('4', { each: true })
  advantages: string[];

  @IsArray()
  @IsString({ each: true })
  images: string[];
}
