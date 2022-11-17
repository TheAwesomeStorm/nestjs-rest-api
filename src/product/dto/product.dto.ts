import { ProductFeaturesDto } from './product-features.dto';
import { ProductImagesDto } from './product-images.dto';
import {
  ArrayMinSize,
  IsArray,
  IsDate,
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class ProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsPositive()
  @IsNumber({ maxDecimalPlaces: 2 })
  value: number;

  @IsInt()
  @Min(0)
  availableAmount: number;

  @MaxLength(1000)
  @IsNotEmpty()
  @IsString()
  description: string;

  @ValidateNested()
  @ArrayMinSize(1)
  @IsArray()
  @Type(() => ProductFeaturesDto)
  features: ProductFeaturesDto[];

  @ValidateNested()
  @ArrayMinSize(1)
  @IsArray()
  @Type(() => ProductImagesDto)
  images: ProductImagesDto[];

  @IsNotEmpty()
  @IsString()
  category: string;

  @IsDateString()
  createdAt: Date;

  @IsDateString()
  updatedAt: Date;
}
