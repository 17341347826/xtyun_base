import { DepartmentCloud } from './department.api';
var DepartmentCnt = /** @class */ (function () {
    function DepartmentCnt() {
        this.cloud = new DepartmentCloud();
        this.cloud.set_server_ip(/**/ window.location.origin);
    }
    return DepartmentCnt;
}());
export default new DepartmentCnt();
//# sourceMappingURL=department.cnt.js.map