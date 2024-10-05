import {
  IsArray,
  IsEnum,
  IsNumber,
  IsObject,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Point } from 'typeorm';
import { WeddingVendorTypeEnum } from '../enums/wedding-vendor-type.enum';
import { SocialMediaPlatformEnum } from '../enums/social-media.enum';
import { Type } from 'class-transformer';

class SocialMediaDto {
  @IsEnum(SocialMediaPlatformEnum)
  platform: SocialMediaPlatformEnum;

  @IsUrl()
  link: string;
}

export class CreateCampaignDto {
  @IsString()
  @MinLength(1)
  @MaxLength(70)
  name: string;

  @IsString()
  @MaxLength(600)
  description: string;

  @IsString()
  @IsPhoneNumber('RU')
  @IsOptional()
  phone: string;

  @IsObject()
  location: Point;

  @IsString()
  address: string;

  @IsArray()
  @IsString({ each: true })
  images: string[];

  @IsEnum(WeddingVendorTypeEnum)
  type: WeddingVendorTypeEnum;

  @IsNumber()
  minPrice: number;

  @IsNumber()
  maxPrice: number;

  @IsArray()
  @IsObject({ each: true })
  @ValidateNested()
  @Type(() => SocialMediaDto)
  socialMedias: SocialMediaDto[];
}
