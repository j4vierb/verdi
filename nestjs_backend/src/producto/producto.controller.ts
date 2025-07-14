import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { ProductoService } from './producto.service';
import { ProductoDTO } from './producto.dto';
import { EstadoProducto, ProductoEntity } from './producto.entity';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import {
  BusinessError,
  BusinessLogicException,
} from 'src/shared/errors/business-errors';

@Controller('producto')
@UseInterceptors(BusinessErrorsInterceptor)
export class ProductoController {
  constructor(private readonly productoService: ProductoService) {}

  @Get()
  async findAll() {
    return await this.productoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.productoService.findOne(id);
  }

  @Post()
  async create(@Body() productoDto: ProductoDTO) {
    const producto: ProductoEntity = plainToInstance(
      ProductoEntity,
      productoDto,
    );
    return await this.productoService.create(producto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() productoDto: ProductoDTO) {
    const producto: ProductoEntity = plainToInstance(
      ProductoEntity,
      productoDto,
    );
    return await this.productoService.update(id, producto);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string) {
    return await this.productoService.delete(id);
  }

  @Put(':id/estado')
  async changeEstado(
    @Param('id') id: string,
    @Body('estado') estado: string,
  ): Promise<ProductoEntity> {
    if (
      estado !== 'Verificado' &&
      estado !== 'No verificado' &&
      estado !== 'En verificacion'
    ) {
      throw new BusinessLogicException(
        `Estado invalido: ${estado}.`,
        BusinessError.PRECONDITION_FAILED,
      );
    }

    return await this.productoService.cambiarEstadoProducto(
      id,
      estado as EstadoProducto,
    );
  }
}
