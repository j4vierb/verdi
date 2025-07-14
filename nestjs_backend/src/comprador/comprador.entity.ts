import { UsuarioEntity } from '../usuario/usuario.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToOne,
} from 'typeorm';

@Entity()
export class CompradorEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nombre: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  telefono: string;

  @Column()
  fechaNacimiento: Date;

  @Column()
  departamento: string;

  @Column()
  ciudad: string;

  @OneToOne(() => UsuarioEntity, (usuario) => usuario.comprador)
  @JoinColumn()
  usuario: UsuarioEntity;
}
