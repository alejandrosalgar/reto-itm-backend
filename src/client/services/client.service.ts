// ----------------------- NestJs -----------------------
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
// ----------------------- Libraries -----------------------
import { Prisma } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
// ----------------------- DTO's -----------------------
import { FilterRequestDto } from 'src/common/dtos/filter-request.dto';
import { CreateClientDto, UpdateClientDto } from '../dtos/client';

@Injectable()
export class ClientService {
  constructor(private prisma: PrismaService) {}

  /**
   * Get all clients
   * @param param - Filter params
   */
  async getAll(params: FilterRequestDto) {
    const where: Prisma.ClientWhereInput = {
      name: { contains: params.q },
    };

    const data = await this.prisma.client.findMany({
      skip: params.offset * params.limit,
      take: params.limit,
      where,
      select: {
        id: true,
        name: true,
        address: true,
        identification: true,
        phone: true,
        _count: true,
      },
    });

    const totalItems = await this.prisma.client.count({ where });

    return { totalItems, data };
  }

  /**
   * Find one client by id
   * @param id - It's the id of the client
   */
  async findById(id: number) {
    try {
      return await this.prisma.client.findFirst({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException();
    }
  }

  /**
   * Create a client
   * @param data - It's the data of the client
   */
  create(data: CreateClientDto) {
    return this.prisma.client.create({ data });
  }

  /**
   * Update a client
   * @param id - It's the id of the client
   * @param data - It's the data of the client
   */
  async update(id: number, data: UpdateClientDto) {
    try {
      return await this.prisma.client.update({ where: { id }, data });
    } catch (error) {
      throw new NotFoundException();
    }
  }

  /**
   * Delete a client
   * @param id - It's the id of the client
   */
  async delete(id: number) {
    try {
      const client = await this.prisma.client.delete({ where: { id } });

      return client;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        switch (error.code) {
          case 'P2018':
            throw new NotFoundException();
          case 'P2014':
            throw new ConflictException();
        }
      }

      throw new InternalServerErrorException();
    }
  }
}
