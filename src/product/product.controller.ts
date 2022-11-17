import { ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDto } from './dto/product.dto';

@ApiTags('products')
@Controller('/products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  public async createProductAsync(@Body() productData: ProductDto) {
    return await this.productService.createProductAsync(productData);
  }

  @Get()
  public async readProductsAsync() {
    return await this.productService.readProductsAsync();
  }
}
