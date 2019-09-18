import { XtRouter } from '@/common/common.ts';
/**
 * 权限开放配置
 */
XtRouter.addRouter({
    name: 'OpenConfig',
    path: '/privilege/open-config',
    component: function () { return import(/* webpackChunkName: "OpenConfig" */ './open-config.vue'); },
});
/**
 * 权限管理
 */
XtRouter.addRouter({
    name: 'PrivilegeManage',
    path: '/privilege/manage',
    component: function () { return import(/* webpackChunkName: "PrivilegeManage" */ './privilege-management.vue'); },
});
/**
 * 用户权限
 */
XtRouter.addRouter({
    name: 'UserPrivilege',
    path: '/privilege/user-privilege',
    component: function () { return import(/* webpackChunkName: "UserPrivilege" */ './user-privilege.vue'); },
});
/**
 * 用户权限配置
 */
XtRouter.addRouter({
    name: 'PrivilegeConfig',
    path: '/privilege/permission-config',
    component: function () { return import(/* webpackChunkName: "PermissionConfig" */ './permission-config.vue'); },
});
//# sourceMappingURL=privilege-management.rt.js.map