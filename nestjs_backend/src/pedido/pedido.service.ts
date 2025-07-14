import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PedidoEntity } from './pedido.entity';
import { CosechaEntity } from '../cosecha/cosecha.entity';
import {
  BusinessError,
  BusinessLogicException,
} from '../shared/errors/business-errors';

@Injectable()
export class PedidoService {
  constructor(
    @InjectRepository(PedidoEntity)
    private readonly pedidoRepository: Repository<PedidoEntity>,
  ) {}

  async crearPedido(pedido: PedidoEntity): Promise<PedidoEntity> {
    const estadosValidos = [
      'Preparando los productos',
      'Recogiendo los productos',
      'Productos en camino',
    ];

    // Validar estado
    if (!estadosValidos.includes(pedido.estado)) {
      throw new Error(
        `Estado inválido: ${pedido.estado}. Debe ser uno de: ${estadosValidos.join(', ')}`,
      );
    }
    /*
    // Validar fecha de entrega
    const fechaEntrega = new Date(pedido.fechaEntrega);
    const fechaActual = new Date();

    if (isNaN(fechaEntrega.getTime())) {
      throw new Error('La fecha de entrega no es una fecha válida');
    }

    if (fechaEntrega <= fechaActual) {
      throw new Error('La fecha de entrega debe ser una fecha futura');
    }
    */
    return await this.pedidoRepository.save(pedido);
  }

  async eliminarPedido(id: number): Promise<void> {
    const pedido = await this.pedidoRepository.findOne({
      where: { id: id.toString() },
    });

    if (!pedido) {
      throw new Error(`No se encontró un pedido con id ${id}`);
    }

    const fechaEntrega = new Date(pedido.fechaEntrega);
    const fechaActual = new Date();

    // Calcular la diferencia en días
    const diferenciaEnTiempo = fechaEntrega.getTime() - fechaActual.getTime();
    const diferenciaEnDias = diferenciaEnTiempo / (1000 * 60 * 60 * 24);

    if (diferenciaEnDias < 5) {
      throw new Error(
        'El pedido solo se puede eliminar con 5 o más días de anticipación a la fecha de entrega',
      );
    }

    await this.pedidoRepository.remove(pedido);
  }

  async verificarYCrearPedido(body: {
    direccionRecoger: string;
    direccionEntregar: string;
    estado: string;
    fechaEntrega: string;
    productos: { id: string; cantidad: number }[];
  }) {
    const estadosValidos = [
      'Preparando los productos',
      'Recogiendo los productos',
      'Productos en camino',
    ];

    if (!estadosValidos.includes(body.estado)) {
      throw new Error(`Estado inválido: ${body.estado}`);
    }

    // Obtener las cosechas necesarias
    const cosechasRepo =
      this.pedidoRepository.manager.getRepository(CosechaEntity);

    for (const producto of body.productos) {
      const cosecha = await cosechasRepo.findOne({
        where: { id: producto.id },
      });
      if (!cosecha)
        throw new Error(`Cosecha con ID ${producto.id} no encontrada`);

      const disponible = cosecha.cantidadKilos - cosecha.cantidadVendidas;
      if (producto.cantidad > disponible) {
        throw new Error(
          `No hay suficiente de ${cosecha.nombre}. Solo hay ${disponible} kilos disponibles.`,
        );
      }
    }

    // Si todo está disponible, actualiza las cantidades y guarda el pedido
    for (const producto of body.productos) {
      const cosecha = await cosechasRepo.findOne({
        where: { id: producto.id },
      });
      cosecha.cantidadVendidas += producto.cantidad;
      await cosechasRepo.save(cosecha);
    }

    // Crear el pedido
    const pedido = this.pedidoRepository.create({
      direccionRecoger: body.direccionRecoger,
      direccionEntregar: body.direccionEntregar,
      estado: body.estado,
      fechaEntrega: new Date(body.fechaEntrega),
    });

    return await this.pedidoRepository.save(pedido);
  }

  async obtenerPedidos(): Promise<PedidoEntity[]> {
    const pedidos = await this.pedidoRepository.find();
    if (pedidos.length === 0) {
      new BusinessLogicException(
        'No se encontraron pedidos',
        BusinessError.NOT_FOUND,
      );
    }
    return pedidos;
  }
}
