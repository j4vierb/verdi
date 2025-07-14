/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EstadoProducto, ProductoEntity } from './producto.entity';
import {
  BusinessError,
  BusinessLogicException,
} from '../shared/errors/business-errors';

@Injectable()
export class ProductoService {
  constructor(
    @InjectRepository(ProductoEntity)
    private readonly productoRepository: Repository<ProductoEntity>,
  ) {}

  async findAll(): Promise<ProductoEntity[]> {
    return await this.productoRepository.find({
      relations: ['cosechas', 'pedido'],
    });
  }

  async findOne(id: string): Promise<ProductoEntity> {
    const producto = await this.productoRepository.findOne({
      where: { id },
      relations: ['cosechas', 'pedido'],
    });
    if (!producto) {
      throw new BusinessLogicException(
        'Producto not found',
        BusinessError.NOT_FOUND,
      );
    }
    return producto;
  }

  async create(producto: ProductoEntity): Promise<ProductoEntity> {
    return await this.productoRepository.save(producto);
  }

  async update(id: string, producto: ProductoEntity): Promise<ProductoEntity> {
    const persistedProducto = await this.productoRepository.findOne({
      where: { id },
    });
    if (!persistedProducto) {
      throw new BusinessLogicException(
        'Producto not found',
        BusinessError.NOT_FOUND,
      );
    }
    return await this.productoRepository.save({
      ...persistedProducto,
      ...producto,
    });
  }

  async delete(id: string) {
    const producto = await this.productoRepository.findOne({ where: { id } });
    if (!producto) {
      throw new BusinessLogicException(
        'Producto not found',
        BusinessError.NOT_FOUND,
      );
    }
    await this.productoRepository.remove(producto);
  }

  async cambiarEstadoProducto(
    id: string,
    estado: EstadoProducto,
  ): Promise<ProductoEntity> {
    const producto = await this.productoRepository.findOne({ where: { id } });
    if (!producto) {
      throw new BusinessLogicException(
        'Producto not found',
        BusinessError.NOT_FOUND,
      );
    }

    producto.estado = estado;
    return await this.productoRepository.save(producto);
  }
}
