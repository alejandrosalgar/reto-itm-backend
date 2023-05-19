// ----------------------- NestJs -----------------------
import { Module } from '@nestjs/common';
// ----------------------- Services -----------------------
import { ProductService } from './services/product.service';
// ----------------------- Controllers -----------------------
import { ProductController } from './controllers/product.controller';

@Module({
  providers: [ProductService],
  controllers: [ProductController],
})
export class ProductModule {}
