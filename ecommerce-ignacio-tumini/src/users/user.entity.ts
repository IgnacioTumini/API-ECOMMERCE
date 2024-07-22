import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Order } from '../order/order.entity';
import { Role } from '../utils/role.enum';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'users' })
export class User {
  @ApiProperty({ type: String, format: 'uuid', description: 'User ID' })
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @ApiProperty({ type: String, description: 'User name' })
  @Column({ length: 50, nullable: false })
  name: string;

  @ApiProperty({ type: String, description: 'User email' })
  @Column({ length: 50, unique: true, nullable: false })
  email: string;

  @ApiProperty({ type: String, description: 'User password' })
  @Column({ length: 200, nullable: false })
  password: string;

  @ApiProperty({ type: Number, description: 'User phone' })
  @Column('int', { nullable: true })
  phone: number;

  @ApiProperty({ type: String, description: 'User country' })
  @Column({ length: 50, nullable: true })
  country: string;

  @ApiProperty({ type: String, description: 'User address' })
  @Column('text', { nullable: true })
  address: string;

  @ApiProperty({ type: String, description: 'User city' })
  @Column({ length: 50, nullable: true })
  city: string;

  @ApiProperty({ type: String, format: 'enum', description: 'User role' })
  @Column({ default: Role.USER })
  role: Role;

  @ApiProperty({ description: 'User orders' })
  @OneToMany(() => Order, (order) => order.user)
  @JoinColumn()
  orders: Order[];
}
