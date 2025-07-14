import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventualidadEntity, EventualidadTipo } from './eventualidad.entity';
import { Repository, Between } from 'typeorm';
import {
  BusinessError,
  BusinessLogicException,
} from '../shared/errors/business-errors';

@Injectable()
export class EventualidadService {
  @InjectRepository(EventualidadEntity)
  private readonly eventualidadRepository: Repository<EventualidadEntity>;

  async findAll(): Promise<EventualidadEntity[]> {
    const eventualidades = await this.eventualidadRepository.find({
      relations: ['pedido'],
    });
    if (eventualidades.length === 0) {
      throw new BusinessLogicException(
        'No se encontraron eventualidades',
        BusinessError.NOT_FOUND,
      );
    }

    return eventualidades;
  }

  async findAllByTipo(tipo: EventualidadTipo): Promise<EventualidadEntity[]> {
    const eventualidades = await this.eventualidadRepository.find({
      where: { tipo: tipo },
    });
    if (eventualidades.length === 0) {
      throw new BusinessLogicException(
        'No se encontraron eventualidades',
        BusinessError.PRECONDITION_FAILED,
      );
    }

    return eventualidades;
  }

  async findAllInDateRange(
    startDate: Date,
    endDate: Date,
  ): Promise<EventualidadEntity[]> {
    const eventualidades = await this.eventualidadRepository.find({
      where: {
        fecha: Between(startDate, endDate),
      },
    });
    if (eventualidades.length === 0) {
      throw new BusinessLogicException(
        'No se encontraron eventualidades en el rango de fechas',
        BusinessError.PRECONDITION_FAILED,
      );
    }

    return eventualidades;
  }

  async findOne(id: number): Promise<EventualidadEntity> {
    const eventualidad = await this.eventualidadRepository.findOne({
      where: { id: id },
    });
    if (!eventualidad) {
      throw new BusinessLogicException(
        'No se encontró la eventualidad con el id proporcionado',
        BusinessError.PRECONDITION_FAILED,
      );
    }

    return eventualidad;
  }

  async update(eventualidad: EventualidadEntity): Promise<EventualidadEntity> {
    const eventualidadDB = await this.eventualidadRepository.findOne({
      where: { id: eventualidad.id },
    });
    if (!eventualidadDB) {
      throw new BusinessLogicException(
        'No se encontró la eventualidad con el id proporcionado',
        BusinessError.PRECONDITION_FAILED,
      );
    }

    const res = await this.eventualidadRepository.update(
      { id: eventualidad.id },
      eventualidad,
    );

    if (res.affected === 0) {
      throw new BusinessLogicException(
        'No se pudo actualizar la eventualidad',
        BusinessError.PRECONDITION_FAILED,
      );
    }
    return eventualidad;
  }

  async remove(id: number): Promise<EventualidadEntity> {
    const eventualidad = await this.eventualidadRepository.findOne({
      where: { id: id },
    });
    if (!eventualidad) {
      throw new BusinessLogicException(
        'No se encontró la eventualidad con el id proporcionado',
        BusinessError.PRECONDITION_FAILED,
      );
    }

    return await this.eventualidadRepository.remove(eventualidad);
  }
}
