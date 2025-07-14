import { UsuarioEntity } from '../usuario/usuario.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class AdminEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToOne(() => UsuarioEntity, (usuario) => usuario.admin)
  @JoinColumn()
  usuario: UsuarioEntity;
}
