var UserLogin = /** @class */ (function () {
    function UserLogin() {
        this.user_account = null;
        this.user_password = null;
    }
    UserLogin.prototype.reset = function () {
        this.user_account = '';
        this.user_password = '';
    };
    return UserLogin;
}());
export { UserLogin };
var MenuByUser = /** @class */ (function () {
    function MenuByUser() {
        this.role_id = null;
        this.system_id = null;
    }
    return MenuByUser;
}());
export { MenuByUser };
var SaveUser = /** @class */ (function () {
    function SaveUser() {
        // 记录编号
        this.id = null;
        // 默认角色编号
        this.role_info = {
            id: '',
        };
    }
    return SaveUser;
}());
export { SaveUser };
//# sourceMappingURL=user.def.js.map