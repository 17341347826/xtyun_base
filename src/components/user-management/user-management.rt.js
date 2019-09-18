import { XtRouter } from '@/common/common.ts';
XtRouter.addRouter({
    name: 'UserCity',
    path: '/user-management/user_city',
    component: function () { return import(/* webpackChunkName: "UserCity" */ './components/userCity.vue'); },
});
XtRouter.addRouter({
    name: 'UserDistrict',
    path: '/user-management/user_district',
    component: function () { return import(/* webpackChunkName: "UserDistrict" */ './components/userDistrict.vue'); },
});
XtRouter.addRouter({
    name: 'UserTeacher',
    path: '/user-management/teacher',
    component: function () { return import(/* webpackChunkName: "UserTeacher" */ './components/teacher.vue'); }
});
XtRouter.addRouter({
    name: 'UserStudent',
    path: '/user-management/user_student',
    component: function () { return import(/* webpackChunkName: "UserStudent" */ './components/userStudent.vue'); },
});
XtRouter.addRouter({
    name: 'UserParent',
    path: '/user-management/user_parent',
    component: function () { return import(/* webpackChunkName: "UserParent" */ './components/userParent.vue'); },
});
XtRouter.addRouter({
    name: 'UserSchool',
    path: '/user-management/user_school',
    component: function () { return import(/* webpackChunkName: "UserParent" */ './components/userSchool.vue'); },
});
//# sourceMappingURL=user-management.rt.js.map