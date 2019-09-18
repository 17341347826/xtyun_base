import { FieldAddCloud } from '@/components/field-add/field-add.api';
var FieldAddCnt = /** @class */ (function () {
    function FieldAddCnt() {
        this.cloud = new FieldAddCloud();
        this.cloud.set_server_ip(/**/ window.location.origin);
    }
    return FieldAddCnt;
}());
export default new FieldAddCnt();
//# sourceMappingURL=field-add.cnt.js.map