// 公共
var ChangeStatus = /** @class */ (function () {
    function ChangeStatus() {
        this.id = null;
        this.status = null;
    }
    return ChangeStatus;
}());
export { ChangeStatus };
var ChangePlace = /** @class */ (function () {
    function ChangePlace() {
        this.id = null;
        this.place_on_file_flag = null;
    }
    return ChangePlace;
}());
export { ChangePlace };
// 查询所有一类的接口
var QueryAll = /** @class */ (function () {
    function QueryAll() {
        this.fk_unit_id = null;
        this.status = '1';
    }
    return QueryAll;
}());
export { QueryAll };
var QueryAllUnit = /** @class */ (function () {
    function QueryAllUnit() {
        // 上级单位编号
        this.fk_parent_id = null;
        // 记录编号
        this.id = null;
        // 数据状态（-1：无效；0：停用；1：启用；）
        this.status = '1';
        // 单位等级（1：省；2：市；3：区；4：校）
        this.unit_level = null;
        this.list_unit_level = null;
        this.unit_code = null;
    }
    return QueryAllUnit;
}());
export { QueryAllUnit };
var GetDistrictList = /** @class */ (function () {
    function GetDistrictList() {
        // 记录编号
        this.id = null;
        // 第几页
        this.page_num = 1;
        // 多少条数据
        this.page_size = 15;
        // 单位等级（1：省；2：市；3：区；4：校）
        this.unit_level = null;
        this.list_unit_level = null;
        this.status = '1';
        this.unit_code = null;
    }
    return GetDistrictList;
}());
export { GetDistrictList };
var PageQuery = /** @class */ (function () {
    function PageQuery() {
        // 第几页
        this.page_num = 1;
        // 多少条数据
        this.page_size = 15;
        this.fk_unit_id = '';
        this.status = '1';
        this.discipline_code = null;
        this.discipline_name = null;
    }
    return PageQuery;
}());
export { PageQuery };
var QueryInstructor = /** @class */ (function () {
    function QueryInstructor() {
        this.page_num = 1;
        this.page_size = 15;
        this.unit_info = {};
        this.status = '1';
    }
    return QueryInstructor;
}());
export { QueryInstructor };
var StudentQuery = /** @class */ (function () {
    function StudentQuery() {
        // 班级信息
        this.class_info = {
            grade_Info: { id: '' },
            id: '',
            teacher_info: { id: '', unit_info: { id: '', } }
        };
        this.page_num = 1;
        this.page_size = 15;
        // 学生姓名
        this.student_name = null;
    }
    return StudentQuery;
}());
export { StudentQuery };
// *********************************************************************************************************************
// 学期管理
var SemesterList = /** @class */ (function () {
    function SemesterList() {
        // 学年
        this.academic_year = null;
        // 结束时间
        this.end_date = null;
        // 记录编号
        this.id = null;
        // 是否归档
        this.place_on_file_flag = null;
        // 备注
        this.remark = null;
        // 学年学期属性（1：第一学期/秋季学期；2：第二学期/春季学期）
        this.semester_index = null;
        // 学期名称
        this.semester_name = null;
        // 开始时间
        this.start_date = null;
        // 状态
        this.status = '1';
    }
    return SemesterList;
}());
export { SemesterList };
var SemesterAddList = /** @class */ (function () {
    function SemesterAddList() {
        // 学年
        this.academic_year = null;
        // 结束时间
        this.end_date = null;
        // 单位编号
        this.fk_unit_id = null;
        // 记录编号
        this.id = null;
        // 学期名称
        this.semester_name = null;
        // 开始时间
        this.start_date = null;
        // 状态
        this.status = '1';
        // 归档
        this.place_on_file_flag = '0';
    }
    return SemesterAddList;
}());
export { SemesterAddList };
// *********************************************************************************************************************
// 年级管理
var GradeAdd = /** @class */ (function () {
    function GradeAdd() {
        // 单位编号
        this.fk_unit_id = null;
        // 年级名称
        this.grade_name = null;
        // 记录编号
        this.id = null;
        // 学段（1：小学；2：初中；3：高中）
        this.learn_section = null;
        // 是否归档
        this.place_on_file_flag = '0';
        // 状态
        this.status = '1';
    }
    return GradeAdd;
}());
export { GradeAdd };
// *********************************************************************************************************************
// 科目管理
var SubjectList = /** @class */ (function () {
    function SubjectList() {
        // 所属科目编号
        this.belong_subject_name = null;
        // 满分值
        this.full_score = 0;
        // 记录编号
        this.id = null;
        // 备注
        this.remark = null;
        // 使用状态（0：停用；1：启用）
        this.status = '1';
        // 科目代码
        this.subject_code = null;
        // 科目名称
        this.subject_name = null;
        // 科目类型
        this.subject_type = null;
    }
    return SubjectList;
}());
export { SubjectList };
var SubjectAddList = /** @class */ (function () {
    function SubjectAddList() {
        // 所属科目编号
        this.discipline_info = {};
        // 单位编号
        this.fk_unit_id = null;
        // 满分值
        this.full_score = 0;
        // 记录编号
        this.id = null;
        // 备注
        this.remark = null;
        // 使用状态（0：停用；1：启用）
        this.status = '1';
        // 科目名称
        this.subject_name = null;
        // 科目代码
        this.subject_code = null;
        // 科目类型
        this.subject_type = null;
        this.sort_number = null;
    }
    return SubjectAddList;
}());
export { SubjectAddList };
// *********************************************************************************************************************
// 科目管理
var DisciplineAddList = /** @class */ (function () {
    function DisciplineAddList() {
        // 单位编号
        this.fk_unit_id = null;
        // 记录编号
        this.id = null;
        // 备注
        this.remark = null;
        // 使用状态（0：停用；1：启用）
        this.status = '1';
        // 学科名称
        this.discipline_name = null;
        // 学科代码
        this.discipline_code = null;
    }
    return DisciplineAddList;
}());
export { DisciplineAddList };
// *********************************************************************************************************************
// // 区县管理
// export class DistrictAdd {
//     // 联系人
//     public contact_man: string | null = null;
//     // 联系电话
//     public contact_num: string | null = null;
//     // 地区代码
//     public district_code: string | null = null;
//     // 上级地区信息
//     public fk_parent_id: string | null = null;
//     // 地区等级（1：省；2：市；3：区）
//     public district_level: string | null = null;
//     // 地区名称
//     public district_name: string | null = null;
//     // 记录编号
//     public id: string | null = null;
//     // 备注
//     public remark: string | null = null;
//     // 使用状态（0：停用；1：启用）
//     public status: string = '1';
// }
// 单位
var UnitAdd = /** @class */ (function () {
    function UnitAdd() {
        // 联系地址
        this.address = null;
        // 所属区域
        this.area = null;
        // 联系人
        this.contact_man = null;
        // 联系电话
        this.contact_num = null;
        // 上级单位编号
        this.fk_parent_id = null;
        // 记录编号
        this.id = null;
        // 备注
        this.remark = null;
        // 学校类别信息
        this.fk_school_category_id = null;
        // 使用状态（0：停用；1：启用）
        this.status = '1';
        // 单位代码
        this.unit_code = null;
        // 单位等级（1：省；2：市；3：区；4：校）
        this.unit_level = null;
        // 单位名称
        this.unit_name = null;
    }
    return UnitAdd;
}());
export { UnitAdd };
// 学校管理
// export class SchoolAdd {
//     // 联系地址
//     public address: string | null = null;
//     // 所属区域
//     public area: string | null = null;
//     // 联系人
//     public contact_man: string | null = null;
//     // 联系电话
//     public contact_num: string | null = null;
//     // 区县信息
//     public  district_info: object = {};
//     // 记录编号
//     public id: string | null = null;
//     // 备注
//     public remark: string | null = null;
//     // 学习类别信息
//     public school_category_info: object = {};
//     // 学校代码
//     public school_code: string | null = null;
//     // 学校名称
//     public school_name: string | null = null;
//     // 使用状态（0：停用；1：启用）
//     public status: string = '1';
// }
// *********************************************************************************************************************
// 学校类别
var SchoolSortList = /** @class */ (function () {
    function SchoolSortList() {
        // 类别代码
        this.category_code = null;
        // 类别名称
        this.category_name = null;
        // 记录编号
        this.id = null;
        // 备注
        this.remark = null;
        // 使用状态（0：停用；1：启用）
        this.status = '1';
    }
    return SchoolSortList;
}());
export { SchoolSortList };
var SchoolSortAdd = /** @class */ (function () {
    function SchoolSortAdd() {
        // 类别代码
        this.category_code = null;
        // 类别名称
        this.category_name = null;
        // 单位编号
        this.fk_unit_id = null;
        // 记录编号
        this.id = null;
        // 使用状态（0：停用；1：启用）
        this.status = '1';
    }
    return SchoolSortAdd;
}());
export { SchoolSortAdd };
// *********************************************************************************************************************
// 班级管理
var ClassAdd = /** @class */ (function () {
    function ClassAdd() {
        // 班级类别信息
        this.class_category_info = {};
        // 班级代码
        this.class_code = null;
        // 班级名称
        this.class_name = null;
        // 年级信息
        this.grade_info = {};
        // 记录编号
        this.id = null;
        // 文理类型（0：不分文理；1：文科班；2：理科班）
        this.literary_scientific_type = null;
        // 备注
        this.remark = null;
        // 使用状态（0：停用；1：启用）
        this.status = '1';
        // 教师信息
        this.teacher_info = {};
    }
    return ClassAdd;
}());
export { ClassAdd };
// *********************************************************************************************************************
// 班级类别
var ClassSortList = /** @class */ (function () {
    function ClassSortList() {
        // 类别代码
        this.category_code = null;
        // 类别名称
        this.category_name = null;
        // 记录编号
        this.id = null;
        // 备注
        this.remark = null;
        // 使用状态（0：停用；1：启用）
        this.status = '1';
    }
    return ClassSortList;
}());
export { ClassSortList };
var ClassSortAdd = /** @class */ (function () {
    function ClassSortAdd() {
        // 类别代码
        this.category_code = null;
        // 类别名称
        this.category_name = null;
        this.fk_unit_id = null;
        // 记录编号
        this.id = null;
        // 使用状态（0：停用；1：启用）
        this.status = '1';
    }
    return ClassSortAdd;
}());
export { ClassSortAdd };
// *********************************************************************************************************************
// 教师管理
var TeacherAdd = /** @class */ (function () {
    function TeacherAdd() {
        // 联系电话
        this.contact_num = null;
        // 记录编号
        this.id = null;
        // 备注
        this.remark = null;
        // 教师姓名
        this.teacher_name = null;
        // 教师编号
        this.teacher_num = null;
        // 教师职务
        this.teacher_position = null;
        // 教师职称（1：正高级教师；2：高级教师；3：一级教师；4：二级教师；5：三级教师）
        this.teacher_title = null;
        // 学校信息
        this.unit_info = {};
    }
    return TeacherAdd;
}());
export { TeacherAdd };
// 根据学校查询教师
var SchoolInfo = /** @class */ (function () {
    function SchoolInfo() {
        this.id = null;
        this.school_name = null;
    }
    return SchoolInfo;
}());
export { SchoolInfo };
// *********************************************************************************************************************
// 任课管理
var CourseAdd = /** @class */ (function () {
    function CourseAdd() {
        // 班级信息
        this.class_info = {};
        // 记录编号
        this.id = null;
        // 备注
        this.remark = null;
        // 数据状态（-1：无效；0：停用；1：启用；2：创建待审核；3：审核未通过）
        this.status = '1';
        // 科目信息
        this.subject_info = {};
        // 教师信息
        this.teacher_info = {};
    }
    return CourseAdd;
}());
export { CourseAdd };
// *********************************************************************************************************************
// 小組管理
var GroupAdd = /** @class */ (function () {
    function GroupAdd() {
        // 组长姓名
        this.chargeman_name = null;
        // 组长学籍号
        this.chargeman_student_code = null;
        // 班级信息
        this.class_info = {};
        // 小组名称
        this.group_name = null;
        // 小组编号
        this.group_num = null;
        // 记录编号
        this.id = null;
        // 成员（学籍号 字符串）
        this.member = null;
        // 备注
        this.remark = null;
        // 使用状态（0：停用；1：启用）
        this.status = '1';
    }
    return GroupAdd;
}());
export { GroupAdd };
// *********************************************************************************************************************
// 家长管理
var ParentAdd = /** @class */ (function () {
    function ParentAdd() {
        // 记录编号
        this.id = null;
        // 身份证
        this.id_number = null;
        // 家长联系电话
        this.parent_contact_num = null;
        // 家长姓名
        this.parent_name = null;
        // 备注
        this.remark = null;
        // 数据状态（-1：无效；0：停用；1：启用；2：创建待审核；3：审核未通过）
        this.status = '1';
        // 学生信息
        this.student_info = {};
    }
    return ParentAdd;
}());
export { ParentAdd };
// *********************************************************************************************************************
// 教研员管理
var InstructorAdd = /** @class */ (function () {
    function InstructorAdd() {
        this.contact_num = null; // 联系电话
        this.id = null; // 记录编号
        this.instructor_name = null; // 教研员姓名
        this.instructor_num = null; // 教研员编号
        this.remark = null; // 备注
        this.status = '1'; // 数据状态（-1：无效；0：停用；1：启用；）
        this.discipline_info = {}; // 科目信息
        this.unit_info = {
            id: ''
        }; // 单位信息
    }
    return InstructorAdd;
}());
export { InstructorAdd };
// *********************************************************************************************************************
// 学生管理
var StudentInfo = /** @class */ (function () {
    function StudentInfo() {
        // 班级编号
        this.fk_class_id = null;
        // 年级编号
        this.fk_grade_id = null;
        // 学校编号
        this.fk_school_id = null;
        // 第几页
        this.page_num = 1;
        // 多少条数据
        this.page_size = 15;
        // 学生姓名
        this.student_name = null;
    }
    return StudentInfo;
}());
export { StudentInfo };
var StudentAdd = /** @class */ (function () {
    function StudentAdd() {
        // 住宿情况
        this.accommodation_situation = null;
        // 是否为艺体生（0：否；1：是）
        this.art_physica_flag = null;
        // 班级信息
        this.class_info = {};
        // 联系电话
        this.contact_num = null;
        // 出生日期
        this.date_of_birth = null;
        // 性格特点
        this.disposition_characteristic = null;
        // 应往类型
        this.fresh_former_type = null;
        // 健康状况
        this.health_condition = null;
        // 兴趣爱好
        this.hobbies_interests = null;
        // 记录编号
        this.id = null;
        // 身份证号
        this.id_number = null;
        // 人生格言
        this.life_motto = null;
        // 文理类型（0：不分文理；1：文科班；2：理科班）
        this.literary_scientific_type = null;
        // 主要特长
        this.main_specialty = null;
        // 主要优点
        this.major_advantage = null;
        // 成员联系地址1
        this.member_contact_address_1 = null;
        // 成员联系地址2
        this.member_contact_address_2 = null;
        // 成员联系地址3
        this.member_contact_address_3 = null;
        // 成员联系地址4
        this.member_contact_address_4 = null;
        // 成员联系电话1
        this.member_contact_num_1 = null;
        // 成员联系电话2
        this.member_contact_num_2 = null;
        // 成员联系电话3
        this.member_contact_num_3 = null;
        // 成员联系电话4
        this.member_contact_num_4 = null;
        // 成员学历1
        this.member_culture_1 = null;
        // 成员学历2
        this.member_culture_2 = null;
        // 成员学历3
        this.member_culture_3 = null;
        // 成员学历4
        this.member_culture_4 = null;
        // 成员姓名1
        this.member_name_1 = null;
        // 成员姓名2
        this.member_name_2 = null;
        // 成员姓名3
        this.member_name_3 = null;
        // 成员姓名4
        this.member_name_4 = null;
        // 成员政治面貌1
        this.member_political_1 = null;
        // 成员政治面貌2
        this.member_political_2 = null;
        // 成员政治面貌3
        this.member_political_3 = null;
        // 成员政治面貌4
        this.member_political_4 = null;
        // 成员关系1
        this.member_relationship_1 = null;
        // 成员关系2
        this.member_relationship_2 = null;
        // 成员关系3
        this.member_relationship_3 = null;
        // 成员关系4
        this.member_relationship_4 = null;
        // 成员工作单位1
        this.member_work_unit_1 = null;
        // 成员工作单位2
        this.member_work_unit_2 = null;
        // 成员工作单位3
        this.member_work_unit_3 = null;
        // 成员工作单位4
        this.member_work_unit_4 = null;
        // 学生曾用名
        this.name_used_before = '无';
        // 民族
        this.nation = null;
        // 是否为独生子女（0：否；1：是）
        this.only_child_flag = null;
        // 是否为单亲家庭（0：否；1：是）
        this.parent_family_flag = null;
        // 照片地址
        this.photo_address = null;
        // 政治面貌
        this.politic = null;
        // 是否为留守儿童（0：否；1：是）
        this.rear_children_flag = null;
        // 备注
        this.remark = null;
        // 性别（1：男；2：女）
        this.sex = null;
        // 使用状态（0：停用；1：启用；2：创建待审核；3：审核未通过）
        this.status = '1';
        // 奋斗目标
        this.struggling_target = null;
        // 学生姓名
        this.student_name = null;
        // 学籍号
        this.student_num = null;
        // 监管人年龄
        this.supervisor_age = null;
        // 监管人联系地址
        this.supervisor_contact_address = null;
        // 监管人联系电话
        this.supervisor_contact_num = null;
        // 监管人健康状况
        this.supervisor_health_condition = null;
        // 监管人姓名
        this.supervisor_name = null;
        // 人生理想
        this.worldly_ideal = null;
    }
    return StudentAdd;
}());
export { StudentAdd };
//# sourceMappingURL=department.def.js.map