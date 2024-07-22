import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class LoginPipeDto {
  @IsNotEmpty()
  @IsEmail()
  @IsString()
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
}
