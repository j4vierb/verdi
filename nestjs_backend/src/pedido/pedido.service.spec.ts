/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { PedidoService } from './pedido.service';
import { PedidoEntity } from './pedido.entity';
import { CosechaEntity } from '../cosecha/cosecha.entity';

/* util para generar cosechas dummy */
const makeCosecha = (override?: Partial<CosechaEntity>): CosechaEntity =>
  ({
    id: 'c-1',
    nombre: 'Papa Criolla',
    cantidadKilos: 100,
    cantidadVendidas: 20,
    ...override,
  } as any);

describe('PedidoService', () => {
  let service: PedidoService;
  let pedidoRepoMock: any;
  let cosechaRepoMock: any;

  beforeEach(async () => {
    cosechaRepoMock = {
      findOne: jest.fn(),
      save: jest.fn(),
    };

    pedidoRepoMock = {
      /** ahora incluye create */
      create: jest.fn((obj) => obj),
      save: jest.fn(),
      findOne: jest.fn(),
      remove: jest.fn(),
      manager: { getRepository: jest.fn().mockReturnValue(cosechaRepoMock) },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PedidoService,
        {
          provide: getRepositoryToken(PedidoEntity),
          useValue: pedidoRepoMock,
        },
      ],
    }).compile();

    service = module.get<PedidoService>(PedidoService);
    jest.clearAllMocks();
  });

  /* ---------- tests genéricos ---------- */
  it('servicio definido', () => {
    expect(service).toBeDefined();
  });

  /* ---------- crearPedido ---------- */
  describe('crearPedido', () => {
    const base: PedidoEntity = {
      direccionRecoger: 'Finca A',
      direccionEntregar: 'Bogotá',
      fechaEntrega: new Date().toISOString(),
      estado: 'Preparando los productos',
    } as any;

    it('guarda pedido con estado válido', async () => {
      pedidoRepoMock.save.mockResolvedValue({ ...base, id: 1 });

      const out = await service.crearPedido(base);

      expect(pedidoRepoMock.save).toHaveBeenCalledWith(base);
      expect(out.id).toBe(1);
    });

    it('error si estado inválido', async () => {
      await expect(
        service.crearPedido({ ...base, estado: 'MALO' } as any),
      ).rejects.toThrow('Estado inválido');
    });
  });

  /* ---------- eliminarPedido ---------- */
  describe('eliminarPedido', () => {
    const futuro = {
      id: '10',
      fechaEntrega: new Date(Date.now() + 8 * 864e5).toISOString(),
    } as any;

    it('remueve pedido (>5 días)', async () => {
      pedidoRepoMock.findOne.mockResolvedValue(futuro);

      await service.eliminarPedido(10);

      expect(pedidoRepoMock.remove).toHaveBeenCalledWith(futuro);
    });

    it('error si pedido no existe', async () => {
      pedidoRepoMock.findOne.mockResolvedValue(null);
      await expect(service.eliminarPedido(99)).rejects.toThrow('No se encontró');
    });

    it('error si faltan <5 días', async () => {
      const cercano = {
        id: '11',
        fechaEntrega: new Date(Date.now() + 3 * 864e5).toISOString(),
      } as any;
      pedidoRepoMock.findOne.mockResolvedValue(cercano);

      await expect(service.eliminarPedido(11)).rejects.toThrow(
        'solo se puede eliminar',
      );
    });
  });

  /* ---------- verificarYCrearPedido ---------- */
  describe('verificarYCrearPedido', () => {
    const body = {
      direccionRecoger: 'Finca A',
      direccionEntregar: 'Bogotá',
      estado: 'Recogiendo los productos',
      fechaEntrega: new Date(Date.now() + 7 * 864e5).toISOString(),
      productos: [{ id: 'c-1', cantidad: 30 }],
    };

    it('crea pedido y descuenta stock', async () => {
      const cosecha = makeCosecha();
      cosechaRepoMock.findOne.mockResolvedValue(cosecha);
      cosechaRepoMock.save.mockImplementation(async (c) => c);
      pedidoRepoMock.save.mockResolvedValue({ id: 55, ...body });

      const res = await service.verificarYCrearPedido(body);

      expect(pedidoRepoMock.create).toHaveBeenCalled(); // verifica uso de create
      expect(cosechaRepoMock.save.mock.calls[0][0].cantidadVendidas).toBe(50);
      expect(res.id).toBe(55);
    });

    it('error si estado inválido', async () => {
      await expect(
        service.verificarYCrearPedido({ ...body, estado: 'MALO' }),
      ).rejects.toThrow('Estado inválido');
    });

    it('error si cosecha no existe', async () => {
      cosechaRepoMock.findOne.mockResolvedValue(null);

      await expect(service.verificarYCrearPedido(body)).rejects.toThrow(
        'Cosecha con ID',
      );
    });

    it('error si stock insuficiente', async () => {
      const poca = makeCosecha({ cantidadVendidas: 95 });
      cosechaRepoMock.findOne.mockResolvedValue(poca);

      await expect(service.verificarYCrearPedido(body)).rejects.toThrow(
        'No hay suficiente',
      );
    });
  });
});