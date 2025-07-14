import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioService } from './usuario.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UsuarioEntity } from './usuario.entity';
import { AgricultorEntity } from '../agricultor/agricultor.entity';
import { CompradorEntity } from '../comprador/comprador.entity';
import { OrganizacionEntity } from '../organizacion/organizacion.entity';
import { AdminEntity } from '../admin/admin.entity';
import { Role } from './role.enum';

const mockRepo = () => ({
  create: jest.fn().mockImplementation((dto) => dto),
  save: jest
    .fn()
    .mockImplementation((entity) => Promise.resolve({ id: 'id-1', ...entity })),
  findOne: jest.fn(),
  remove: jest.fn().mockResolvedValue(undefined),
});

describe('UsuarioService', () => {
  let service: UsuarioService;
  let usuarioRepo: any;
  let agricultorRepo: any;
  // let compradorRepo: any;
  // let organizacionRepo: any;
  // let adminRepo: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsuarioService,
        { provide: getRepositoryToken(UsuarioEntity), useFactory: mockRepo },
        { provide: getRepositoryToken(AgricultorEntity), useFactory: mockRepo },
        { provide: getRepositoryToken(CompradorEntity), useFactory: mockRepo },
        {
          provide: getRepositoryToken(OrganizacionEntity),
          useFactory: mockRepo,
        },
        { provide: getRepositoryToken(AdminEntity), useFactory: mockRepo },
      ],
    }).compile();

    service = module.get<UsuarioService>(UsuarioService);
    usuarioRepo = module.get(getRepositoryToken(UsuarioEntity));
    agricultorRepo = module.get(getRepositoryToken(AgricultorEntity));
    // compradorRepo = module.get(getRepositoryToken(CompradorEntity));
    // organizacionRepo = module.get(getRepositoryToken(OrganizacionEntity));
    // adminRepo = module.get(getRepositoryToken(AdminEntity));
  });

  it('debería registrar un agricultor', async () => {
    const dto = {
      email: 'agricultor@mail.com',
      password: '123456',
      rol: [Role.AGRICULTOR],
      nombre: 'Pedro',
      telefono: '3001234567',
      fechaNacimiento: new Date('1990-01-01'),
      departamento: 'Antioquia',
      ciudad: 'Medellín',
    };
    const res = await service.registrarConEntidad(dto);
    expect(res.email).toBe(dto.email);
  });

  it('debería registrar un comprador', async () => {
    const dto = {
      email: 'comprador@mail.com',
      password: '123456',
      rol: [Role.COMPRADOR],
      nombre: 'Laura',
      telefono: '3007654321',
      fechaNacimiento: new Date('1991-02-02'),
      departamento: 'Cundinamarca',
      ciudad: 'Bogotá',
    };
    const res = await service.registrarConEntidad(dto);
    expect(res.email).toBe(dto.email);
  });

  it('debería registrar una organización', async () => {
    const dto = {
      email: 'org@mail.com',
      password: 'pass',
      rol: [Role.ORGANIZACION],
      nombre: 'ONG Verde',
    };
    const res = await service.registrarConEntidad(dto);
    expect(res.email).toBe(dto.email);
  });

  it('debería registrar un admin', async () => {
    const dto = {
      email: 'admin@mail.com',
      password: 'adminpass',
      rol: [Role.ADMIN],
      nombre: 'Administrador',
    };
    const res = await service.registrarConEntidad(dto);
    expect(res.email).toBe(dto.email);
  });

  it('debería lanzar error al editar un usuario inexistente', async () => {
    usuarioRepo.findOne.mockResolvedValue(null);
    await expect(service.editarUsuarioConEntidad('id-x', {})).rejects.toThrow(
      'Usuario no encontrado',
    );
  });

  it('debería editar un agricultor existente', async () => {
    const usuario = { id: 'id-1', rol: [Role.AGRICULTOR] };
    const agricultor = { id: 'ag-1', usuario, nombre: 'Antiguo' };
    usuarioRepo.findOne.mockResolvedValue(usuario);
    agricultorRepo.findOne.mockResolvedValue(agricultor);
    agricultorRepo.save.mockImplementation((obj) =>
      Promise.resolve({ ...obj }),
    );

    const res = await service.editarUsuarioConEntidad('id-1', {
      nombre: 'Nuevo',
    } as any);
    expect(res.nombre).toBe('Nuevo');
  });

  it('debería eliminar un usuario agricultor', async () => {
    const usuario = { id: 'id-1', rol: [Role.AGRICULTOR] };
    const agricultor = { id: 'ag-1', usuario };
    usuarioRepo.findOne.mockResolvedValue(usuario);
    agricultorRepo.findOne.mockResolvedValue(agricultor);

    await service.eliminarUsuarioConEntidad('id-1');
    expect(agricultorRepo.remove).toHaveBeenCalledWith(agricultor);
    expect(usuarioRepo.remove).toHaveBeenCalledWith(usuario);
  });
});
