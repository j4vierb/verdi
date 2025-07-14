/* eslint-disable prettier/prettier */
import { IsDate, IsNotEmpty, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class PedidoDto {
  @IsString()
  @IsNotEmpty()
  readonly direccionRecoger: string;

  @IsString()
  @IsNotEmpty()
  readonly direccionEntregar: string;

  @IsString()
  @IsNotEmpty()
  readonly estado: string;

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  readonly fechaEntrega: Date;
}
