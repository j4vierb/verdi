import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsuarioEntity } from './usuario.entity';
import { CrearUsuarioDto } from './dto/crear-usuario.dto';
import { AgricultorEntity } from '../agricultor/agricultor.entity';
import { CompradorEntity } from '../comprador/comprador.entity';
import { OrganizacionEntity } from '../organizacion/organizacion.entity';
import { AdminEntity } from '../admin/admin.entity';
import { Role } from './role.enum';
import {
  BusinessError,
  BusinessLogicException,
} from '../shared/errors/business-errors';

@Injectable()
export class UsuarioService {
  @InjectRepository(UsuarioEntity)
  private usuarioRepo: Repository<UsuarioEntity>;

  @InjectRepository(AgricultorEntity)
  private agricultorRepo: Repository<AgricultorEntity>;

  @InjectRepository(CompradorEntity)
  private compradorRepo: Repository<CompradorEntity>;

  @InjectRepository(OrganizacionEntity)
  private organizacionRepo: Repository<OrganizacionEntity>;

  @InjectRepository(AdminEntity)
  private adminRepo: Repository<AdminEntity>;

  async findOneByEmail(email: string): Promise<UsuarioEntity | undefined> {
    return this.usuarioRepo.findOne({ where: { email } });
  }

  async findOneById(id: string): Promise<UsuarioEntity | undefined> {
    return this.usuarioRepo.findOne({ where: { id } });
  }

  async registrarConEntidad(dto: CrearUsuarioDto): Promise<UsuarioEntity> {
    const usuario = this.usuarioRepo.create({
      email: dto.email,
      password: dto.password,
      rol: dto.rol,
    });
    const savedUsuario = await this.usuarioRepo.save(usuario);

    if (dto.rol.includes(Role.AGRICULTOR)) {
      const agricultor = this.agricultorRepo.create({
        nombre: dto.nombre,
        email: dto.email,
        password: dto.password,
        telefono: dto.telefono,
        fechaNacimiento: dto.fechaNacimiento,
        departamento: dto.departamento,
        ciudad: dto.ciudad,
        usuario: savedUsuario,
      });
      await this.agricultorRepo.save(agricultor);
    }

    if (dto.rol.includes(Role.COMPRADOR)) {
      const comprador = this.compradorRepo.create({
        nombre: dto.nombre,
        email: dto.email,
        password: dto.password,
        telefono: dto.telefono,
        fechaNacimiento: dto.fechaNacimiento,
        departamento: dto.departamento,
        ciudad: dto.ciudad,
        usuario: savedUsuario,
      });
      await this.compradorRepo.save(comprador);
    }

    if (dto.rol.includes(Role.ORGANIZACION)) {
      const organizacion = this.organizacionRepo.create({
        nombre: dto.nombre,
        email: dto.email,
        password: dto.password,
        usuario: savedUsuario,
      });
      await this.organizacionRepo.save(organizacion);
    }

    if (dto.rol.includes(Role.ADMIN)) {
      const admin = this.adminRepo.create({
        email: dto.email,
        password: dto.password,
        usuario: savedUsuario,
      });
      await this.adminRepo.save(admin);
    }

    return savedUsuario;
  }

  async findAgricultorByUsuarioId(usuarioId: string) {
    return this.agricultorRepo.findOne({
      where: { usuario: { id: usuarioId } },
    });
  }

  async findCompradorByUsuarioId(usuarioId: string) {
    return this.compradorRepo.findOne({
      where: { usuario: { id: usuarioId } },
    });
  }

  async findOrganizacionByUsuarioId(usuarioId: string) {
    return this.organizacionRepo.findOne({
      where: { usuario: { id: usuarioId } },
    });
  }

  async findAdminById(usuarioId: string): Promise<AdminEntity | undefined> {
    return await this.adminRepo.findOne({
      where: { id: usuarioId },
    });
  }

