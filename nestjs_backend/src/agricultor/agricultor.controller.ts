/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { AgricultorService } from './agricultor.service';
import { AgricultorDto } from './agricultor.dto';
import { AgricultorEntity } from './agricultor.entity';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';

@UseInterceptors(BusinessErrorsInterceptor)
@Controller({
  path: 'agricultor',
  version: '1',
})
export class AgricultorController {
  constructor(private readonly agricultorService: AgricultorService) {}

    @Get(':id/comentarios')
    async findComentarios(@Param('id') id: string) {
        return await this.agricultorService.findComentarios(id);
        }

  @Get()
    async findAll() {
        return await this.agricultorService.findAll();
    }

    @Get('por-usuario/:usuarioId')
        async findByUsuarioId(@Param('usuarioId') usuarioId: string) {
    return await this.agricultorService.findByUsuarioId(usuarioId);
    }


    @Get(':id')
    async findOne(@Param('id') id: string) {
        return await this.agricultorService.findOne(id);
        }

    @Post()
    async create(@Body() agricultorDto: AgricultorDto){
        const agricultor: AgricultorEntity = plainToInstance(AgricultorEntity, agricultorDto);
        return await this.agricultorService.create(agricultor);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() agricultorDto: AgricultorDto){
        const agricultor: AgricultorEntity = plainToInstance(AgricultorEntity, agricultorDto);
        return await this.agricultorService.update(id, agricultor);
    }





    @Delete(':id')
    @HttpCode(204)
    async delete(@Param('id') id: string) {
        return await this.agricultorService.delete(id);
    }

}
