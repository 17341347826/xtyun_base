import {XtRouter} from '@/common/common.ts';


XtRouter.addRouter({
    name: 'BlankPage',
    path: '/',
    component: () => import(/* webpackChunkName: "BlankPage" */  './blank-page.vue'),
});
XtRouter.addRouter({
    name: 'ConfigInfo',
    path: '/admin/config',
    component: () => import(/* webpackChunkName: "ConfigInfo" */  './config-info.vue'),
});