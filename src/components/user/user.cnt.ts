import {UserCloud} from '@/components/user/user.api';

class UserCnt {
    public cloud: UserCloud = new UserCloud();

    constructor() {
        this.cloud.set_server_ip(/**/window.location.origin);
    }
}

export default new UserCnt();
