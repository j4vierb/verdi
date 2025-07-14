/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { CosechaService } from './cosecha.service';
import { CosechaDto } from './cosecha.dto';
import { CosechaEntity } from './cosecha.entity';
import { plainToInstance } from 'class-transformer';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('cosechas')
export class CosechaController {

    constructor(private readonly cosechaService: CosechaService) {}

    /* @UseGuards(JwtAuthGuard) */
    @Get()
    async findAllCosechas() {
    return await this.cosechaService.findAll();
    }

    @Post()
    async create(@Body() cosechaDto: CosechaDto) {
    const cosecha: CosechaEntity = plainToInstance(CosechaEntity, cosechaDto);
    return await this.cosechaService.create(cosecha);
    }

    @UseGuards(JwtAuthGuard)
    @Post('crear')
    async crearCosecha(@Req() req, @Body() cosechaDto: CosechaDto) {
    const usuarioId = req.user.id;
    return this.cosechaService.createCosechaForUsuario(usuarioId, cosechaDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get('mias')
    async getMisCosechas(@Req() req) {
    const usuarioId = req.user.id;
    return await this.cosechaService.findCosechasByUsuarioId(usuarioId);
    }
}

