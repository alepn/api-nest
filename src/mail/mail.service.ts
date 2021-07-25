import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { Pedido } from './../pedidos/entities/pedido.entity';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendMailPedido(pedido: Pedido) {
    await this.mailerService.sendMail({
      to: pedido.cliente.email,
      from: '"Support Team" <support@example.com>',
      subject: 'Pedido recebido #' + pedido.id,
      template: './pedido', // `.hbs` extension is appended automatically
      context: {
        pedido: pedido
      },
    });
  }
}
