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
import { CategoryService } from '../services/category.service';
// ----------------------- DTO's -----------------------
import { FilterRequestDto } from '../../common/dtos/filter-request.dto';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/category';
// ----------------------- Decorators -----------------------
import { BearerDocs } from 'src/common/decorators/bearer-docs.decorator';

@Controller('category')
@ApiTags('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get()
  @ApiOperation({ summary: 'Get all categories' })
  getAll(@Query() params: FilterRequestDto) {
    return this.categoryService.getAll(params);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find one category by id' })
  findById(@Param('id') id: number) {
    return this.categoryService.findById(id);
  }

  @Post()
  @BearerDocs({ summary: 'Create a new category' })
  create(@Body() payload: CreateCategoryDto) {
    return this.categoryService.create(payload);
  }

  @Put(':id')
  @BearerDocs({ summary: 'Update an existing category' })
  update(@Param('id') id: number, @Body() payload: UpdateCategoryDto) {
    return this.categoryService.update(id, payload);
  }

  @Delete(':id')
  @BearerDocs({ summary: 'Delete an existing category' })
  delete(@Param('id') id: number) {
    return this.categoryService.delete(id);
  }
}
