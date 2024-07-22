import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Order } from 'src/order/order.entity';
import { OrderDetails } from 'src/orderDetail/orderDetail.entity';
import { Product } from 'src/products/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Order, OrderDetails, Product])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
