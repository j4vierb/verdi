/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AgricultorEntity } from '../agricultor/agricultor.entity';
import { CosechaEntity } from '../cosecha/cosecha.entity';
import { AgricultorCosechaService } from './agricultor-cosecha.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([AgricultorEntity, CosechaEntity])
  ],
  providers: [AgricultorCosechaService],
  exports: [AgricultorCosechaService],
})
export class AgricultorCosechaModule {}