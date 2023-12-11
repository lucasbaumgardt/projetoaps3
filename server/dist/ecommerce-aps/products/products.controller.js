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
exports.ProdutosController = void 0;
const common_1 = require("@nestjs/common");
const products_service_1 = require("./products.service");
const product_creation_dto_1 = require("./dtos/product.creation.dto");
const express_1 = require("express");
let ProdutosController = exports.ProdutosController = class ProdutosController {
    constructor(produtosService) {
        this.produtosService = produtosService;
    }
    async findAll() {
        const produtos = await this.produtosService.findAll();
        return produtos;
    }
    async findById(id) {
        const produto = await this.produtosService.findById(id);
        if (!produto) {
            throw new common_1.NotFoundException('Produto não encontrado');
        }
        return produto;
    }
    async getImagemProduto(id, res) {
        const image = await this.produtosService.getFotoProdutoById(id);
        if (image) {
            res.setHeader('Content-Type', 'image/png');
            res.send(image);
        }
        else {
            res.status(404).send('Imagem não encontrada');
        }
    }
    async create(createProdutoDto) {
        const { name, description, category, price, foto } = createProdutoDto;
        try {
            const produto = await this.produtosService.create({ name, description, category, price, foto });
            return produto;
        }
        catch (error) {
            console.error('Erro ao criar o produto: ', error);
            throw new common_1.InternalServerErrorException('Erro interno ao criar o produto');
        }
    }
    async update(id, createProdutoDto) {
        const { name, category, description, price, foto } = createProdutoDto;
        try {
            const produto = await this.produtosService.update(id, { name, category, description, price, foto });
            if (!produto) {
                throw new common_1.NotFoundException('Produto não encontrado');
            }
            return produto;
        }
        catch (error) {
            console.error('Erro ao atualizar o produto: ', error);
            throw new common_1.InternalServerErrorException('Erro interno ao atualizar o produto');
        }
    }
    async remove(id) {
        if (await this.produtosService.destroy(id)) {
            return;
        }
        else {
            throw new common_1.NotFoundException('Produto não encontrado');
        }
    }
    async removeAll() {
        if (await this.produtosService.destroyAll()) {
            return;
        }
        else {
            throw new common_1.NotFoundException('Produto não encontrado');
        }
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProdutosController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProdutosController.prototype, "findById", null);
__decorate([
    (0, common_1.Get)('imagem/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, typeof (_a = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _a : Object]),
    __metadata("design:returntype", Promise)
], ProdutosController.prototype, "getImagemProduto", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [product_creation_dto_1.ProdutoCreateDTO]),
    __metadata("design:returntype", Promise)
], ProdutosController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, product_creation_dto_1.ProdutoCreateDTO]),
    __metadata("design:returntype", Promise)
], ProdutosController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProdutosController.prototype, "remove", null);
__decorate([
    (0, common_1.Delete)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProdutosController.prototype, "removeAll", null);
exports.ProdutosController = ProdutosController = __decorate([
    (0, common_1.Controller)('produtos'),
    __metadata("design:paramtypes", [products_service_1.ProdutoService])
], ProdutosController);
//# sourceMappingURL=products.controller.js.map