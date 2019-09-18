import * as tslib_1 from "tslib";
import { ICloud } from '@/components/common/common';
var UserManagementCloud = /** @class */ (function (_super) {
    tslib_1.__extends(UserManagementCloud, _super);
    function UserManagementCloud() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UserManagementCloud.prototype.list_all_unit_info = function () {
        return this.post(this.api('unit/list_all_unit_info'), {});
    };
    UserManagementCloud.prototype.list_all_unit_info_by_id = function (queryAllUnit) {
        return this.post(this.api('unit/list_all_unit_info'), queryAllUnit);
    };
    UserManagementCloud.prototype.list_all_district_info = function () {
        return this.post(this.api('unit/list_page_all_unit_info'), {});
    };
    UserManagementCloud.prototype.getRoleList = function (roleQuery) {
        return this.post(this.api('sys_role/find_page_list'), roleQuery);
    };
    UserManagementCloud.prototype.getAllUserData = function (pageQuery) {
        return this.post(this.api('user/list_page_all_user_info'), pageQuery);
    };
    UserManagementCloud.prototype.ces = function (obj) {
        return this.post(this.api('user/list_page_all_user_info'), obj);
    };
    UserManagementCloud.prototype.saveUser = function (saveUser) {
        return this.post(this.api('user/save_or_modify_user_info'), saveUser);
    };
    UserManagementCloud.prototype.save_or_modify_teacher_info = function () {
        return this.post(this.api('teacher/save_or_modify_teacher_inf'), {});
    };
    UserManagementCloud.prototype.deleteUser = function (id) {
        return this.post(this.api('user/remove_user_info_by_id'), {
            id: id,
        });
    };
    UserManagementCloud.prototype.getUserInfo = function (id) {
        return this.post(this.api('user/get_user_info_by_id'), {
            id: id,
        });
    };
    /**
     * 根据编号修改用户状态
     */
    UserManagementCloud.prototype.updateUserStatus = function (id, userStatus) {
        return this.post(this.api('user/modify_user_info_status_by_id'), {
            id: id,
            status: userStatus,
        });
    };
    /**
     * 批量修改用户状态
     */
    UserManagementCloud.prototype.mulitpleEditUserStatus = function (id, userStatus) {
        return this.post(this.api('user/batch_modify_user_status'), {
            ids: id,
            status: userStatus,
        });
    };
    /**
     * 批量删除用户信息
     */
    UserManagementCloud.prototype.mulitpleDelUserInfo = function (id) {
        return this.post(this.api('user/batch_remove_user_info'), {
            ids: id,
        });
    };
    /**
     * 批量导入用户信息
     */
    UserManagementCloud.prototype.mulitpleImportUserInfo = function (Key) {
        return this.post(this.api('user/batch_import_user_info'), {
            key: Key,
        });
    };
    /**
     * 查询进度信息
     */
    UserManagementCloud.prototype.getProccess = function (apiName) {
        return this.post(this.api('public/get_proccess'), {
            api_name: apiName,
        });
    };
    /**
     * 批量重置密码
     */
    UserManagementCloud.prototype.mulitpleResetUserPassword = function (id, password) {
        return this.post(this.api('user/batch_modify_user_user_password'), {
            ids: id,
            user_password: password,
        });
    };
    UserManagementCloud.prototype.get_unit_info_by_id = function (id) {
        return this.post(this.api('unit/get_unit_info_by_id'), { id: id });
    };
    /**
     * 查询全部班级
     */
    UserManagementCloud.prototype.list_all_class_info = function (queryAllClass) {
        return this.post(this.api('class/list_all_class_info'), queryAllClass);
    };
    /**
     * 查询全部年级
     */
    UserManagementCloud.prototype.list_all_grade_info = function (queryAllGrade) {
        return this.post(this.api('grade/list_all_grade_info'), queryAllGrade);
    };
    return UserManagementCloud;
}(ICloud));
export { UserManagementCloud };
//# sourceMappingURL=user-management.api.js.map