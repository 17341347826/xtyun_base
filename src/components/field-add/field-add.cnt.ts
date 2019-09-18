import {FieldAddCloud} from '@/components/field-add/field-add.api';

class FieldAddCnt {
    public cloud: FieldAddCloud = new FieldAddCloud();
    
    constructor() {
        this.cloud.set_server_ip(/**/window.location.origin);
    }
}

export default new FieldAddCnt();
