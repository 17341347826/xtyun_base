// 查询所有一类的接口
export class QueryAll {
    public fk_unit_id: string  = '';
    public status: string = '1';
}
export class QueryAllUnit {
    // 上级单位编号
    public fk_parent_id: string | null = null;
    // 记录编号
    public id: string | null = null;
    // 数据状态（-1：无效；0：停用；1：启用；）
    public status: string = '1';
    // 单位等级（1：省；2：市；3：区；4：校）
    public unit_level: string | null = null;
    public list_unit_level: any = null;
}


/**
 * 查询分页所有的用户信息列表
 */
export class PageQuery {
    //单位编号
    public fk_unit_id: string | null = null;
    // 第几页
    public page_num: number = 0;
    // 多少条数据
    public page_size: number = 10;
}

export class Teacher {
    public account: string | null = null;
    public name: string | null = null;
    public phone: string | null = null;
    public role: string | null = null;
    public useStatus:string | null = null;
    public resetPassword:string | null = null;
}

export class Parent {
    public account: string | null = null;
    public name: string | null = null;
    public phone: string | null = null;
    public mail: string | null = null;
    public role: string | null = null;
    public useStatus:string | null = null;
    public resetPassword:string | null = null;
}

/**
 * 查询角色参数
 */
export class RoleQueryParam {
    public id: string | null = null;
    public page_num: number = 0;
    public page_size: number = 999999;
    public parent_id: string | null = null;
    public role_name: string | null = null;
    public role_rank: number | null = null;
    public role_type: number | null = null;
    public status: string | null = null;//-1：无效；0：停用；1：启用；2：创建待审核；3：审核未通过
}

/**
 * 保存或修改用户信息
 */
export class SaveUser {
    public cell_phone_num: string | null = ''; // 手机号
    public custom_user_name: string | null = null; // 自定义用户名称
    public email: string | null = null; // 邮箱
    public fk_role_id: string | null = null; // 默认角色编号
    public fk_unit_id: string | null = null; // 单位编号-保存时，必传
    public fk_user_id: string | null = null; //  用户编号（不是登陆者编号）
    public head_sculpture: string | null = null; //  头像
    public id: string | null = null; // 记录编号-修改时，必传
    public remark: string | null = null; // 备注
    public role_ids: string | null = null; // 角色编号字符串-逗号分隔-保存时，必传
    public role_info: object = {}; // 默认角色编号
    public status: string | null = null; // 使用状态（0：停用；1：启用；2：创建待审核；3：审核未通过）-保存时，必传
    public unit_name: string | null = null; // 单位名称
    public user_account: string | null = null; // 用户账号-保存时，必传
    public user_name: string | null = null; // 用户名称
    public user_password: string | null = null; // 用户密码-保存时，必传
    public user_password_flag: string | null = '0'; // 是否修改过初始密码（0：否；1：是）
    public user_type: string | null = null; // 用户类型（1：省；2：市；3：区；4：校；5：教师；6：学生；7：家长）-保存时，必传
    public wechat_id: string | null = null; // 微信号
}
export class AddUser {
    // 联系电话
    public contact_num: string | null = null;
    // 记录编号
    public id: string | null = null;
    // 备注
    public remark: string | null = null;
    // 多个角色 字符串逗号分隔
    public role_ids: string | null = null;
    // 默认角色信息
    public role_info: object = {};
    // 用户名
    public teacher_name: string | null = null;
    // 用户账号
    public teacher_num: string | null = null;
    // 教师职务
    public teacher_position: string | null = null;
    // 用户类型（1：省；2：市；3：区；4：校；5：教师；6：学生；7：家长）-保存时，必传
    public teacher_title: string | null = null;
    // 单位信息
    public unit_info: object = {};
}

/**
 * 批量用户修改状态、重置密码
 */
export class EditUser {
    public ids: string | null = null; // 记录编号字符串
    public status: string | null = null;// 状态（-1：无效；0：停用；1：启用；2：创建待审核；3：审核未通过）
    public user_password: string | null = null; // 用户密码
    public key: string | null = null; // 上传文件令牌
}

/**
 *查询进度信息
 * */
export class ProgressInfo {
    public tota_num:number = 0; // 总数
    public current_num	: number = 0; // 当前数
    public error_msg: string | null = null; // 错误消息
    public stage_desc: string | null = null; // 阶段描述
    public ref: string | null = null; // 引用（创建者）

}
/**
 *
 * */
export class CheckUpload {
    public Token: string | null = null;
}
