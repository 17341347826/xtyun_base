import {XtRouter} from '@/common/common.ts';

XtRouter.addRouter({
    name: 'Login',
    path: '/login', component: () => import(/* webpackChunkName: "Login" */ './user-login.vue'),
});
XtRouter.addRouter({
    name: 'HomePage',
    path: '/home', component: () => import(/* webpackChunkName: "HomePage" */ './user-homepage.vue'),
});
