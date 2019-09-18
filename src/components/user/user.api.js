import * as tslib_1 from "tslib";
import { ICloud } from '@/components/common/common';
var UserCloud = /** @class */ (function (_super) {
    tslib_1.__extends(UserCloud, _super);
    function UserCloud() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UserCloud.prototype.login = function (userLogin) {
        return this.post(this.api('user/login'), userLogin);
    };
    UserCloud.prototype.getFindList = function (projectParam) {
        return this.post(this.api('sys_system_name/find_list'), projectParam);
    };
    UserCloud.prototype.find_menus_by_user = function (menuByUser) {
        return this.post(this.api('unit_and_role_and_menu_info/find_menus_by_user'), menuByUser);
    };
    UserCloud.prototype.get_unit_info_by_id = function (id) {
        return this.post(this.api('unit/get_unit_info_by_id'), { id: id });
    };
    UserCloud.prototype.list_all_unit_info = function (id) {
        return this.post(this.api('unit/list_all_unit_info'), { id: id });
    };
    UserCloud.prototype.save_or_modify_user_info = function (updateRole) {
        return this.post(this.api('user/save_or_modify_user_info'), updateRole);
    };
    return UserCloud;
}(ICloud));
export { UserCloud };
//# sourceMappingURL=user.api.js.map