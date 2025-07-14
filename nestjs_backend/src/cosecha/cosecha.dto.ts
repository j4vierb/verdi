/* eslint-disable prettier/prettier */
// src/cosecha/dto/crear-cosecha.dto.ts
import {
  IsNotEmpty,
  IsString,
  IsDateString,
  IsNumber,
} from 'class-validator';

export class CosechaDto {
  @IsString()
  @IsNotEmpty()
  imagen: string;

  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsDateString()
  @IsNotEmpty()
  fechaRecoleccion: string;

  @IsNumber()
  @IsNotEmpty()
  cantidadKilos: number;

  @IsNumber()
  @IsNotEmpty()
  cantidadVendidas: number;

  @IsString()
  @IsNotEmpty()
  coordenadas: string;

  /* @IsUUID()
  @IsNotEmpty() */
  agricultorId: string;

  @IsString()
  readonly productoId: string;
}