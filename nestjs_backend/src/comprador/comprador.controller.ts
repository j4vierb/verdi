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
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { CompradorService } from './comprador.service';
import { CompradorDto } from './comprador.dto';
import { CompradorEntity } from './comprador.entity';

@UseInterceptors(BusinessErrorsInterceptor)
@Controller({
  path: 'comprador',
  version: '1',
})
export class CompradorController {
  constructor(private readonly compradorService: CompradorService) {}

  @Get()
  async findAll() {
    return await this.compradorService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.compradorService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() compradorDto: CompradorDto) {
    const comprador: CompradorEntity = plainToInstance(
      CompradorEntity,
      compradorDto,
    );
    return await this.compradorService.update(id, comprador);
  }

  @Post()
  async create(@Body() compradorDto: CompradorDto) {
    const comprador: CompradorEntity = plainToInstance(
      CompradorEntity,
      compradorDto,
    );
    return await this.compradorService.create(comprador);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: number) {
    return await this.compradorService.delete(id);
  }
}
