import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioEntity } from '../usuario/usuario.entity';
import { AdminEntity } from './admin.entity';

@Module({
  providers: [AdminService],
  imports: [TypeOrmModule.forFeature([UsuarioEntity, AdminEntity])],
})
export class AdminModule {}
