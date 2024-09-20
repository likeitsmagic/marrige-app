import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { AdvantageType } from '../enums/advantage-type.enum';

export class CreateAdvantageDto {
  @IsString()
  @IsNotEmpty()
  textRu: string;

  @IsString()
  @IsNotEmpty()
  textEn: string;

  @IsString()
  @IsNotEmpty()
  textFr: string;

  @IsEnum(AdvantageType)
  advantageType: AdvantageType;
}
