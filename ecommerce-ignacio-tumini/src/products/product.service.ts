import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository } from 'typeorm';
import { Category } from 'src/category/category.entity';
import { products } from 'src/utils/products';
import { ProductDto } from './product.dto';
import { CategoriesService } from 'src/category/category.service';

@Injectable()
export class ProductService implements OnModuleInit {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    private readonly categoryService: CategoriesService,
  ) {}

  async onModuleInit() {
    await this.categoryService.seedCategories();
    await this.seedProducts();
  }

  async seedProducts(): Promise<void> {
    try {
      const arrayProducts = await this.productRepository.find();
      if (arrayProducts.length === 0) {
        for (const product of products) {
          const category = await this.categoryRepository.findOne({
            where: { name: product.category },
          });
          if (category) {
            const newProduct = { ...product, category };
            await this.productRepository.save(newProduct);
          }
        }
      }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  async createProduct(productDto: ProductDto): Promise<Product> {
    try {
      const category = await this.categoryRepository.findOne({
        where: { name: productDto.category },
      });
      if (!category) throw new NotFoundException('Category not found');
      const newProduct = await this.productRepository.findOne({
        where: {
          name: productDto.name,
          description: productDto.description,
        },
        relations: { category: true },
      });
      console.log(newProduct);
      if (newProduct) throw new NotFoundException('Product already exists');

      const product = this.productRepository.create({
        name: productDto.name,
        description: productDto.description,
        price: productDto.price,
        stock: productDto.stock,
        imgUrl: productDto.imgUrl,
        category: category,
      });
      return await this.productRepository.save(product);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(error);
    }
  }
  async getAllProducts(page: number, limit: number): Promise<Product[]> {
    try {
      const [products] = await this.productRepository.findAndCount({
        skip: (page - 1) * limit,
        take: limit,
        relations: { category: true },
      });
      if (!products) throw new NotFoundException('Products not found');
      return products;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(error);
    }
  }
  async getProductById(id: string): Promise<Product> {
    try {
      const product = await this.productRepository.findOne({
        where: { id },
        relations: { category: true },
      });
      if (!product) throw new NotFoundException('Product not found');
      return product;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(error);
    }
  }
  async updateProduct(
    id: string,
    product: Partial<ProductDto>,
  ): Promise<Product> {
    try {
      const findProduct = await this.productRepository.findOne({
        where: { id },
        relations: { category: true },
      });
      if (!findProduct) throw new NotFoundException('Product not found');
      if (product.category) {
        const category = await this.categoryRepository.findOne({
          where: { name: product.category },
        });
        if (!category) throw new NotFoundException('Category not found');
        product.category = category.id;
      }
      Object.assign(findProduct, product);
      return await this.productRepository.save(findProduct);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(error);
    }
  }
  async deleteProduct(id: string): Promise<Product> {
    try {
      const product = await this.productRepository.findOne({ where: { id } });
      if (!product) throw new NotFoundException('Product not found');
      return await this.productRepository.remove(product);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(error);
    }
  }
}
