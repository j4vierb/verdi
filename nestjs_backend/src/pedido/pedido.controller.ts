import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { plainToInstance } from 'class-transformer';
import { PedidoDto } from './pedido.dto';
import { PedidoEntity } from './pedido.entity';

@UseInterceptors(BusinessErrorsInterceptor)
@Controller('pedido')
export class PedidoController {
  constructor(private readonly pedidoService: PedidoService) {}

  @Post()
  async create(@Body() pedidoDto: PedidoDto) {
    const pedido: PedidoEntity = plainToInstance(PedidoEntity, pedidoDto);
    return await this.pedidoService.crearPedido(pedido);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return await this.pedidoService.eliminarPedido(id);
  }

  @Post('verificar-y-crear')
  async verificarYCrear(@Body() body: any) {
    return await this.pedidoService.verificarYCrearPedido(body);
  }

  @Get('')
  async findAll(): Promise<PedidoEntity[]> {
    return await this.pedidoService.obtenerPedidos();
  }
}
