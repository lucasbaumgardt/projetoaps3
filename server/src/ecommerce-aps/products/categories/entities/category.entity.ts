import { type } from "os";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("categories")
export class Categoria {

    @PrimaryGeneratedColumn()
    id_category: number;

    @Column({type: "varchar"})
    name_category: string;
}