import { Injectable } from '@nestjs/common';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Produto } from './entities/produto.entity';

@Injectable()
export class ProdutosService {
  constructor(
    @InjectRepository(Produto)
    private produtoRepository: Repository<Produto>,
  ) {}

  create(createProdutoDto: CreateProdutoDto): Promise<Produto> {
    return this.produtoRepository.save(createProdutoDto);
  }

  findAll() {
    return this.produtoRepository.find();
  }

  findOne(id: number) {
    return this.produtoRepository.findOne(id);
  }

  async update(id: number, updateProdutoDto: UpdateProdutoDto) {
    await this.produtoRepository.update({id: id}, updateProdutoDto);
    return this.produtoRepository.findOne(id);
  }

  async remove(id: number) {
    await this.produtoRepository.delete(id);
  }
}
