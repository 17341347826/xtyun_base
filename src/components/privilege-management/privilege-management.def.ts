export class PrivilegeInfo {
    public date: string | null = null;
    public name: string | null = null;
    public province: string | null = null;
    public city: string | null = null;
    public address: string | null = null;
    public zip: number = -1;
}

export class User {
    public role_name: string | null = null;
    public role_rank: string | null = null;
    public role_type: string | null = null;
    public parent_id: string | null = null;
}

export class BaseSelect {
    public provinceValue: string | null = null;
    public cityValue: string | null = null;
    public districtValue: string | null = null;
    public schoolValue: string | null = null;
    public unitCode: string | null = null;
}

export class SelectField {
    public label: string | null = null;
    public value: string | null = null;
}


export class UserHttp {
    static readonly HTTP_X: any = window.location.origin + '/';
}

/**
 * 查询权限列表参数
 */
export class QueryPrivilegeParam {
    public id: string | null = null;
    public parent_id: string | null = null;
    public role_name: string | null = null;
    public role_rank: number | null = null;
    public role_type: number | null = null;
    public status: string | null = null;
    public page_num: number | null = null;
    public page_size: number | null = null;
    public fk_creator_unit_id: string | null = null;
}

/**
 * 查询大角色
 */
export class QueryBigRoleParam {
    public id: string | null = null;
    public parent_id: string | null = null;
    public role_name: string | null = null;
    public role_rank: number | null = null;
    public role_type: number | null = null;
    public status: string | null = null;
}

/**
 * 修改角色参数
 */
export class UpdateRoleParam {
    public id: string | null = null;
    public role_name: string | null = null;
    public role_rank:number | null = null;
    public role_type:number | null = null;
    public parent_id: string | null = null;
}


export class OpenFuntionParam {
    public page_num:number | null = null;
    public page_size:number | null = null;
}


/**
 *通过单位和角色查询菜单
 * */
export class QueryMenuInfo {
    // 角色id
    public role_id: string | null = null;
    // 角色等级
    public role_rank: string | null = null;
    // 角色类型
    public role_type: string | null = null;
    // 单位id
    public unit_id: string | null = null;
}

export class OpenConfigSaveList {
    // 要删除的菜单id
    delete_menus: object[] = [];
    // 角色id
    role_id: string | null = null;
    // 要保存的菜单id
    save_menus: object[] = [];
    // 单位id
    unit_id: string | null = null;
}

export  class CombinMenuList {
    public systemInfo: object = {};
    public menuInfo: any = [];
}


// 查询所有单位
export class QueryAllInfo {
    public fk_parent_id: string | null = null;
    public id: string | null = null;
    public status: string = '1';
    public unit_level: string | null = null;
}