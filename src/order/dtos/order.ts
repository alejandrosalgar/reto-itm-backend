// ----------------------- Nestjs -----------------------
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
// ----------------------- Libraries -----------------------
import { IsNumber, ValidateNested } from 'class-validator';
import { CreateProductOnOrderDto } from './product-on-order';

export class CreateOrderDto {
  @IsNumber()
  @ApiProperty({
    description: 'clientId',
    example: 'test',
  })
  readonly clientId: number;

  @ValidateNested({ each: true })
  @Type(() => CreateProductOnOrderDto)
  @ApiProperty({
    description: 'Products Array',
    isArray: true,
    type: CreateProductOnOrderDto,
  })
  readonly products: CreateProductOnOrderDto[];
}

export class UpdateOrderDto extends PartialType(CreateOrderDto) {}
