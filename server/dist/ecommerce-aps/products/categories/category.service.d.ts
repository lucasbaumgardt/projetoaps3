import { Repository } from 'typeorm';
import { Categoria } from './entities/category.entity';
import { CategoriaCreateDTO } from './dtos/category.creation.dto';
export declare class CategoriasService {
    private readonly categoriaRepository;
    constructor(categoriaRepository: Repository<Categoria>);
    findAllCategories(): Promise<Categoria[]>;
    findCategoryById(id_category: any): Promise<Categoria>;
    createCategory(createDto: CategoriaCreateDTO): Promise<Categoria>;
    updateCategory(id_category: any, createDto: CategoriaCreateDTO): Promise<Categoria>;
    deleteCategory(id_category: any): Promise<void>;
}
