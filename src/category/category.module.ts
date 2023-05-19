// ----------------------- NestJs -----------------------
import { Module } from '@nestjs/common';
// ----------------------- Services -----------------------
import { CategoryService } from './services/category.service';
// ----------------------- Controllers -----------------------
import { CategoryController } from './controllers/category.controller';

@Module({
  providers: [CategoryService],
  controllers: [CategoryController],
})
export class CategoryModule {}
