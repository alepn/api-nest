import { Controller, Get, Post, Body, Patch, Param, Delete, Response } from '@nestjs/common';
import { Response as Res } from 'express';
import { PedidosService } from './pedidos.service';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';

@Controller('pedidos')
export class PedidosController {
  constructor(private readonly pedidosService: PedidosService) {}

  @Post()
  create(@Body() createPedidoDto: CreatePedidoDto) {
    return this.pedidosService.create(createPedidoDto);
  }

  @Get()
  findAll() {
    return this.pedidosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.pedidosService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updatePedidoDto: UpdatePedidoDto) {
    return this.pedidosService.update(id, updatePedidoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.pedidosService.remove(id);
  }

  @Get(':id/report')
  async report(@Param('id') id: number, @Response() res: Res) {
    const buffer = await this.pedidosService.report(id)

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'filename=report_pedido_' + id + '.pdf',
      'Content-Length': buffer.length,
    })

    res.end(buffer)
  }

  @Get(':id/sendmail')
  async sendMail(@Param('id') id: number, @Response() res: Res) {
    await this.pedidosService.sendMail(id)
    res.json({'msg':'Email enviado!'})
  }
}
