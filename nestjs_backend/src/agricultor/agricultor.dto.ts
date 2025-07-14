/* eslint-disable prettier/prettier */
import {IsNotEmpty, IsString, IsDate} from 'class-validator';
import { Type } from 'class-transformer';
export class AgricultorDto {
    @IsString()
    @IsNotEmpty()
    readonly nombre: string;

    @IsString()
    @IsNotEmpty()
    readonly email: string;

    @IsString()
    @IsNotEmpty()
    readonly password: string;

    @IsString()
    @IsNotEmpty()
    readonly telefono: string;

    @IsDate()
    @Type(() => Date)
    @IsNotEmpty()
    readonly fechaNacimiento: Date;

    @IsString()
    @IsNotEmpty()
    readonly departamento: string;

    @IsString()
    @IsNotEmpty()
    readonly ciudad: string;

}
