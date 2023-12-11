import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TYPEORM_POSTGRES_CONFIG } from "./configs/typeorm-postgres.config";
import { ProdutosModule } from "./products/products.module";
import { FilesModule } from "./files/files.module";
import { MercadoPagoModule } from "./mercadopago/mercadopago.module";

@Module({
  imports: [
    TypeOrmModule.forRoot(TYPEORM_POSTGRES_CONFIG),
    ProdutosModule,
    FilesModule,
    MercadoPagoModule
  ],
})
export class EcommerceModule {}
