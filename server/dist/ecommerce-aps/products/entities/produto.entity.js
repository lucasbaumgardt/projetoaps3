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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Produto = void 0;
const typeorm_1 = require("typeorm");
const category_entity_1 = require("../categories/entities/category.entity");
const files_entity_1 = require("../../files/entities/files.entity");
let Produto = exports.Produto = class Produto {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Produto.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar" }),
    __metadata("design:type", String)
], Produto.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar" }),
    __metadata("design:type", String)
], Produto.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => category_entity_1.Categoria, { eager: true }),
    (0, typeorm_1.JoinColumn)({ name: 'category', referencedColumnName: 'id_category' }),
    __metadata("design:type", category_entity_1.Categoria)
], Produto.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Produto.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => files_entity_1.File),
    (0, typeorm_1.JoinColumn)({ name: 'foto', referencedColumnName: 'id' }),
    __metadata("design:type", Array)
], Produto.prototype, "foto", void 0);
exports.Produto = Produto = __decorate([
    (0, typeorm_1.Entity)("produtos")
], Produto);
//# sourceMappingURL=produto.entity.js.map