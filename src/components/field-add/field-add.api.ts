import {ICloud} from '@/components/common/common';
import {AddBasicInfo, DeleteId} from "@/components/field-add/field-add.def";
import {ProjectParam} from "@/components/menu/menu.def";


export class FieldAddCloud extends ICloud {
    public add_basic_info(addBasicInfo: AddBasicInfo): any {
        return this.post(this.api('basic_info_attr/save_or_modify_basic_info_attr'), addBasicInfo);
    }
    public list_tree_basic_info_attr(): any {
        return this.post(this.api('basic_info_attr/list_tree_all_basic_info_attr'), {});
    }
    public remove_basic_info(id: DeleteId): any {
        return this.post(this.api('basic_info_attr/remove_basic_info_attr_by_id'), id);
    }
    public find_list(projectParam: ProjectParam): any {
        return this.post(this.api('sys_system_name/find_list'), projectParam);
    }
}
