// ----------------------- Nestjs -----------------------
import { ApiProperty, PartialType } from '@nestjs/swagger';
// ----------------------- Libraries -----------------------
import { IsString } from 'class-validator';

export class CreateClientDto {
  @IsString()
  @ApiProperty({
    description: 'Name of the client',
    example: 'test',
  })
  readonly name: string;
}

export class UpdateClientDto extends PartialType(CreateClientDto) {}
