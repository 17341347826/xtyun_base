import {XtRouter} from '@/common/common.ts';

XtRouter.addRouter( {// 项目列表
    name: 'projectManage',
    path: '/menu/project',
    component: () => import(/* webpackChunkName: "UserCreate" */  './project.manage.vue'),
});
XtRouter.addRouter({ // 菜单管理
    name: 'menuManage',
    path: '/menu',
    component: () => import(/* webpackChunkName: "UserCreate" */  './menu.manage.vue'),
});
