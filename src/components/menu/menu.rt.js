import { XtRouter } from '@/common/common.ts';
XtRouter.addRouter({
    name: 'projectManage',
    path: '/menu/project',
    component: function () { return import(/* webpackChunkName: "UserCreate" */ './project.manage.vue'); },
});
XtRouter.addRouter({
    name: 'menuManage',
    path: '/menu',
    component: function () { return import(/* webpackChunkName: "UserCreate" */ './menu.manage.vue'); },
});
//# sourceMappingURL=menu.rt.js.map