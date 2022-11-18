import { Module } from '@nestjs/common';
import { UserModule } from './users/user.module';
import { ProductModule } from './product/product.module';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormConfig } from './config/typeorm.config';

@Module({
  imports: [
    UserModule,
    ProductModule,
    AutomapperModule.forRoot({ strategyInitializer: classes() }),
    TypeOrmModule.forRoot(typeormConfig),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
