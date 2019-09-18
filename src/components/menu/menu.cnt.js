import { MenuCloud } from '@/components/menu/menu.api';
var MenuCnt = /** @class */ (function () {
    function MenuCnt() {
        this.cloud = new MenuCloud();
        this.cloud.set_server_ip(/**/ window.location.origin);
    }
    return MenuCnt;
}());
export default new MenuCnt();
//# sourceMappingURL=menu.cnt.js.map