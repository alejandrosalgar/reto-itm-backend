/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreateProductOnOrderDto {
  @IsNumber()
  @ApiProperty({
    description: 'Product id',
    example: 1,
  })
  readonly productId: number;
}
