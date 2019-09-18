import {privilegeCloud} from '@/components/privilege-management/privilege-management.api';

class privilegeCnt {
    public cloud: privilegeCloud = new privilegeCloud();

    constructor() {
        this.cloud.set_server_ip(/**/window.location.origin);
    }
}

export default new privilegeCnt();
