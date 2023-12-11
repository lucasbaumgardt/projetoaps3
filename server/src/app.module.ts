import { Module } from "@nestjs/common";
import { EcommerceModule } from "./ecommerce-aps/ecommerce-aps.module";

@Module({
  imports: [EcommerceModule],
})
export class AppModule {}
