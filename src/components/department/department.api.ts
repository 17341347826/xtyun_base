import {ICloud} from '@/components/common/common';
import {
    ChangePlace,
    ChangeStatus,
    SemesterAddList,
    SubjectAddList,
    GradeAdd,
    PageQuery,
    SchoolSortAdd,
    ClassAdd,
    ClassSortAdd,
    TeacherAdd,
    CourseAdd,
    GroupAdd,
    StudentAdd,
    ParentAdd,
    SchoolInfo,
    StudentQuery,
    UnitAdd,
    GetDistrictList,
    QueryAll,
    QueryAllUnit,
    QueryInstructor,
    InstructorAdd, DisciplineAddList,
} from "@/components/department/department.def";


export class DepartmentCloud extends ICloud {
    // 学期
    public list_page_all_semester_info(pageQuery: PageQuery): any { // 查询分页所有的学年学期列表
        return this.post(this.api('semester/list_page_all_semester_info'), pageQuery);
    }
    public save_or_modify_semester_info(semesterAddList: SemesterAddList): any { // 保存或修改学年学期信息
        return this.post(this.api('semester/save_or_modify_semester_info'), semesterAddList);
    }
    public remove_semester_info_by_id(id): any { // 删除学年学期信息根据编号
        return this.post(this.api('semester/remove_semester_info_by_id'), id);
    }
    public modify_semester_info_status_by_id(changeStatus: ChangeStatus): any { // 修改学年学期状态根据编号
        return this.post(this.api('semester/modify_semester_info_status_by_id'), changeStatus);
    }
    public modify_semester_info_place_on_file_flag_by_id(changePlace: ChangePlace): any {
        return this.post(this.api('semester/modify_semester_info_place_on_file_flag_by_id'), changePlace);
    }

    // 年级
    public list_page_all_grade_info(pageQuery: PageQuery): any { // 查询分页所有的年级信息列表
        return this.post(this.api('grade/list_page_all_grade_info'), pageQuery);
    }
    public save_or_modify_grade_in(gradeAdd: GradeAdd): any {
        return this.post(this.api('grade/save_or_modify_grade_info'), gradeAdd);
    }
    public modify_grade_info_place_on_file_flag_by_id(changePlace: ChangePlace): any { // 修改年级信息是否归档根据编号
        return this.post(this.api('grade/modify_grade_info_place_on_file_flag_by_id'), changePlace);
    }
    public modify_grade_info_status_by_id(changeStatus: ChangeStatus): any { // 修改年级信息状态根据编号
        return this.post(this.api('grade/modify_grade_info_status_by_id'), changeStatus);
    }
    public remove_grade_info_by_id(id): any {
        return this.post(this.api('grade/remove_grade_info_by_id'), id);
    }
    public get_grade_info_by_id(id): any {
        return this.post(this.api('grade/get_grade_info_by_id'), id);
    }

    // 科目
    public list_page_all_subject_info(pageQuery: PageQuery): any { // 查询分页所有的学科信息列表
        return this.post(this.api('subject/list_page_all_subject_info'), pageQuery);
    }
    public save_or_modify_subject_info(subjectAddList: SubjectAddList): any { // 保存或修改学科信息
        return this.post(this.api('subject/save_or_modify_subject_info'), subjectAddList);
    }
    public remove_subject_info_by_id(id): any { // 删除学科信息根据编号
        return this.post(this.api('subject/remove_subject_info_by_id'), {id: id});
    }
    public modify_subject_info_status_by_id(changeStatus: ChangeStatus): any { // 修改学科状态根据编号
        return this.post(this.api('subject/modify_subject_info_status_by_id'), changeStatus);
    }
    
    // 学科
    public save_or_modify_discipline_info(disciplineAddList: DisciplineAddList): any { // 保存或修改
        return this.post(this.api('discipline/save_or_modify_discipline_info'), disciplineAddList);
    }
    public list_page_all_discipline_info(pageQuery: PageQuery): any { // 查询分页所有的学科信息列表
        return this.post(this.api('discipline/list_page_all_discipline_info'), pageQuery);
    }
    public remove_discipline_info_by_id(id): any { // 删除
        return this.post(this.api('discipline/remove_discipline_info_by_id'), {id: id});
    }
    public modify_discipline_info_status_by_id(changeStatus: ChangeStatus): any { // 起停用
        return this.post(this.api('discipline/modify_discipline_info_status_by_id'), changeStatus);
    }

    // 单位
    public list_page_all_unit_info(pageQuery: GetDistrictList): any {
        return this.post(this.api('unit/list_page_all_unit_info'), pageQuery);
    }
    public save_or_modify_unit_info(unitAdd: UnitAdd): any {
        return this.post(this.api('unit/save_or_modify_unit_info'), unitAdd);
    }
    public remove_unit_info_by_id(id): any {
        return this.post(this.api('unit/remove_unit_info_by_id'), id);
    }
    public modify_unit_info_status_by_id(id): any {
        return this.post(this.api('unit/modify_unit_info_status_by_id'), id);
    }
    public get_unit_info_by_id(id): any {
        return this.post(this.api('unit/get_unit_info_by_id'), id);
    }

