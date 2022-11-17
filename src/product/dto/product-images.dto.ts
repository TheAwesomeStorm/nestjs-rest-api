import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class ProductImagesDto {
  @IsNotEmpty()
  @IsUrl()
  url: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}
