import { Controller, Get } from '@nestjs/common';

import { CategoriesService } from './category.service';
import { Category } from './category.entity';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
@ApiTags('Categories')
@ApiResponse({ type: [Category], description: 'Entity Categories' })
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  /*@Post('seeder')
  async seedCategories(): Promise<string> {
    await this.categoriesService.seedCategories();
    return 'Categories seeded successfully';
  }*/

  @Get()
  @ApiOperation({
    summary: 'Get all categories',
    description:
      'Retorna un arreglo de objetos con todas las categorías existentes',
  })
  async getCategories(): Promise<Category[]> {
    return await this.categoriesService.getCategories();
  }
}
