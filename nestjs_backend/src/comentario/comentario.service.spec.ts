import { Test, TestingModule } from '@nestjs/testing';
import { ComentarioService } from './comentario.service';
import { ComentarioEntity } from './comentario.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { ComentarioDto } from './comentario.dto';

const mockComentarioRepo = {
  save: jest.fn(),
};

const mockDataSource = {
  getRepository: jest.fn(),
};

describe('ComentarioService', () => {
  let service: ComentarioService;
  let comentarioRepo: typeof mockComentarioRepo;
  let dataSource: typeof mockDataSource;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ComentarioService,
        {
          provide: getRepositoryToken(ComentarioEntity),
          useValue: mockComentarioRepo,
        },
        {
          provide: DataSource,
          useValue: mockDataSource,
        },
      ],
    }).compile();

    service = module.get<ComentarioService>(ComentarioService);
    comentarioRepo = module.get(getRepositoryToken(ComentarioEntity));
    dataSource = module.get(DataSource);

    mockComentarioRepo.save.mockReset();
    mockDataSource.getRepository.mockReset();
  });

  it('debería estar definido', () => {
    expect(service).toBeDefined();
  });

  it('debería crear un comentario exitosamente', async () => {
    const dto: ComentarioDto = {
      nombreUsuario: 'Carlos',
      fecha: new Date('2024-01-01'),
      contenido: 'Muy buena cosecha.',
    };

    comentarioRepo.save.mockResolvedValue({ id: '1', ...dto });
    const resultado = await service.crearComentario(dto);

    expect(resultado).toBeDefined();
    expect(resultado.nombreUsuario).toBe(dto.nombreUsuario);
  });

  it('debería lanzar error si la fecha es inválida', async () => {
    const dto: any = {
      nombreUsuario: 'Carlos',
      fecha: 'fecha-no-valida',
      contenido: 'Contenido',
    };
    await expect(service.crearComentario(dto)).rejects.toThrow(
      'La fecha de publicación no es válida',
    );
  });

  it('debería lanzar error si la fecha es en el futuro', async () => {
    const fechaFutura = new Date();
    fechaFutura.setDate(fechaFutura.getDate() + 1);

    const dto: ComentarioDto = {
      nombreUsuario: 'Ana',
      fecha: fechaFutura,
      contenido: 'Texto válido.',
    };

    await expect(service.crearComentario(dto)).rejects.toThrow(
      'La fecha debe estar en el pasado',
    );
  });

  it('debería lanzar error si el contenido excede 1000 caracteres', async () => {
    const dto: ComentarioDto = {
      nombreUsuario: 'Carlos',
      fecha: new Date('2024-01-01'),
      contenido: 'a'.repeat(1001),
    };

    await expect(service.crearComentario(dto)).rejects.toThrow(
      'El contenido no puede tener más de 1000 caracteres',
    );
  });

  it('debería lanzar error si agricultorId no es encontrado', async () => {
    const dto: ComentarioDto = {
      nombreUsuario: 'Carlos',
      fecha: new Date('2024-01-01'),
      contenido: 'Comentario',
      agricultorId: 'uuid-agricultor',
    };

    const fakeAgricultorRepo = { findOneBy: jest.fn().mockResolvedValue(null) };
    dataSource.getRepository.mockReturnValue(fakeAgricultorRepo);

    await expect(service.crearComentario(dto)).rejects.toThrow(
      'Agricultor no encontrado',
    );
  });

  it('debería lanzar error si cosechaId no es encontrado', async () => {
    const dto: ComentarioDto = {
      nombreUsuario: 'Carlos',
      fecha: new Date('2024-01-01'),
      contenido: 'Comentario',
      cosechaId: 'uuid-cosecha',
    };

    const fakeCosechaRepo = { findOneBy: jest.fn().mockResolvedValue(null) };
    dataSource.getRepository.mockReturnValueOnce({
      findOneBy: jest.fn().mockResolvedValue(null),
    });
    dataSource.getRepository.mockReturnValueOnce(fakeCosechaRepo);

    await expect(service.crearComentario(dto)).rejects.toThrow(
      'Cosecha no encontrada',
    );
  });

  it('debería lanzar error si pedidoId no es encontrado', async () => {
    const dto: ComentarioDto = {
      nombreUsuario: 'Carlos',
      fecha: new Date('2024-01-01'),
      contenido: 'Comentario',
      pedidoId: 'uuid-pedido',
    };

    const fakePedidoRepo = { findOneBy: jest.fn().mockResolvedValue(null) };
    dataSource.getRepository.mockReturnValue(fakePedidoRepo);

    await expect(service.crearComentario(dto)).rejects.toThrow(
      'Pedido no encontrado',
    );
  });
});
