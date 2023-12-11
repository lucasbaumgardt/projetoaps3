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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriasController = void 0;
const common_1 = require("@nestjs/common");
const category_service_1 = require("./category.service");
let CategoriasController = exports.CategoriasController = class CategoriasController {
    constructor(categoriaService) {
        this.categoriaService = categoriaService;
    }
    async findAllCategories() {
        const categorias = await this.categoriaService.findAllCategories();
        return categorias;
    }
    async findCategoryById(id_category) {
        const categoria = await this.categoriaService.findCategoryById(id_category);
        if (!categoria) {
            throw new common_1.NotFoundException('Categoria não encontrada');
        }
        return categoria;
    }
    async createCategory(categoryDto) {
        try {
            const categoria = await this.categoriaService.createCategory(categoryDto);
            return categoria;
        }
        catch (e) {
            throw new common_1.ConflictException('Erro ao criar a categoria');
        }
    }
    async updateCategory(id_category, categoryDto) {
        try {
            const categoria = await this.categoriaService.updateCategory(id_category, categoryDto);
            return categoria;
        }
        catch (e) {
            throw new common_1.InternalServerErrorException('Erro ao atualizar a categoria');
        }
    }
    async deleteCategory(id_category) {
        const categoria = await this.categoriaRepository.findOne(id_category);
        if (!categoria) {
            return false;
        }
        await this.categoriaRepository.remove(categoria);
        return true;
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CategoriasController.prototype, "findAllCategories", null);
__decorate([
    (0, common_1.Get)(':id_category'),
    __param(0, (0, common_1.Param)('id_category')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CategoriasController.prototype, "findCategoryById", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CategoriasController.prototype, "createCategory", null);
__decorate([
    (0, common_1.Put)(':id_category'),
    __param(0, (0, common_1.Param)('id_category')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], CategoriasController.prototype, "updateCategory", null);
__decorate([
    (0, common_1.Delete)(':id_category'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CategoriasController.prototype, "deleteCategory", null);
exports.CategoriasController = CategoriasController = __decorate([
    (0, common_1.Controller)('categorias'),
    __metadata("design:paramtypes", [category_service_1.CategoriasService])
], CategoriasController);
//# sourceMappingURL=category.controller.js.map