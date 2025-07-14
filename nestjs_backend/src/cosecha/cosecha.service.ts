/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CosechaEntity } from './cosecha.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  BusinessError,
  BusinessLogicException,
} from '../shared/errors/business-errors';
import { CosechaDto } from './cosecha.dto';

import { ProductoEntity } from '../producto/producto.entity';

import { UsuarioEntity } from '../usuario/usuario.entity';
import { AgricultorEntity } from '../agricultor/agricultor.entity';


@Injectable()
export class CosechaService {
  @InjectRepository(CosechaEntity)
  private readonly cosechaRepository: Repository<CosechaEntity>;

  @InjectRepository(UsuarioEntity)
  private readonly usuarioRepository: Repository<UsuarioEntity>;

  @InjectRepository(AgricultorEntity)
  private readonly agricultorRepository: Repository<AgricultorEntity>;
  usuarioService: any;


    // Metodo para encontrar las cosechas completas del país.
    async findAll(): Promise<CosechaEntity[]> {
        return await this.cosechaRepository.find({
             relations: ['producto'],
            });
    }
/*
  // Metodo para encontrar las cosechas completas del país.
  async findAll(): Promise<CosechaEntity[]> {
    return await this.cosechaRepository.find();
  }
*/

  async create(cosecha: CosechaEntity): Promise<CosechaEntity> {
    return await this.cosechaRepository.save(cosecha);
  }


    //Metodo para encontrar las cosechas de un agricultor
    async createCosechaForUsuario(usuarioId: string, cosechaDto: CosechaDto): Promise<CosechaEntity> {
    const agricultor = await this.usuarioService.findAgricultorByUsuarioId(usuarioId);
    if (!agricultor) {
      throw new BusinessLogicException('Usuario no es un agricultor', BusinessError.PRECONDITION_FAILED);
    }

    const producto = await this.cosechaRepository.manager.getRepository(ProductoEntity).findOne({
      where: { id: cosechaDto.productoId }
    });

    if (!producto) {
      throw new BusinessLogicException('Producto no encontrado', BusinessError.NOT_FOUND);
    }

    const nuevaCosecha = this.cosechaRepository.create({
      ...cosechaDto,
      producto,
      agricultor
    });

    return await this.cosechaRepository.save(nuevaCosecha);
    
    }   

    //Metodo para encontrar cosechas por agricultor
    async findCosechasByUsuarioId(usuarioId: string): Promise<CosechaEntity[]> {
    const agricultor = await this.usuarioService.findAgricultorByUsuarioId(usuarioId);
/*
  //Metodo para encontrar las cosechas de un agricultor
  async createCosechaForUsuario(
    usuarioId: string,
    cosechaDto: CosechaDto,
  ): Promise<CosechaEntity> {
    const usuarioAgricultor = await this.agricultorRepository.findOne({
      where: { usuario: { id: usuarioId } },
    });

    if (!usuarioAgricultor) {
      throw new BusinessLogicException(
        'Usuario no es un agricultor',
        BusinessError.PRECONDITION_FAILED,
      );
    }

    const nuevaCosecha = this.cosechaRepository.create(cosechaDto);
    nuevaCosecha.agricultor = usuarioAgricultor;
    return await this.cosechaRepository.save(nuevaCosecha);
  }

  async findCosechasByUsuarioId(usuarioId: string): Promise<CosechaEntity[]> {
    // find the cosechas of the user that have rol agricultor
    const agricultor = await this.usuarioRepository.findOne({
      where: { id: usuarioId, rol: Role.AGRICULTOR },
      relations: ['cosechas'],
    });
*/

    if (!agricultor) {
      throw new BusinessLogicException(
        'Usuario no es un agricultor',
        BusinessError.PRECONDITION_FAILED,
      );
    }

    return this.cosechaRepository.find({
      where: { agricultor: { id: agricultor.id } },
    });
  }
}
