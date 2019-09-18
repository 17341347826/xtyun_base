// 查询所有一类的接口
var QueryAll = /** @class */ (function () {
    function QueryAll() {
        this.fk_unit_id = '';
        this.status = '1';
    }
    return QueryAll;
}());
export { QueryAll };
var QueryAllUnit = /** @class */ (function () {
    function QueryAllUnit() {
        // 上级单位编号
        this.fk_parent_id = null;
        // 记录编号
        this.id = null;
        // 数据状态（-1：无效；0：停用；1：启用；）
        this.status = '1';
        // 单位等级（1：省；2：市；3：区；4：校）
        this.unit_level = null;
        this.list_unit_level = null;
    }
    return QueryAllUnit;
}());
export { QueryAllUnit };
/**
 * 查询分页所有的用户信息列表
 */
var PageQuery = /** @class */ (function () {
    function PageQuery() {
        //单位编号
        this.fk_unit_id = null;
        // 第几页
        this.page_num = 0;
        // 多少条数据
        this.page_size = 10;
    }
    return PageQuery;
}());
export { PageQuery };
var Teacher = /** @class */ (function () {
    function Teacher() {
        this.account = null;
        this.name = null;
        this.phone = null;
        this.role = null;
        this.useStatus = null;
        this.resetPassword = null;
    }
    return Teacher;
}());
export { Teacher };
var Parent = /** @class */ (function () {
    function Parent() {
        this.account = null;
        this.name = null;
        this.phone = null;
        this.mail = null;
        this.role = null;
        this.useStatus = null;
        this.resetPassword = null;
    }
    return Parent;
}());
export { Parent };
/**
 * 查询角色参数
 */
var RoleQueryParam = /** @class */ (function () {
    function RoleQueryParam() {
        this.id = null;
        this.page_num = 0;
        this.page_size = 999999;
        this.parent_id = null;
        this.role_name = null;
        this.role_rank = null;
        this.role_type = null;
        this.status = null; //-1：无效；0：停用；1：启用；2：创建待审核；3：审核未通过
    }
    return RoleQueryParam;
}());
export { RoleQueryParam };
/**
 * 保存或修改用户信息
 */
var SaveUser = /** @class */ (function () {
    function SaveUser() {
        this.cell_phone_num = ''; // 手机号
        this.custom_user_name = null; // 自定义用户名称
        this.email = null; // 邮箱
        this.fk_role_id = null; // 默认角色编号
        this.fk_unit_id = null; // 单位编号-保存时，必传
        this.fk_user_id = null; //  用户编号（不是登陆者编号）
        this.head_sculpture = null; //  头像
        this.id = null; // 记录编号-修改时，必传
        this.remark = null; // 备注
        this.role_ids = null; // 角色编号字符串-逗号分隔-保存时，必传
        this.role_info = {}; // 默认角色编号
        this.status = null; // 使用状态（0：停用；1：启用；2：创建待审核；3：审核未通过）-保存时，必传
        this.unit_name = null; // 单位名称
        this.user_account = null; // 用户账号-保存时，必传
        this.user_name = null; // 用户名称
        this.user_password = null; // 用户密码-保存时，必传
        this.user_password_flag = '0'; // 是否修改过初始密码（0：否；1：是）
        this.user_type = null; // 用户类型（1：省；2：市；3：区；4：校；5：教师；6：学生；7：家长）-保存时，必传
        this.wechat_id = null; // 微信号
    }
    return SaveUser;
}());
export { SaveUser };
var AddUser = /** @class */ (function () {
    function AddUser() {
        // 联系电话
        this.contact_num = null;
        // 记录编号
        this.id = null;
        // 备注
        this.remark = null;
        // 多个角色 字符串逗号分隔
        this.role_ids = null;
        // 默认角色信息
        this.role_info = {};
        // 用户名
        this.teacher_name = null;
        // 用户账号
        this.teacher_num = null;
        // 教师职务
        this.teacher_position = null;
        // 用户类型（1：省；2：市；3：区；4：校；5：教师；6：学生；7：家长）-保存时，必传
        this.teacher_title = null;
        // 单位信息
        this.unit_info = {};
    }
    return AddUser;
}());
export { AddUser };
/**
 * 批量用户修改状态、重置密码
 */
var EditUser = /** @class */ (function () {
    function EditUser() {
        this.ids = null; // 记录编号字符串
        this.status = null; // 状态（-1：无效；0：停用；1：启用；2：创建待审核；3：审核未通过）
        this.user_password = null; // 用户密码
        this.key = null; // 上传文件令牌
    }
    return EditUser;
}());
export { EditUser };
/**
 *查询进度信息
 * */
var ProgressInfo = /** @class */ (function () {
    function ProgressInfo() {
        this.tota_num = 0; // 总数
        this.current_num = 0; // 当前数
        this.error_msg = null; // 错误消息
        this.stage_desc = null; // 阶段描述
        this.ref = null; // 引用（创建者）
    }
    return ProgressInfo;
}());
export { ProgressInfo };
/**
 *
 * */
var CheckUpload = /** @class */ (function () {
    function CheckUpload() {
        this.Token = null;
    }
    return CheckUpload;
}());
export { CheckUpload };
//# sourceMappingURL=user-management.def.js.map