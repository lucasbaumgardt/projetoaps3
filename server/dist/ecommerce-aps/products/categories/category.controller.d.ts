import { CategoriasService } from './category.service';
export declare class CategoriasController {
    private readonly categoriaService;
    categoriaRepository: any;
    constructor(categoriaService: CategoriasService);
    findAllCategories(): Promise<import("./entities/category.entity").Categoria[]>;
    findCategoryById(id_category: number): Promise<import("./entities/category.entity").Categoria>;
    createCategory(categoryDto: any): Promise<import("./entities/category.entity").Categoria>;
    updateCategory(id_category: number, categoryDto: any): Promise<import("./entities/category.entity").Categoria>;
    deleteCategory(id_category: number): Promise<boolean>;
}
