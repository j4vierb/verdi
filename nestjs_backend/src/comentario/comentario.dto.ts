import {
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { Type } from 'class-transformer';

export class ComentarioDto {
  @IsString()
  @IsNotEmpty()
  nombreUsuario: string;

  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  fecha: Date;

  @IsString()
  @IsNotEmpty()
  contenido: string;

  @IsUUID()
  @IsOptional()
  agricultorId?: string;

  @IsUUID()
  @IsOptional()
  cosechaId?: string;

  @IsUUID()
  @IsOptional()
  pedidoId?: string;
}
