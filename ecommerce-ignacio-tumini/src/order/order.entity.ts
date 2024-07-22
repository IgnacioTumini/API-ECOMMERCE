import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import { v4 as uuid } from 'uuid';
import { User } from '../users/user.entity';
import { OrderDetails } from '../orderDetail/orderDetail.entity';
import { ApiProperty } from '@nestjs/swagger';
@Entity({ name: 'orders' })
export class Order {
  @ApiProperty({ type: String, format: 'uuid', description: 'Order ID' })
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @ManyToOne(() => User, (user) => user.orders, {
    onDelete: 'SET NULL',
  })
  user: User;

  @ApiProperty({ type: Date, description: 'Order date' })
  @Column('date')
  date: Date;

  @ApiProperty({ description: 'Order details' })
  @OneToOne(() => OrderDetails, { onDelete: 'CASCADE' })
  @JoinColumn()
  orderDetails: OrderDetails;
}
