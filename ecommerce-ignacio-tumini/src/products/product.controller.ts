import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDto } from './product.dto';
import { Product } from './product.entity';

import { Roles } from '../decorators/role.decorator';
import { Role } from '../utils/role.enum';
import { AuthGuard } from '../guards/auth.guard';
import { RolesGuard } from '../guards/role.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
@ApiTags('Products')
@ApiResponse({ type: [Product], description: 'Entity Products' })
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  /*@Post('seeder')
  async seedProducts(): Promise<string> {
    await this.productService.seedProducts();
    return 'Products seeded successfully';
  }*/
  @Post()
  @ApiOperation({
    summary: 'Create product',
    description:
      'Recibe por body el objeto del producto y retorna el objeto creado',
  })
  async createProduct(@Body() productDto: ProductDto): Promise<Product> {
    console.log(productDto);
    return await this.productService.createProduct(productDto);
  }
  @Get(':id')
  @ApiOperation({
    summary: 'Get product by id',
    description: 'Recibe por params el id del producto y retorna el producto',
  })
  async getProductById(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<Product> {
    return await this.productService.getProductById(id);
  }
  @Get()
  @ApiOperation({
    summary: 'Get all products',
    description:
      'Recibe por query la página y el límite de elementos por página y retorna un arreglo de objetos con todos los productos.',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'La pagina que será mostrada',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'El límite de elementos por página',
  })
  async getAllProducts(
    @Query('limit') limit: number = 5,
    @Query('page') page: number = 1,
  ) {
    return await this.productService.getAllProducts(page, limit);
  }
  @Put(':id')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Update product',
    description:
      'Recibe por body la información del producto y retorna un objeto con los datos actualizados.',
  })
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  async updateProduct(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() productDto: Partial<ProductDto>,
  ): Promise<Product> {
    return await this.productService.updateProduct(id, productDto);
  }
  @Delete(':id')
  @ApiOperation({
    summary: 'Delete product',
    description:
      'Recibe por params el id del producto y retorna el producto eliminado',
  })
  async deleteProduct(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<Product> {
    return await this.productService.deleteProduct(id);
  }
}
