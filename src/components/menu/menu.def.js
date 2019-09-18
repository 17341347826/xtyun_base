/**
 * 获取项目列表参数
 */
var ProjectParam = /** @class */ (function () {
    function ProjectParam() {
        this.id = null;
        this.status = null;
        this.system_name = null;
    }
    return ProjectParam;
}());
export { ProjectParam };
/**
 * 项目列表对象
 */
var Project = /** @class */ (function () {
    function Project() {
        this.id = null;
        this.system_name = null;
        this.status = null;
        this.remark = null;
    }
    return Project;
}());
export { Project };
/**
 * 菜单请求参数
 */
var MenuParam = /** @class */ (function () {
    function MenuParam() {
        this.role_id = null;
        this.parent_id = null;
        this.system_id = null;
    }
    return MenuParam;
}());
export { MenuParam };
// export class MenuParam {
//     public id: string | null = null;
//     public menu_name: string | null = null;
//     public menu_type: number | null = null;
//     public parent_id: string | null = null;
//     public status: string | null = null;
//     public url: string | null = null;
//     public system_name_do = {
//         id:null
//     };
// }
/**
 * 添加的菜单对象
 */
var Menu = /** @class */ (function () {
    function Menu() {
        this.id = null;
        this.parent_id = null;
        this.menu_name = null;
        this.menu_type = null;
        this.icon = null;
        this.order_number = null;
        this.permission = null;
        this.url = null;
        this.version_num = null;
        this.remark = null;
        this.button_identify = null;
        this.visible_roles = null;
        this.system_name_do = {
            id: null
        };
        this.role_list = [{
                id: null
            }];
    }
    return Menu;
}());
export { Menu };
/**
 * 修改的菜单参数
 */
var MenuUpdateParam = /** @class */ (function () {
    function MenuUpdateParam() {
        this.id = null;
        this.parent_id = null;
        this.menu_name = null;
        this.menu_type = null;
        this.icon = null;
        this.order_number = null;
        this.permission = null;
        this.remark = null;
        this.identify = null;
        this.url = null;
        this.system_name_do = {
            id: null
        };
    }
    return MenuUpdateParam;
}());
export { MenuUpdateParam };
/**
 * 查询角色参数
 */
var RoleQueryParam = /** @class */ (function () {
    function RoleQueryParam() {
        this.id = null;
        this.parent_id = null;
        this.role_name = null;
        this.role_rank = null;
        this.role_type = null;
        this.status = null;
    }
    return RoleQueryParam;
}());
export { RoleQueryParam };
var MenuByUser = /** @class */ (function () {
    function MenuByUser() {
        this.role_id = null;
        this.system_id = null;
    }
    return MenuByUser;
}());
export { MenuByUser };
//# sourceMappingURL=menu.def.js.map