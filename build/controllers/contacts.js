"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const routerOpts = {
    prefix: "/contacts",
};
const router = new Router(routerOpts);
router.post("/", async (ctx) => {
    ctx.body = "CREATE";
});
router.get("/:id", async (ctx) => {
    ctx.body = "READ";
});
router.put("/:id", async (ctx) => {
    ctx.body = "UPDATE";
});
router.delete("/:id", async (ctx) => {
    ctx.body = "DELETE";
});
exports.default = router;
//# sourceMappingURL=contacts.js.map