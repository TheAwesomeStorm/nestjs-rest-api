import { IsNotEmpty, IsString } from 'class-validator';

export class ProductFeaturesDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}
