import { AdminConfigCloud } from '@/components/admin-config/admin-config.api';
var AdminConfigCnt = /** @class */ (function () {
    function AdminConfigCnt() {
        this.cloud = new AdminConfigCloud();
        this.cloud.set_server_ip(/**/ window.location.origin);
    }
    return AdminConfigCnt;
}());
export default new AdminConfigCnt();
//# sourceMappingURL=admin-config.cnt.js.map