import { AgricultorEntity } from '../agricultor/agricultor.entity';
import { OrganizacionEntity } from '../organizacion/organizacion.entity';
import { CompradorEntity } from '../comprador/comprador.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { AdminEntity } from '../admin/admin.entity';
import { Role } from './role.enum';

@Entity()
export class UsuarioEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'simple-json',
    default: '[]',
  })
  rol: Role[];

  @OneToOne(() => AgricultorEntity, (agricultor) => agricultor.usuario)
  agricultor: AgricultorEntity;

  @OneToOne(() => OrganizacionEntity, (organizacion) => organizacion.usuario)
  organizacion: OrganizacionEntity;

  @OneToOne(() => CompradorEntity, (comprador) => comprador.usuario)
  comprador: CompradorEntity;

  @OneToOne(() => AdminEntity, (admin) => admin.usuario)
  admin: AdminEntity;
}
