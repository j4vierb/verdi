import { Test, TestingModule } from '@nestjs/testing';
import { PedidoEventualidadService } from './pedido-eventualidad.service';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { PedidoEntity } from '../pedido/pedido.entity';
import { EventualidadEntity } from '../eventualidad/eventualidad.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';
import { randomUUID } from 'node:crypto';

describe('PedidoEventualidadService', () => {
  let service: PedidoEventualidadService;
  let pedidoRepository: Repository<PedidoEntity>;
  let eventualidadRepository: Repository<EventualidadEntity>;
  let pedidos: PedidoEntity[];
  let eventualidades: EventualidadEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PedidoEventualidadService],
      imports: [...TypeOrmTestingConfig()],
    }).compile();

    service = module.get<PedidoEventualidadService>(PedidoEventualidadService);

    pedidoRepository = module.get<Repository<PedidoEntity>>(
      getRepositoryToken(PedidoEntity),
    );

    eventualidadRepository = module.get<Repository<EventualidadEntity>>(
      getRepositoryToken(EventualidadEntity),
    );

    await seedDatabase();
  });

  const seedDatabase = async () => {
    pedidoRepository.clear();
    eventualidadRepository.clear();

    pedidos = [];
    eventualidades = [];

    for (let i = 0; i < 3; i++) {
      const returnedPedido: PedidoEntity = await pedidoRepository.save({
        direccionRecoger: faker.location.streetAddress(),
        direccionEntregar: faker.location.streetAddress(),
        estado: faker.lorem.word(),
        fechaEntrega: faker.date.future(),
      });

      pedidos.push(returnedPedido);
      pedidoRepository.save(returnedPedido);

      const returnedEventualidad: EventualidadEntity =
        await eventualidadRepository.save({
          fecha: faker.date.future(),
          tipo: 'Baja',
          pedido: pedidos[i],
          descripcion: faker.lorem.sentence(),
        });

      eventualidadRepository.save(returnedEventualidad);
      eventualidades.push(returnedEventualidad);
    }

    pedidos[0].eventualidades = eventualidades;
    await pedidoRepository.save(pedidos[0]);
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get eventualidades by pedido id', async () => {
    const eventualidades: EventualidadEntity[] =
      await service.getEventualidadesByPedidoId(pedidos[0].id);
    expect(eventualidades).not.toBeNull();
    expect(eventualidades.length).toBe(3);
  });

  it('should throw an error if the pedido does not exist', async () => {
    await expect(
      service.getEventualidadesByPedidoId('0'),
    ).rejects.toHaveProperty('message', 'El pedido con el id no existe');
  });

  it('should add eventualidad to pedido', async () => {
    const savedEventualidad: EventualidadEntity =
      await eventualidadRepository.save({
        fecha: faker.date.anytime(),
        tipo: 'Baja',
        descripcion: faker.lorem.sentence(),
      });

    // Clear the eventualidad repository to avoid conflicts
    eventualidadRepository.clear();

    const newEventualidad: EventualidadEntity =
      await service.addEventualidadToPedido(pedidos[0].id, savedEventualidad);

    expect(newEventualidad).not.toBeNull();
  });

  it('should throw an error if the pedido does not exist', async () => {
    await expect(
      service.addEventualidadToPedido(randomUUID(), eventualidades[0]),
    ).rejects.toHaveProperty('message', 'El pedido con el id no existe');
  });

  it('should throw an error if the eventualidad does exist', async () => {
    const newEventualidad: EventualidadEntity =
      await eventualidadRepository.save({
        fecha: faker.date.anytime(),
        tipo: 'Baja',
        descripcion: faker.lorem.sentence(),
      });

    await expect(
      service.addEventualidadToPedido(pedidos[0].id, newEventualidad),
    ).rejects.toHaveProperty('message', 'La eventualidad con el id ya existe');
  });

  it('should remove eventualidad from pedido', async () => {
    await service.deleteEventualidadFromPedido(
      pedidos[0].id,
      eventualidades[0].id,
    );

    const pedido: PedidoEntity = await pedidoRepository.findOne({
      where: { id: pedidos[0].id },
      relations: ['eventualidades'],
    });

    const eventualidad: EventualidadEntity | undefined =
      pedido.eventualidades.find((e) => e.id === eventualidades[0].id);

    expect(pedido.eventualidades).not.toEqual(eventualidades.length - 1);
    expect(eventualidad).toBeUndefined();
  });

  it('should throw an error if the pedido does not exist', async () => {
    await expect(
      service.deleteEventualidadFromPedido(randomUUID(), eventualidades[0].id),
    ).rejects.toHaveProperty('message', 'El pedido con el id no existe');
  });

  it('should throw an error if the eventualidad does not exist', async () => {
    await expect(
      service.deleteEventualidadFromPedido(pedidos[0].id, 999),
    ).rejects.toHaveProperty('message', 'La eventualidad con el id no existe');
  });

  it('should update the eventualidad of a pedido', async () => {
    const sentence = faker.lorem.sentence();
    const updatedEventualidad: EventualidadEntity =
      await eventualidadRepository.save({
        id: eventualidades[0].id,
        fecha: faker.date.anytime(),
        tipo: 'Alta',
        descripcion: sentence,
      });

    const pedido: EventualidadEntity =
      await service.updateEventualidadFromPedido(
        pedidos[0].id,
        updatedEventualidad.id,
        updatedEventualidad,
      );

    expect(pedido).not.toBeNull();
  });

  it('should throw an error if the pedido does not exist', async () => {
    const updatedEventualidad: EventualidadEntity =
      await eventualidadRepository.save({
        id: eventualidades[0].id,
        fecha: faker.date.anytime(),
        tipo: 'Alta',
        descripcion: faker.lorem.sentence(),
      });

    await expect(
      service.updateEventualidadFromPedido(
        randomUUID(),
        updatedEventualidad.id,
        updatedEventualidad,
      ),
    ).rejects.toHaveProperty('message', 'El pedido con el id no existe');
  });

  it('should throw an error if the eventualidad does not exist', async () => {
    const updatedEventualidad: EventualidadEntity =
      await eventualidadRepository.save({
        id: eventualidades[0].id,
        fecha: faker.date.anytime(),
        tipo: 'Alta',
        descripcion: faker.lorem.sentence(),
      });

    await expect(
      service.updateEventualidadFromPedido(
        pedidos[0].id,
        999,
        updatedEventualidad,
      ),
    ).rejects.toHaveProperty('message', 'La eventualidad con el id no existe');
  });
});
