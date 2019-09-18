import { XtRouter } from '@/common/common.ts';
XtRouter.addRouter({
    name: 'Login',
    path: '/login', component: function () { return import(/* webpackChunkName: "Login" */ './user-login.vue'); },
});
XtRouter.addRouter({
    name: 'HomePage',
    path: '/home', component: function () { return import(/* webpackChunkName: "HomePage" */ './user-homepage.vue'); },
});
//# sourceMappingURL=user.rt.js.map