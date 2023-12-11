//files.controller.ts
import {
    Controller,
    Post,
    UseInterceptors,
    UploadedFile,
    Req,
    Res,
    Get,
    NotFoundException,
    Param,
  } from '@nestjs/common';
  import { FilesService } from './files.service';
  import { FileInterceptor } from '@nestjs/platform-express';
  import multerConfig from './configs/multer.config';
  import { Request, Response } from 'express';
  
  @Controller('files')
  export class FilesController {
    constructor(private readonly filesService: FilesService) {}

    @Get()
    async findAll() {
      const arquivos = await this.filesService.findAll();
      return arquivos;
    }

    @Get(':id')
    async findOne(@Param('id') id: number, @Res() res: Response): Promise<void> {
      const arquivo = await this.filesService.find(id);
      if (arquivo) {
        res.setHeader('Content-Type', 'image/png');
        res.send(arquivo.fileData);
      } else{
        res.status(404).send('Imagem não encontrada');
        }
      }
  
    @Post()
    @UseInterceptors(FileInterceptor('arquivo', multerConfig))
    async uploadArquivo(
      @UploadedFile() file: Express.Multer.File,
      @Req() req: Request,
    ) {
      return this.filesService.salvarDados(file, req);
    }
  }
  