import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Product } from '../products/product.entity';
import { v4 as uuid } from 'uuid';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'categorys' })
export class Category {
  @ApiProperty({ type: String, format: 'uuid', description: 'Category ID' })
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @ApiProperty({ type: String, description: 'Category name' })
  @Column({ length: 50, nullable: false })
  name: string;

  @OneToMany(() => Product, (product) => product.category)
  product: Product[];
}
