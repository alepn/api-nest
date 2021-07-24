import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Produto {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar", { length: 20, unique: true })
    codigo: string;

    @Column("varchar", { length: 100 })
    nome: string;

    @Column("varchar", { length: 50 })
    cor: string;

    @Column("varchar", { length: 10 })
    tamanho: string;

    @Column("decimal", { precision: 5, scale: 2, default: 0.00 })
    valor: number;
}
