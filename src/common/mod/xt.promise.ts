
export class StepPromis{
    promisList: any[] = [];
    promisIndex:number = 0;
    cb:any = undefined;
    constructor(pro:any[]){
        this.promisList = pro;
    }
    //循环执行
    public run(): any{
        this.promisList[this.promisIndex]().then(()=>{
            console.info("pms:", this.promisIndex, this.promisList.length);
            this.promisIndex++;
            if(this.promisIndex>=this.promisList.length){
                this.cb&&this.cb()
                return;
            }
            this.run();
        });
        return this;
    }
    then(cb:any){
        this.cb = cb;
    }

}

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
