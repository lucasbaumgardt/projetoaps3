import { Repository } from 'typeorm';
import { File } from './entities/files.entity';
import { Request } from 'express';
export declare class FilesService {
    private readonly fotoRepository;
    constructor(fotoRepository: Repository<File>);
    findAll(): Promise<File[]>;
    find(id: number): Promise<File | undefined>;
    salvarDados(file: Express.Multer.File, req: Request): Promise<File>;
}
