import { Injectable } from '@nestjs/common';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Pedido } from './entities/pedido.entity';
import * as PDFDocument from 'pdfkit';
import { MailService } from './../mail/mail.service';

@Injectable()
export class PedidosService {
  constructor(
    @InjectRepository(Pedido)
    private pedidoRepository: Repository<Pedido>,
    private mailService: MailService
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

  async report(id: number): Promise<Buffer> {
    const pedido = await this.pedidoRepository.findOne(id);
    const pdfBuffer: Buffer = await new Promise(resolve => {
      const doc = new PDFDocument({
        size: 'LETTER',
        bufferPages: true,
      });

      doc.text("Pedido #" + pedido.id, 100, 50);
      doc.text("Dados do cliente", 100, 90);
      doc.text("Codigo: " + pedido.cliente.codigo, 100, 110);
      doc.text("Nome: " + pedido.cliente.nome, 100, 125);
      doc.text("Dados do pedido", 100, 150);
      doc.text("Codigo: " + pedido.codigo, 100, 165);
      doc.text("Data: " +  new Intl.DateTimeFormat('pt-BR').format(pedido.data), 100, 180);
      doc.text("Itens do pedido: ", 100, 210);
      let linhaItemPedido = 230;
      pedido.itensPedido.forEach(itemPedido => {
        doc.text(itemPedido.produto.nome, 100, linhaItemPedido);
        doc.text(new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 4 }).format(itemPedido.quantidade), 270, linhaItemPedido);
        doc.text(new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(itemPedido.getValorTotal()), 400, linhaItemPedido);
        linhaItemPedido *= 1.1;
      });
      doc.text("Total: " + new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(pedido.getValorTotal()), 370, linhaItemPedido+10);
      doc.end();

      const buffer = [];
      doc.on('data', buffer.push.bind(buffer));
      doc.on('end', () => {
        const data = Buffer.concat(buffer);
        resolve(data);
      });
    });

    return pdfBuffer;
  }

  async sendMail(id: number) {
    const pedido = await this.pedidoRepository.findOne(id);
    await this.mailService.sendMailPedido(pedido);
  }
}
