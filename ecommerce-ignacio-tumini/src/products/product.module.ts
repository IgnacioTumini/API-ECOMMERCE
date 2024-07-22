import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { Product } from 'src/products/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/category/category.entity';
import { CategoriesService } from 'src/category/category.service';

//import { User } from 'src/users/user.entity';
//import { UserService } from 'src/users/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Category])],
  controllers: [ProductController],
  providers: [ProductService, CategoriesService],
})
export class ProductModule {}
