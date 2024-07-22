import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';

import { AuthGuard } from '../guards/auth.guard';
import { User } from './user.entity';
import { UserPipeDto } from './user.pipes.dto';
import { RolesGuard } from '../guards/role.guard';
import { Roles } from '../decorators/role.decorator';
import { Role } from '../utils/role.enum';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
@ApiTags('Users')
@ApiResponse({ type: [User], description: 'Entity Users' })
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiBearerAuth()
  @HttpCode(200)
  @ApiOperation({
    summary: 'Get all users',
    description:
      'Recibe por query la página y el límite de elementos por página y retorna un arreglo de objetos con todos los usuarios.',
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
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  async getAllUsers(
    @Query('limit') limit: number = 5,
    @Query('page') page: number = 1,
  ): Promise<User[]> {
    return await this.userService.getAllUsers(page, limit);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get user by id',
    description: 'Recibe por params el id del usuario y retorna el usuario',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @HttpCode(200)
  async getUserById(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<User | string> {
    return await this.userService.getUserById(id);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Delete user by id',
    description:
      'Recibe por params el id del usuario y retorna el usuario eliminado',
  })
  @UseGuards(AuthGuard)
  @HttpCode(200)
  async deleteUser(@Param('id', ParseUUIDPipe) id: string): Promise<User> {
    return await this.userService.deleteUser(id);
  }
  @Put(':id')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Update user by id',
    description:
      'Recibe por params el id del usuario y por body la información del usuario y retorna el usuario actualizado',
  })
  @UseGuards(AuthGuard)
  @HttpCode(200)
  async updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() user: Partial<UserPipeDto>,
  ): Promise<User> {
    return await this.userService.updateUser(id, user);
  }
}
