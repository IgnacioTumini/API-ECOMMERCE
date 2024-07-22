import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/category/category.entity';
import { products } from 'src/utils/products';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async seedCategories(): Promise<void> {
    try {
      const arrayCategory = await this.categoryRepository.find();
      if (arrayCategory.length === 0) {
        for (const prod of products) {
          const newCategory = await this.categoryRepository.findOne({
            where: { name: prod.category },
          });
          if (!newCategory) {
            const category = this.categoryRepository.create({
              name: prod.category,
            });
            await this.categoryRepository.save(category);
          }
        }
      }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getCategories(): Promise<Category[]> {
    try {
      const categorys = await this.categoryRepository.find({
        relations: { product: true },
      });
      if (!categorys) throw new NotFoundException('Categories not found');
      return categorys;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(error);
    }
  }
}
