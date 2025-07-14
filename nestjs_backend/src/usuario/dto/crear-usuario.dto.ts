// src/usuario/dto/crear-usuario.dto.ts
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsDate,
  IsOptional,
  IsEnum,
  IsArray,
} from 'class-validator';
import { Role } from '../role.enum';

export class CrearUsuarioDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  // @IsIn(['agricultor', 'comprador', 'organizacion', 'admin'])
  // is an array of roles (enum)
  @IsEnum(Role, { each: true })
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  @IsArray()
  rol: Role[];

  // Datos comunes y específicos (solo algunos campos requeridos según el tipo)
  @IsString()
  @IsOptional()
  nombre: string;

  @IsOptional()
  @IsString()
  telefono?: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  fechaNacimiento?: Date;

  @IsOptional()
  @IsString()
  departamento?: string;

  @IsOptional()
  @IsString()
  ciudad?: string;
}
