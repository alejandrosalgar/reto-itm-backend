// ----------------------- Nestjs -----------------------
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
// ----------------------- Libraries -----------------------
import { Type } from 'class-transformer';
import { IsOptional, IsString, Min } from 'class-validator';

export class FilterRequestDto {
  @Type(() => Number)
  @Min(1)
  @ApiProperty({
    example: 10,
  })
  limit: number;

  @Type(() => Number)
  @Min(0)
  @ApiProperty({
    example: 0,
  })
  offset: number;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  q?: string;
}
