/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { AgricultorCosechaService } from './agricultor-cosecha.service';
import { Repository } from 'typeorm';
import { CosechaEntity } from '../cosecha/cosecha.entity';
import { AgricultorEntity } from '../agricultor/agricultor.entity';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ComentarioEntity } from '../comentario/comentario.entity';
import { ProductoEntity } from '../producto/producto.entity'; // si se usa

describe('AgricultorCosechaService', () => {
  let service: AgricultorCosechaService;
  let agricultorRepository: Repository<AgricultorEntity>;
  let cosechaRepository: Repository<CosechaEntity>;
  let agricultor: AgricultorEntity;
  let cosechasList: CosechaEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [AgricultorCosechaService],
    }).compile();

    service = module.get<AgricultorCosechaService>(AgricultorCosechaService);
    agricultorRepository = module.get<Repository<AgricultorEntity>>(getRepositoryToken(AgricultorEntity));
    cosechaRepository = module.get<Repository<CosechaEntity>>(getRepositoryToken(CosechaEntity));
    await seedDatabase();
  });

  const seedDatabase = async () => {
  await cosechaRepository.clear();
  await agricultorRepository.clear();

  cosechasList = [];

  for (let i = 0; i < 5; i++) {
    const cosecha: CosechaEntity = await cosechaRepository.save({
      imagen: faker.image.url(),
      nombre: faker.commerce.productName(),
      fechaRecoleccion: faker.date.past(),
      cantidadKilos: faker.number.int({ min: 10, max: 100 }),
      cantidadVendidas: faker.number.int({ min: 0, max: 50 }),
      coordenadas: `${faker.address.latitude()},${faker.address.longitude()}`
      // No se asigna agricultor todavía (lo haremos luego)
    });

    cosechasList.push(cosecha);
  }

  agricultor = await agricultorRepository.save({
  nombre: faker.person.fullName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  telefono: faker.phone.number(),
  fechaNacimiento: faker.date.birthdate({ min: 1950, max: 2002, mode: 'year' }),
  departamento: faker.location.state(),
  ciudad: faker.location.city(),

  cosechas: cosechasList
  });
};

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findCosechasByAgricultorId debe retornar las cosechas de un agricultor', async ()=>{
    const cosechas: CosechaEntity[] = await service.findCosechasByAgricultorId(agricultor.id);
    expect(cosechas.length).toBe(5)
  });

  it('findCosechasByAgricultorId debe tirar una excepcion cuando no se encuentre el argricultor', async () => {
   await expect(()=> service.findCosechasByAgricultorId("0")).rejects.toHaveProperty("message", "El agricultor con el id dado no fue encontrado");
 });


});
