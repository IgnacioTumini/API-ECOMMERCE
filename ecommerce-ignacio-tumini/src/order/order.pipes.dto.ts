import { IsArray, IsNotEmpty, IsString, IsUUID } from 'class-validator';

import { ProductQuanDto } from './productQuant.dto.js';
import { ApiProperty } from '@nestjs/swagger';

export class OrderPipeDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'id',
  })
  id: string;
  @IsNotEmpty()
  @IsArray()
  @ApiProperty({
    example:
      '[ { "id": "123e4567-e89b-12d3-a456-426614174000", "quantity": 1 }, { "id": "123e4567-e89b-12d3-a456-426614174001", "quantity": 2 } ]',
    description: 'products',
  })
  products: Partial<ProductQuanDto[]>;
}
