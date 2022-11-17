import { ProductFeaturesDto } from './product-features.dto';
import { ProductImagesDto } from './product-images.dto';

export class ProductDto {
  name: string;
  value: number;
  availableAmount: number;
  description: string;
  features: ProductFeaturesDto[];
  images: ProductImagesDto[];
  category: string;
  createdAt: Date;
  updatedAt: Date;
}
