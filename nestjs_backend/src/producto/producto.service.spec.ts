import { Test, TestingModule } from '@nestjs/testing';
import { ProductoService } from './producto.service';
import { EstadoProducto, ProductoEntity } from './producto.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { Repository } from 'typeorm';
import { faker } from '@faker-js/faker';

describe('ProductoService', () => {
  let service: ProductoService;
  let repository: Repository<ProductoEntity>;
  let productoList: ProductoEntity[] = [];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [ProductoService],
    }).compile();

    service = module.get<ProductoService>(ProductoService);
    repository = module.get<Repository<ProductoEntity>>(
      getRepositoryToken(ProductoEntity),
    );
    await seedDatabase();
  });

  const seedDatabase = async () => {
    await repository.clear();
    productoList = [];
    for (let i = 0; i < 5; i++) {
      const producto = await repository.save({
        nombre: faker.commerce.productName(),
        precio: faker.number.int({ min: 1000, max: 10000 }),
        imagen: faker.image.url(),
        categoria: faker.helpers.arrayElement(['Frutas', 'Vegetales']),
        cantidad_vendida: faker.number.int({ min: 0, max: 100 }),
        cosechas: [],
        estado: 'Verificado',
      });
      productoList.push(producto);
    }
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll should return all productos', async () => {
    const productos = await service.findAll();
    expect(productos).not.toBeNull();
    expect(productos).toHaveLength(productoList.length);
  });

  it('findOne should return a producto by id', async () => {
    const producto = productoList[0];
    const found = await service.findOne(producto.id);
    expect(found).not.toBeNull();
    expect(found.nombre).toEqual(producto.nombre);
  });

  it('findOne should throw an exception for invalid id', async () => {
    await expect(() => service.findOne('0')).rejects.toHaveProperty(
      'message',
      'Producto not found',
    );
  });

  it('create should return a new producto', async () => {
    const producto: ProductoEntity = {
      id: '',
      nombre: faker.commerce.productName(),
      precio: 5000,
      imagen: faker.image.url(),
      categoria: 'Frutas',
      cantidad_vendida: 0,
      cosechas: [],
      pedido: null,
      estado: 'Verificado',
    };

    const newProducto = await service.create(producto);
    expect(newProducto).not.toBeNull();

    const found = await repository.findOne({ where: { id: newProducto.id } });
    expect(found).not.toBeNull();
    expect(found.nombre).toEqual(producto.nombre);
  });

  it('update should modify a producto', async () => {
    const producto = productoList[0];
    producto.nombre = 'Producto actualizado';
    producto.precio = 9999;

    const updated = await service.update(producto.id, producto);
    expect(updated.nombre).toEqual('Producto actualizado');
    expect(updated.precio).toEqual(9999);
  });

  it('update should throw an exception for invalid producto', async () => {
    const producto = productoList[0];
    producto.id = '0';
    await expect(() => service.update('0', producto)).rejects.toHaveProperty(
      'message',
      'Producto not found',
    );
  });

  it('delete should remove a producto', async () => {
    const producto = productoList[0];
    await service.delete(producto.id);
    const deleted = await repository.findOne({ where: { id: producto.id } });
    expect(deleted).toBeNull();
  });

  it('delete should throw an exception for invalid producto', async () => {
    await expect(() => service.delete('0')).rejects.toHaveProperty(
      'message',
      'Producto not found',
    );
  });

  it('findOne should return producto with relations', async () => {
    const producto = await repository.save({
      nombre: 'Producto con relaciones',
      precio: 1234,
      imagen: 'url.jpg',
      categoria: 'Frutas',
      cantidad_vendida: 0,
      cosechas: [],
      pedido: null,
      estado: 'Verificado',
    });

    const found = await service.findOne(producto.id);
    expect(found).not.toBeNull();
    expect(found.cosechas).toBeDefined();
    expect(found.pedido).toBeNull();
  });

  it('create should work with edge values', async () => {
    const producto: ProductoEntity = {
      id: '',
      nombre: '',
      precio: 1,
      imagen: '',
      categoria: 'Vegetales',
      cantidad_vendida: 0,
      cosechas: [],
      pedido: null,
      estado: 'Verificado',
    };

    const created = await service.create(producto);
    expect(created).not.toBeNull();
    expect(created.nombre).toEqual('');
    expect(created.precio).toBe(1);
  });

  it('update should preserve unchanged fields', async () => {
    const producto = productoList[0];
    const originalPrecio = producto.precio;

    const updated = await service.update(producto.id, {
      nombre: 'Nuevo nombre',
    } as ProductoEntity);
    expect(updated.nombre).toEqual('Nuevo nombre');
    expect(updated.precio).toEqual(originalPrecio); // aún intacto
  });

  it('should change estado of producto', async () => {
    const producto = productoList[0];
    const newEstado: EstadoProducto = 'No verificado';
    const updatedProducto = await service.cambiarEstadoProducto(
      producto.id,
      newEstado,
    );
    expect(updatedProducto).not.toBeNull();
    expect(updatedProducto.estado).toEqual(newEstado);
  });
});
