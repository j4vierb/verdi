/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PedidoModule } from './pedido/pedido.module';
import { ComentarioModule } from './comentario/comentario.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PedidoEntity } from './pedido/pedido.entity';
import { ComentarioEntity } from './comentario/comentario.entity';
import { OrganizacionModule } from './organizacion/organizacion.module';
import { OrganizacionEntity } from './organizacion/organizacion.entity';
import { CosechaModule } from './cosecha/cosecha.module';
import { CosechaEntity } from './cosecha/cosecha.entity';
import { AgricultorCosechaModule } from './agricultor-cosecha/agricultor-cosecha.module';
import { AgricultorEntity } from './agricultor/agricultor.entity';
import { ProductoEntity } from './producto/producto.entity';
import { UsuarioModule } from './usuario/usuario.module';
import { CompradorModule } from './comprador/comprador.module';
import { UsuarioEntity } from './usuario/usuario.entity';
import { CompradorEntity } from './comprador/comprador.entity';
import { AuthModule } from './auth/auth.module';
import { AgricultorModule } from './agricultor/agricultor.module';
import { ProductoModule } from './producto/producto.module';
import { EventualidadEntity } from './eventualidad/eventualidad.entity';
import { EventualidadModule } from './eventualidad/eventualidad.module';
import { PedidoEventualidadModule } from './pedido-eventualidad/pedido-eventualidad.module';
import { AdminModule } from './admin/admin.module';
import { AdminEntity } from './admin/admin.entity';


@Module({
  imports: [PedidoModule, ComentarioModule, OrganizacionModule, CosechaModule, AgricultorModule, ProductoModule, AgricultorCosechaModule, UsuarioModule, CompradorModule, AuthModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'verdi',
      entities: [
        CompradorEntity,
        AgricultorEntity,
        PedidoEntity,
        ComentarioEntity,
        OrganizacionEntity,
        CosechaEntity,
        ProductoEntity,
        UsuarioEntity,
        EventualidadEntity,
        AdminEntity,
      ],
      dropSchema: true,
      synchronize: true,
    }),
    OrganizacionModule,
    CosechaModule,
    AgricultorCosechaModule,
    UsuarioModule,
    CompradorModule,
    AuthModule,
    ProductoModule,
    EventualidadModule,
    PedidoEventualidadModule,
    AdminModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
