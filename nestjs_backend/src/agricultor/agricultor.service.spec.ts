/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { Test, TestingModule } from '@nestjs/testing';
import { AgricultorService } from './agricultor.service';
import { Repository } from 'typeorm';
import { AgricultorEntity } from './agricultor.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';

import { faker } from '@faker-js/faker';
import { UsuarioEntity } from '../usuario/usuario.entity';
import { UsuarioService } from '../usuario/usuario.service';
import { ComentarioEntity } from '../comentario/comentario.entity';

describe('AgricultorService', () => {
  let service: AgricultorService;
  let repository: Repository<AgricultorEntity>;
  let comentarioRepository: Repository<ComentarioEntity>; // <-- agrega esta línea
  let module: TestingModule; // <-- cambia esto de const a let
  let agricultorList: AgricultorEntity[];

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [AgricultorService, UsuarioService],
    }).compile();

    service = module.get<AgricultorService>(AgricultorService);
    repository = module.get<Repository<AgricultorEntity>>(getRepositoryToken(AgricultorEntity));
    comentarioRepository = module.get<Repository<ComentarioEntity>>(getRepositoryToken(ComentarioEntity)); // <-- necesario aquí
    await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear();
    agricultorList = [];
    for (let i = 0; i < 5; i++) {
      const agricultor: AgricultorEntity = await repository.save({
        nombre: faker.person.firstName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        telefono: faker.phone.number(),
        fechaNacimiento: faker.date.past(),
        departamento: faker.location.state(),
        ciudad: faker.location.city(),
      })
      agricultorList.push(agricultor);
      
    }
  }

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it ('findAll should return all agricultors', async () => {
    const agricultores: AgricultorEntity[] = await service.findAll();
    expect(agricultores).not.toBeNull();
    expect(agricultores).toHaveLength(agricultorList.length);
  });

  it ('findOne should return a agricultor by id', async () => {
    const agricultor: AgricultorEntity = agricultorList[0];
    const foundAgricultor: AgricultorEntity = await service.findOne(agricultor.id);
    expect(foundAgricultor).not.toBeNull();
    expect(foundAgricultor.nombre).toEqual(agricultor.nombre);
    expect(foundAgricultor.email).toEqual(agricultor.email);
    expect(foundAgricultor.password).toEqual(agricultor.password);
    expect(foundAgricultor.telefono).toEqual(agricultor.telefono);
    expect(foundAgricultor.fechaNacimiento).toEqual(agricultor.fechaNacimiento);
    expect(foundAgricultor.departamento).toEqual(agricultor.departamento);
    expect(foundAgricultor.ciudad).toEqual(agricultor.ciudad);
  });

  it ('findOne should throw an exception for an invalid agricultor', async () => {
    await expect(() => service.findOne("0")).rejects.toHaveProperty("message", "Agricultor not found");
  });

  it ('create should return a new agricultor', async () => {
    const agricultor: AgricultorEntity = {
      id: "",
      nombre: faker.person.firstName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      telefono: faker.phone.number(),
      fechaNacimiento: faker.date.past(),
      departamento: faker.location.state(),
      ciudad: faker.location.city(),
      cosechas: [],
      usuario: new UsuarioEntity,
      comentarios: []
    }

    const newAgricultor: AgricultorEntity = await service.create(agricultor);
    expect(newAgricultor).not.toBeNull();

    const foundAgricultor: AgricultorEntity = await repository.findOne({ where: { id: newAgricultor.id } });
    expect(foundAgricultor).not.toBeNull();
    expect(foundAgricultor.nombre).toEqual(agricultor.nombre);
    expect(foundAgricultor.email).toEqual(agricultor.email);
    expect(foundAgricultor.password).toEqual(agricultor.password);
    expect(foundAgricultor.telefono).toEqual(agricultor.telefono);
    expect(foundAgricultor.fechaNacimiento).toEqual(agricultor.fechaNacimiento);
    expect(foundAgricultor.departamento).toEqual(agricultor.departamento);
    expect(foundAgricultor.ciudad).toEqual(agricultor.ciudad);
  });

  it ('update should modify a agricultor', async () => {
    const agricultor: AgricultorEntity = agricultorList[0];
    agricultor.nombre = "New name";
    agricultor.email = "new email";
    agricultor.password = "new password";
    agricultor.telefono = "new phone";
    agricultor.fechaNacimiento = new Date();
    agricultor.departamento = "new department";
    agricultor.ciudad = "new city";

    const updatedAgricultor: AgricultorEntity = await service.update(agricultor.id, agricultor);
    expect(updatedAgricultor).not.toBeNull();

    const foundAgricultor: AgricultorEntity = await repository.findOne({ where: { id: updatedAgricultor.id } });
    expect(foundAgricultor).not.toBeNull();
    expect(foundAgricultor.nombre).toEqual(agricultor.nombre);
    expect(foundAgricultor.email).toEqual(agricultor.email);
    expect(foundAgricultor.password).toEqual(agricultor.password);
    expect(foundAgricultor.telefono).toEqual(agricultor.telefono);
    expect(foundAgricultor.fechaNacimiento).toEqual(agricultor.fechaNacimiento);
    expect(foundAgricultor.departamento).toEqual(agricultor.departamento);
    expect(foundAgricultor.ciudad).toEqual(agricultor.ciudad);
  });

  it('findByUsuarioId should return an agricultor by usuarioId', async () => {
  const usuarioRepo = module.get<Repository<UsuarioEntity>>(getRepositoryToken(UsuarioEntity));
  const usuario = await usuarioRepo.save({
    nombre: faker.person.firstName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  });

  const agricultor: AgricultorEntity = await repository.save({
    nombre: faker.person.firstName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    telefono: faker.phone.number(),
    fechaNacimiento: faker.date.past(),
    departamento: faker.location.state(),
    ciudad: faker.location.city(),
    usuario: usuario,
    cosechas: [],
    comentarios: [],
  });

  const result = await service.findByUsuarioId(usuario.id);
  expect(result).not.toBeNull();
  expect(result.id).toEqual(agricultor.id);
});


  it('findByUsuarioId should throw exception if not found', async () => {
    await expect(() => service.findByUsuarioId('invalid-user')).rejects.toHaveProperty('message', 'Agricultor no encontrado para el usuario dado');
  });


  it ('update should throw an exception for an invalid agricultor', async () => {
    let agricultor: AgricultorEntity = agricultorList[0];
    agricultor = {
      ...agricultor, id: "0"
    }
    await expect(() => service.update("0", agricultor)).rejects.toHaveProperty("message", "Agricultor not found");
  });

  it ('delete should remove a agricultor', async () => {
    const agricultor: AgricultorEntity = agricultorList[0];
    await service.delete(agricultor.id);
    const deletedAgricultor: AgricultorEntity = await repository.findOne({ where: { id: agricultor.id } });
    expect(deletedAgricultor).toBeNull();
  });

  it ('delete should throw an exception for an invalid agricultor', async () => {
    const agricultor: AgricultorEntity = agricultorList[0];
    await service.delete(agricultor.id);
    await expect(() => service.delete("0")).rejects.toHaveProperty("message", "Agricultor not found");
  });

  it('findComentarios should return an array of comentarios', async () => {
  const comentarioRepo = module.get<Repository<ComentarioEntity>>(getRepositoryToken(ComentarioEntity));

  // Creamos y guardamos el agricultor base
  const agricultor = await repository.save({
    nombre: faker.person.firstName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    telefono: faker.phone.number(),
    fechaNacimiento: faker.date.past(),
    departamento: faker.location.state(),
    ciudad: faker.location.city(),
    cosechas: [],
    usuario: null,
    comentarios: [],
  });

  // Creamos y guardamos los comentarios asociados al agricultor
  await comentarioRepo.save([
    {
      nombreUsuario: faker.internet.userName(),
      contenido: 'Comentario 1',
      fecha: new Date(),
      agricultor: agricultor,
    },
    {
      nombreUsuario: faker.internet.userName(),
      contenido: 'Comentario 2',
      fecha: new Date(),
      agricultor: agricultor,
    },
  ]);

  // Ejecutamos el método
  const result = await service.findComentarios(agricultor.id);
  expect(result).toHaveLength(2);
  expect(result[0].contenido).toBeDefined();
});


it('findComentarios should throw exception if agricultor not found', async () => {
  await expect(() => service.findComentarios('non-existent')).rejects.toHaveProperty('message', 'Agricultor no encontrado');
});



});
