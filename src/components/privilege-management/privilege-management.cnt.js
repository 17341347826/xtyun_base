import { privilegeCloud } from '@/components/privilege-management/privilege-management.api';
var privilegeCnt = /** @class */ (function () {
    function privilegeCnt() {
        this.cloud = new privilegeCloud();
        this.cloud.set_server_ip(/**/ window.location.origin);
    }
    return privilegeCnt;
}());
export default new privilegeCnt();
//# sourceMappingURL=privilege-management.cnt.js.map