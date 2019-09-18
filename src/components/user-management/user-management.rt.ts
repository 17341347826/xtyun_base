import {XtRouter} from '@/common/common.ts';

XtRouter.addRouter({
    name: 'UserCity',
    path: '/user-management/user_city',
    component: () => import(/* webpackChunkName: "UserCity" */  './components/userCity.vue'),
});
XtRouter.addRouter({ // 区县用户
    name: 'UserDistrict',
    path: '/user-management/user_district',
    component: () => import(/* webpackChunkName: "UserDistrict" */  './components/userDistrict.vue'),
});
XtRouter.addRouter({ // 教师用户
    name: 'UserTeacher',
    path: '/user-management/teacher',
    component: () => import(/* webpackChunkName: "UserTeacher" */  './components/teacher.vue')
});

XtRouter.addRouter({ // 学生用户
    name: 'UserStudent',
    path: '/user-management/user_student',
    component: () => import(/* webpackChunkName: "UserStudent" */  './components/userStudent.vue'),
});

XtRouter.addRouter({ // 家长用户
    name: 'UserParent',
    path: '/user-management/user_parent',
    component: () => import(/* webpackChunkName: "UserParent" */  './components/userParent.vue'),
});
XtRouter.addRouter({ // 学校用户
    name: 'UserSchool',
    path: '/user-management/user_school',
    component: () => import(/* webpackChunkName: "UserParent" */  './components/userSchool.vue'),
});

