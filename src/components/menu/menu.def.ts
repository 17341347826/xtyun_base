/**
 * 获取项目列表参数
 */
export class ProjectParam {
    public id: string | null = null;
    public status: string | null = null;
    public system_name: string | null = null;
}

/**
 * 项目列表对象
 */
export class Project {
    public id: string | null = null;
    public system_name: string | null = null;
    public status: string | null = null;
    public remark: string | null = null;
}

/**
 * 菜单请求参数
 */
export class MenuParam {
    public role_id: string | null = null;
    public parent_id: string | null = null;
    public system_id: any = null;
}

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
export class Menu {
    public id: string | null = null;
    public parent_id: string | null = null;
    public menu_name: string | null = null;
    public menu_type: number | null = null;
    public icon: string | null = null;
    public order_number: number | null = null;
    public permission: string | null = null;
    public url: string | null = null;
    public version_num: string | null = null;
    public remark: string | null = null;
    public button_identify: string | null = null;
    public visible_roles: string | null = null;
    public system_name_do = {
        id:null
    };
    public role_list: Array<any> = [{
        id: null
    }];
}

/**
 * 修改的菜单参数
 */
export class MenuUpdateParam {
    public id: string | null = null;
    public parent_id: string | null = null;
    public menu_name: string | null = null;
    public menu_type: number | null = null;
    public icon: string | null = null;
    public order_number: number | null = null;
    public permission: string | null = null;
    public remark: string | null = null;
    public identify: string | null = null;
    public url: string | null = null;
    public system_name_do = {
        id: null
    };
}

/**
 * 查询角色参数
 */
export class RoleQueryParam {
    public id: string | null = null;
    public parent_id: string | null = null;
    public role_name: string | null = null;
    public role_rank: number | null = null;
    public role_type: number | null = null;
    public status: string | null = null;

}
export class MenuByUser {
    public role_id: string | null = null;
    public system_id: string | null = null;
}


