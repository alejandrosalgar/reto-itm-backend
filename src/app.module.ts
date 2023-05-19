import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from 'nestjs-prisma';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { ClientModule } from './client/client.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    PrismaModule.forRoot({ isGlobal: true }),
    CategoryModule,
    ProductModule,
    ClientModule,
    OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
