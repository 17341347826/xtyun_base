import Vue from 'vue';
/**
 * 角色类型判断：0:超管、1:系统管理员、2：管理者、3：、4:学生、5:家长'
 * */
Vue.filter('typeNameFilters', function (value) {
    if (value == 0)
        return '超管';
    if (value == 1)
        return '系统管理员';
    if (value == 2)
        return '管理者';
    if (value == 3)
        return '教师';
    if (value == 4)
        return '学生';
    if (value == 5)
        return '家长';
    if (value == 6)
        return '教研员';
});
/**
 * 角色：
 * role_rank(等级):number 1:省级,2:市州,3:区县,4:校,5:年级,6:班级，7：个人
 *role_type(类型):number 0:超管、1:系统管理员、2：管理者、3：教师、4:学生、5:家长'
 * */
Vue.filter('typeRoleFilters', function (type, rank) {
    if (rank == 1)
        return '省';
    if (type == 0)
        return '超管';
    if (rank == 1 && type == 6)
        return '省级教研员';
    if (rank == 2 && type == 1)
        return '市级统管理员';
    if (rank == 2 && type == 6)
        return '市级教研员';
    if (rank == 2 && type == 2)
        return '市级管理者';
    if (rank == 3 && type == 1)
        return '区县系统管理员';
    if (rank == 3 && type == 6)
        return '区县教研员';
    if (rank == 3 && type == 2)
        return '区县管理者';
    if (rank == 4 && type == 1)
        return '学校系统管理员';
    if (rank == 4 && type == 2)
        return '学校管理者';
    if (rank == 4 && type == 6)
        return '学校教研员';
    if (type == 3)
        return '教师';
    if (type == 4)
        return '学生';
    if (type == 5)
        return '家长';
});
//# sourceMappingURL=userFilters.js.map