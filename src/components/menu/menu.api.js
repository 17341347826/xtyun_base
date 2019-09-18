import * as tslib_1 from "tslib";
import { ICloud } from '@/components/common/common';
var MenuCloud = /** @class */ (function (_super) {
    tslib_1.__extends(MenuCloud, _super);
    function MenuCloud() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * 获取项目列表
     * @returns {any}
     */
    MenuCloud.prototype.getProjects = function (projectParam) {
        return this.post(this.api('sys_system_name/find_list'), projectParam);
    };
    /**
     * 添加项目
     * @returns {any}
     * @param systemName
     * @param mainIndex
     * @param systemExplain
     * @param systemIcon
     */
    MenuCloud.prototype.addProject = function (systemName, mainIndex, systemExplain, systemIcon) {
        return this.post(this.api('sys_system_name/save'), {
            system_name: systemName,
            main_index: mainIndex,
            system_explain: systemExplain,
            system_icon: systemIcon,
        });
    };
    /**
     * 上传图片
     */
    MenuCloud.prototype.addUploade = function (token, file) {
        return this.post(this.api('file/uploader_base64'), {
            token: token,
            file: file
        });
    };
    /**
     * 删除项目
     * @param {string} ids
     * @returns {any}
     */
    MenuCloud.prototype.delProject = function (ids) {
        return this.post(this.api('sys_system_name/delete_logic'), {
            ids: ids
        });
    };
    // 修改
    MenuCloud.prototype.update = function (updateInfo) {
        return this.post(this.api('sys_system_name/update'), updateInfo);
    };
    /**
     * 获取菜单数据
     * @param {MenuParam} param
     * @returns {any}
     */
    MenuCloud.prototype.getMenus = function (param) {
        return this.post(this.api('sys_role_menu/find_menu_list'), param);
    };
    /**
     * 根据用户查询菜单
     */
    MenuCloud.prototype.getUserMenus = function (menuByUser) {
        return this.post(this.api('unit_and_role_and_menu_info/find_menus_by_user'), menuByUser);
    };
    /**
     * 添加菜单
     * @param {Menu} menu
     * @returns {any}
     */
    MenuCloud.prototype.addMenus = function (menu) {
        return this.post(this.api('sys_menu/save'), menu);
    };
    /**
     * 修改菜单
     * @param menu
     */
    // public updateMenus(param: MenuUpdateParam): any {
    //     return this.post(this.api('sys_menu/update'), param);
    // }
    MenuCloud.prototype.updateMenus = function (menu) {
        return this.post(this.api('sys_menu/update'), menu);
    };
    /**
     * 删除菜单
     * @param id
     */
    MenuCloud.prototype.deleteMenu = function (id) {
        return this.post(this.api('sys_menu/delete_logic'), {
            ids: id
        });
    };
    /**
     * 查询按钮标识列表
     */
    MenuCloud.prototype.queryBtnIdentification = function () {
        return this.post(this.api('sys_button_identify/find_list'), {});
    };
    MenuCloud.prototype.queryRoles = function (param) {
        return this.post(this.api('sys_role/find_list'), param);
    };
    MenuCloud.prototype.getBitRolesHaveMe = function (param) {
        return this.post(this.api('sys_role/find_list'), param);
    };
    return MenuCloud;
}(ICloud));
export { MenuCloud };
//# sourceMappingURL=menu.api.js.map