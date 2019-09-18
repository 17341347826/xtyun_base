var PrivilegeInfo = /** @class */ (function () {
    function PrivilegeInfo() {
        this.date = null;
        this.name = null;
        this.province = null;
        this.city = null;
        this.address = null;
        this.zip = -1;
    }
    return PrivilegeInfo;
}());
export { PrivilegeInfo };
var User = /** @class */ (function () {
    function User() {
        this.role_name = null;
        this.role_rank = null;
        this.role_type = null;
        this.parent_id = null;
    }
    return User;
}());
export { User };
var BaseSelect = /** @class */ (function () {
    function BaseSelect() {
        this.provinceValue = null;
        this.cityValue = null;
        this.districtValue = null;
        this.schoolValue = null;
        this.unitCode = null;
    }
    return BaseSelect;
}());
export { BaseSelect };
var SelectField = /** @class */ (function () {
    function SelectField() {
        this.label = null;
        this.value = null;
    }
    return SelectField;
}());
export { SelectField };
var UserHttp = /** @class */ (function () {
    function UserHttp() {
    }
    UserHttp.HTTP_X = window.location.origin + '/';
    return UserHttp;
}());
export { UserHttp };
/**
 * 查询权限列表参数
 */
var QueryPrivilegeParam = /** @class */ (function () {
    function QueryPrivilegeParam() {
        this.id = null;
        this.parent_id = null;
        this.role_name = null;
        this.role_rank = null;
        this.role_type = null;
        this.status = null;
        this.page_num = null;
        this.page_size = null;
        this.fk_creator_unit_id = null;
    }
    return QueryPrivilegeParam;
}());
export { QueryPrivilegeParam };
/**
 * 查询大角色
 */
var QueryBigRoleParam = /** @class */ (function () {
    function QueryBigRoleParam() {
        this.id = null;
        this.parent_id = null;
        this.role_name = null;
        this.role_rank = null;
        this.role_type = null;
        this.status = null;
    }
    return QueryBigRoleParam;
}());
export { QueryBigRoleParam };
/**
 * 修改角色参数
 */
var UpdateRoleParam = /** @class */ (function () {
    function UpdateRoleParam() {
        this.id = null;
        this.role_name = null;
        this.role_rank = null;
        this.role_type = null;
        this.parent_id = null;
    }
    return UpdateRoleParam;
}());
export { UpdateRoleParam };
var OpenFuntionParam = /** @class */ (function () {
    function OpenFuntionParam() {
        this.page_num = null;
        this.page_size = null;
    }
    return OpenFuntionParam;
}());
export { OpenFuntionParam };
/**
 *通过单位和角色查询菜单
 * */
var QueryMenuInfo = /** @class */ (function () {
    function QueryMenuInfo() {
        // 角色id
        this.role_id = null;
        // 角色等级
        this.role_rank = null;
        // 角色类型
        this.role_type = null;
        // 单位id
        this.unit_id = null;
    }
    return QueryMenuInfo;
}());
export { QueryMenuInfo };
var OpenConfigSaveList = /** @class */ (function () {
    function OpenConfigSaveList() {
        // 要删除的菜单id
        this.delete_menus = [];
        // 角色id
        this.role_id = null;
        // 要保存的菜单id
        this.save_menus = [];
        // 单位id
        this.unit_id = null;
    }
    return OpenConfigSaveList;
}());
export { OpenConfigSaveList };
var CombinMenuList = /** @class */ (function () {
    function CombinMenuList() {
        this.systemInfo = {};
        this.menuInfo = [];
    }
    return CombinMenuList;
}());
export { CombinMenuList };
// 查询所有单位
var QueryAllInfo = /** @class */ (function () {
    function QueryAllInfo() {
        this.fk_parent_id = null;
        this.id = null;
        this.status = '1';
        this.unit_level = null;
    }
    return QueryAllInfo;
}());
export { QueryAllInfo };
//# sourceMappingURL=privilege-management.def.js.map