var XtRouter = /** @class */ (function () {
    function XtRouter() {
    }
    XtRouter.addRouter = function (ri) {
        this.routers.push(ri);
    };
    XtRouter.skipNamed = function (name, args) {
        this.vueRouter.push({ name: name, params: args });
    };
    XtRouter.getRouter = function () {
        return this.routers;
    };
    XtRouter.vueRouter = {};
    XtRouter.routers = [];
    return XtRouter;
}());
export { XtRouter };
//# sourceMappingURL=xt.router.js.map