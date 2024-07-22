import {
  Get,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { UserPipeDto } from './user.pipes.dto';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/utils/role.enum';

@Injectable()
export class UserService implements OnModuleInit {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}
  async onModuleInit() {
    try {
      const userAdmin = await this.usersRepository.findOne({
        where: { email: 'nacho@gmail.com' },
      });
      if (!userAdmin) {
        const hashedPassword = await bcrypt.hash('Str0ngP@ss!', 10);
        return await this.usersRepository.save({
          name: 'Nacho',
          email: 'nacho@gmail.com',
          password: hashedPassword,
          address: '123 Main Street',
          phone: 1234567890,
          country: 'Argentina',
          city: 'Buenos Aires',
          role: Role.ADMIN,
        });
      }
      return;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  async getAllUsers(page: number, limit: number): Promise<User[]> {
    try {
      const [users] = await this.usersRepository.findAndCount({
        skip: (page - 1) * limit,
        take: limit,
        select: [
          'id',
          'email',
          'name',
          'address',
          'phone',
          'country',
          'city',
          'role',
          'orders',
        ],
        relations: { orders: true },
      });
      if (!users) throw new NotFoundException('Users not found');
      return users;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(error);
    }
  }
  @Get()
  async getUserByEmail(email: string): Promise<User> {
    try {
      const findUser = await this.usersRepository.findOne({
        where: { email },
        relations: { orders: true },
        select: [
          'id',
          'email',
          'name',
          'address',
          'phone',
          'country',
          'city',
          'role',
          'orders',
        ],
      });
      if (!findUser) throw new NotFoundException('User not found');
      return findUser;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(error);
    }
  }
  async getUserById(id: string): Promise<User | string> {
    try {
      const findUser = await this.usersRepository.findOne({
        where: { id },
        relations: { orders: true },
        select: [
          'id',
          'email',
          'name',
          'address',
          'phone',
          'country',
          'city',
          'orders',
        ],
      });
      if (!findUser) throw new NotFoundException('User not found');
      return findUser;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(error);
    }
  }
  /* async createUser(user: UserPipeDto): Promise<User> {
    try {
      const findUser = await this.usersRepository.findOne({
        where: { email: user.email },
      });
      if (findUser) throw new NotFoundException('Email already exists');
      const newUser = await this.usersRepository.save(user);
      return newUser;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException(error);
    }
  }*/
  async updateUser(id: string, user: Partial<UserPipeDto>): Promise<User> {
    try {
      const existingUser = await this.usersRepository.findOne({
        where: { id },
      });
      if (!existingUser) {
        throw new NotFoundException('User not found');
      }
      Object.assign(existingUser, user);
      await this.usersRepository.save(existingUser);
      return existingUser;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(error);
    }
  }
  async deleteUser(id: string): Promise<User> {
    try {
      const foundUser = await this.usersRepository.findOne({
        where: { id },
      });
      if (!foundUser) {
        throw new NotFoundException('User not found');
      }
      await this.usersRepository.remove(foundUser);
      return foundUser;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(error);
    }
  }
}
