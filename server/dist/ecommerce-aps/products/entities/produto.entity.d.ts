import { Categoria } from '../categories/entities/category.entity';
import { File } from 'src/ecommerce-aps/files/entities/files.entity';
export declare class Produto {
    id: number;
    name: string;
    description: string;
    category: Categoria;
    price: number;
    foto: File[];
}
