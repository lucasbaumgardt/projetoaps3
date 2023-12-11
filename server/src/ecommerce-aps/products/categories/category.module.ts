import { Module } from '@nestjs/common';
import { CategoriasController } from './category.controller';
import { CategoriasService } from './category.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categoria } from './entities/category.entity';
import { ProdutosModule } from '../products.module';

@Module({
  imports: [TypeOrmModule.forFeature([Categoria])],
  controllers: [CategoriasController],
  providers: [CategoriasService],
})
export class CategoryModule {}
