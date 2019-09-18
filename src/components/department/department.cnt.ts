import {DepartmentCloud} from './department.api';

class DepartmentCnt {
    public cloud: DepartmentCloud = new DepartmentCloud();

    constructor() {
        this.cloud.set_server_ip(/**/window.location.origin);
    }
}

export default new DepartmentCnt();

