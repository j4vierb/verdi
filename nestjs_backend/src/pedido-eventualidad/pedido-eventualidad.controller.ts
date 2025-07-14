import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { PedidoEventualidadService } from './pedido-eventualidad.service';
import { EventualidadEntity } from '../eventualidad/eventualidad.entity';
import { EventualidadDto } from './eventualidad.dto';
import { plainToInstance } from 'class-transformer';
import { UpdateEventualidadDto } from '../eventualidad/update-eventualidad.dto';
import {
  BusinessError,
  BusinessLogicException,
} from '../shared/errors/business-errors';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../usuario/role.enum';

@Controller('pedido-eventualidad')
@UseInterceptors(BusinessErrorsInterceptor)
export class PedidoEventualidadController {
  constructor(
    private readonly pedidoEventualidadService: PedidoEventualidadService,
  ) {}

  @Get(':pedidoId/eventualidades')
  @Roles(Role.ADMIN, Role.COMPRADOR)
  async getEventualidadesByPedidoId(
    @Param('pedidoId') pedidoId: string,
  ): Promise<EventualidadEntity[]> {
    return await this.pedidoEventualidadService.getEventualidadesByPedidoId(
      pedidoId,
    );
  }

  @Post(':pedidoId/eventualidades')
  @Roles(Role.ADMIN)
  async addEventualidadToPedido(
    @Param('pedidoId') pedidoId: string,
    @Body() eventualidad: EventualidadDto,
  ): Promise<EventualidadEntity> {
    const eventualidadEntity = plainToInstance(
      EventualidadEntity,
      eventualidad,
    );
    return await this.pedidoEventualidadService.addEventualidadToPedido(
      pedidoId,
      eventualidadEntity,
    );
  }

  @Delete(':pedidoId/eventualidades/:eventualidadId')
  @Roles(Role.ADMIN)
  async deleteEventualidadFromPedido(
    @Param('pedidoId') pedidoId: string,
    @Param('eventualidadId') eventualidadId: number,
  ): Promise<void> {
    return await this.pedidoEventualidadService.deleteEventualidadFromPedido(
      pedidoId,
      eventualidadId,
    );
  }

  @Put(':pedidoId/eventualidades/:eventualidadId')
  async updateEventualidadFromPedido(
    @Param('pedidoId') pedidoId: string,
    @Param('eventualidadId') eventualidadId: number,
    @Body() eventualidad: UpdateEventualidadDto,
  ): Promise<EventualidadEntity> {
    const eventualidadEntity = plainToInstance(
      EventualidadEntity,
      eventualidad,
    );

    if (Number(eventualidadEntity.id) !== Number(eventualidadId)) {
      throw new BusinessLogicException(
        'El id de la eventualidad no coincide con el id de la eventualidad en la URL',
        BusinessError.BAD_REQUEST,
      );
    }

    return await this.pedidoEventualidadService.updateEventualidadFromPedido(
      pedidoId,
      eventualidadId,
      eventualidadEntity,
    );
  }
}
