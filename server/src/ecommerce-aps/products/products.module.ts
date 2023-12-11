import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Produto } from "./entities/produto.entity";
import { ProdutosController } from "./products.controller";
import { ProdutoService } from "./products.service";
import { CategoryModule } from "./categories/category.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([Produto]), 
    CategoryModule
  ],
  controllers: [ProdutosController],
  providers: [ProdutoService],
  exports: [ProdutoService],
})
export class ProdutosModule {}