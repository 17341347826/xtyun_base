import { UserCloud } from '@/components/user/user.api';
var UserCnt = /** @class */ (function () {
    function UserCnt() {
        this.cloud = new UserCloud();
        this.cloud.set_server_ip(/**/ window.location.origin);
    }
    return UserCnt;
}());
export default new UserCnt();
//# sourceMappingURL=user.cnt.js.map