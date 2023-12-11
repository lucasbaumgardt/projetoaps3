import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categoria } from './entities/category.entity';
import { CategoriaCreateDTO } from './dtos/category.creation.dto';

@Injectable()
export class CategoriasService {
  constructor(
    @InjectRepository(Categoria)
    private readonly categoriaRepository: Repository<Categoria>,
  ) {}

  async findAllCategories(): Promise<Categoria[]> {
    return this.categoriaRepository.find();
  }

  async findCategoryById(id_category): Promise<Categoria> {
    return this.categoriaRepository.findOne(id_category);
  }

  async createCategory(createDto: CategoriaCreateDTO): Promise<Categoria> {
    const categoria = this.categoriaRepository.create(createDto);
    return this.categoriaRepository.save(categoria);
  }

  async updateCategory(id_category, createDto: CategoriaCreateDTO): Promise<Categoria> {
    const categoria = await this.categoriaRepository.findOne(id_category);
    if (!categoria) {
    }
    this.categoriaRepository.merge(categoria, createDto);
    return this.categoriaRepository.save(categoria);
  }

  async deleteCategory(id_category): Promise<void> {
    const categoria = await this.categoriaRepository.findOne(id_category);
    if (!categoria) {
    }
    await this.categoriaRepository.remove(categoria);
  }
}
