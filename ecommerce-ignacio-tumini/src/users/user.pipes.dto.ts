import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UserPipeDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(80)
  @ApiProperty({ example: 'ignacio', description: 'username' })
  name: string;
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ example: 'nR9Xc@example.com', description: 'email' })
  email: string;
  @IsNotEmpty()
  @MaxLength(15)
  @MinLength(8)
  @IsString()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,15}$/, {
    message: 'password too weak',
  })
  @ApiProperty({ example: 'Str0ngP@ss!', description: 'password' })
  password: string;
  @IsNotEmpty()
  @MaxLength(15)
  @MinLength(8)
  @IsString()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,15}$/, {
    message: 'password too weak',
  })
  @ApiProperty({ example: 'Str0ngP@ss!', description: 'confirm password' })
  confirmPassword: string;
  @IsString()
  @IsNotEmpty()
  @MaxLength(80)
  @MinLength(3)
  @ApiProperty({ example: '123 Main Street', description: 'address' })
  address: string;
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ example: '1234567890', description: 'phone' })
  phone: number;
  @MaxLength(20)
  @MinLength(5)
  @IsString()
  @ApiProperty({ example: 'Argentina', description: 'country' })
  country: string;
  @MaxLength(20)
  @MinLength(5)
  @IsString()
  @ApiProperty({ example: 'Buenos Aires', description: 'city' })
  city: string;
}
