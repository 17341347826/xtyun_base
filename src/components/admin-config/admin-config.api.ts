import {ICloud} from '@/components/common/common';
import {SaveBasicInfo} from "@/components/admin-config/admin-config.def";


export class AdminConfigCloud extends ICloud {
    public list_tree_all_basic_info_attr(): any { // 树形结构查询所有信息
        return this.post(this.api('basic_info_attr/list_tree_all_basic_info_attr'), {});
    }
    public save_or_modify_basic_info_config(saveList: SaveBasicInfo): any {
        return this.post(this.api('basic_info_config/save_or_modify_basic_info_config'), saveList);
    }
    public get_basic_info_config_by_another_name(another_name): any {
        return this.post(this.api('basic_info_config/get_basic_info_config_by_another_name'),{another_name:  another_name});
    }
}


