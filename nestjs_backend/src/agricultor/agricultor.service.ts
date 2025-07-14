/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { AgricultorEntity } from './agricultor.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { ComentarioEntity } from '../comentario/comentario.entity';
import { UsuarioService } from '../usuario/usuario.service';


@Injectable()
export class AgricultorService {
    constructor(
        @InjectRepository(AgricultorEntity)
        private readonly agricultorRepository: Repository<AgricultorEntity>,

        private readonly usuarioService: UsuarioService,
    ){}

    async findAll(): Promise<AgricultorEntity[]> {
        return await this.agricultorRepository.find({relations:["cosechas"]});
    }
    async findByUsuarioId(usuarioId: string): Promise<AgricultorEntity> {
        const agricultor = await this.agricultorRepository.findOne({
            where: { usuario: { id: usuarioId } }, // relacional, requiere join
            relations: ['usuario'], // asegúrate de incluir la relación
        });

        if (!agricultor) {
            throw new BusinessLogicException(
            'Agricultor no encontrado para el usuario dado',
            BusinessError.NOT_FOUND
            );
        }

        return agricultor;
        }


    async findOne(id: string): Promise<AgricultorEntity> {
        const agricultor: AgricultorEntity = await this.agricultorRepository.findOne({where: { id }, relations: ["cosechas"]});
        if (!agricultor) {
            throw new BusinessLogicException('Agricultor not found', BusinessError.NOT_FOUND);
        }
        return agricultor;
    }

    async create(agricultor: AgricultorEntity): Promise<AgricultorEntity> {
        return await this.agricultorRepository.save(agricultor);
    }

    async update(id: string, agricultor: AgricultorEntity): Promise<AgricultorEntity> {
        const persistedAgricultor: AgricultorEntity = await this.agricultorRepository.findOne({where: { id }});
        if (!persistedAgricultor) {
            throw new BusinessLogicException('Agricultor not found', BusinessError.NOT_FOUND);
        }
        return await this.agricultorRepository.save({ ...persistedAgricultor, ...agricultor });
    }

    async delete(id: string) {
        const agricultor: AgricultorEntity = await this.agricultorRepository.findOne({where: { id }});
        if (!agricultor) {
            throw new BusinessLogicException('Agricultor not found', BusinessError.NOT_FOUND);
        }
        await this.agricultorRepository.remove(agricultor);
    }



    async findComentarios(id: string): Promise<ComentarioEntity[]> {
        const agricultor = await this.agricultorRepository.findOne({
            where: { id },
            relations: ['comentarios'],
        });

        if (!agricultor) {
            throw new BusinessLogicException('Agricultor no encontrado', BusinessError.NOT_FOUND);
        }

        return agricultor.comentarios;
        }

}
