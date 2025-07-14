/* eslint-disable prettier/prettier */

import { Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import { ComentarioEntity } from '../comentario/comentario.entity';
import { ProductoEntity }   from '../producto/producto.entity';
import { AgricultorEntity } from '../agricultor/agricultor.entity';

@Entity()
export class CosechaEntity {
 @PrimaryGeneratedColumn('uuid')
 id: string;

 @Column()
 imagen: string;

 @Column()
 nombre: string;

 @Column()
 fechaRecoleccion: Date;

 @Column()
 cantidadKilos: number;
 
 @Column()
 cantidadVendidas: number;

 @Column()
 coordenadas: string;

 @OneToMany(() => ComentarioEntity, comentario => comentario.cosecha)
 comentarios: ComentarioEntity[];

 @ManyToOne(() => AgricultorEntity, agricultor => agricultor.cosechas)
 agricultor: AgricultorEntity;

 @ManyToOne(() => ProductoEntity, producto => producto.cosechas)
 producto: ProductoEntity;

}