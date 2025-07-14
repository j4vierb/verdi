/* eslint-disable prettier/prettier */
// src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from '../usuario/usuario.service';
import { UsuarioEntity } from '../usuario/usuario.entity';
// import { Role } from '../usuario/role.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<UsuarioEntity | null> {
    const user = await this.usuarioService.findOneByEmail(email);
    if (user && user.password === password) {
      delete user.password;
      return user;
    }
    return null;
  }

  async login(user: UsuarioEntity) {
    const nombre = '';

    // Aquí podrías determinar el nombre según el rol
    /*
    if (user.rol.includes(Role.AGRICULTOR)) {
      const agr = await this.usuarioService.findAgricultorByUsuarioId(user.id);
      nombre = agr?.nombre ?? '';
    } else if (user.rol.includes(Role.COMPRADOR)) {
      const comp = await this.usuarioService.findCompradorByUsuarioId(user.id);
      nombre = comp?.nombre ?? '';
    } else if (user.rol.includes(Role.ORGANIZACION)) {
      const org = await this.usuarioService.findOrganizacionByUsuarioId(
        user.id,
      );
      nombre = org?.nombre ?? '';
    } else if(user.rol.includes(Role.ADMIN)) {
      nombre = 'ADMIN';
    }
    */

    const payload = {
      sub: user.id,
      email: user.email,
      roles: user.rol,
      nombre,
    };

    return {
      access_token: this.jwtService.sign(payload, { expiresIn: '1h' }),
      roles: user.rol,
    };
  }
}
