import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { User } from 'src/users/user.entity';
import { Product } from 'src/products/product.entity';
import { OrderDetails } from 'src/orderDetail/orderDetail.entity';
import { UserService } from 'src/users/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([Order, User, Product, OrderDetails])],
  controllers: [OrderController],
  providers: [OrderService, UserService],
})
export class OrderModule {}
