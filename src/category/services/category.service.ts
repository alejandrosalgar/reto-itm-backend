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
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/category';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  /**
   * Get all categories
   * @param param - Filter params
   */
  async getAll(params: FilterRequestDto) {
    const where: Prisma.CategoryWhereInput = {
      name: { contains: params.q },
    };

    const data = await this.prisma.category.findMany({
      skip: params.offset * params.limit,
      take: params.limit,
      where,
      select: {
        id: true,
        name: true,
        _count: true,
      },
    });

    const totalItems = await this.prisma.category.count({ where });

    return { totalItems, data };
  }

  /**
   * Find one category by id
   * @param id - It's the id of the category
   */
  async findById(id: number) {
    try {
      return await this.prisma.category.findFirst({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException();
    }
  }

  /**
   * Create a category
   * @param data - It's the data of the category
   */
  create(data: CreateCategoryDto) {
    return this.prisma.category.create({ data });
  }

  /**
   * Update a category
   * @param id - It's the id of the category
   * @param data - It's the data of the category
   */
  async update(id: number, data: UpdateCategoryDto) {
    try {
      return await this.prisma.category.update({ where: { id }, data });
    } catch (error) {
      throw new NotFoundException();
    }
  }

  /**
   * Delete a category
   * @param id - It's the id of the category
   */
  async delete(id: number) {
    try {
      const category = await this.prisma.category.delete({ where: { id } });

      return category;
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
