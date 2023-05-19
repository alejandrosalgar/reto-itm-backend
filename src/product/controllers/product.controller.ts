// ----------------------- NestJs -----------------------
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
// ----------------------- Services -----------------------
import { ProductService } from '../services/product.service';
// ----------------------- DTO's -----------------------
import { FilterRequestDto } from '../../common/dtos/filter-request.dto';
import { CreateProductDto, UpdateProductDto } from '../dtos/product';
// ----------------------- Decorators -----------------------
import { BearerDocs } from 'src/common/decorators/bearer-docs.decorator';

@Controller('product')
@ApiTags('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  @ApiOperation({ summary: 'Get all products' })
  getAll(@Query() params: FilterRequestDto) {
    return this.productService.getAll(params);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find one product by id' })
  findById(@Param('id') id: number) {
    return this.productService.findById(id);
  }

  @Post()
  @BearerDocs({ summary: 'Create a new product' })
  create(@Body() payload: CreateProductDto) {
    return this.productService.create(payload);
  }

  @Put(':id')
  @BearerDocs({ summary: 'Update an existing product' })
  update(@Param('id') id: number, @Body() payload: UpdateProductDto) {
    return this.productService.update(id, payload);
  }

  @Delete(':id')
  @BearerDocs({ summary: 'Delete an existing product' })
  delete(@Param('id') id: number) {
    return this.productService.delete(id);
  }
}
