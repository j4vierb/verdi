/* archivo src/shared/testing-utils/typeorm-testing-config.ts */
import { TypeOrmModule } from '@nestjs/typeorm';
import { AgricultorEntity } from '../../agricultor/agricultor.entity';
import { CosechaEntity } from '../../cosecha/cosecha.entity';
import { ComentarioEntity } from '../../comentario/comentario.entity';
import { PedidoEntity } from '../../pedido/pedido.entity';
import { ProductoEntity } from '../../producto/producto.entity';
import { UsuarioEntity } from '../../usuario/usuario.entity';
import { OrganizacionEntity } from '../../organizacion/organizacion.entity';
import { CompradorEntity } from '../../comprador/comprador.entity';
import { EventualidadEntity } from '../../eventualidad/eventualidad.entity';
import { AdminEntity } from '../../admin/admin.entity';

export const TypeOrmTestingConfig = () => [
  TypeOrmModule.forRoot({
    type: 'sqlite',
    database: ':memory:',
    dropSchema: true,
    entities: [
      AgricultorEntity,
      CosechaEntity,
      ComentarioEntity,
      PedidoEntity,
      ProductoEntity,
      UsuarioEntity,
      OrganizacionEntity,
      CompradorEntity,
      EventualidadEntity,
      PedidoEntity,
      EventualidadEntity,
      AdminEntity,
    ],
    synchronize: true,
  }),
  TypeOrmModule.forFeature([
    AgricultorEntity,
    CosechaEntity,
    ComentarioEntity,
    ProductoEntity,
    UsuarioEntity,
    OrganizacionEntity,
    CompradorEntity,
    PedidoEntity,
    EventualidadEntity,
    AdminEntity,
  ]),
];
