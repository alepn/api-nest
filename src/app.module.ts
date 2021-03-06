import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientesModule } from './clientes/clientes.module';
import { ProdutosModule } from './produtos/produtos.module';
import { PedidosModule } from './pedidos/pedidos.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'api-nest',
      entities: ["dist/**/*.entity{.ts,.js}"],
      synchronize: true,
    }), 
    ClientesModule, 
    ProdutosModule, 
    PedidosModule, 
    MailModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
