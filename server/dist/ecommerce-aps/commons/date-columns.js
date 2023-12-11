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
exports.DateColumns = void 0;
const typeorm_1 = require("typeorm");
class DateColumns {
}
exports.DateColumns = DateColumns;
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: "_created", select: false }),
    __metadata("design:type", Date)
], DateColumns.prototype, "created", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: "_updated", select: false }),
    __metadata("design:type", Date)
], DateColumns.prototype, "updated", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ name: "_deleted", select: false }),
    __metadata("design:type", Date)
], DateColumns.prototype, "deleted", void 0);
//# sourceMappingURL=date-columns.js.map