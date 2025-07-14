/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { faker } from '@faker-js/faker';

import { CosechaService } from './cosecha.service';
import { CosechaEntity } from './cosecha.entity';
import { ProductoEntity } from '../producto/producto.entity';
import { AgricultorEntity } from '../agricultor/agricultor.entity';
import { BusinessLogicException } from '../shared/errors/business-errors';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';

describe('CosechaService', () => {
  let service: CosechaService;
  let cosechaRepo: Repository<CosechaEntity>;

  /** Mock del servicio de usuario inyectado dinámicamente */
  const usuarioServiceMock = {
    findAgricultorByUsuarioId: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [CosechaService],
    }).compile();

    service = module.get<CosechaService>(CosechaService);
    cosechaRepo = module.get<Repository<CosechaEntity>>(getRepositoryToken(CosechaEntity));

    /** inyectamos el mock en la propiedad pública del servicio */
    service['usuarioService'] = usuarioServiceMock;

    await seedDatabase();
  });

  /** limpia la tabla y mete 5 cosechas dummy */
  const seedDatabase = async () => {
    await cosechaRepo.clear();
    for (let i = 0; i < 5; i++) {
      const dummy = cosechaRepo.create({
        imagen: faker.image.url(),
        nombre: faker.commerce.productName(),
        fechaRecoleccion: faker.date.past(),
        cantidadKilos: faker.number.int({ min: 10, max: 100 }),
        cantidadVendidas: faker.number.int({ min: 0, max: 50 }),
        coordenadas: `${faker.location.latitude()},${faker.location.longitude()}`,
      });
      await cosechaRepo.save(dummy);
    }
  };

  it('servicio debe instanciarse', () => {
    expect(service).toBeDefined();
  });

  /* ---------- MÉTODO findAll ---------- */
  it('findAll retorna todas las cosechas', async () => {
    const cosechas = await service.findAll();
    const total = await cosechaRepo.count();

    expect(cosechas).toBeDefined();
    expect(cosechas.length).toBe(total);
  });

  /* ---------- MÉTODO create ---------- */
  it('create persiste una cosecha nueva', async () => {
    const nueva = cosechaRepo.create({
      imagen: faker.image.url(),
      nombre: 'Tomate Cherry',
      fechaRecoleccion: new Date(),
      cantidadKilos: 25,
      cantidadVendidas: 0,
      coordenadas: '4.6,-74.1',
    });

    const guardada = await service.create(nueva);
    const encontrada = await cosechaRepo.findOne({ where: { id: guardada.id } });

    expect(encontrada).not.toBeNull();
    expect(encontrada?.nombre).toBe('Tomate Cherry');
  });

  /* ======================================================
     Se mockean save / find para evitar claves foráneas
     ====================================================== */

  describe('createCosechaForUsuario', () => {
    const productoMock: ProductoEntity = { id: 'prod-1', nombre: 'Papa' } as any;
    const agricultorMock: AgricultorEntity = { id: 'agri-1' } as any;

    const dto = {
      imagen: faker.image.url(),
      nombre: 'Papa Premium',
      fechaRecoleccion: new Date(),
      cantidadKilos: 80,
      cantidadVendidas: 0,
      coordenadas: '4.6,-74.1',
      productoId: productoMock.id,
    };

    /** mock del repositorio de ProductoEntity devuelto por manager.getRepository */
    let productoRepoMock: { findOne: jest.Mock };

    beforeEach(() => {
      productoRepoMock = { findOne: jest.fn() };
      jest
        .spyOn(cosechaRepo.manager, 'getRepository')
        .mockReturnValue(productoRepoMock as any);
    });

    it('crea cosecha cuando usuario es agricultor y producto existe', async () => {
      usuarioServiceMock.findAgricultorByUsuarioId.mockResolvedValue(agricultorMock);
      productoRepoMock.findOne.mockResolvedValue(productoMock);

      /** mockeamos save para saltarnos FK */
      jest
        .spyOn(cosechaRepo, 'save')
        .mockImplementation(async (cosecha) => ({ ...cosecha, id: 'cosecha-1' } as any));

      const result = await service.createCosechaForUsuario('user-1', dto as any);

      expect(result).toBeDefined();
      expect(result.producto.id).toBe(productoMock.id);
      expect(result.agricultor.id).toBe(agricultorMock.id);
    });

    it('lanza excepción si el usuario no es agricultor', async () => {
      usuarioServiceMock.findAgricultorByUsuarioId.mockResolvedValue(null);
      productoRepoMock.findOne.mockResolvedValue(productoMock);

      await expect(service.createCosechaForUsuario('user-x', dto as any))
        .rejects.toBeInstanceOf(BusinessLogicException);
    });

    it('lanza excepción si el producto no existe', async () => {
      usuarioServiceMock.findAgricultorByUsuarioId.mockResolvedValue(agricultorMock);
      productoRepoMock.findOne.mockResolvedValue(null);

      await expect(service.createCosechaForUsuario('user-1', dto as any))
        .rejects.toBeInstanceOf(BusinessLogicException);
    });
  });

  describe('findCosechasByUsuarioId', () => {
    const agricultorMock: AgricultorEntity = { id: 'agri-list' } as any;

    it('retorna cosechas del agricultor válido', async () => {
      usuarioServiceMock.findAgricultorByUsuarioId.mockResolvedValue(agricultorMock);

      /** simulamos repo.find */
      const listaMock: CosechaEntity[] = [
        {
          id: 'c-1',
          nombre: 'Maíz',
          imagen: faker.image.url(),
          fechaRecoleccion: new Date(),
          cantidadKilos: 50,
          cantidadVendidas: 5,
          coordenadas: '4.7,-74.2',
          agricultor: agricultorMock,
        } as any,
      ];
      jest.spyOn(cosechaRepo, 'find').mockResolvedValue(listaMock);

      const resultado = await service.findCosechasByUsuarioId('user-ok');

      expect(resultado).toHaveLength(1);
      expect(resultado[0].agricultor?.id).toBe(agricultorMock.id);
    });

    it('lanza excepción si el usuario no es agricultor', async () => {
      usuarioServiceMock.findAgricultorByUsuarioId.mockResolvedValue(null);

      await expect(service.findCosechasByUsuarioId('user-bad'))
        .rejects.toBeInstanceOf(BusinessLogicException);
    });
  });
});