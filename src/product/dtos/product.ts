// ----------------------- Nestjs -----------------------
import { ApiProperty, PartialType } from '@nestjs/swagger';
// ----------------------- Libraries -----------------------
import { IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @ApiProperty({
    description: 'Name of the category',
    example: 'test',
  })
  readonly name: string;

  @IsString()
  @ApiProperty({
    description: 'Name of the category',
    example: 'test',
  })
  readonly description: string;

  @IsNumber()
  @ApiProperty({
    description: 'price',
    example: 0,
  })
  readonly price: number;

  @IsNumber()
  @ApiProperty({
    description: 'stock',
    example: 0,
  })
  readonly stock: number;

  @IsNumber()
  @ApiProperty({
    description: 'categoryId',
    example: 0,
  })
  readonly categoryId: number;
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}
