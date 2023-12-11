"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProdutoService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const produto_entity_1 = require("./entities/produto.entity");
const fs = require("fs");
const util = require("util");
const readFile = util.promisify(fs.readFile);
let ProdutoService = exports.ProdutoService = class ProdutoService {
    constructor(produtoRepository) {
        this.produtoRepository = produtoRepository;
    }
    async findById(id) {
        const produto = await this.produtoRepository
            .createQueryBuilder('produto')
            .select([
            'produto.id as id',
            'produto.name as name',
            'produto.description as description',
            'produto.price as price',
            'file.fileData as foto',
            'categoria.name_category as category'
        ])
            .addSelect('categoria.name_category AS category')
            .leftJoin('produto.category', 'categoria')
            .leftJoin('produto.foto', 'file')
            .where('produto.id = :id', { id })
            .getRawOne();
        return produto;
    }
    async findAll() {
        const produtos = await this.produtoRepository
            .createQueryBuilder('produto')
            .select([
            'produto.id as id',
            'produto.name as name',
            'produto.description as description',
            'produto.price as price',
            'file.fileName as fileName',
            'categoria.name_category as category'
        ])
            .addSelect('categoria.name_category AS category')
            .leftJoin('produto.category', 'categoria')
            .leftJoin('produto.foto', 'file')
            .orderBy('produto.id', 'ASC')
            .getRawMany();
        return produtos;
    }
    async getFotoProdutoById(id) {
        const produto = await this.produtoRepository
            .createQueryBuilder("produto")
            .select("file.fileData", "foto")
            .leftJoin("produto.foto", "file")
            .where("produto.id = :id", { id })
            .getRawOne();
        if (produto) {
            return produto.foto;
        }
        return undefined;
    }
    async create(produtoCreateDTO) {
        const { name, description, category, price, foto } = produtoCreateDTO;
        const produto = new produto_entity_1.Produto();
        produto.name = name;
        produto.description = description;
        produto.category = category;
        produto.price = price;
        produto.foto = foto;
        try {
            await this.produtoRepository.save(produto);
            return produto;
        }
        catch (error) {
            console.error('Erro ao salvar produto:', error);
            throw new common_1.InternalServerErrorException('Erro interno ao salvar o produto.');
        }
    }
    async update(id, produtoCreateDTO) {
        const produto = await this.produtoRepository.findOne({ where: { id } });
        if (!produto) {
            throw new common_1.NotFoundException('Produto não encontrado');
        }
        produto.name = produtoCreateDTO.name;
        produto.description = produtoCreateDTO.description;
        produto.category = produtoCreateDTO.category;
        produto.price = produtoCreateDTO.price;
        produto.foto = produtoCreateDTO.foto;
        try {
            await this.produtoRepository.save(produto);
            return produto;
        }
        catch (error) {
            console.error('Erro ao atualizar o produto:', error);
            throw new common_1.InternalServerErrorException('Erro interno ao atualizar o produto.');
        }
    }
    async destroy(id) {
        const produto = await this.produtoRepository.findOne({ where: { id } });
        if (!produto) {
            throw new common_1.NotFoundException('Produto não encontrado');
        }
        try {
            await this.produtoRepository.remove(produto);
            return true;
        }
        catch (error) {
            console.error('Erro ao excluir o produto:', error);
            throw new common_1.InternalServerErrorException('Erro interno ao excluir o produto.');
        }
    }
    async destroyAll() {
        const produtos = await this.produtoRepository.find();
        if (!produtos || produtos.length === 0) {
            throw new common_1.NotFoundException('Nenhum produto encontrado');
        }
        try {
            await this.produtoRepository.remove(produtos);
            return true;
        }
        catch (error) {
            console.error('Erro ao excluir o produto:', error);
            throw new common_1.InternalServerErrorException('Erro interno ao excluir o produto.');
        }
    }
};
exports.ProdutoService = ProdutoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(produto_entity_1.Produto)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], ProdutoService);
//# sourceMappingURL=products.service.js.map