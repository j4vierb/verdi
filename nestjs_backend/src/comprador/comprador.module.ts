import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompradorEntity } from './comprador.entity';
import { CompradorController } from './comprador.controller';
import { CompradorService } from './comprador.service';

@Module({
  imports: [TypeOrmModule.forFeature([CompradorEntity])],
  controllers: [CompradorController],
  providers: [CompradorService],
})
export class CompradorModule {}
