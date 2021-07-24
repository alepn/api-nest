import { Injectable } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Cliente } from './entities/cliente.entity';

@Injectable()
export class ClientesService {
  constructor(
    @InjectRepository(Cliente)
    private clienteRepository: Repository<Cliente>,
  ) {}

  create(createClienteDto: CreateClienteDto): Promise<Cliente> {
    return this.clienteRepository.save(createClienteDto);
  }

  findAll(): Promise<Cliente[]> {
    return this.clienteRepository.find();
  }

  findOne(id: string): Promise<Cliente> {
    return this.clienteRepository.findOne(id);
  }

  async update(id: number, updateClienteDto: UpdateClienteDto) {
    await this.clienteRepository.update({id: id}, updateClienteDto);
    return this.clienteRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.clienteRepository.delete(id)
  }
}
