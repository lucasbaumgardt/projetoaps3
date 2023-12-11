import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { File } from './entities/files.entity';
import { Request } from 'express';
import { Produto } from '../products/entities/produto.entity';
import * as fs from 'fs';
import * as util from 'util';

const readFile = util.promisify(fs.readFile);

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(File)
    private readonly fotoRepository: Repository<File>,
  ) {}

  async findAll(): Promise<File[]> {
    const arquivos: File[] = await this.fotoRepository.find();
    if (!arquivos || arquivos.length === 0) {
      throw new NotFoundException('Nenhuma foto encontrada');
    }
    return arquivos;
  }

  // async find(id: number): Promise<File> {
  //   const arquivo : File = await this.fotoRepository.findOne({ where: { id }});
  //   if (!arquivo) {
  //     throw new NotFoundException('Foto não encontrado');
  //   }
  //   return arquivo;
  // }

  // async find(id: number): Promise<File> {
  //   const produto = await this.fotoRepository
  //     .createQueryBuilder('file')
  //     .select([
  //       'file.fileData as fileData',
  //     ])      
  //     .where('file.id = :id', { id }) // Adicione a cláusula WHERE para filtrar pelo ID
  //     .getRawOne(); // Usar getRawOne() para obter apenas um registro
  
  //   return produto;
  // }

  async find(id: number): Promise<File | undefined> {
    const file = await this.fotoRepository.findOne({where: {id}});
  
    return file;
  }
  

  async salvarDados(file: Express.Multer.File, req: Request) {

    if (!file) {
      console.error('Nenhum arquivo recebido na solicitação.');
      // Trate o erro ou retorne uma resposta adequada para o cliente.
      return;
    }
    const arquivo = new File();
    arquivo.fileName = file.filename;
    arquivo.contentLength = file.size;
    arquivo.contentType = file.mimetype;
    arquivo.url = `${req.protocol}://${req.get('host')}/files/${file.filename}`;
    try {
      // Lê os dados binários do arquivo usando fs.readFile
      const fileData = await readFile(file.path);
      arquivo.fileData = fileData;
  
      // Salva o arquivo no banco de dados
      return await this.fotoRepository.save(arquivo);
    } catch (error) {
      // Lide com erros de leitura ou salvamento
      console.error('Erro ao salvar o arquivo:', error);
      throw error;
    }
  }
}
