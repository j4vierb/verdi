import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { CosechaEntity } from '../cosecha/cosecha.entity';
import { PedidoEntity } from '../pedido/pedido.entity';

export type EstadoProducto = 'Verificado' | 'No verificado' | 'En verificacion';

@Entity()
export class ProductoEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nombre: string;

  @Column({ type: 'int' })
  precio: number;

  @Column()
  imagen: string;

  @Column()
  categoria: string;

  @Column()
  estado: EstadoProducto;

  @Column({ type: 'int', default: 0 })
  cantidad_vendida: number;

  @OneToMany(() => CosechaEntity, (cosecha) => cosecha.producto)
  cosechas: CosechaEntity[];

  @ManyToOne(() => PedidoEntity, (pedido) => pedido.productos)
  pedido: PedidoEntity;
}
