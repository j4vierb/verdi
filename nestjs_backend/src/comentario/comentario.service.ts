import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ComentarioEntity } from './comentario.entity';
import { Repository, DataSource } from 'typeorm';
import { ComentarioDto } from './comentario.dto';
import { AgricultorEntity } from '../agricultor/agricultor.entity';
import { CosechaEntity } from '../cosecha/cosecha.entity';
import { PedidoEntity } from '../pedido/pedido.entity';

@Injectable()
export class ComentarioService {
  constructor(
    @InjectRepository(ComentarioEntity)
    private readonly comentarioRepository: Repository<ComentarioEntity>,
    private readonly dataSource: DataSource,
  ) {}

  async crearComentario(dto: ComentarioDto): Promise<ComentarioEntity> {
    const fechaPublicacion = new Date(dto.fecha);
    const fechaActual = new Date();

    if (isNaN(fechaPublicacion.getTime())) {
      throw new Error('La fecha de publicación no es válida');
    }

    if (fechaPublicacion >= fechaActual) {
      throw new Error('La fecha debe estar en el pasado');
    }

    if (dto.contenido.length >= 1000) {
      throw new Error('El contenido no puede tener más de 1000 caracteres');
    }

    const comentario = new ComentarioEntity();
    comentario.nombreUsuario = dto.nombreUsuario;
    comentario.fecha = fechaPublicacion;
    comentario.contenido = dto.contenido;

    if (dto.agricultorId) {
      const agricultor = await this.dataSource
        .getRepository(AgricultorEntity)
        .findOneBy({ id: dto.agricultorId });
      if (!agricultor) throw new NotFoundException('Agricultor no encontrado');
      comentario.agricultor = agricultor;
    }

    if (dto.cosechaId) {
      const cosecha = await this.dataSource
        .getRepository(CosechaEntity)
        .findOneBy({ id: dto.cosechaId });
      if (!cosecha) throw new NotFoundException('Cosecha no encontrada');
      comentario.cosecha = cosecha;
    }

    if (dto.pedidoId) {
      const pedido = await this.dataSource
        .getRepository(PedidoEntity)
        .findOneBy({ id: dto.pedidoId });
      if (!pedido) throw new NotFoundException('Pedido no encontrado');
      comentario.pedido = pedido;
    }

    return await this.comentarioRepository.save(comentario);
  }
}
