"use strict";
const path_1 = require("path");
require("reflect-metadata");
const config_1 = require("./../config");
const parentDir = path_1.join(__dirname, "..");
const connectionOpts = {
    type: "postgres",
    host: process.env.DB_HOST || config_1.default.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || Number(config_1.default.DB_PORT) || 5432,
    username: process.env.DB_USERNAME || config_1.default.DB_USERNAME || "postgres",
    password: process.env.DB_PASSWORD || config_1.default.DB_PASSWORD || "postgres",
    database: process.env.DB_NAME || config_1.default.DB_NAME || "contacts",
    entities: [
        `${parentDir}/**/*.entity.ts`,
        `${parentDir}/**/*.entity.js`,
    ],
    synchronize: (process.env.NODE_ENV !== "production") ? true : false,
    migrationsTableName: "migrations",
    migrations: ["migrations/*.js"],
    cli: { migrationsDir: "src/database/migrations" },
    logging: false,
};
module.exports = connectionOpts;
//# sourceMappingURL=ormconfig.js.map