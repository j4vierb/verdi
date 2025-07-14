import { Test, TestingModule } from '@nestjs/testing';
import { AdminService } from './admin.service';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { AdminEntity } from './admin.entity';
import { Repository } from 'typeorm';
import { UsuarioEntity } from '../usuario/usuario.entity';

describe('AdminService', () => {
  let service: AdminService;
  let adminRepository: Repository<AdminEntity>;
  let admins: AdminEntity[];

  const ADMIN_NUMBER = 5;

  beforeEach(async () => {
    admins = [];

    const module: TestingModule = await Test.createTestingModule({
      providers: [AdminService],
      imports: [
        ...TypeOrmTestingConfig(),
        TypeOrmModule.forFeature([AdminEntity]),
      ],
    }).compile();

    service = module.get<AdminService>(AdminService);
    adminRepository = module.get<Repository<AdminEntity>>(
      getRepositoryToken(AdminEntity),
    );

    await seedDatabase();
  });

  const seedDatabase = async () => {
    adminRepository.clear();

    for (let j = 0; j < ADMIN_NUMBER; j++) {
      const admin: AdminEntity = adminRepository.create({
        email: `Admin${j + 1}@gmail.com`,
        password: `Admin${j + 1}`,
      });
      const savedAdmin = await adminRepository.save(admin);
      admins.push(savedAdmin);
    }
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find all admins', async () => {
    const foundAdmins = await service.findAll();
    expect(foundAdmins.length).toEqual(ADMIN_NUMBER);
  });

  it('should throw an error when no admins are found', async () => {
    adminRepository.clear();
    await expect(service.findAll()).rejects.toHaveProperty(
      'message',
      'No hay administradores registrados',
    );
  });

  it('should find an admin by id', async () => {
    const admin = admins[0];
    const foundAdmin = await service.findOne(admin.id);
    expect(foundAdmin).toEqual(admin);
  });

  it('should throw an error when admin is not found', async () => {
    await expect(service.findOne('0')).rejects.toHaveProperty(
      'message',
      'El administrador con el id no existe',
    );
  });

  it('should create an admin', async () => {
    const createdAdmin = await service.create({
      id: '',
      email: '',
      password: 'Admin6',
      usuario: {} as any,
    });
    expect(createdAdmin).not.toBeNull();
  });

  it('should to throw an error when trying to create an admin with an existing email', async () => {
    const admin: AdminEntity = {
      id: '',
      email: admins[0].email,
      password: 'Admin6',
      usuario: {} as UsuarioEntity,
    };
    await expect(service.create(admin)).rejects.toHaveProperty(
      'message',
      'El administrador con el email ya existe',
    );
  });

  it('should to delete an admin', async () => {
    const admin = admins[0];
    await service.delete(admin.id);
    const deletedAdmin = await adminRepository.findOne({
      where: { id: admin.id },
    });
    expect(deletedAdmin).toBeNull();
  });

  it('should throw an error when trying to delete an admin that does not exist', async () => {
    await expect(service.delete('0')).rejects.toHaveProperty(
      'message',
      'Admin no encontrado',
    );
  });

  it('should update an admin', async () => {
    const admin = admins[0];
    const newEmail = 'admin199@admin.co';
    const updatedAdmin = await service.update(admin.id, {
      id: admin.id,
      email: newEmail,
      password: 'Admin99',
      usuario: {} as UsuarioEntity,
    });
    expect(updatedAdmin).not.toBeNull();
    expect(updatedAdmin.email).toEqual(newEmail);
  });
});
