import { Injectable, NotFoundException, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Produto } from './entities/produto.entity';
import { ProdutoCreateDTO } from './dtos/product.creation.dto';
import { Categoria } from './categories/entities/category.entity';
import * as fs from 'fs';
import * as util from 'util';

const readFile = util.promisify(fs.readFile);

@Injectable()
export class ProdutoService {
  constructor(
    @InjectRepository(Produto)
    private readonly produtoRepository: Repository<Produto>,
  ) {}

  async findById(id: number): Promise<Produto | undefined> {
    const produto = await this.produtoRepository
      .createQueryBuilder('produto')
      .select([
        'produto.id as id',
        'produto.name as name',
        'produto.description as description',
        'produto.price as price',
        'file.fileData as foto',
        'categoria.name_category as category'
      ])
      .addSelect('categoria.name_category AS category')
      .leftJoin('produto.category', 'categoria')
      .leftJoin('produto.foto', 'file')
      .where('produto.id = :id', { id }) 
      .getRawOne(); 
  
    return produto;
  }
  
  async findAll(): Promise<Produto[]> {
    const produtos = await this.produtoRepository
      .createQueryBuilder('produto')
      .select([
        'produto.id as id',
        'produto.name as name',
        'produto.description as description',
        'produto.price as price',
        'file.fileName as fileName',
        'categoria.name_category as category'
      ])
      .addSelect('categoria.name_category AS category')
      .leftJoin('produto.category', 'categoria')
      .leftJoin('produto.foto', 'file')
      .orderBy('produto.id', 'ASC')
      .getRawMany();
  
    return produtos;
  }
  
  
  async getFotoProdutoById(id: number): Promise<string | undefined> {
    const produto = await this.produtoRepository
      .createQueryBuilder("produto")
      .select("file.fileData", "foto")
      .leftJoin("produto.foto", "file")
      .where("produto.id = :id", { id })
      .getRawOne();
  
    if (produto) {
      return produto.foto;
    }
  
    return undefined;
  }
  


  async create(produtoCreateDTO: ProdutoCreateDTO): Promise<Produto> {
    const { name, description, category, price, foto} = produtoCreateDTO;

    const produto: Produto = new Produto();
    produto.name = name;
    produto.description = description;
    produto.category = category;
    produto.price = price;
    produto.foto = foto;

    try {
      await this.produtoRepository.save(produto);
      return produto;
    } catch (error) {
      console.error('Erro ao salvar produto:', error);
      throw new InternalServerErrorException('Erro interno ao salvar o produto.');
    }
  }

  async update(id: number, produtoCreateDTO: ProdutoCreateDTO): Promise<Produto> {
    const produto = await this.produtoRepository.findOne( {where: {id} });
    if (!produto) {
      throw new NotFoundException('Produto não encontrado');
    }

    produto.name = produtoCreateDTO.name;
    produto.description = produtoCreateDTO.description;
    produto.category = produtoCreateDTO.category;
    produto.price = produtoCreateDTO.price;
    produto.foto = produtoCreateDTO.foto;

    try {
      await this.produtoRepository.save(produto);
      return produto;
    } catch (error) {
      console.error('Erro ao atualizar o produto:', error);
      throw new InternalServerErrorException('Erro interno ao atualizar o produto.');
    }
  }

  async destroy(id: number): Promise<boolean> {
    const produto = await this.produtoRepository.findOne({ where: { id }});
    if (!produto) {
      throw new NotFoundException('Produto não encontrado');
    }

    try {
      await this.produtoRepository.remove(produto);
      return true;
    } catch (error) {
      console.error('Erro ao excluir o produto:', error);
      throw new InternalServerErrorException('Erro interno ao excluir o produto.');
    }
  }

  async destroyAll(): Promise<boolean> {
    const produtos: Produto[] = await this.produtoRepository.find();

    if (!produtos || produtos.length === 0) {
      throw new NotFoundException('Nenhum produto encontrado');
    }

    try {
      await this.produtoRepository.remove(produtos);
      return true;
    } catch (error) {
      console.error('Erro ao excluir o produto:', error);
      throw new InternalServerErrorException('Erro interno ao excluir o produto.');
    }
  }
}