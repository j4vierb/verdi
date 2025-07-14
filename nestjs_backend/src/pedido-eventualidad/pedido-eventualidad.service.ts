import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventualidadEntity } from '../eventualidad/eventualidad.entity';
import { PedidoEntity } from '../pedido/pedido.entity';
import {
  BusinessError,
  BusinessLogicException,
} from '../shared/errors/business-errors';
import { Repository } from 'typeorm';

@Injectable()
export class PedidoEventualidadService {
  @InjectRepository(PedidoEntity)
  private readonly pedidoRepository: Repository<PedidoEntity>;

  @InjectRepository(EventualidadEntity)
  private readonly eventualidadRepository: Repository<EventualidadEntity>;

  async getEventualidadesByPedidoId(
    pedidoId: string,
  ): Promise<EventualidadEntity[]> {
    const pedido = await this.pedidoRepository.findOne({
      where: { id: pedidoId },
      relations: ['eventualidades'],
    });

    if (!pedido) {
      throw new BusinessLogicException(
        'El pedido con el id no existe',
        BusinessError.NOT_FOUND,
      );
    }

    return pedido.eventualidades;
  }

  /**
   * Function to create a new eventualidad and associate it with a pedido
   * @param pedidoId
   * @param eventualidad
   * @returns
   */
  async addEventualidadToPedido(
    pedidoId: string,
    eventualidad: EventualidadEntity,
  ): Promise<EventualidadEntity> {
    const pedido = await this.pedidoRepository.findOne({
      where: { id: pedidoId },
      relations: ['eventualidades'],
    });

    if (!pedido) {
      throw new BusinessLogicException(
        'El pedido con el id no existe',
        BusinessError.NOT_FOUND,
      );
    }

    const returnedEventualidad = await this.eventualidadRepository.findOne({
      where: { id: eventualidad.id },
    });

    if (returnedEventualidad) {
      throw new BusinessLogicException(
        'La eventualidad con el id ya existe',
        BusinessError.NOT_FOUND,
      );
    }

    eventualidad.pedido = pedido;
    pedido.eventualidades.push(eventualidad);
    const savedEvent = await this.eventualidadRepository.save(eventualidad);
    await this.pedidoRepository.save(pedido);
    delete savedEvent.pedido;
    return savedEvent;
  }

  async deleteEventualidadFromPedido(
    pedidoId: string,
    eventualidadId: number,
  ): Promise<void> {
    const pedido = await this.pedidoRepository.findOne({
      where: { id: pedidoId },
    });

    if (!pedido) {
      throw new BusinessLogicException(
        'El pedido con el id no existe',
        BusinessError.NOT_FOUND,
      );
    }

    const eventualidad = await this.eventualidadRepository.findOne({
      where: { id: eventualidadId },
    });

    if (!eventualidad) {
      throw new BusinessLogicException(
        'La eventualidad con el id no existe',
        BusinessError.NOT_FOUND,
      );
    }

    await this.eventualidadRepository.remove(eventualidad);
  }

  async updateEventualidadFromPedido(
    pedidoId: string,
    eventualidadId: number,
    eventualidad: EventualidadEntity,
  ): Promise<EventualidadEntity> {
    const pedido = await this.pedidoRepository.findOne({
      where: { id: pedidoId },
      relations: ['eventualidades'],
    });

    if (!pedido) {
      throw new BusinessLogicException(
        'El pedido con el id no existe',
        BusinessError.NOT_FOUND,
      );
    }

    const returnedEventualidad = await this.eventualidadRepository.findOne({
      where: { id: eventualidadId },
      relations: ['pedido'],
    });

    if (!returnedEventualidad) {
      throw new BusinessLogicException(
        'La eventualidad con el id no existe',
        BusinessError.NOT_FOUND,
      );
    }

    pedido.eventualidades = pedido.eventualidades.filter(
      (e) => e.id !== eventualidadId,
    );
    pedido.eventualidades.push(eventualidad);
    await this.pedidoRepository.save(pedido);
    return eventualidad;
  }
}
