import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class ProductDto {
  @ApiProperty({
    description: 'El nombre del producto',
    example: 'Samsung A54',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'La descripción del producto',
    example: 'Un celular de gama media',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'El precio del producto',
    example: '300',
  })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  price: number;

  @ApiProperty({
    description: 'El stock del producto',
    example: '12',
  })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  stock: number;

  @ApiProperty({
    description: 'La imagen del producto',
    example: 'https://example.com/image.jpg',
    required: false,
  })
  @IsString()
  @IsOptional()
  imgUrl: string;

  @ApiProperty({
    description: 'La categoria del producto',
    example: 'smartphone',
  })
  @IsString()
  @IsNotEmpty()
  category: string;
}
