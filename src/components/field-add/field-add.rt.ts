import {XtRouter} from '@/common/common.ts';


XtRouter.addRouter({
    name: 'FieldAdd',
    path: '/field_add',
    component: () => import(/* webpackChunkName: "FieldAdd" */  './field-add.vue'),
});
