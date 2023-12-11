import { ProdutoService } from './products.service';
import { ProdutoCreateDTO } from './dtos/product.creation.dto';
import { Response } from 'express';
export declare class ProdutosController {
    private readonly produtosService;
    constructor(produtosService: ProdutoService);
    findAll(): Promise<import("./entities/produto.entity").Produto[]>;
    findById(id: number): Promise<import("./entities/produto.entity").Produto>;
    getImagemProduto(id: number, res: Response): Promise<void>;
    create(createProdutoDto: ProdutoCreateDTO): Promise<import("./entities/produto.entity").Produto>;
    update(id: number, createProdutoDto: ProdutoCreateDTO): Promise<import("./entities/produto.entity").Produto>;
    remove(id: number): Promise<void>;
    removeAll(): Promise<void>;
}
