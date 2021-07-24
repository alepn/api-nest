import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Pedido } from './pedido.entity';
import { Produto } from '../../produtos/entities/produto.entity';

@Entity()
export class ItemPedido {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Pedido, pedido => pedido.itensPedido, { onDelete: 'CASCADE' })
    pedido: Pedido;

    @ManyToOne(() => Produto)
    produto: Produto;

    @Column("decimal", { precision: 10, scale: 4, default: 0.0000 })
    quantidade: number;
}
