import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { EventualidadService } from './eventualidad.service';
import { EventualidadEntity, EventualidadTipo } from './eventualidad.entity';
import { UpdateEventualidadDto } from './update-eventualidad.dto';
import { plainToInstance } from 'class-transformer';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../usuario/role.enum';

@Controller('eventualidad')
@UseInterceptors(BusinessErrorsInterceptor)
export class EventualidadController {
  constructor(private readonly eventualidadService: EventualidadService) {}

  @Get()
  @Roles(Role.ADMIN, Role.COMPRADOR, Role.AGRICULTOR)
  async findAll(): Promise<any[]> {
    return await this.eventualidadService.findAll();
  }

  @Get()
  @Roles(Role.ADMIN)
  async findAllByTipo(@Query('tipo') tipo: EventualidadTipo): Promise<any[]> {
    return await this.eventualidadService.findAllByTipo(tipo);
  }

  @Get('rango')
  @Roles(Role.ADMIN)
  async findAllInDateRange(
    @Query('startDate') startDate: Date,
    @Query('endDate') endDate: Date,
  ): Promise<EventualidadEntity[]> {
    return await this.eventualidadService.findAllInDateRange(
      new Date(startDate),
      new Date(endDate),
    );
  }

  @Get(':id')
  @Roles(Role.ADMIN, Role.COMPRADOR, Role.AGRICULTOR)
  async findOne(@Param('id') id: number): Promise<EventualidadEntity> {
    return await this.eventualidadService.findOne(id);
  }

  @Put()
  @Roles(Role.ADMIN)
  async update(
    @Body() eventualidad: UpdateEventualidadDto,
  ): Promise<UpdateEventualidadDto> {
    const instance = plainToInstance(EventualidadEntity, eventualidad);
    return await this.eventualidadService.update(instance);
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<EventualidadEntity> {
    return await this.eventualidadService.remove(id);
  }
}
