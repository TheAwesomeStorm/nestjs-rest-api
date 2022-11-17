import { Module } from '@nestjs/common';
import { UserModule } from './users/user.module';
import { ProductModule } from './product/product.module';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';

@Module({
  imports: [
    UserModule,
    ProductModule,
    AutomapperModule.forRoot({ strategyInitializer: classes() }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
