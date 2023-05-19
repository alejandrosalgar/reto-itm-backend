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
import { OrderService } from '../services/order.service';
// ----------------------- DTO's -----------------------
import { FilterRequestDto } from '../../common/dtos/filter-request.dto';
import { CreateOrderDto } from '../dtos/order';
// ----------------------- Decorators -----------------------
import { BearerDocs } from 'src/common/decorators/bearer-docs.decorator';

@Controller('order')
@ApiTags('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Get()
  @ApiOperation({ summary: 'Get all categories' })
  getAll(@Query() params: FilterRequestDto) {
    return this.orderService.getAll(params);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find one order by id' })
  findById(@Param('id') id: number) {
    return this.orderService.findById(id);
  }

  @Post()
  @BearerDocs({ summary: 'Create a new order' })
  create(@Body() payload: CreateOrderDto) {
    return this.orderService.create(payload);
  }
}