    // 学校类别
    public list_page_all_school_category_info(pageQuery: PageQuery): any {
        return this.post(this.api('school_category/list_page_all_school_category_info'), pageQuery);
    }
    public save_or_modify_school_category_info(schoolSortAdd: SchoolSortAdd): any {
        return this.post(this.api('school_category/save_or_modify_school_category_info'), schoolSortAdd);
    }
    public remove_school_category_info_by_id(id): any {
        return this.post(this.api('school_category/remove_school_category_info_by_id'), id);
    }
    public modify_school_category_info_status_by_id(changeStatus: ChangeStatus): any {
        return this.post(this.api('school_category/modify_school_category_info_status_by_id'), changeStatus);
    }
    public batch_import_unit_info(key): any {
        return this.post(this.api('unit/batch_import_unit_info'), {key: key});
    }

    // 班级
    public list_page_all_class_info(queryList): any {
        return this.post(this.api('class/list_page_all_class_info'), queryList);
    }
    public save_or_modify_class_info(classAdd: ClassAdd): any {
        return this.post(this.api('class/save_or_modify_class_info'), classAdd);
    }
    public remove_class_info_by_id(id): any {
        return this.post(this.api('class/remove_class_info_by_id'), id);
    }
    public modify_class_info_status_by_id(changeStatus: ChangeStatus): any {
        return this.post(this.api('class/modify_class_info_status_by_id'), changeStatus);
    }
    public get_class_info_by_id(id): any {
        return this.post(this.api('class/get_class_info_by_id'), id);
    }
    public batch_import_class_info(key): any {
        return this.post(this.api('class/batch_import_class_info'), {key: key});
    }

    // 班级类别
    public list_page_all_class_category_info(pageQuery: PageQuery): any {
        return this.post(this.api('class_category/list_page_all_class_category_info'), pageQuery);
    }
    public save_or_modify_class_category_info(classSortAdd: ClassSortAdd): any {
        return this.post(this.api('class_category/save_or_modify_class_category_info'), classSortAdd);
    }
    public remove_class_category_info_by_id(id): any {
        return this.post(this.api('class_category/remove_class_category_info_by_id'), id);
    }
    public modify_class_category_info_status_by_id(changeStatus: ChangeStatus): any {
        return this.post(this.api('class_category/modify_class_category_info_status_by_id'), changeStatus);
    }
    public get_school_category_info_by_id(id): any {
        return this.post(this.api('school_category/get_school_category_info_by_id'), id);
    }

    // 小組
    public list_page_all_group_info(pageQuery: PageQuery): any {
        return this.post(this.api('group/list_page_all_group_info'), pageQuery);
    }
    public save_or_modify_group_info(groupAdd: GroupAdd): any {
        return this.post(this.api('group/save_or_modify_group_info'), groupAdd);
    }
    public remove_group_info_by_id(id): any {
        return this.post(this.api('group/remove_group_info_by_id'), id);
    }
    public modify_group_info_status_by_id(changeStatus: ChangeStatus): any {
        return this.post(this.api('group/modify_group_info_status_by_id'), changeStatus);
    }
    public get_group_info_by_member(member): any {
        return this.post(this.api('group/get_group_info_by_member'), member);
    }

    // 教师
    public list_page_all_teacher_info(getTeacherList): any {
        return this.post(this.api('teacher/list_page_all_teacher_info'), getTeacherList);
    }
    public save_or_modify_teacher_info(teacherAdd: TeacherAdd): any {
        return this.post(this.api('teacher/save_or_modify_teacher_info'), teacherAdd);
    }
    public remove_teacher_info_by_id(id): any {
        return this.post(this.api('teacher/remove_teacher_info_by_id'), id);
    }
    public get_teacher_info_by_id(id): any {
        return this.post(this.api('teacher/get_teacher_info_by_id'), id);
    }
    public batch_remove_teacher_info(ids): any {
        return this.post(this.api('teacher/batch_remove_teacher_info'), ids);
    }
    public batch_import_teacher_info(key): any {
        return this.post(this.api('teacher/batch_import_teacher_info'), {key: key})
    }

    // 任课
    public list_page_all_course_info(getCourseList): any { // 分页查询
        return this.post(this.api('course/list_page_all_course_info'), getCourseList);
    }
    public save_or_modify_course_info(courseAdd: CourseAdd): any { // 保存 修改
        return this.post(this.api('course/save_or_modify_course_info'), courseAdd);
    }
    public remove_course_info_by_id(id): any { // 删除
        return this.post(this.api('course/remove_course_info_by_id'), id);
    }
    public batch_import_course_info(key): any {
        return this.post(this.api('course/batch_import_course_info'), {key: key});
    }

