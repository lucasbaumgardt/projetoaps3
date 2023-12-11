"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TYPEORM_POSTGRES_CONFIG = void 0;
exports.TYPEORM_POSTGRES_CONFIG = {
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: process.env.ORM_SYNC === "true",
    autoLoadEntities: true,
};
//# sourceMappingURL=typeorm-postgres.config.js.map