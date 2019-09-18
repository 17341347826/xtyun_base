import { UserManagementCloud } from '@/components/user-management/user-management.api';
var userManagementCnt = /** @class */ (function () {
    function userManagementCnt() {
        this.cloud = new UserManagementCloud();
        this.cloud.set_server_ip(/**/ window.location.origin);
    }
    return userManagementCnt;
}());
export default new userManagementCnt();
//# sourceMappingURL=user-management.cnt.js.map