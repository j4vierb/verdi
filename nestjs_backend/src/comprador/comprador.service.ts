/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CompradorEntity } from './comprador.entity';
import { BusinessLogicException, BusinessError } from '../shared/errors/business-errors';

@Injectable()
export class CompradorService {
  constructor(
    @InjectRepository(CompradorEntity)
    private readonly compradorRepository: Repository<CompradorEntity>,
  ) {}

  async findAll(): Promise<CompradorEntity[]> {
    return await this.compradorRepository.find();
  }

  async findOne(id: string): Promise<CompradorEntity> {
    const comprador = await this.compradorRepository.findOne({ where: { id } });
    if (!comprador) {
      throw new NotFoundException('Comprador no encontrado');
    }
    return comprador;
  }

      async update(id: string, comprador: CompradorEntity): Promise<CompradorEntity> {
          const persistedComprador: CompradorEntity = await this.compradorRepository.findOne({where: { id }});
          if (!persistedComprador) {
              throw new BusinessLogicException('Comprador not found', BusinessError.NOT_FOUND);
          }
          return await this.compradorRepository.save({ ...persistedComprador, ...comprador });
      }

  async create(comprador: CompradorEntity): Promise<CompradorEntity> {
    return await this.compradorRepository.save(comprador);
  }

  async delete(id: number): Promise<void> {
    const result = await this.compradorRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Comprador no encontrado');
    }
  }
  
}
