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
import { ClientService } from '../services/client.service';
// ----------------------- DTO's -----------------------
import { FilterRequestDto } from '../../common/dtos/filter-request.dto';
import { CreateClientDto, UpdateClientDto } from '../dtos/client';
// ----------------------- Decorators -----------------------
import { BearerDocs } from 'src/common/decorators/bearer-docs.decorator';

@Controller('client')
@ApiTags('client')
export class ClientController {
  constructor(private clientService: ClientService) {}

  @Get()
  @ApiOperation({ summary: 'Get all clients' })
  getAll(@Query() params: FilterRequestDto) {
    return this.clientService.getAll(params);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find one client by id' })
  findById(@Param('id') id: number) {
    return this.clientService.findById(id);
  }

  @Post()
  @BearerDocs({ summary: 'Create a new client' })
  create(@Body() payload: CreateClientDto) {
    return this.clientService.create(payload);
  }

  @Put(':id')
  @BearerDocs({ summary: 'Update an existing client' })
  update(@Param('id') id: number, @Body() payload: UpdateClientDto) {
    return this.clientService.update(id, payload);
  }

  @Delete(':id')
  @BearerDocs({ summary: 'Delete an existing client' })
  delete(@Param('id') id: number) {
    return this.clientService.delete(id);
  }
}
