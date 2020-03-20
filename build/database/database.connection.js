"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const connectionOpts = require("./ormconfig");
const connection = typeorm_1.createConnection(connectionOpts);
exports.default = connection;
//# sourceMappingURL=database.connection.js.map