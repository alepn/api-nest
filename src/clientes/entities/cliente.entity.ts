import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
}