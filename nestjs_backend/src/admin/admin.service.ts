import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminEntity } from './admin.entity';
import { Repository } from 'typeorm';
import {
  BusinessError,
  BusinessLogicException,
} from '../shared/errors/business-errors';

@Injectable()
export class AdminService {
  @InjectRepository(AdminEntity)
  private readonly adminRepository: Repository<AdminEntity>;

  async findAll(): Promise<AdminEntity[]> {
    const admins = await this.adminRepository.find();
    if (admins.length === 0) {
      throw new BusinessLogicException(
        'No hay administradores registrados',
        BusinessError.NOT_FOUND,
      );
    }

    return admins;
  }

  async findOne(id: string): Promise<AdminEntity> {
    const admin = await this.adminRepository.findOne({ where: { id } });
    if (!admin) {
      throw new BusinessLogicException(
        'El administrador con el id no existe',
        BusinessError.NOT_FOUND,
      );
    }

    return admin;
  }

  async create(admin: AdminEntity): Promise<AdminEntity> {
    const existingAdmin = await this.adminRepository.findOne({
      where: { email: admin.email },
    });
    if (existingAdmin) {
      throw new BusinessLogicException(
        'El administrador con el email ya existe',
        BusinessError.PRECONDITION_FAILED,
      );
    }
    return await this.adminRepository.save(admin);
  }

  async delete(id: string): Promise<void> {
    const result = await this.adminRepository.delete(id);
    if (result.affected === 0) {
      throw new Error('Admin no encontrado');
    }
  }

  async update(id: string, admin: AdminEntity): Promise<AdminEntity> {
    await this.adminRepository.update(id, admin);
    return this.findOne(id);
  }
}
