/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ComentarioService } from './comentario.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ComentarioEntity } from './comentario.entity';
import { ComentarioController } from './comentario.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ComentarioEntity])],
  providers: [ComentarioService],
  controllers: [ComentarioController]
})
export class ComentarioModule {}
