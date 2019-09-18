import Vue from 'vue';
import Router from 'vue-router';
import { XtRouter } from '@/common/common.ts';
import './components/user/user.rt';
import './components/department/department.rt';
import './components/field-add/field-add.rt';
import './components/admin-config/admin-config.rt';
import './components/privilege-management/privilege-management.rt';
import './components/user-management/user-management.rt';
import './components/menu/menu.rt';
import './components/privilege-management/privilege-management.rt';
Vue.use(Router);
var router = new Router({
    routes: XtRouter.getRouter(),
});
XtRouter.vueRouter = router;
export default router;
//# sourceMappingURL=router.js.map