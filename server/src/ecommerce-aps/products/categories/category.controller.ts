import { Controller, Get, Post, Put, Delete, Param, Body, HttpCode, HttpStatus, NotFoundException, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { CategoriasService } from './category.service';

@Controller('categorias')
export class CategoriasController {
  categoriaRepository: any;
  constructor(private readonly categoriaService: CategoriasService) {}

  @Get()
  async findAllCategories() {
    const categorias = await this.categoriaService.findAllCategories();
    return categorias;
  }

  @Get(':id_category')
  async findCategoryById(@Param('id_category') id_category: number) {
    const categoria = await this.categoriaService.findCategoryById(id_category);
    if (!categoria) {
      throw new NotFoundException('Categoria não encontrada');
    }
    return categoria;
  }

  @Post()
  async createCategory(@Body() categoryDto) {
    try {
      const categoria = await this.categoriaService.createCategory(categoryDto);
      return categoria;
    } catch (e) {
      throw new ConflictException('Erro ao criar a categoria');
    }
  }

  @Put(':id_category')
  async updateCategory(@Param('id_category') id_category: number, @Body() categoryDto) {
    try {
      const categoria = await this.categoriaService.updateCategory(id_category, categoryDto);
      return categoria;
    } catch (e) {
      throw new InternalServerErrorException('Erro ao atualizar a categoria');
    }
  }

  @Delete(':id_category')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteCategory(id_category: number): Promise<boolean> {
    const categoria = await this.categoriaRepository.findOne(id_category);
  
    if (!categoria) {
      return false;
    }
    await this.categoriaRepository.remove(categoria);
  
    return true;
  }
}
