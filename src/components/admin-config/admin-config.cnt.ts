import {AdminConfigCloud} from '@/components/admin-config/admin-config.api';

class AdminConfigCnt {
    public cloud: AdminConfigCloud = new AdminConfigCloud();
    
    constructor() {
        this.cloud.set_server_ip(/**/window.location.origin);
    }
}

export default new AdminConfigCnt();
