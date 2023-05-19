// ----------------------- Nestjs -----------------------
import { ApiProperty, PartialType } from '@nestjs/swagger';
// ----------------------- Libraries -----------------------
import { IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @ApiProperty({
    description: 'Name of the category',
    example: 'test',
  })
  readonly name: string;
}

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}
