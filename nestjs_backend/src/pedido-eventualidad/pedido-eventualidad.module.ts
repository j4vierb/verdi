import { Module } from '@nestjs/common';
import { PedidoEntity } from '../pedido/pedido.entity';
import { EventualidadEntity } from '../eventualidad/eventualidad.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PedidoEventualidadService } from './pedido-eventualidad.service';
import { PedidoEventualidadController } from './pedido-eventualidad.controller';

@Module({
  providers: [PedidoEventualidadService],
  imports: [TypeOrmModule.forFeature([PedidoEntity, EventualidadEntity])],
  controllers: [PedidoEventualidadController],
})
export class PedidoEventualidadModule {}
