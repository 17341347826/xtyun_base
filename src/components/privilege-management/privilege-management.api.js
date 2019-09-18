import * as tslib_1 from "tslib";
import { ICloud } from '@/components/common/common';
var privilegeCloud = /** @class */ (function (_super) {
    tslib_1.__extends(privilegeCloud, _super);
    function privilegeCloud() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * 用户权限表格数据
     * @param param
     */
    privilegeCloud.prototype.getPrivilege = function (param) {
        return this.post(this.api('sys_role/find_page_list_not_have_my_role'), param);
    };
    /**
     * 获取大角色列表
     * @param param
     */
    privilegeCloud.prototype.getBitRoles = function (param) {
        return this.post(this.api('sys_role/find_list_not_have_my_role'), param);
    };
    privilegeCloud.prototype.getBitRolesHaveMe = function (param) {
        return this.post(this.api('sys_role/find_list'), param);
    };
    /**
     * 添加角色
     * @param param
     */
    privilegeCloud.prototype.addRole = function (param) {
        return this.post(this.api('sys_role/save'), param);
    };
    /**
     * 删除角色
     * @param ids
     */
    privilegeCloud.prototype.deleteRole = function (ids) {
        return this.post(this.api('sys_role/delete_logic'), { ids: ids });
    };
    /**
     * 修改角色
     * @param param
     */
    privilegeCloud.prototype.updateRole = function (param) {
        return this.post(this.api('sys_role/update'), param);
    };
    /**
     * 功能开放管理表格数据查询
     * @param queryAllInfo
     */
    privilegeCloud.prototype.queryOpenFun = function (queryAllInfo) {
        return this.post(this.api('unit/list_all_unit_info'), queryAllInfo);
    };
    /**
     * 根据用户查询菜单
     */
    privilegeCloud.prototype.find_menus_by_user = function (id) {
        return this.post(this.api('unit_and_role_and_menu_info/find_menus_by_user'), id);
    };
    privilegeCloud.prototype.find_menus_by_unit_and_role = function (queryMenuInfo) {
        return this.post(this.api('unit_and_role_and_menu_info/find_menus_by_unit_and_role'), queryMenuInfo);
    };
    privilegeCloud.prototype.find_list = function (projectParam) {
        return this.post(this.api('sys_system_name/find_list'), projectParam);
    };
    privilegeCloud.prototype.openConfigSave = function (saveList) {
        return this.post(this.api('unit_and_role_and_menu_info/flush'), saveList);
    };
    /**
     * 通过单位和角色查询菜单
     */
    privilegeCloud.prototype.find_unit_role_menu = function () {
        return this.post(this.api('unit_and_role_and_menu_info/find_menus_by_unit_and_role'), {});
    };
    privilegeCloud.prototype.lowerUnitInfo = function () {
        return this.post(this.api('unit/list_self_and_lower_and_lower_unit_info'), {});
    };
    privilegeCloud.prototype.lowerLowerUnitInfo = function (id) {
        return this.post(this.api('unit/list_self_and_lower_and_lower_unit_info'), id);
    };
    privilegeCloud.prototype.get_unit_info_by_id = function (id) {
        return this.post(this.api('unit/get_unit_info_by_id'), id);
    };
    return privilegeCloud;
}(ICloud));
export { privilegeCloud };
//# sourceMappingURL=privilege-management.api.js.map