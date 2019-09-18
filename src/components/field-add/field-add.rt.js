import { XtRouter } from '@/common/common.ts';
XtRouter.addRouter({
    name: 'FieldAdd',
    path: '/field_add',
    component: function () { return import(/* webpackChunkName: "FieldAdd" */ './field-add.vue'); },
});
//# sourceMappingURL=field-add.rt.js.map