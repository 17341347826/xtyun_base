var StepPromis = /** @class */ (function () {
    function StepPromis(pro) {
        this.promisList = [];
        this.promisIndex = 0;
        this.cb = undefined;
        this.promisList = pro;
    }
    //循环执行
    StepPromis.prototype.run = function () {
        var _this = this;
        this.promisList[this.promisIndex]().then(function () {
            console.info("pms:", _this.promisIndex, _this.promisList.length);
            _this.promisIndex++;
            if (_this.promisIndex >= _this.promisList.length) {
                _this.cb && _this.cb();
                return;
            }
            _this.run();
        });
        return this;
    };
    StepPromis.prototype.then = function (cb) {
        this.cb = cb;
    };
    return StepPromis;
}());
export { StepPromis };
//将业务封装成promise
// function make_promis(func:any, p1?:any, p2?:any, p3?:any, p4?:any, p5?:any){
//     return function(){
//         return new Promise((resolve, reject)=>{
//             func(resolve, reject, p1,p2,p3,p4,p5);
//         });
//     }
// }
// //业务主题
// function test(resolve, reject, str:string, wait:number){
//     setTimeout(()=>{
//         window.console.info(str, wait)
//         resolve(true);
//     }, wait)
// }
//
// //
// var v1 = make_promis(test, "first", 5000);
// var v2 = make_promis(test, "second", 2000);
//
// //调用构造函数
// var proms = new StepPromis([v1, v2 ]);
// //执行
// proms.run().then(()=>{
//     window.console.info("success");
// });
//# sourceMappingURL=xt.promise.js.map