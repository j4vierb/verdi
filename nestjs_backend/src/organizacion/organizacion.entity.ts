/* eslint-disable prettier/prettier */
import { UsuarioEntity } from '../usuario/usuario.entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class OrganizacionEntity {
 @PrimaryGeneratedColumn('uuid')
 id: string;

 @Column()
 nombre: string;

 @Column()
email: string;
 
 @Column()
 password: string;

 @OneToOne(() => UsuarioEntity, usuario => usuario.organizacion)
 @JoinColumn()
 usuario: UsuarioEntity;

}