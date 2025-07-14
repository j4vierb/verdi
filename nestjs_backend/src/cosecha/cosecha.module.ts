/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CosechaEntity } from './cosecha.entity';
import { CosechaService } from './cosecha.service';
import { CosechaController } from './cosecha.controller';
import { UsuarioEntity } from 'src/usuario/usuario.entity';
import { AgricultorEntity } from 'src/agricultor/agricultor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CosechaEntity, UsuarioEntity, AgricultorEntity])],
  providers: [CosechaService],
  exports: [CosechaService],
  controllers: [CosechaController],
})
export class CosechaModule {}
