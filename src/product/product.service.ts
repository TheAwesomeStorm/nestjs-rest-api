import { Injectable } from '@nestjs/common';
import { ProductDto } from './dto/product.dto';

@Injectable()
export class ProductService {
  private products: ProductDto[] = [];

  public async createProductAsync(productData: ProductDto) {
    this.products.push(productData);
    return productData;
  }

  public async readProductsAsync() {
    return this.products;
  }
}
