import {XtRouter} from '@/common/common.ts';



XtRouter.addRouter({ // 学期
    name: 'DepartmentSemester',
    path: '/department/semester',
    component: () => import(/* webpackChunkName: "DepartmentSemester" */  './Independent/semester-department.vue'),
});
XtRouter.addRouter({ // 年级
    name: 'DepartmentGrade',
    path: '/department/grade',
    component: () => import(/* webpackChunkName: "DepartmentGrade" */  './normal/grade-department.vue'),
});
XtRouter.addRouter({ // 科目
    name: 'DepartmentSubject',
    path: '/department/subject',
    component: () => import(/* webpackChunkName: "DepartmentSubject" */  './Independent/subject-department.vue'),
});
XtRouter.addRouter({ // 学科
    name: 'DepartmentDiscipline',
    path: '/department/discipline',
    component: () => import(/* webpackChunkName: "DepartmentDiscipline" */  './Independent/discipline-department.vue'),
});
XtRouter.addRouter({ // 区县
    name: 'DepartmentDistrict',
    path: '/department/district',
    component: () => import(/* webpackChunkName: "DepartmentDistrict" */  './normal/district-department.vue'),
});
XtRouter.addRouter({ // 学校类别
    name: 'DepartmentSchoolSort',
    path: '/department/school_sort',
    component: () => import(/* webpackChunkName: "DepartmentSchoolSort" */  './normal/school-sort-department.vue'),
});
XtRouter.addRouter({ // 学校
    name: 'DepartmentSchool',
    path: '/department/school',
    component: () => import(/* webpackChunkName: "DepartmentSchool" */  './normal/school-department.vue'),
});
XtRouter.addRouter({ // 班级类别
    name: 'DepartmentClassSort',
    path: '/department/class_sort',
    component: () => import(/* webpackChunkName: "DepartmentClassSort" */  './normal/class-sort-department.vue'),
});
XtRouter.addRouter({ // 班级
    name: 'DepartmentClass',
    path: '/department/class',
    component: () => import(/* webpackChunkName: "DepartmentClass" */  './normal/class-department.vue'),
});
XtRouter.addRouter({ // 小组
    name: 'DepartmentGroup',
    path: '/department/group',
    component: () => import(/* webpackChunkName: "DepartmentGroup" */  './normal/group-department.vue'),
});
XtRouter.addRouter({ // 教师
    name: 'DepartmentTeacher',
    path: '/department/teacher',
    component: () => import(/* webpackChunkName: "DepartmentTeacher" */  './normal/teacher-department.vue'),
});
XtRouter.addRouter({ // 任课
    name: 'DepartmentCourse',
    path: '/department/course',
    component: () => import(/* webpackChunkName: "DepartmentCourse" */  './normal/course-department.vue'),
});
XtRouter.addRouter({ // 家长
    name: 'DepartmentParent',
    path: '/department/parent',
    component: () => import(/* webpackChunkName: "DepartmentParent" */  './normal/parent-department.vue'),
});
XtRouter.addRouter({ // 学生
    name: 'DepartmentStudent',
    path: '/department/student',
    component: () => import(/* webpackChunkName: "DepartmentStudent" */  './normal/student-department.vue'),
});
XtRouter.addRouter({ // 添加学生
    name: 'DepartmentStudentAdd',
    path: '/department/student/add',
    component: () => import(/* webpackChunkName: "DepartmentStudentAdd" */  './normal/student-add-department.vue'),
});
XtRouter.addRouter({ // 教研员
    name: 'DepartmentInstructor',
    path: '/department/instructor',
    component: () => import(/* webpackChunkName: "DepartmentInstructors" */  './normal/instructor-department.vue'),
});

