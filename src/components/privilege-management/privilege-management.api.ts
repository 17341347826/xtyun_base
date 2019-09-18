import {ICloud} from '@/components/common/common';
import {
    OpenConfigSaveList,
    OpenFuntionParam,
    QueryBigRoleParam, QueryMenuInfo,
    QueryPrivilegeParam,
    UpdateRoleParam,
    User,
    QueryAllInfo,
} from '@/components/privilege-management/privilege-management.def';
import {ProjectParam} from "@/components/menu/menu.def";
export class privilegeCloud extends ICloud {
    /**
     * 用户权限表格数据
     * @param param
     */
    public getPrivilege(param: QueryPrivilegeParam): any {
        return this.post(this.api('sys_role/find_page_list_not_have_my_role'), param);
    }

    /**
     * 获取大角色列表
     * @param param
     */
    public getBitRoles(param: QueryBigRoleParam): any {
        return this.post(this.api('sys_role/find_list_not_have_my_role'), param);
    }

    public getBitRolesHaveMe(param: QueryBigRoleParam): any {
        return this.post(this.api('sys_role/find_list'), param);
    }

    /**
     * 添加角色
     * @param param
     */
    public addRole(param: User): any {
        return this.post(this.api('sys_role/save'), param);
    }

    /**
     * 删除角色
     * @param ids
     */
    public deleteRole(ids: string): any {
        return this.post(this.api('sys_role/delete_logic'), {ids: ids});
    }

    /**
     * 修改角色
     * @param param
     */
    public updateRole(param: UpdateRoleParam): any {
        return this.post(this.api('sys_role/update'), param);
    }

    /**
     * 功能开放管理表格数据查询
     * @param queryAllInfo
     */
    public queryOpenFun(queryAllInfo: QueryAllInfo): any {
        return this.post(this.api('unit/list_all_unit_info'), queryAllInfo);
    }

    /**
     * 根据用户查询菜单
     */
    public find_menus_by_user(id): any {
        return this.post(this.api('unit_and_role_and_menu_info/find_menus_by_user'), id);
    }

    public find_menus_by_unit_and_role(queryMenuInfo: QueryMenuInfo): any {
        return this.post(this.api('unit_and_role_and_menu_info/find_menus_by_unit_and_role'), queryMenuInfo);
    }

    public find_list(projectParam: ProjectParam): any {
        return this.post(this.api('sys_system_name/find_list'), projectParam);
    }

    public openConfigSave(saveList: OpenConfigSaveList): any {
        return this.post(this.api('unit_and_role_and_menu_info/flush'), saveList);
    }

    /**
     * 通过单位和角色查询菜单
     */
    public find_unit_role_menu(): any {
        return this.post(this.api('unit_and_role_and_menu_info/find_menus_by_unit_and_role'), {});
    }
    public lowerUnitInfo(): any {
        return this.post(this.api('unit/list_self_and_lower_and_lower_unit_info'), {});
    }
    public lowerLowerUnitInfo(id: object): any {
        return this.post(this.api('unit/list_self_and_lower_and_lower_unit_info'), id);
    }
    public get_unit_info_by_id(id: object): any {
        return this.post(this.api('unit/get_unit_info_by_id'), id);
    }
}


