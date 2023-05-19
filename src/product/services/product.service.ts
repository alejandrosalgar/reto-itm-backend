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
import { CreateProductDto, UpdateProductDto } from '../dtos/product';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  /**
   * Get all products
   * @param param - Filter params
   */
  async getAll(params: FilterRequestDto) {
    const where: Prisma.ProductWhereInput = {
      name: { contains: params.q },
    };

    const data = await this.prisma.product.findMany({
      skip: params.offset * params.limit,
      take: params.limit,
      where,
      select: {
        id: true,
        name: true,
        _count: true,
      },
    });

    const totalItems = await this.prisma.product.count({ where });

    return { totalItems, data };
  }

  /**
   * Find one product by id
   * @param id - It's the id of the product
   */
  async findById(id: number) {
    try {
      return await this.prisma.product.findFirst({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException();
    }
  }

  /**
   * Create a product
   * @param data - It's the data of the product
   */
  create(data: CreateProductDto) {
    return this.prisma.product.create({ data });
  }

  /**
   * Update a product
   * @param id - It's the id of the product
   * @param data - It's the data of the product
   */
  async update(id: number, data: UpdateProductDto) {
    try {
      return await this.prisma.product.update({ where: { id }, data });
    } catch (error) {
      throw new NotFoundException();
    }
  }

  /**
   * Delete a product
   * @param id - It's the id of the product
   */
  async delete(id: number) {
    try {
      const product = await this.prisma.product.delete({ where: { id } });

      return product;
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
