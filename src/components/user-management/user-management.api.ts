import {ICloud} from '@/components/common/common';
import {
    RoleQueryParam,
    PageQuery,
    SaveUser, QueryAllUnit
} from "@/components/user-management/user-management.def";

export class UserManagementCloud extends ICloud {
    public list_all_unit_info(): any {
        return this.post(this.api('unit/list_all_unit_info'), {});
    }
    public list_all_unit_info_by_id(queryAllUnit: QueryAllUnit): any {
        return this.post(this.api('unit/list_all_unit_info'), queryAllUnit);
    }
    public list_all_district_info(): any { // 查询所有的区县信息列表
        return this.post(this.api('unit/list_page_all_unit_info'), {});
    }
    public getRoleList(roleQuery: RoleQueryParam): any { // 查询角色列表
        return this.post(this.api('sys_role/find_page_list'), roleQuery );
    }
    public getAllUserData(pageQuery: PageQuery): any { // 查询分页所有的用户信息列表
        return this.post(this.api('user/list_page_all_user_info'), pageQuery );
    }
    public ces(obj): any { // 查询分页所有的用户信息列表
        return this.post(this.api('user/list_page_all_user_info'), obj );
    }
    public saveUser(saveUser: SaveUser): any { // 保存或修改用户信息
        return this.post(this.api('user/save_or_modify_user_info'), saveUser );
    }
    public save_or_modify_teacher_info(): any { // 保存
        return this.post(this.api('teacher/save_or_modify_teacher_inf'), {})
    }
    public deleteUser(id: string): any { // 删除用户信息根据编号
        return this.post(this.api('user/remove_user_info_by_id'), {
            id: id,
        });
    }
    public getUserInfo(id: any): any { // 查询用户信息根据编号
        return this.post(this.api('user/get_user_info_by_id'), {
            id: id,
        });
    }

    /**
     * 根据编号修改用户状态
     */
    public updateUserStatus(id: string, userStatus: string): any {
        return this.post(this.api('user/modify_user_info_status_by_id'), {
            id: id,
            status: userStatus,
        });
    }

    /**
     * 批量修改用户状态
     */
    public mulitpleEditUserStatus(id: string | null, userStatus: string): any {
        return this.post(this.api('user/batch_modify_user_status'), {
            ids: id,
            status: userStatus,
        });
    }
    /**
     * 批量删除用户信息
     */
    public mulitpleDelUserInfo(id: string | null): any {
        return this.post(this.api('user/batch_remove_user_info'), {
            ids: id,
        });
    }
    /**
     * 批量导入用户信息
     */
    public mulitpleImportUserInfo(Key: string): any {
        return this.post(this.api('user/batch_import_user_info'), {
            key: Key,
        });
    }

    /**
     * 查询进度信息
     */
    public getProccess(apiName: string): any{
        return this.post(this.api('public/get_proccess'), {
            api_name: apiName,
        });
    }

    /**
     * 批量重置密码
     */
    public mulitpleResetUserPassword(id: string | null, password: string): any {
        return this.post(this.api('user/batch_modify_user_user_password'), {
            ids: id,
            user_password: password,
        });
    }
    public get_unit_info_by_id(id): any {
        return this.post(this.api('unit/get_unit_info_by_id'), {id: id})
    }
    
    /**
     * 查询全部班级
     */
    public list_all_class_info(queryAllClass: object): any {
        return this.post(this.api('class/list_all_class_info'), queryAllClass)
    }
    /**
     * 查询全部年级
     */
    public list_all_grade_info(queryAllGrade: object): any {
        return this.post(this.api('grade/list_all_grade_info'), queryAllGrade)
    }
    
}
