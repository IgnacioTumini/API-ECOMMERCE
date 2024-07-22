import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { User } from 'src/users/user.entity';
import { OrderDetails } from 'src/orderDetail/orderDetail.entity';
import { Product } from 'src/products/product.entity';
import { Repository } from 'typeorm';
import { OrderPipeDto } from './order.pipes.dto.js';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(OrderDetails)
    private readonly orderDetailsRepository: Repository<OrderDetails>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}
  async addOder(orderDto: OrderPipeDto): Promise<Order> {
    try {
      const user = await this.userRepository.findOne({
        where: { id: orderDto.id },
      });
      let updatedProduct = [];
      let totalPrice = 0;
      if (!user) throw new NotFoundException('User not found');
      for (const product of orderDto.products) {
        const findProduct = await this.productRepository.findOne({
          where: { id: product.id },
        });
        if (!findProduct) throw new NotFoundException('Product not found');
        if (findProduct.stock < product.quantity)
          throw new BadRequestException('Not enough stock');
        findProduct.stock -= product.quantity;
        totalPrice += findProduct.price * product.quantity;
        updatedProduct.push(findProduct);
      }

      await this.productRepository.save(updatedProduct);
      const orderDetail = this.orderDetailsRepository.create();
      orderDetail.price = totalPrice;
      orderDetail.products = updatedProduct;
      await this.orderDetailsRepository.save(orderDetail);
      const order = this.orderRepository.create();
      order.user = user;
      order.date = new Date();
      order.orderDetails = orderDetail;
      await this.orderRepository.save(order);

      return order;
    } catch (error) {
      if (error instanceof NotFoundException || BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException(error);
    }
  }

  async getOrder(id: string): Promise<Order> {
    try {
      const findOrder = await this.orderRepository.findOne({
        where: { id },
        relations: { orderDetails: true },
      });
      if (!findOrder) throw new NotFoundException('Order not found');
      return findOrder;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(error);
    }
  }
  async deleterOrder(id: string) {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: { orderDetails: { products: true } },
    });
    const orderDetail = order.orderDetails;
    console.log(orderDetail.products);
    for (const prod of orderDetail.products) {
      prod.stock += 1;
      await this.productRepository.save(prod);
    }
    await this.orderRepository.remove(order);
    await this.orderDetailsRepository.remove(orderDetail);

    return order;
  }
}
