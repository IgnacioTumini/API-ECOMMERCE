import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';

import { Order } from './order.entity';
import { OrderPipeDto } from './order.pipes.dto';
import { AuthGuard } from '../guards/auth.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
@ApiTags('Orders')
@ApiResponse({ type: [Order], description: 'Entity Products' })
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Add order',
    description:
      'Recibe por body el objeto del pedido y retorna el objeto creado',
  })
  @UseGuards(AuthGuard)
  async addOrder(@Body() orderDto: OrderPipeDto): Promise<Order> {
    return await this.orderService.addOder(orderDto);
  }
  @Get(':id')
  @ApiOperation({
    summary: 'Get order by id',
    description:
      'Recibe por params el id del pedido y retorna el pedido correspondiente',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async getOrder(@Param('id', ParseUUIDPipe) id: string): Promise<Order> {
    return await this.orderService.getOrder(id);
  }
  @Delete(':id')
  async deleteOrder(@Param('id', ParseUUIDPipe) id: string) {
    return await this.orderService.deleterOrder(id);
  }
}
