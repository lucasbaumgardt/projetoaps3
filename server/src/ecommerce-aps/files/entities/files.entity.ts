import { Produto } from 'src/ecommerce-aps/products/entities/produto.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class File {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ nullable: false, unique: true })
  fileName: string;

  @Column({ type: "bytea", nullable: false})
  fileData: Buffer;

  @Column({ nullable: false })
  contentLength: number;

  @Column({ nullable: false })
  contentType: string;

  @Column({ nullable: false })
  url: string;

  //@ManyToOne(() => Produto, (produto) => produto.foto)
  //@JoinColumn({ name: 'id_produto', referencedColumnName: 'id'})
  //produto: Produto;
}
