import { Test, TestingModule } from '@nestjs/testing';
import { EventualidadService } from './eventualidad.service';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { Repository } from 'typeorm';
import { EventualidadEntity, EventualidadTipo } from './eventualidad.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker/.';

describe('EventualidadService', () => {
  let service: EventualidadService;
  let eventualidadRepository: Repository<EventualidadEntity>;
  let eventualidades: Array<EventualidadEntity>;
  let eventualidadesUrgentes: number;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [EventualidadService],
    }).compile();

    service = module.get<EventualidadService>(EventualidadService);

    eventualidadRepository = module.get<Repository<EventualidadEntity>>(
      getRepositoryToken(EventualidadEntity),
    );

    await seedDatabase();
  });

  const seedDatabase = async () => {
    eventualidades = [];
    eventualidadesUrgentes = 0;
    for (let i = 0; i < 10; i++) {
      const estado: EventualidadTipo = Math.random() > 0.5 ? 'Alta' : 'Baja';

      const eventualidad = await eventualidadRepository.save({
        tipo: estado,
        fecha: faker.date.past({
          years: 1 + i,
          refDate: new Date(2025, 0, 1),
        }),
        descripcion: faker.lorem.sentence(),
      });

      eventualidadesUrgentes += estado === 'Alta' ? 1 : 0;
      eventualidades.push(eventualidad);
      eventualidadRepository.save(eventualidad);
    }
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll should return all eventualidades', async () => {
    const eventualidad: EventualidadEntity[] = await service.findAll();
    expect(eventualidad).not.toBeNull();
    expect(eventualidad).toHaveLength(eventualidades.length);
  });

  it('findAll should throw an exception for empty eventualidades', async () => {
    await eventualidadRepository.clear();
    await expect(service.findAll()).rejects.toHaveProperty(
      'message',
      'No se encontraron eventualidades',
    );
  });

  it('findAllByTipo should return all eventualidades by tipo', async () => {
    const returnedEventualidades: EventualidadEntity[] =
      await service.findAllByTipo('Alta');
    expect(returnedEventualidades).not.toBeNull();
    expect(returnedEventualidades).toHaveLength(eventualidadesUrgentes);
  });

  it('findAllByTipo should throw an exception for empty eventualidades by tipo', async () => {
    await expect(() => service.findAllByTipo('Media')).rejects.toHaveProperty(
      'message',
      'No se encontraron eventualidades',
    );
  });

  it('should return all the eventualidades in a date range', async () => {
    const startDate = new Date(1999, 0, 1);
    const endDate = new Date(2050, 0, 1);
    const eventualidadesInRange = await service.findAllInDateRange(
      startDate,
      endDate,
    );
    expect(eventualidadesInRange).not.toBeNull();
    expect(eventualidadesInRange).toHaveLength(
      eventualidades.filter(
        (eventualidad) =>
          eventualidad.fecha >= startDate && eventualidad.fecha <= endDate,
      ).length,
    );
  });

  it('should throw an exception for empty eventualidades in date range', async () => {
    const startDate = new Date(1999, 0, 1);
    const endDate = new Date(2000, 0, 1);
    await expect(() =>
      service.findAllInDateRange(startDate, endDate),
    ).rejects.toHaveProperty(
      'message',
      'No se encontraron eventualidades en el rango de fechas',
    );
  });

  it('findOne should return an eventualidad by id', async () => {
    const eventualidad: EventualidadEntity = await service.findOne(
      eventualidades[0].id,
    );
    expect(eventualidad).not.toBeNull();
    expect(eventualidad.id).toEqual(eventualidades[0].id);
  });

  it('findOne should throw an exception for an invalid eventualidad', async () => {
    await expect(() => service.findOne(999)).rejects.toHaveProperty(
      'message',
      'No se encontró la eventualidad con el id proporcionado',
    );
  });

  it('should update an eventualidad', async () => {
    const eventualidad: EventualidadEntity = eventualidades[0];
    const tipo = eventualidad.tipo === 'Alta' ? 'Baja' : 'Media';
    eventualidad.tipo = tipo;

    const updatedEventualidad = await service.update(eventualidad);
    expect(updatedEventualidad).not.toBeNull();

    const storedEventualidad: EventualidadEntity =
      await eventualidadRepository.findOne({
        where: { id: eventualidades[0].id },
      });
    expect(storedEventualidad).not.toBeNull();
    expect(storedEventualidad.tipo).toEqual(tipo);
  });

  it('should throw an exception for an invalid eventualidad', async () => {
    const eventualidad: EventualidadEntity = eventualidades[0];
    eventualidad.id = 999;

    await expect(() => service.update(eventualidad)).rejects.toHaveProperty(
      'message',
      'No se encontró la eventualidad con el id proporcionado',
    );
  });

  it('should to remove an eventualidad', async () => {
    const eventualidad: EventualidadEntity = eventualidades[0];
    await service.remove(eventualidad.id);

    const deletedEventualidad: EventualidadEntity =
      await eventualidadRepository.findOne({
        where: { id: eventualidad.id },
      });
    expect(deletedEventualidad).toBeNull();
  });

  it('should throw an exception for an invalid eventualidad', async () => {
    await expect(() => service.remove(999)).rejects.toHaveProperty(
      'message',
      'No se encontró la eventualidad con el id proporcionado',
    );
  });
});
