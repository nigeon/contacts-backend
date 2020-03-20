"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const fs_1 = require("fs");
const path_1 = require("path");
let customConfig;
const defaultConfig = dotenv_1.config.parse(fs_1.readFileSync(path_1.resolve(__dirname, "..", ".env")));
switch (process.env.NODE_ENV) {
    case "test":
        customConfig = dotenv_1.config.parse(fs_1.readFileSync(path_1.resolve(__dirname, "..", ".env.test")));
        break;
    case "production":
        customConfig = dotenv_1.config.parse(fs_1.readFileSync(path_1.resolve(__dirname, "..", ".env.production")));
        break;
    default:
        customConfig = dotenv_1.config.parse(fs_1.readFileSync(path_1.resolve(__dirname, "..", ".env.development")));
}
exports.default = Object.assign(defaultConfig, customConfig, process.env);
//# sourceMappingURL=config.js.map