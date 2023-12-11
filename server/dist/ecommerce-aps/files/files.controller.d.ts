import { FilesService } from './files.service';
import { Request, Response } from 'express';
export declare class FilesController {
    private readonly filesService;
    constructor(filesService: FilesService);
    findAll(): Promise<import("./entities/files.entity").File[]>;
    findOne(id: number, res: Response): Promise<void>;
    uploadArquivo(file: Express.Multer.File, req: Request): Promise<import("./entities/files.entity").File>;
}
