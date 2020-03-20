"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config");
const HttpStatus = require("http-status-codes");
const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const contacts_1 = require("./controllers/contacts");
const PORT = Number(config_1.default.PORT);
const app = new Koa();
app.use(bodyParser());
app.use(async (ctx, next) => {
    try {
        if (config_1.default.DEBUG) {
            global.console.log(ctx.method, ctx.url);
        }
        await next();
    }
    catch (error) {
        ctx.status = error.statusCode || error.status || HttpStatus.INTERNAL_SERVER_ERROR;
        error.status = ctx.status;
        ctx.body = { error };
        ctx.app.emit("error", error, ctx);
    }
});
app.use(contacts_1.default.routes());
app.use(contacts_1.default.allowedMethods());
app.on("error", global.console.error);
const database_connection_1 = require("./database/database.connection");
(async () => {
    await database_connection_1.default;
})();
app.listen(PORT, () => {
    global.console.log("Server listening on port", PORT);
});
//# sourceMappingURL=server.js.map