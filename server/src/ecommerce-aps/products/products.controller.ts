import { Controller, Get, Param, Post, Put, Delete, Body, NotFoundException, UseInterceptors, UploadedFile, InternalServerErrorException, BadRequestException, Res, HttpStatus, HttpCode } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProdutoService } from './products.service';
import { ProdutoCreateDTO } from './dtos/product.creation.dto';
import { Response } from 'express';

@Controller('produtos')
export class ProdutosController {
  constructor(private readonly produtosService: ProdutoService) {}

  @Get()
  async findAll() {
    const produtos = await this.produtosService.findAll();
    return produtos;
  }

  @Get(':id')
  async findById(@Param('id') id: number) {
    const produto = await this.produtosService.findById(id);
    if (!produto) {
      throw new NotFoundException('Produto não encontrado');
    }
    return produto;
  }

  @Get('imagem/:id')
  async getImagemProduto(@Param('id') id: number, @Res() res: Response): Promise<void> {
    const image = await this.produtosService.getFotoProdutoById(id);

    if (image) {
      res.setHeader('Content-Type', 'image/png');
      res.send(image); 
    } else {
    
      res.status(404).send('Imagem não encontrada');
    }
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createProdutoDto: ProdutoCreateDTO) {
    const { name, description, category, price, foto } = createProdutoDto;
    //const foto = createProdutoDto.foto ? Buffer.from(createProdutoDto.foto) : null;

    try {
      const produto = await this.produtosService.create({ name, description, category, price, foto});
      return produto;
    } catch (error) {
      console.error('Erro ao criar o produto: ', error);
      throw new InternalServerErrorException('Erro interno ao criar o produto');
    }
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() createProdutoDto: ProdutoCreateDTO) {
    const { name, category, description, price, foto } = createProdutoDto;
    // const foto = createProdutoDto.foto ? Buffer.from(createProdutoDto.foto) : null;

    try {
      const produto = await this.produtosService.update(id, { name, category, description, price, foto });
      if (!produto) {
        throw new NotFoundException('Produto não encontrado');
      }
      return produto;
    } catch (error) {
      console.error('Erro ao atualizar o produto: ', error);
      throw new InternalServerErrorException('Erro interno ao atualizar o produto');
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: number) {
    if (await this.produtosService.destroy(id)) {
      return;
    } else {
      throw new NotFoundException('Produto não encontrado');
    }
  }

  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeAll() {
    if (await this.produtosService.destroyAll()) {
      return;
    } else {
      throw new NotFoundException('Produto não encontrado');
    }
  }
}