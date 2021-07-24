import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Pedido } from '../../pedidos/entities/pedido.entity';

@Entity()
export class Cliente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", { length: 20, unique: true })
  codigo: string;

  @Column("varchar", { length: 100, })
  nome: string;

  @Column("varchar", { length: 14, unique: true })
  cpf: string;

  @Column("varchar", { length: 1 })
  sexo: string;

  @Column("varchar", { length: 100, unique: true })
  email: string;

  @OneToMany(() => Pedido, pedido => pedido.cliente)
  pedidos: Pedido[];
}