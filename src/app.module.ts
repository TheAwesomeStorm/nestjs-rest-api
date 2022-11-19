import { Module } from '@nestjs/common';
import { UserModule } from './users/user.module';
import { ProductModule } from './product/product.module';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import mikroOrmConfig from './config/mikro-orm.config';

@Module({
  imports: [
    UserModule,
    ProductModule,
    AutomapperModule.forRoot({ strategyInitializer: classes() }),
    MikroOrmModule.forRoot(mikroOrmConfig),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
