import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Categoria } from '../categories/entities/category.entity';
import { File } from 'src/ecommerce-aps/files/entities/files.entity';

@Entity("produtos")
export class Produto {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "varchar"})
    name: string;

    @Column({type: "varchar"})
    description: string;

    @ManyToOne(() => Categoria, { eager: true })
    @JoinColumn({ name: 'category', referencedColumnName: 'id_category' })
    category: Categoria;

    @Column({type: "decimal", precision: 10, scale: 2})
    price: number

    //@OneToMany(() => File, (foto) => foto.produto)
    //foto: File[];

    @ManyToOne(() => File)
    @JoinColumn({ name: 'foto', referencedColumnName: 'id'})
    foto: File[];
}