"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const routerOpts = {
    prefix: "/rates",
};
const router = new Router(routerOpts);
router.get("/hi", async (ctx) => {
    ctx.body = "Hi there!!!";
});
router.get("/dydx", async (ctx) => {
    ctx.body = "DYDX stored rates!!!";
});
exports.default = router;
//# sourceMappingURL=rates.js.map