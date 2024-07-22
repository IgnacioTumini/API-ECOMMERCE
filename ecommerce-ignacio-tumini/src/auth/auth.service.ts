import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { LoginPipeDto } from './login.pipes.dto';
import { UserPipeDto } from 'src/users/user.pipes.dto';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
//import { Role } from 'src/utils/role.enum';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}
  async signUp(user: UserPipeDto): Promise<Omit<User, 'password'>> {
    try {
      if (user.password !== user.confirmPassword)
        throw new BadRequestException('Passwords do not match');
      const findUser = await this.userRepository.findOne({
        where: { email: user.email },
      });
      if (findUser) throw new BadRequestException('Email already exists');

      const hashedPassword = await bcrypt.hash(user.password, 10);
      if (!hashedPassword) throw new BadRequestException('Password not valid');
      const newUser = this.userRepository.create({
        ...user,
        password: hashedPassword,
      });

      await this.userRepository.save(newUser);
      // Eliminar la propiedad password antes de retornar el objeto
      const { password, ...userWithoutPassword } = newUser;

      return userWithoutPassword;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException(error);
    }
  }
  async signIn(login: LoginPipeDto): Promise<any> {
    try {
      const user = await this.userRepository.findOne({
        where: { email: login.email },
      });
      if (!user) throw new NotFoundException('User not found');
      const isMatch = await bcrypt.compare(login.password, user.password);
      if (!isMatch) throw new BadRequestException('Wrong password');

      const userPayload = {
        id: user.id,
        email: user.email,
        role: user.role,
      };

      const token = this.jwtService.sign(userPayload);

      return {
        message: 'User logged in',
        token,
      };
    } catch (error) {
      if (error instanceof NotFoundException || BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException(error);
    }
  }
}
