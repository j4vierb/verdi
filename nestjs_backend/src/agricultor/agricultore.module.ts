/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AgricultorService } from './agricultor.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AgricultorEntity } from './agricultor.entity';
import { AgricultorController } from './agricultor.controller';

import { ComentarioEntity } from '../comentario/comentario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AgricultorEntity, ComentarioEntity])],
  providers: [AgricultorService],
  controllers: [AgricultorController]
})
export class AgricultorModule {}
