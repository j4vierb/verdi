/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AgricultorEntity } from '../agricultor/agricultor.entity';
import { CosechaEntity } from '../cosecha/cosecha.entity';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { Repository } from 'typeorm';

@Injectable()
export class AgricultorCosechaService {
    constructor(
       @InjectRepository(AgricultorEntity)
       private readonly agricultorRepository: Repository<AgricultorEntity>,
   
       @InjectRepository(CosechaEntity)
       private readonly cosechaRepository: Repository<CosechaEntity>
   ) {}

   async findCosechasByAgricultorId(agricultorId: string): Promise<CosechaEntity[]> {
       const agricultor: AgricultorEntity = await this.agricultorRepository.findOne({where: {id: agricultorId}, relations: ["cosechas"]});
       if (!agricultor)
         throw new BusinessLogicException("El agricultor con el id dado no fue encontrado", BusinessError.NOT_FOUND)
      
       return agricultor.cosechas;
   }

    async addCosechaToAgricultor(agricultorId: string, cosechaId: string): Promise<AgricultorEntity> {
        const agricultor = await this.agricultorRepository.findOne({ where: { id: agricultorId }, relations: ['cosechas'] });
        if (!agricultor) {
            throw new BusinessLogicException('Agricultor not found', BusinessError.NOT_FOUND);
        }

        const cosecha = await this.cosechaRepository.findOne({ where: { id: cosechaId } });
        if (!cosecha) {
            throw new BusinessLogicException('Cosecha not found', BusinessError.NOT_FOUND);
        }

        agricultor.cosechas = [...agricultor.cosechas, cosecha];
        return await this.agricultorRepository.save(agricultor);
    }

    async findCosechaByAgricultorAndCosecha(agricultorId: string, cosechaId: string): Promise<CosechaEntity> {
        const cosecha: CosechaEntity = await this.cosechaRepository.findOne({ where: { id: cosechaId } });
        if (!cosecha) {
            throw new BusinessLogicException('Cosecha not found', BusinessError.NOT_FOUND);
        }
        const agricultor: AgricultorEntity = await this.agricultorRepository.findOne({ where: { id: agricultorId }, relations: ['cosechas'] });
        if (!agricultor) {
            throw new BusinessLogicException('Agricultor not found', BusinessError.NOT_FOUND);
        }

        const cosechaAgricultor = agricultor.cosechas.find(c => c.id === cosechaId);
        if (!cosechaAgricultor) {
            throw new BusinessLogicException('Cosecha not found for this agricultor', BusinessError.NOT_FOUND);
        }

        return cosechaAgricultor;
    }

    //METODO DE RAUL
    async findCosechasByAgricultor(agricultorId: string): Promise<CosechaEntity[]> {
        const agricultor = await this.agricultorRepository.findOne({ where: { id: agricultorId }, relations: ['cosechas'] });
        if (!agricultor) {
            throw new BusinessLogicException('Agricultor not found', BusinessError.NOT_FOUND);
        }

        return agricultor.cosechas;
    }

    async associateCosechasToAgricultor(agricultorId: string, cosechas: CosechaEntity[]): Promise<AgricultorEntity> {
        const agricultor = await this.agricultorRepository.findOne({ where: { id: agricultorId }, relations: ['cosechas'] });
        if (!agricultor) {
            throw new BusinessLogicException('Agricultor not found', BusinessError.NOT_FOUND);
        }

        for (let i = 0; i < cosechas.length; i++) {
            const cosecha: CosechaEntity = await this.cosechaRepository.findOne({ where: { id: cosechas[i].id } });
            if (!cosecha) {
                throw new BusinessLogicException('Cosecha not found', BusinessError.NOT_FOUND);
            }
        }

        agricultor.cosechas = cosechas;
        return await this.agricultorRepository.save(agricultor);
    }



    async removeCosechaFromAgricultor(agricultorId: string, cosechaId: string) {
        const cosecha: CosechaEntity = await this.cosechaRepository.findOne({ where: { id: cosechaId } });
        if (!cosecha) {
            throw new BusinessLogicException('Cosecha not found', BusinessError.NOT_FOUND);
        }

        const agricultor: AgricultorEntity = await this.agricultorRepository.findOne({ where: { id: agricultorId }, relations: ['cosechas'] });
        if (!agricultor) {  
            throw new BusinessLogicException('Agricultor not found', BusinessError.NOT_FOUND);
        }

        const cosechaAgricultor = agricultor.cosechas.find(c => c.id === cosechaId);
        if (!cosechaAgricultor) {
            throw new BusinessLogicException('Cosecha not found for this agricultor', BusinessError.NOT_FOUND);
        }

        agricultor.cosechas = agricultor.cosechas.filter(c => c.id !== cosechaId);
        return await this.agricultorRepository.save(agricultor);
    }
}
