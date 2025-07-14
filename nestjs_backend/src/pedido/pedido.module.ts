import { Module, OnModuleInit } from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PedidoEntity } from './pedido.entity';
import { PedidoController } from './pedido.controller';
import { randomUUID } from 'node:crypto';

@Module({
  imports: [TypeOrmModule.forFeature([PedidoEntity])],
  providers: [PedidoService],
  controllers: [PedidoController],
})
export class PedidoModule implements OnModuleInit {
  constructor(private readonly pedidoService: PedidoService) {}

  onModuleInit() {
    for (let i = 0; i < 3; i++) {
      const pedido: PedidoEntity = {
        direccionEntregar: `Calle ${30 + i * 3}`,
        direccionRecoger: `Avenida ${30 + i * 2}`,
        estado: 'Preparando los productos',
        fechaEntrega: new Date(Date.now()),
        id: randomUUID(),
        comentarios: [],
        productos: [],
        eventualidades: [],
      };

      this.pedidoService.crearPedido(pedido).catch((error) => {
        console.error('Error al crear pedidos de prueba:', error);
      });

      console.log(`Pedido de prueba creado: ${pedido.id}`);
    }
  }
}
