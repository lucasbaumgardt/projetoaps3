import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";
import { Categoria } from "../categories/entities/category.entity";
import { File } from "src/ecommerce-aps/files/entities/files.entity";
import { Buffer } from "buffer";

export class ProdutoCreateDTO {

    // @IsNotEmpty()
    // @IsNumber()
    // id: number;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsNumber()
    category: Categoria;

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    price: number;

    @IsOptional()
    @IsNotEmpty()
    foto: File[];

}