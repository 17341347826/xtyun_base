import * as tslib_1 from "tslib";
import { ICloud } from '@/components/common/common';
var AdminConfigCloud = /** @class */ (function (_super) {
    tslib_1.__extends(AdminConfigCloud, _super);
    function AdminConfigCloud() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AdminConfigCloud.prototype.list_tree_all_basic_info_attr = function () {
        return this.post(this.api('basic_info_attr/list_tree_all_basic_info_attr'), {});
    };
    AdminConfigCloud.prototype.save_or_modify_basic_info_config = function (saveList) {
        return this.post(this.api('basic_info_config/save_or_modify_basic_info_config'), saveList);
    };
    AdminConfigCloud.prototype.get_basic_info_config_by_another_name = function (another_name) {
        return this.post(this.api('basic_info_config/get_basic_info_config_by_another_name'), { another_name: another_name });
    };
    return AdminConfigCloud;
}(ICloud));
export { AdminConfigCloud };
//# sourceMappingURL=admin-config.api.js.map