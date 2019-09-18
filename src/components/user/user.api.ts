import {ICloud} from '@/components/common/common';
import {MenuByUser, SaveUser, UserLogin} from '@/components/user/user.def';
import {ProjectParam} from '@/components/menu/menu.def';

export class UserCloud extends ICloud {

    public login(userLogin: UserLogin): any {
        return this.post(this.api('user/login'), userLogin);
    }
    public getFindList(projectParam: ProjectParam): any {
        return this.post(this.api('sys_system_name/find_list'), projectParam);
    }
    public find_menus_by_user(menuByUser: MenuByUser): any {
        return this.post(this.api('unit_and_role_and_menu_info/find_menus_by_user'), menuByUser);
    }
    public get_unit_info_by_id(id): any {
        return this.post(this.api('unit/get_unit_info_by_id'), {id: id});
    }
    public list_all_unit_info(id): any {
        return this.post(this.api('unit/list_all_unit_info'), {id: id});
    }
    public save_or_modify_user_info(updateRole: SaveUser): any {
        return this.post(this.api('user/save_or_modify_user_info'), updateRole)
    }
}


