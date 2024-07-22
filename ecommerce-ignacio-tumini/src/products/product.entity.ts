import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { OrderDetails } from '../orderDetail/orderDetail.entity';
import { Category } from '../category/category.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'products' })
export class Product {
  @ApiProperty({ format: 'uuid', description: 'Product ID' })
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @ApiProperty({ description: 'Product name' })
  @Column({ length: 50, nullable: false })
  name: string;

  @ApiProperty({ description: 'Product description' })
  @Column('text', { nullable: false })
  description: string;

  @ApiProperty({ description: 'Product price' })
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  price: number;

  @ApiProperty({ description: 'Product stock' })
  @Column('int', { nullable: false })
  stock: number;

  @ApiProperty({ description: 'Product image url' })
  @Column('text', { nullable: false, default: 'default.jpg' })
  imgUrl: string;

  @ApiProperty({ description: 'Product category' })
  @ManyToOne(() => Category, (category) => category.product)
  category: Category;

  @ApiProperty({ description: 'Product order details' })
  @ManyToMany(() => OrderDetails, (orderDetails) => orderDetails.products)
  orderDetails: OrderDetails[];
}