    // 家长
    public list_page_all_parent_info(pageQuery: PageQuery): any { // 分页查询
        return this.post(this.api('parent/list_page_all_parent_info'), pageQuery);
    }
    public save_or_modify_parent_info(parentAdd: ParentAdd): any { // 保存 修改
        return this.post(this.api('parent/save_or_modify_parent_info'), parentAdd);
    }
    public remove_parent_info_by_id(id): any { // 删除
        return this.post(this.api('parent/remove_parent_info_by_id'), id);
    }
    public batch_remove_parent_info(ids): any {
        return this.post(this.api('parent/batch_remove_parent_info'), ids);
    }
    public batch_import_parent_info(key): any {
        return this.post(this.api('parent/batch_import_parent_info'), {key: key});
    }

    // 学生
    public list_page_all_student_info(pageQuery: StudentQuery): any { // 分页查询
        return this.post(this.api('student/list_page_all_student_info'), pageQuery);
    }
    public get_student_info_by_student_num(student_num): any {
        return this.post(this.api('student/get_student_info_by_student_num'), {student_num:student_num})
}
    public list_page_all_student_info_by_page(getStudentAllList): any { // 分页查询
        return this.post(this.api('student/list_page_all_student_info'), getStudentAllList);
    }
    public save_or_modify_student_info(studentAdd: StudentAdd): any { // 保存 修改
        return this.post(this.api('student/save_or_modify_student_info'), studentAdd);
    }
    public remove_student_info_by_id(id: object): any { // 删除
        return this.post(this.api('student/remove_student_info_by_id'), id);
    }
    public modify_student_info_status_by_id(changeStatus: ChangeStatus): any {
        return this.post(this.api('student/modify_student_info_status_by_id'), changeStatus);
    }
    public get_student_info_by_id(id: object): any { // 查询学生信息根据编号
        return this.post(this.api('student/get_student_info_by_id'), id);
    }
    public batch_import_student_info(key): any { // 批量导入
        return this.post(this.api('student/batch_import_student_info'), {key: key});
    }
    public batch_remove_student_info(ids): any { // 批量删除
        return this.post(this.api('student/batch_remove_student_info'), {ids: ids});
    }
    
    // 教研员
    public list_page_all_instructor_info(queryInstructor: QueryInstructor): any { // 分页查询
        return this.post(this.api('instructor/list_page_all_instructor_info'), queryInstructor);
    }
    public save_or_modify_instructor_info(instructorAdd: InstructorAdd): any { // 保存修改
        return this.post(this.api('instructor/save_or_modify_instructor_info'), instructorAdd);
    }
    public remove_instructor_info_by_id(id: string | null): any { // 删除
        return this.post(this.api('instructor/remove_instructor_info_by_id'), {id: id});
    }
    public batch_remove_instructor_info(ids: string | null): any { // 批量删除
        return this.post(this.api('instructor/batch_remove_instructor_info'), {ids: ids});
    }
    public batch_import_instructor_info(key: object): any { // 批量导入
        return this.post(this.api('instructor/batch_import_instructor_info'), key);
    }
    public get_instructor_info_by_id(key): any { // 根据编号查询
        return this.post(this.api('instructor/get_instructor_info_by_id'), key);
    }

    // *****************************************************************************************************************
    public list_all_class_category_info(status:string | null, fk_unit_id: string | null): any { // 查询所有的班级类别信息列表
        return this.post(this.api('class_category/list_all_class_category_info'), {status: status, fk_unit_id: fk_unit_id});
    }
    public list_all_grade_info(queryAllGrade: QueryAll): any { // 查询所有的年级信息列表
        return this.post(this.api('grade/list_all_grade_info'), queryAllGrade);
    }
    public list_all_teacher_info(getTeacherAllList: object): any { // 查询所有的教师信息列表
        return this.post(this.api('teacher/list_all_teacher_info'), getTeacherAllList);
    }
    public list_all_unit_info(): any { // 查询所有的单位信息列表
        return this.post(this.api('unit/list_all_unit_info'), {});
    }
    public list_all_unit_info_by_id(queryAllUnit: QueryAllUnit): any { // 查询所有的单位信息列表
        return this.post(this.api('unit/list_all_unit_info'), queryAllUnit);
    }
    public list_all_school_list(queryList: object): any { // 查询所有的单位信息列表
        return this.post(this.api('unit/list_all_unit_info'), queryList);
    }
    public list_all_school_category_info(unitID: object): any { // 查询所有的学校类别列表
        return this.post(this.api('school_category/list_all_school_category_info'), unitID);
    }
    public list_all_class_info(queryAllClass: object): any { // 查询所有的班级信息列表
        return this.post(this.api('class/list_all_class_info'), queryAllClass);
    }
    public list_all_subject_info(unitID: object): any { // 查询所有的学科信息列表
        return this.post(this.api('subject/list_all_subject_info'), unitID);
    }
    public get_proccess(apiName: object): any {
        return this.post(this.api('public/get_proccess'), apiName);
    }
    public list_all_discipline_info(apiName: object): any {
        return this.post(this.api('discipline/list_all_discipline_info'), apiName);
    }
}
