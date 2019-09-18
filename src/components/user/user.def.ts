export class UserLogin {
    public user_account: string | null = null;
    public user_password: string | null = null;

    public reset(): void {
        this.user_account = '';
        this.user_password = '';
    }
}

export class MenuByUser {
    public role_id: string | null = null;
    public system_id: string | null = null;
}

export class SaveUser {
    // 记录编号
    public id: string | null = null;
    // 默认角色编号
    public role_info: object = {
        id: '',
    };
}
