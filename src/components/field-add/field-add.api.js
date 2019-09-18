import * as tslib_1 from "tslib";
import { ICloud } from '@/components/common/common';
var FieldAddCloud = /** @class */ (function (_super) {
    tslib_1.__extends(FieldAddCloud, _super);
    function FieldAddCloud() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FieldAddCloud.prototype.add_basic_info = function (addBasicInfo) {
        return this.post(this.api('basic_info_attr/save_or_modify_basic_info_attr'), addBasicInfo);
    };
    FieldAddCloud.prototype.list_tree_basic_info_attr = function () {
        return this.post(this.api('basic_info_attr/list_tree_all_basic_info_attr'), {});
    };
    FieldAddCloud.prototype.remove_basic_info = function (id) {
        return this.post(this.api('basic_info_attr/remove_basic_info_attr_by_id'), id);
    };
    FieldAddCloud.prototype.find_list = function (projectParam) {
        return this.post(this.api('sys_system_name/find_list'), projectParam);
    };
    return FieldAddCloud;
}(ICloud));
export { FieldAddCloud };
//# sourceMappingURL=field-add.api.js.map