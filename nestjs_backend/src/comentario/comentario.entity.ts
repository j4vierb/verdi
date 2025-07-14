/* eslint-disable prettier/prettier */
import { CosechaEntity } from '../cosecha/cosecha.entity';
import { PedidoEntity } from '../pedido/pedido.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AgricultorEntity } from '../agricultor/agricultor.entity';

@Entity()
export class ComentarioEntity {
 @PrimaryGeneratedColumn('uuid')
 id: string;

 @Column()
 nombreUsuario: string;
 
 @Column()
 fecha: Date;
 
 @Column()
 contenido: string;

 @ManyToOne(() => PedidoEntity, pedido => pedido.comentarios)
 pedido: PedidoEntity;

 @ManyToOne(() => CosechaEntity, cosecha => cosecha.comentarios)
 cosecha: CosechaEntity;
 
 @ManyToOne(() => AgricultorEntity, agricultor => agricultor.comentarios)
 agricultor: AgricultorEntity;


}