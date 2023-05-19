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

  @IsString()
  @ApiProperty({
    description: 'phone',
    example: 'test',
  })
  readonly phone: string;

  @IsString()
  @ApiProperty({
    description: 'identification',
    example: 'test',
  })
  readonly identification: string;

  @IsString()
  @ApiProperty({
    description: 'address',
    example: 'test',
  })
  readonly address: string;
}

export class UpdateClientDto extends PartialType(CreateClientDto) {}
