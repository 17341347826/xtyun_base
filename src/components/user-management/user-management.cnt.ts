import {UserManagementCloud} from '@/components/user-management/user-management.api';

class userManagementCnt {
    public cloud: UserManagementCloud = new UserManagementCloud();

    constructor() {
        this.cloud.set_server_ip(/**/window.location.origin);
    }
}

export default new userManagementCnt();
