import {RouteConfig} from 'vue-router';



export class XtRouter {
    public static vueRouter: any = {};

    public static routers: RouteConfig[] = [];

    public static addRouter(ri: RouteConfig): void {
        this.routers.push(ri);
    }

    public static skipNamed(name:string, args?:object){
        this.vueRouter.push({name:name, params: args});
    }

    public static getRouter(): RouteConfig[] {
        return this.routers;
    }
}
