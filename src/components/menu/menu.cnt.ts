import {MenuCloud} from '@/components/menu/menu.api';

class MenuCnt {
    public cloud: MenuCloud = new MenuCloud();

    constructor() {
        this.cloud.set_server_ip(/**/window.location.origin);
    }
}

export default new MenuCnt();
