import { XtRouter } from '@/common/common.ts';
XtRouter.addRouter({
    name: 'BlankPage',
    path: '/',
    component: function () { return import(/* webpackChunkName: "BlankPage" */ './blank-page.vue'); },
});
XtRouter.addRouter({
    name: 'ConfigInfo',
    path: '/admin/config',
    component: function () { return import(/* webpackChunkName: "ConfigInfo" */ './config-info.vue'); },
});
//# sourceMappingURL=admin-config.rt.js.map