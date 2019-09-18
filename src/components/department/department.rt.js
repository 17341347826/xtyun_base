import { XtRouter } from '@/common/common.ts';
XtRouter.addRouter({
    name: 'DepartmentSemester',
    path: '/department/semester',
    component: function () { return import(/* webpackChunkName: "DepartmentSemester" */ './Independent/semester-department.vue'); },
});
XtRouter.addRouter({
    name: 'DepartmentGrade',
    path: '/department/grade',
    component: function () { return import(/* webpackChunkName: "DepartmentGrade" */ './normal/grade-department.vue'); },
});
XtRouter.addRouter({
    name: 'DepartmentSubject',
    path: '/department/subject',
    component: function () { return import(/* webpackChunkName: "DepartmentSubject" */ './Independent/subject-department.vue'); },
});
XtRouter.addRouter({
    name: 'DepartmentDiscipline',
    path: '/department/discipline',
    component: function () { return import(/* webpackChunkName: "DepartmentDiscipline" */ './Independent/discipline-department.vue'); },
});
XtRouter.addRouter({
    name: 'DepartmentDistrict',
    path: '/department/district',
    component: function () { return import(/* webpackChunkName: "DepartmentDistrict" */ './normal/district-department.vue'); },
});
XtRouter.addRouter({
    name: 'DepartmentSchoolSort',
    path: '/department/school_sort',
    component: function () { return import(/* webpackChunkName: "DepartmentSchoolSort" */ './normal/school-sort-department.vue'); },
});
XtRouter.addRouter({
    name: 'DepartmentSchool',
    path: '/department/school',
    component: function () { return import(/* webpackChunkName: "DepartmentSchool" */ './normal/school-department.vue'); },
});
XtRouter.addRouter({
    name: 'DepartmentClassSort',
    path: '/department/class_sort',
    component: function () { return import(/* webpackChunkName: "DepartmentClassSort" */ './normal/class-sort-department.vue'); },
});
XtRouter.addRouter({
    name: 'DepartmentClass',
    path: '/department/class',
    component: function () { return import(/* webpackChunkName: "DepartmentClass" */ './normal/class-department.vue'); },
});
XtRouter.addRouter({
    name: 'DepartmentGroup',
    path: '/department/group',
    component: function () { return import(/* webpackChunkName: "DepartmentGroup" */ './normal/group-department.vue'); },
});
XtRouter.addRouter({
    name: 'DepartmentTeacher',
    path: '/department/teacher',
    component: function () { return import(/* webpackChunkName: "DepartmentTeacher" */ './normal/teacher-department.vue'); },
});
XtRouter.addRouter({
    name: 'DepartmentCourse',
    path: '/department/course',
    component: function () { return import(/* webpackChunkName: "DepartmentCourse" */ './normal/course-department.vue'); },
});
XtRouter.addRouter({
    name: 'DepartmentParent',
    path: '/department/parent',
    component: function () { return import(/* webpackChunkName: "DepartmentParent" */ './normal/parent-department.vue'); },
});
XtRouter.addRouter({
    name: 'DepartmentStudent',
    path: '/department/student',
    component: function () { return import(/* webpackChunkName: "DepartmentStudent" */ './normal/student-department.vue'); },
});
XtRouter.addRouter({
    name: 'DepartmentStudentAdd',
    path: '/department/student/add',
    component: function () { return import(/* webpackChunkName: "DepartmentStudentAdd" */ './normal/student-add-department.vue'); },
});
XtRouter.addRouter({
    name: 'DepartmentInstructor',
    path: '/department/instructor',
    component: function () { return import(/* webpackChunkName: "DepartmentInstructors" */ './normal/instructor-department.vue'); },
});
//# sourceMappingURL=department.rt.js.map