import { Repository } from 'typeorm';
import { Produto } from './entities/produto.entity';
import { ProdutoCreateDTO } from './dtos/product.creation.dto';
export declare class ProdutoService {
    private readonly produtoRepository;
    constructor(produtoRepository: Repository<Produto>);
    findById(id: number): Promise<Produto | undefined>;
    findAll(): Promise<Produto[]>;
    getFotoProdutoById(id: number): Promise<string | undefined>;
    create(produtoCreateDTO: ProdutoCreateDTO): Promise<Produto>;
    update(id: number, produtoCreateDTO: ProdutoCreateDTO): Promise<Produto>;
    destroy(id: number): Promise<boolean>;
    destroyAll(): Promise<boolean>;
}
