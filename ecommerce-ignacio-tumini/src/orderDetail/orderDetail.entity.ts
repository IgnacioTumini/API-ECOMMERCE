import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';

import { v4 as uuid } from 'uuid';
import { Product } from '../products/product.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'orderdetails' })
export class OrderDetails {
  @ApiProperty({ type: String, format: 'uuid', description: 'Orderdetail ID' })
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @ApiProperty({ type: Number, description: 'Orderdetail price' })
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  price: number;

  @ApiProperty({ description: 'Orderdetail products' })
  @ManyToMany(() => Product, (products) => products.orderDetails)
  @JoinTable()
  products: Product[];
}
