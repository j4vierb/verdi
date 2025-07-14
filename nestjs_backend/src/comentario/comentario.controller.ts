import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { ComentarioService } from './comentario.service';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { plainToInstance } from 'class-transformer';
import { ComentarioDto } from './comentario.dto';
import { ComentarioEntity } from './comentario.entity';

@UseInterceptors(BusinessErrorsInterceptor)
@Controller('comentario')
export class ComentarioController {
  constructor(private readonly comentarioService: ComentarioService) {}

  @Post()
  async create(@Body() comentarioDto: ComentarioDto) {
    const comentario = plainToInstance(ComentarioEntity, comentarioDto);
    return await this.comentarioService.crearComentario(comentario);
  }
}
