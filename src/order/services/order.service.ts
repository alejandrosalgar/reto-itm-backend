// ----------------------- NestJs -----------------------
import {
  BadRequestException,
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
import { CreateOrderDto } from '../dtos/order';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  /**
   * Get all orders
   * @param param - Filter params
   */
  async getAll(params: FilterRequestDto) {
    const where: Prisma.OrderWhereInput = {};

    const data = await this.prisma.order.findMany({
      skip: params.offset * params.limit,
      take: params.limit,
      where,
      select: {
        id: true,
        total: true,
        client: true,
        products: true,
        _count: true,
      },
    });

    const totalItems = await this.prisma.order.count({ where });

    return { totalItems, data };
  }

  /**
   * Find one order by id
   * @param id - It's the id of the order
   */
  async findById(id: number) {
    try {
      return await this.prisma.order.findFirst({
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
  async create(data: CreateOrderDto) {
    let total = 0;

    await this.prisma.$transaction(async (tx) => {
      for (const productId of data.products) {
        const product = await tx.product.findUnique({
          where: { id: productId.productId },
        });

        total += await product.price;

        if (product.stock >= 1) {
          await tx.product.update({
            where: { id: productId.productId },
            data: {
              stock: product.stock - 1,
            },
          });
        } else {
          throw new BadRequestException(
            `El producto ${product.name} no tiene stock`,
          );
        }
      }
    });

    const args: Prisma.OrderCreateInput = {
      total: total * 1.19,
      products: {
        createMany: {
          data: data.products,
          skipDuplicates: true,
        },
      },
      client: {
        connect: {
          id: data.clientId,
        },
      },
    };

    const order = await this.prisma.order.create({
      data: args,
      include: {
        products: {
          include: {
            product: true,
          },
        },
        client: true,
      },
    });

    return order;
  }
}
