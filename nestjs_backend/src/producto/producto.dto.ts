/* eslint-disable prettier/prettier */
import { IsString, IsNotEmpty, IsInt, IsPositive, IsUrl } from 'class-validator';

export class ProductoDTO {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsInt()
  @IsPositive()
  precio: number;

  @IsString()
  @IsNotEmpty()
  @IsUrl()
  imagen: string;

  @IsString()
  @IsNotEmpty()
  categoria: string;

  @IsInt()
  cantidad_vendida: number;
}