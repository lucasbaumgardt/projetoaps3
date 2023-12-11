import { Categoria } from "../categories/entities/category.entity";
import { File } from "src/ecommerce-aps/files/entities/files.entity";
export declare class ProdutoCreateDTO {
    name: string;
    description: string;
    category: Categoria;
    price: number;
    foto: File[];
}
