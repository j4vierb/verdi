/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn, OneToMany, JoinColumn, OneToOne } from 'typeorm';
import { CosechaEntity } from '../cosecha/cosecha.entity';
import { UsuarioEntity } from '../usuario/usuario.entity';
import { ComentarioEntity } from '../comentario/comentario.entity';



@Entity()
export class AgricultorEntity {
  
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nombre: string;

  @Column()
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

  @OneToMany(() => CosechaEntity, (cosecha) => cosecha.agricultor)
  cosechas: CosechaEntity[];

  @OneToOne(() => UsuarioEntity, usuario => usuario.agricultor)
  @JoinColumn()
  usuario: UsuarioEntity;

  @OneToMany(() => ComentarioEntity, comentario => comentario.agricultor)
  comentarios: ComentarioEntity[];



}
