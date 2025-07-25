/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ProductoService } from './producto.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductoEntity } from './producto.entity';
import { ProductoController } from './producto.controller';


@Module({
  imports: [TypeOrmModule.forFeature([ProductoEntity])],
  providers: [ProductoService],
  controllers: [ProductoController]
})
export class ProductoModule {}
