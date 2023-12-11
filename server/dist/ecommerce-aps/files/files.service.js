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
exports.FilesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const files_entity_1 = require("./entities/files.entity");
const fs = require("fs");
const util = require("util");
const readFile = util.promisify(fs.readFile);
let FilesService = exports.FilesService = class FilesService {
    constructor(fotoRepository) {
        this.fotoRepository = fotoRepository;
    }
    async findAll() {
        const arquivos = await this.fotoRepository.find();
        if (!arquivos || arquivos.length === 0) {
            throw new common_1.NotFoundException('Nenhuma foto encontrada');
        }
        return arquivos;
    }
    async find(id) {
        const file = await this.fotoRepository.findOne({ where: { id } });
        return file;
    }
    async salvarDados(file, req) {
        if (!file) {
            console.error('Nenhum arquivo recebido na solicitação.');
            return;
        }
        const arquivo = new files_entity_1.File();
        arquivo.fileName = file.filename;
        arquivo.contentLength = file.size;
        arquivo.contentType = file.mimetype;
        arquivo.url = `${req.protocol}://${req.get('host')}/files/${file.filename}`;
        try {
            const fileData = await readFile(file.path);
            arquivo.fileData = fileData;
            return await this.fotoRepository.save(arquivo);
        }
        catch (error) {
            console.error('Erro ao salvar o arquivo:', error);
            throw error;
        }
    }
};
exports.FilesService = FilesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(files_entity_1.File)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_1.Repository !== "undefined" && typeorm_1.Repository) === "function" ? _a : Object])
], FilesService);
//# sourceMappingURL=files.service.js.map