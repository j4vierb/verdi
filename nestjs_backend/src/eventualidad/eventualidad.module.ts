import { Module } from '@nestjs/common';
import { EventualidadService } from './eventualidad.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventualidadEntity } from './eventualidad.entity';
import { EventualidadController } from './eventualidad.controller';

@Module({
  providers: [EventualidadService],
  imports: [TypeOrmModule.forFeature([EventualidadEntity])],
  controllers: [EventualidadController],
})
export class EventualidadModule {}
