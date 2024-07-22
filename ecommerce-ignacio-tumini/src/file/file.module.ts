import { Module } from '@nestjs/common';
import { FileController } from './file.controller';
import { FileService } from './file.service';
import { ProductService } from 'src/products/product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/products/product.entity';
import { Category } from 'src/category/category.entity';
import { CloudinaryConfig } from 'src/config/cloudinary';
import { CategoriesService } from 'src/category/category.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Category])],
  controllers: [FileController],
  providers: [FileService, ProductService, CloudinaryConfig, CategoriesService],
})
export class FileModule {}
