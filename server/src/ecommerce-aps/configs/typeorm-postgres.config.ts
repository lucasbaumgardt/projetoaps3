import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const TYPEORM_POSTGRES_CONFIG: TypeOrmModuleOptions = {
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: process.env.ORM_SYNC === "true",
  autoLoadEntities: true,
};
