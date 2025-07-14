/* eslint-disable prettier/prettier */
import { Module, OnModuleInit } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioEntity } from './usuario.entity';
import { UsuarioController } from './usuario.controller';
import { AuthModule } from 'src/auth/auth.module';
import { AgricultorEntity } from 'src/agricultor/agricultor.entity';
import { CompradorEntity } from 'src/comprador/comprador.entity';
import { OrganizacionEntity } from 'src/organizacion/organizacion.entity';
import { AdminEntity } from 'src/admin/admin.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UsuarioEntity,
      AgricultorEntity,
      CompradorEntity,
      OrganizacionEntity,
      AdminEntity,
    ]),
    AuthModule,
  ],
  providers: [UsuarioService],
  controllers: [UsuarioController],
  exports: [UsuarioService],
})
export class UsuarioModule implements OnModuleInit {
  constructor(private readonly usuarioService: UsuarioService) {}

  onModuleInit() {
    this.usuarioService.crearUsuarios().catch((error) => {
      console.error('Error al crear usuarios de prueba:', error);
    });
  }
}
