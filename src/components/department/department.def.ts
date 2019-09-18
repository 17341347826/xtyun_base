// 公共
export class ChangeStatus { // 状态
    public id: string | null = null;
    public status: string | null = null;
}
export class ChangePlace { // 归档
    public id: string | null = null;
    public place_on_file_flag: string | null = null;
}
// 查询所有一类的接口
export class QueryAll {
    public fk_unit_id: string | null = null;
    public status: string = '1';
}
export class QueryAllUnit {
    // 上级单位编号
    public fk_parent_id: string | null = null;
    // 记录编号
    public id: string | null = null;
    // 数据状态（-1：无效；0：停用；1：启用；）
    public status: string = '1';
    // 单位等级（1：省；2：市；3：区；4：校）
    public unit_level: string | null = null;
    public list_unit_level: string[] | null =null;
    public unit_code: string | null = null;
}


export class GetDistrictList {
    // 记录编号
    public id: string | null = null;
    // 第几页
    public page_num: number = 1;
    // 多少条数据
    public page_size: number = 15;
    // 单位等级（1：省；2：市；3：区；4：校）
    public unit_level: string | null = null;
    public list_unit_level: string[] | null = null;
    public status: string = '1';
    public unit_code: string | null = null;
}
export class PageQuery {
    // 第几页
    public page_num: number = 1;
    // 多少条数据
    public page_size: number = 15;
    public fk_unit_id: any = '';
    public status: string = '1';
    public discipline_code: string | null = null;
    public discipline_name: string | null = null;
}
export class QueryInstructor {
    public page_num: number = 1;
    public page_size: number = 15;
    public unit_info: any = {};
    public status: string = '1';
}
export class StudentQuery {
    // 班级信息
    public class_info: object = {
        grade_Info: { id: '' },
        id: '',
        teacher_info: { id: '', unit_info: { id: '', } }
    };
    public page_num: number = 1;
    public page_size: number = 15;
    // 学生姓名
    public student_name: string | null = null;
}
// *********************************************************************************************************************
// 学期管理
export class SemesterList {
    // 学年
    public academic_year: string | null = null;
    // 结束时间
    public end_date: string | null = null;
    // 记录编号
    public id: string | null = null;
    // 是否归档
    public place_on_file_flag: string | null = null;
    // 备注
    public remark: string | null = null;
    // 学年学期属性（1：第一学期/秋季学期；2：第二学期/春季学期）
    public semester_index: string | null = null;
    // 学期名称
    public semester_name: string | null = null;
    // 开始时间
    public start_date: string | null = null;
    // 状态
    public status: string | boolean = '1';
}
export class SemesterAddList { // 学期信息新增数据
    // 学年
    public academic_year: string | null = null;
    // 结束时间
    public end_date: string | null = null;
    // 单位编号
    public fk_unit_id: string | null = null;
    // 记录编号
    public id: string | null = null;
    // 学期名称
    public semester_name: string | null = null;
    // 开始时间
    public start_date: string | null = null;
    // 状态
    public status: string = '1';
    // 归档
    public place_on_file_flag: string  = '0';
}
// *********************************************************************************************************************
// 年级管理
export class GradeAdd { // 年级新增
    // 单位编号
    public fk_unit_id: string | null = null;
    // 年级名称
    public grade_name: string | null = null;
    // 记录编号
    public id: string | null = null;
    // 学段（1：小学；2：初中；3：高中）
    public learn_section: string | null = null;
    // 是否归档
    public place_on_file_flag: string = '0';
    // 状态
    public status: string = '1';
}
// *********************************************************************************************************************
// 科目管理
export class SubjectList {
    // 所属科目编号
    public belong_subject_name: string | null = null;
    // 满分值
    public full_score: number = 0;
    // 记录编号
    public id: string | null = null;
    // 备注
    public remark: string | null = null;
    // 使用状态（0：停用；1：启用）
    public status: string = '1';
    // 科目代码
    public subject_code: string | null = null;
    // 科目名称
    public subject_name: string | null = null;
    // 科目类型
    public subject_type: string | null = null;

}
export class SubjectAddList {
    // 所属科目编号
    public discipline_info: object = {};
    // 单位编号
    public fk_unit_id: string | null = null;
    // 满分值
    public full_score: number = 0;
    // 记录编号
    public id: string | null = null;
    // 备注
    public remark: string | null = null;
    // 使用状态（0：停用；1：启用）
    public status: string = '1';
    // 科目名称
    public subject_name: string | null = null;
    // 科目代码
    public subject_code: string | null = null;
    // 科目类型
    public subject_type: string | null = null;
    public sort_number: string | null = null;
}
// *********************************************************************************************************************
// 科目管理
export class DisciplineAddList {
    // 单位编号
    public fk_unit_id: string | null = null;
    // 记录编号
    public id: string | null = null;
    // 备注
    public remark: string | null = null;
    // 使用状态（0：停用；1：启用）
    public status: string = '1';
    // 学科名称
    public discipline_name: string | null = null;
    // 学科代码
    public discipline_code: string | null = null;
}
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
export class UnitAdd {
    // 联系地址
    public address: string | null = null;
    // 所属区域
    public area: string | null = null;
    // 联系人
    public contact_man: string | null = null;
    // 联系电话
    public contact_num: string | null = null;
    // 上级单位编号
    public fk_parent_id: string | null = null;
    // 记录编号
    public id: string | null = null;
    // 备注
    public remark: string | null = null;
    // 学校类别信息
    public fk_school_category_id: string | null = null;
    // 使用状态（0：停用；1：启用）
    public status: string = '1';
    // 单位代码
    public unit_code: string | null = null;
    // 单位等级（1：省；2：市；3：区；4：校）
    public unit_level: string | null = null;
    // 单位名称
    public unit_name: string | null = null;
}
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
export class SchoolSortList {
    // 类别代码
    public category_code: string | null = null;
    // 类别名称
    public category_name: string | null = null;
    // 记录编号
    public id: string | null = null;
    // 备注
    public remark: string | null = null;
    // 使用状态（0：停用；1：启用）
    public status: string = '1';
}
export class SchoolSortAdd {
    // 类别代码
    public category_code: string | null = null;
    // 类别名称
    public category_name: string | null = null;
    // 单位编号
    public fk_unit_id: string | null = null;
    // 记录编号
    public id: string | null = null;
    // 使用状态（0：停用；1：启用）
    public status: string = '1';
}
// *********************************************************************************************************************
// 班级管理
export class ClassAdd {
    // 班级类别信息
    public 	class_category_info: object = {};
    // 班级代码
    public class_code: string | null = null;
    // 班级名称
    public class_name: string | null = null;
    // 年级信息
    public grade_info: object = {};
    // 记录编号
    public id: string | null = null;
    // 文理类型（0：不分文理；1：文科班；2：理科班）
    public literary_scientific_type	: string | null = null;
    // 备注
    public remark: string | null = null;
    // 使用状态（0：停用；1：启用）
    public status: string = '1';
    // 教师信息
    public teacher_info: object = {};
}
// *********************************************************************************************************************
// 班级类别
export class ClassSortList {
    // 类别代码
    public category_code: string | null = null;
    // 类别名称
    public category_name: string | null = null;
    // 记录编号
    public id: string | null = null;
    // 备注
    public remark: string | null = null;
    // 使用状态（0：停用；1：启用）
    public status: string = '1';
}
export class ClassSortAdd {
    // 类别代码
    public category_code: string | null = null;
    // 类别名称
    public category_name: string | null = null;
    public fk_unit_id: string | null = null;
    // 记录编号
    public id: string | null = null;
    // 使用状态（0：停用；1：启用）
    public status: string = '1';
}
// *********************************************************************************************************************
// 教师管理
export class TeacherAdd {
    // 联系电话
    public contact_num: string | null = null;
    // 记录编号
    public id: string | null = null;
    // 备注
    public remark: string | null = null;
    // 教师姓名
    public teacher_name: string | null = null;
    // 教师编号
    public teacher_num: string | null = null;
    // 教师职务
    public teacher_position: string | null = null;
    // 教师职称（1：正高级教师；2：高级教师；3：一级教师；4：二级教师；5：三级教师）
    public teacher_title: string | null = null;
    // 学校信息
    public unit_info: object = {};
}
// 根据学校查询教师
export class SchoolInfo {
    public id: string | null = null;
    public school_name: string | null = null;
}
// *********************************************************************************************************************
// 任课管理
export class CourseAdd {
    // 班级信息
    public class_info: object = {};
    // 记录编号
    public id: string | null = null;
    // 备注
    public remark: string | null = null;
    // 数据状态（-1：无效；0：停用；1：启用；2：创建待审核；3：审核未通过）
    public status: string = '1';
    // 科目信息
    public subject_info: object = {};
    // 教师信息
    public teacher_info: object = {};
}
// *********************************************************************************************************************
// 小組管理
export class GroupAdd {
    // 组长姓名
    public chargeman_name: string | null = null;
    // 组长学籍号
    public chargeman_student_code: string | null = null;
    // 班级信息
    public class_info: object = {};
    // 小组名称
    public group_name: string | null = null;
    // 小组编号
    public group_num: string | null = null;
    // 记录编号
    public id: string | null = null;
    // 成员（学籍号 字符串）
    public member: string | null = null;
    // 备注
    public remark: string | null = null;
    // 使用状态（0：停用；1：启用）
    public status: string = '1';
}
// *********************************************************************************************************************
// 家长管理
export class ParentAdd {
    // 记录编号
    public id: string | null = null;
    // 身份证
    public id_number: string | null = null;
    // 家长联系电话
    public parent_contact_num: string | null = null;
    // 家长姓名
    public parent_name: string | null = null;
    // 备注
    public remark: string | null = null;
    // 数据状态（-1：无效；0：停用；1：启用；2：创建待审核；3：审核未通过）
    public status: string = '1';
    // 学生信息
    public student_info: object = {};
}
// *********************************************************************************************************************
// 教研员管理
export class InstructorAdd {
    public contact_num: string | null = null; // 联系电话
    public id: string | null = null; // 记录编号
    public instructor_name: string | null = null; // 教研员姓名
    public instructor_num: string | null = null; // 教研员编号
    public remark: string | null = null; // 备注
    public status: string = '1'; // 数据状态（-1：无效；0：停用；1：启用；）
    public discipline_info: object = {}; // 科目信息
    public unit_info: object = {
        id: ''
    }; // 单位信息
}
// *********************************************************************************************************************
// 学生管理
export class StudentInfo {
    // 班级编号
    public fk_class_id: string | null = null;
    // 年级编号
    public fk_grade_id: string | null = null;
    // 学校编号
    public fk_school_id: string | null = null;
    // 第几页
    public page_num: number = 1;
    // 多少条数据
    public page_size: number = 15;
    // 学生姓名
    public student_name: string | null = null;
}
export class StudentAdd {
    // 住宿情况
    public accommodation_situation: string | null = null;
    // 是否为艺体生（0：否；1：是）
    public art_physica_flag: string | null = null;
    // 班级信息
    public class_info: object = {};
    // 联系电话
    public contact_num: string | null = null;
    // 出生日期
    public date_of_birth: string | null = null;
    // 性格特点
    public disposition_characteristic: string | null = null;
    // 应往类型
    public fresh_former_type: string | null = null;
    // 健康状况
    public health_condition: string | null = null;
    // 兴趣爱好
    public hobbies_interests: string | null = null;
    // 记录编号
    public id: any = null;
    // 身份证号
    public id_number: string | null = null;
    // 人生格言
    public life_motto: string | null = null;
    // 文理类型（0：不分文理；1：文科班；2：理科班）
    public literary_scientific_type: string | null = null;
    // 主要特长
    public main_specialty: string | null = null;
    // 主要优点
    public major_advantage: string | null = null;
    // 成员联系地址1
    public member_contact_address_1: string | null = null;
    // 成员联系地址2
    public member_contact_address_2: string | null = null;
    // 成员联系地址3
    public member_contact_address_3: string | null = null;
    // 成员联系地址4
    public member_contact_address_4: string | null = null;
    // 成员联系电话1
    public member_contact_num_1: string | null = null;
    // 成员联系电话2
    public member_contact_num_2: string | null = null;
    // 成员联系电话3
    public member_contact_num_3: string | null = null;
    // 成员联系电话4
    public member_contact_num_4: string | null = null;
    // 成员学历1
    public member_culture_1: string | null = null;
    // 成员学历2
    public member_culture_2: string | null = null;
    // 成员学历3
    public member_culture_3: string | null = null;
    // 成员学历4
    public member_culture_4: string | null = null;
    // 成员姓名1
    public member_name_1: string | null = null;
    // 成员姓名2
    public member_name_2: string | null = null;
    // 成员姓名3
    public member_name_3: string | null = null;
    // 成员姓名4
    public member_name_4: string | null = null;
    // 成员政治面貌1
    public member_political_1: string | null = null;
    // 成员政治面貌2
    public member_political_2: string | null = null;
    // 成员政治面貌3
    public member_political_3: string | null = null;
    // 成员政治面貌4
    public member_political_4: string | null = null;
    // 成员关系1
    public member_relationship_1: string | null = null;
    // 成员关系2
    public member_relationship_2: string | null = null;
    // 成员关系3
    public member_relationship_3: string | null = null;
    // 成员关系4
    public member_relationship_4: string | null = null;
    // 成员工作单位1
    public member_work_unit_1: string | null = null;
    // 成员工作单位2
    public member_work_unit_2: string | null = null;
    // 成员工作单位3
    public member_work_unit_3: string | null = null;
    // 成员工作单位4
    public member_work_unit_4: string | null = null;
    // 学生曾用名
    public name_used_before: string | null = '无';
    // 民族
    public nation: string | null = null;
    // 是否为独生子女（0：否；1：是）
    public only_child_flag: string | null = null;
    // 是否为单亲家庭（0：否；1：是）
    public parent_family_flag: string | null = null;
    // 照片地址
    public photo_address: string | null = null;
    // 政治面貌
    public politic: string | null = null;
    // 是否为留守儿童（0：否；1：是）
    public rear_children_flag: string | null = null;
    // 备注
    public remark: string | null = null;
    // 性别（1：男；2：女）
    public sex: string | null = null;
    // 使用状态（0：停用；1：启用；2：创建待审核；3：审核未通过）
    public status: string = '1';
    // 奋斗目标
    public struggling_target: string | null = null;
    // 学生姓名
    public student_name: string | null = null;
    // 学籍号
    public student_num: string | null = null;
    // 监管人年龄
    public supervisor_age: string | null = null;
    // 监管人联系地址
    public supervisor_contact_address: string | null = null;
    // 监管人联系电话
    public supervisor_contact_num: string | null = null;
    // 监管人健康状况
    public supervisor_health_condition: string | null = null;
    // 监管人姓名
    public supervisor_name: string | null = null;
    // 人生理想
    public worldly_ideal: string | null = null;
}



