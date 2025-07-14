/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AgricultorService } from './agricultor.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AgricultorEntity } from './agricultor.entity';
import { ComentarioEntity } from '../comentario/comentario.entity';
import { AgricultorController } from './agricultor.controller';
import { UsuarioModule } from '../usuario/usuario.module';

@Module({
  providers: [AgricultorService],
  imports: [TypeOrmModule.forFeature([AgricultorEntity, ComentarioEntity]),
    UsuarioModule,],
  controllers: [AgricultorController],
  exports: [AgricultorService],
})
export class AgricultorModule {}
