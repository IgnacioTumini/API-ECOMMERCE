import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';

export class ProductQuanDto {
  @IsNotEmpty()
  @IsUUID()
  @IsString()
  id: string;
  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}
