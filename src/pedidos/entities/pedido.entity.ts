import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { Cliente } from '../../clientes/entities/cliente.entity';
import { ItemPedido } from './item-pedido.entity';

enum FormaPagamento {
    Dinheiro = 'dinheiro',
    Cartao = 'cartao',
    Cheque = 'cheque'
  }

@Entity()
export class Pedido {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar", { length: 20, unique: true })
    codigo: string;

    @CreateDateColumn({type: "timestamp"})
    data: Date;

    @Column("text")
    observacao: string;

    @Column("varchar", { length: 8 })
    formaPagamento: FormaPagamento;

    @ManyToOne(() => Cliente, cliente => cliente.pedidos, { eager: true })
    cliente: Cliente;

    @OneToMany(() => ItemPedido, itemPedido => itemPedido.pedido, { cascade: true, eager: true })
    itensPedido: ItemPedido[];

    getValorTotal() {
      let valorTotal = 0;
      this.itensPedido.forEach(i => {
        valorTotal += i.produto.valor * i.quantidade;
      });
      return valorTotal;
    }
}
