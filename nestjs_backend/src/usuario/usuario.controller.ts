/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Param, Post, Put, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { LocalAuthGuard } from '../auth/guards/local-auth.guard';
import { AuthService } from '../auth/auth.service';
import { UsuarioService } from './usuario.service';
import { CrearUsuarioDto } from './dto/crear-usuario.dto';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';

@Controller('users')
@UseInterceptors(BusinessErrorsInterceptor)
export class UsuarioController {
  agricultorService: any;
  compradorService: any;
  constructor(
    private readonly authService: AuthService,
    private readonly usuarioService: UsuarioService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req) {
    return this.authService.login(req.user);
  }

  @Post('register')
  async register(@Body() dto: CrearUsuarioDto) {
    return this.usuarioService.registrarConEntidad(dto);
  }

  @Put(':id')
  async editarUsuario(@Param('id') id: string, @Body() cambios: any) {
  return this.usuarioService.editarUsuarioConEntidad(id, cambios);
}


  @Delete(':id')
  async eliminarUsuario(@Param('id') id: string): Promise<void> {
    return this.usuarioService.eliminarUsuarioConEntidad(id);
  }

  @Post('create-test-users')
  async crearUsuarios() {
    return this.usuarioService.crearUsuarios();
  }
}