  async eliminarUsuarioConEntidad(id: string): Promise<void> {
    const usuario = await this.usuarioRepo.findOne({ where: { id } });
    if (!usuario) {
      throw new Error('Usuario no encontrado');
    }

    if (usuario.rol.includes(Role.AGRICULTOR)) {
      const agricultor = await this.agricultorRepo.findOne({
        where: { usuario: { id } },
      });
      if (agricultor) await this.agricultorRepo.remove(agricultor);
    }

    if (usuario.rol.includes(Role.COMPRADOR)) {
      const comprador = await this.compradorRepo.findOne({
        where: { usuario: { id } },
      });
      if (comprador) await this.compradorRepo.remove(comprador);
    }

    if (usuario.rol.includes(Role.ORGANIZACION)) {
      const organizacion = await this.organizacionRepo.findOne({
        where: { usuario: { id } },
      });
      if (organizacion) await this.organizacionRepo.remove(organizacion);
    }

    if (usuario.rol.includes(Role.ADMIN)) {
      const admin = await this.adminRepo.findOne({
        where: { usuario: { id } },
      });
      if (admin) await this.adminRepo.remove(admin);
    }

    await this.usuarioRepo.remove(usuario);
  }

  async editarUsuarioConEntidad(
    id: string,
    cambios: Partial<UsuarioEntity>,
  ): Promise<any> {
    const usuario = await this.usuarioRepo.findOne({ where: { id } });
    if (!usuario) throw new BadRequestException('Usuario no encontrado');

    if (usuario.rol.includes(Role.AGRICULTOR)) {
      const agricultor = await this.agricultorRepo.findOne({
        where: { usuario: { id } },
      });
      if (!agricultor)
        throw new BadRequestException('Agricultor no encontrado');
      Object.assign(agricultor, cambios);
      return await this.agricultorRepo.save(agricultor);
    }

    if (usuario.rol.includes(Role.COMPRADOR)) {
      const comprador = await this.compradorRepo.findOne({
        where: { usuario: { id } },
      });
      if (!comprador) throw new BadRequestException('Comprador no encontrado');
      Object.assign(comprador, cambios);
      return await this.compradorRepo.save(comprador);
    }

    throw new BadRequestException('Rol no soportado para edición');
  }

  async crearUsuarios(): Promise<UsuarioEntity[]> {
    const adminObj = {
      email: 'admin@admin.com',
      password: 'admin123',
      rol: [Role.ADMIN],
    };

    const agricultorObj = {
      email: 'agricultor@agricultor.com',
      password: 'agricultor123',
      rol: [Role.AGRICULTOR],
    };

    const compradorObj = {
      email: 'comprador@comprador.com',
      password: 'comprador123',
      rol: [Role.COMPRADOR],
    };

    const organizacionObj = {
      email: 'organizacion@organizacion.com',
      password: 'organizacion123',
      rol: [Role.ORGANIZACION],
    };

    if (this.usuarioRepo.findOne({ where: { email: adminObj.email } })) {
      throw new BusinessLogicException(
        'Ya existe un admin con el email',
        BusinessError.PRECONDITION_FAILED,
      );
    } else if (
      this.usuarioRepo.findOne({ where: { email: agricultorObj.email } })
    ) {
      throw new BusinessLogicException(
        'Ya existe un agricultor con el email',
        BusinessError.PRECONDITION_FAILED,
      );
    } else if (
      this.usuarioRepo.findOne({ where: { email: compradorObj.email } })
    ) {
      throw new BusinessLogicException(
        'Ya existe un comprador con el email',
        BusinessError.PRECONDITION_FAILED,
      );
    } else if (
      this.usuarioRepo.findOne({ where: { email: organizacionObj.email } })
    ) {
      throw new BusinessLogicException(
        'Ya existe una organizacion con el email',
        BusinessError.PRECONDITION_FAILED,
      );
    }

    const admin = this.usuarioRepo.create(adminObj);
    const agricultor = this.usuarioRepo.create(agricultorObj);
    const comprador = this.usuarioRepo.create(compradorObj);
    const organizacion = this.usuarioRepo.create(organizacionObj);

    return await this.usuarioRepo.save([
      admin,
      agricultor,
      comprador,
      organizacion,
    ]);
  }
}
