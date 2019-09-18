import {ICloud} from '@/components/common/common';
import {ProjectParam, MenuParam, Menu, MenuUpdateParam, RoleQueryParam, MenuByUser} from './menu.def';
import {QueryBigRoleParam} from "@/components/privilege-management/privilege-management.def";

export class MenuCloud extends ICloud {
    /**
     * 获取项目列表
     * @returns {any}
     */
    public getProjects(projectParam: ProjectParam): any {
        return this.post(this.api('sys_system_name/find_list'), projectParam);
    }
    
    /**
     * 添加项目
     * @returns {any}
     * @param systemName
     * @param mainIndex
     * @param systemExplain
     * @param systemIcon
     */
    public addProject(systemName: string | null, mainIndex:string | null, systemExplain:string | null, systemIcon:string | null,): any {
        return this.post(this.api('sys_system_name/save'), {
            system_name: systemName,
            main_index: mainIndex,
            system_explain: systemExplain,
            system_icon: systemIcon,
        });
    }
    /**
     * 上传图片
     */
    public addUploade(token: string | null, file:any): any {
        return this.post(this.api('file/uploader_base64'), {
            token: token,
            file: file
        });
    }

    /**
     * 删除项目
     * @param {string} ids
     * @returns {any}
     */
    public delProject(ids: string | null): any {
        return this.post(this.api('sys_system_name/delete_logic'), {
            ids: ids
        });
    }
    
    // 修改
    public update(updateInfo): any {
        return this.post(this.api('sys_system_name/update'), updateInfo)
    }
    
    /**
     * 获取菜单数据
     * @param {MenuParam} param
     * @returns {any}
     */
    public getMenus(param: MenuParam): any {
        return this.post(this.api('sys_role_menu/find_menu_list'), param);
    }

    /**
     * 根据用户查询菜单
     */
    public getUserMenus(menuByUser: MenuByUser): any {
        return this.post(this.api('unit_and_role_and_menu_info/find_menus_by_user'), menuByUser);
    }

    /**
     * 添加菜单
     * @param {Menu} menu
     * @returns {any}
     */
    public addMenus(menu: Menu): any {
        return this.post(this.api('sys_menu/save'), menu);
    }
    
    /**
     * 修改菜单
     * @param menu
     */
    // public updateMenus(param: MenuUpdateParam): any {
    //     return this.post(this.api('sys_menu/update'), param);
    // }
    public updateMenus(menu: Menu): any {
        return this.post(this.api('sys_menu/update'), menu);
    }
    /**
     * 删除菜单
     * @param id
     */
    public deleteMenu(id: string): any {
        return this.post(this.api('sys_menu/delete_logic'), {
            ids: id
        });
    }

    /**
     * 查询按钮标识列表
     */
    public queryBtnIdentification(): any {
        return this.post(this.api('sys_button_identify/find_list'), {});
    }

    public queryRoles(param: RoleQueryParam): any {
        return this.post(this.api('sys_role/find_list'), param);
    }
    
    public getBitRolesHaveMe(param: QueryBigRoleParam): any {
        return this.post(this.api('sys_role/find_list'), param);
    }

}


