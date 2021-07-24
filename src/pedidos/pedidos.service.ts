import { Injectable } from '@nestjs/common';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Pedido } from './entities/pedido.entity';

@Injectable()
export class PedidosService {
  constructor(
    @InjectRepository(Pedido)
    private pedidoRepository: Repository<Pedido>,
  ) {}

  create(createPedidoDto: CreatePedidoDto) {
    return this.pedidoRepository.save(createPedidoDto);
  }

  findAll() {
    return this.pedidoRepository.find();
  }

  findOne(id: number) {
    return this.pedidoRepository.findOne(id);
  }

  async update(id: number, updatePedidoDto: UpdatePedidoDto) {
    await this.pedidoRepository.update({id: id}, updatePedidoDto);
    return this.pedidoRepository.findOne(id);
  }

  async remove(id: number) {
    await this.pedidoRepository.delete(id);
  }
}
