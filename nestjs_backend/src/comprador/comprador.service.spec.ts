import { Test, TestingModule } from '@nestjs/testing';
import { CompradorService } from './comprador.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CompradorEntity } from './comprador.entity';

describe('CompradorService', () => {
  let service: CompradorService;

  const mockRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CompradorService,
        {
          provide: getRepositoryToken(CompradorEntity),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<CompradorService>(CompradorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
