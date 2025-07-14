/* eslint-disable prettier/prettier */
import { ComentarioEntity } from '../comentario/comentario.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProductoEntity } from '../producto/producto.entity';
import { EventualidadEntity } from '../eventualidad/eventualidad.entity';

@Entity()
export class PedidoEntity {
 @PrimaryGeneratedColumn('uuid')
 id: string;

 @Column()
 direccionRecoger: string;
 
 @Column()
 direccionEntregar: string;
 
 @Column()
 estado: string;
 
 @Column()
 fechaEntrega: Date;

 @OneToMany(() => ComentarioEntity, comentario => comentario.pedido)
 comentarios: ComentarioEntity[];

 @OneToMany(() => ProductoEntity, (producto) => producto.pedido)
 productos: ProductoEntity[];

  @OneToMany(() => EventualidadEntity, (eventualidad: EventualidadEntity) => eventualidad.pedido)
  eventualidades: EventualidadEntity[];
}
