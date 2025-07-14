import { PedidoEntity } from '../pedido/pedido.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

export type EventualidadTipo = 'Baja' | 'Media' | 'Alta';

@Entity()
export class EventualidadEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  tipo: EventualidadTipo;

  @Column()
  fecha: Date;

  @Column()
  descripcion: string;

  @ManyToOne(
    () => PedidoEntity,
    (pedido: PedidoEntity) => pedido.eventualidades,
  )
  pedido: PedidoEntity;
}
