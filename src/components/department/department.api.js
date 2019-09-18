import * as tslib_1 from "tslib";
import { ICloud } from '@/components/common/common';
var DepartmentCloud = /** @class */ (function (_super) {
    tslib_1.__extends(DepartmentCloud, _super);
    function DepartmentCloud() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // 学期
    DepartmentCloud.prototype.list_page_all_semester_info = function (pageQuery) {
        return this.post(this.api('semester/list_page_all_semester_info'), pageQuery);
    };
    DepartmentCloud.prototype.save_or_modify_semester_info = function (semesterAddList) {
        return this.post(this.api('semester/save_or_modify_semester_info'), semesterAddList);
    };
    DepartmentCloud.prototype.remove_semester_info_by_id = function (id) {
        return this.post(this.api('semester/remove_semester_info_by_id'), id);
    };
    DepartmentCloud.prototype.modify_semester_info_status_by_id = function (changeStatus) {
        return this.post(this.api('semester/modify_semester_info_status_by_id'), changeStatus);
    };
    DepartmentCloud.prototype.modify_semester_info_place_on_file_flag_by_id = function (changePlace) {
        return this.post(this.api('semester/modify_semester_info_place_on_file_flag_by_id'), changePlace);
    };
    // 年级
    DepartmentCloud.prototype.list_page_all_grade_info = function (pageQuery) {
        return this.post(this.api('grade/list_page_all_grade_info'), pageQuery);
    };
    DepartmentCloud.prototype.save_or_modify_grade_in = function (gradeAdd) {
        return this.post(this.api('grade/save_or_modify_grade_info'), gradeAdd);
    };
    DepartmentCloud.prototype.modify_grade_info_place_on_file_flag_by_id = function (changePlace) {
        return this.post(this.api('grade/modify_grade_info_place_on_file_flag_by_id'), changePlace);
    };
    DepartmentCloud.prototype.modify_grade_info_status_by_id = function (changeStatus) {
        return this.post(this.api('grade/modify_grade_info_status_by_id'), changeStatus);
    };
    DepartmentCloud.prototype.remove_grade_info_by_id = function (id) {
        return this.post(this.api('grade/remove_grade_info_by_id'), id);
    };
    DepartmentCloud.prototype.get_grade_info_by_id = function (id) {
        return this.post(this.api('grade/get_grade_info_by_id'), id);
    };
    // 科目
    DepartmentCloud.prototype.list_page_all_subject_info = function (pageQuery) {
        return this.post(this.api('subject/list_page_all_subject_info'), pageQuery);
    };
    DepartmentCloud.prototype.save_or_modify_subject_info = function (subjectAddList) {
        return this.post(this.api('subject/save_or_modify_subject_info'), subjectAddList);
    };
    DepartmentCloud.prototype.remove_subject_info_by_id = function (id) {
        return this.post(this.api('subject/remove_subject_info_by_id'), { id: id });
    };
    DepartmentCloud.prototype.modify_subject_info_status_by_id = function (changeStatus) {
        return this.post(this.api('subject/modify_subject_info_status_by_id'), changeStatus);
    };
    // 学科
    DepartmentCloud.prototype.save_or_modify_discipline_info = function (disciplineAddList) {
        return this.post(this.api('discipline/save_or_modify_discipline_info'), disciplineAddList);
    };
    DepartmentCloud.prototype.list_page_all_discipline_info = function (pageQuery) {
        return this.post(this.api('discipline/list_page_all_discipline_info'), pageQuery);
    };
    DepartmentCloud.prototype.remove_discipline_info_by_id = function (id) {
        return this.post(this.api('discipline/remove_discipline_info_by_id'), { id: id });
    };
    DepartmentCloud.prototype.modify_discipline_info_status_by_id = function (changeStatus) {
        return this.post(this.api('discipline/modify_discipline_info_status_by_id'), changeStatus);
    };
    // 单位
    DepartmentCloud.prototype.list_page_all_unit_info = function (pageQuery) {
        return this.post(this.api('unit/list_page_all_unit_info'), pageQuery);
    };
    DepartmentCloud.prototype.save_or_modify_unit_info = function (unitAdd) {
        return this.post(this.api('unit/save_or_modify_unit_info'), unitAdd);
    };
    DepartmentCloud.prototype.remove_unit_info_by_id = function (id) {
        return this.post(this.api('unit/remove_unit_info_by_id'), id);
    };
    DepartmentCloud.prototype.modify_unit_info_status_by_id = function (id) {
        return this.post(this.api('unit/modify_unit_info_status_by_id'), id);
    };
    DepartmentCloud.prototype.get_unit_info_by_id = function (id) {
        return this.post(this.api('unit/get_unit_info_by_id'), id);
    };
    // 学校类别
    DepartmentCloud.prototype.list_page_all_school_category_info = function (pageQuery) {
        return this.post(this.api('school_category/list_page_all_school_category_info'), pageQuery);
    };
    DepartmentCloud.prototype.save_or_modify_school_category_info = function (schoolSortAdd) {
        return this.post(this.api('school_category/save_or_modify_school_category_info'), schoolSortAdd);
    };
    DepartmentCloud.prototype.remove_school_category_info_by_id = function (id) {
        return this.post(this.api('school_category/remove_school_category_info_by_id'), id);
    };
    DepartmentCloud.prototype.modify_school_category_info_status_by_id = function (changeStatus) {
        return this.post(this.api('school_category/modify_school_category_info_status_by_id'), changeStatus);
    };
    DepartmentCloud.prototype.batch_import_unit_info = function (key) {
        return this.post(this.api('unit/batch_import_unit_info'), { key: key });
    };
    // 班级
    DepartmentCloud.prototype.list_page_all_class_info = function (queryList) {
        return this.post(this.api('class/list_page_all_class_info'), queryList);
    };
    DepartmentCloud.prototype.save_or_modify_class_info = function (classAdd) {
        return this.post(this.api('class/save_or_modify_class_info'), classAdd);
    };
    DepartmentCloud.prototype.remove_class_info_by_id = function (id) {
        return this.post(this.api('class/remove_class_info_by_id'), id);
    };
    DepartmentCloud.prototype.modify_class_info_status_by_id = function (changeStatus) {
        return this.post(this.api('class/modify_class_info_status_by_id'), changeStatus);
    };
    DepartmentCloud.prototype.get_class_info_by_id = function (id) {
        return this.post(this.api('class/get_class_info_by_id'), id);
    };
    DepartmentCloud.prototype.batch_import_class_info = function (key) {
        return this.post(this.api('class/batch_import_class_info'), { key: key });
    };
    // 班级类别
    DepartmentCloud.prototype.list_page_all_class_category_info = function (pageQuery) {
        return this.post(this.api('class_category/list_page_all_class_category_info'), pageQuery);
    };
    DepartmentCloud.prototype.save_or_modify_class_category_info = function (classSortAdd) {
        return this.post(this.api('class_category/save_or_modify_class_category_info'), classSortAdd);
    };
    DepartmentCloud.prototype.remove_class_category_info_by_id = function (id) {
        return this.post(this.api('class_category/remove_class_category_info_by_id'), id);
    };
    DepartmentCloud.prototype.modify_class_category_info_status_by_id = function (changeStatus) {
        return this.post(this.api('class_category/modify_class_category_info_status_by_id'), changeStatus);
    };
    DepartmentCloud.prototype.get_school_category_info_by_id = function (id) {
        return this.post(this.api('school_category/get_school_category_info_by_id'), id);
    };
    // 小組
    DepartmentCloud.prototype.list_page_all_group_info = function (pageQuery) {
        return this.post(this.api('group/list_page_all_group_info'), pageQuery);
    };
    DepartmentCloud.prototype.save_or_modify_group_info = function (groupAdd) {
        return this.post(this.api('group/save_or_modify_group_info'), groupAdd);
    };
    DepartmentCloud.prototype.remove_group_info_by_id = function (id) {
        return this.post(this.api('group/remove_group_info_by_id'), id);
    };
    DepartmentCloud.prototype.modify_group_info_status_by_id = function (changeStatus) {
        return this.post(this.api('group/modify_group_info_status_by_id'), changeStatus);
    };
    DepartmentCloud.prototype.get_group_info_by_member = function (member) {
        return this.post(this.api('group/get_group_info_by_member'), member);
    };
    // 教师
    DepartmentCloud.prototype.list_page_all_teacher_info = function (getTeacherList) {
        return this.post(this.api('teacher/list_page_all_teacher_info'), getTeacherList);
    };
    DepartmentCloud.prototype.save_or_modify_teacher_info = function (teacherAdd) {
        return this.post(this.api('teacher/save_or_modify_teacher_info'), teacherAdd);
    };
    DepartmentCloud.prototype.remove_teacher_info_by_id = function (id) {
        return this.post(this.api('teacher/remove_teacher_info_by_id'), id);
    };
    DepartmentCloud.prototype.get_teacher_info_by_id = function (id) {
        return this.post(this.api('teacher/get_teacher_info_by_id'), id);
    };
    DepartmentCloud.prototype.batch_remove_teacher_info = function (ids) {
        return this.post(this.api('teacher/batch_remove_teacher_info'), ids);
    };
    DepartmentCloud.prototype.batch_import_teacher_info = function (key) {
        return this.post(this.api('teacher/batch_import_teacher_info'), { key: key });
    };
    // 任课
    DepartmentCloud.prototype.list_page_all_course_info = function (getCourseList) {
        return this.post(this.api('course/list_page_all_course_info'), getCourseList);
    };
    DepartmentCloud.prototype.save_or_modify_course_info = function (courseAdd) {
        return this.post(this.api('course/save_or_modify_course_info'), courseAdd);
    };
    DepartmentCloud.prototype.remove_course_info_by_id = function (id) {
        return this.post(this.api('course/remove_course_info_by_id'), id);
    };
    DepartmentCloud.prototype.batch_import_course_info = function (key) {
        return this.post(this.api('course/batch_import_course_info'), { key: key });
    };
    // 家长
    DepartmentCloud.prototype.list_page_all_parent_info = function (pageQuery) {
        return this.post(this.api('parent/list_page_all_parent_info'), pageQuery);
    };
    DepartmentCloud.prototype.save_or_modify_parent_info = function (parentAdd) {
        return this.post(this.api('parent/save_or_modify_parent_info'), parentAdd);
    };
    DepartmentCloud.prototype.remove_parent_info_by_id = function (id) {
        return this.post(this.api('parent/remove_parent_info_by_id'), id);
    };
    DepartmentCloud.prototype.batch_remove_parent_info = function (ids) {
        return this.post(this.api('parent/batch_remove_parent_info'), ids);
    };
    DepartmentCloud.prototype.batch_import_parent_info = function (key) {
        return this.post(this.api('parent/batch_import_parent_info'), { key: key });
    };
    // 学生
    DepartmentCloud.prototype.list_page_all_student_info = function (pageQuery) {
        return this.post(this.api('student/list_page_all_student_info'), pageQuery);
    };
    DepartmentCloud.prototype.get_student_info_by_student_num = function (student_num) {
        return this.post(this.api('student/get_student_info_by_student_num'), { student_num: student_num });
    };
    DepartmentCloud.prototype.list_page_all_student_info_by_page = function (getStudentAllList) {
        return this.post(this.api('student/list_page_all_student_info'), getStudentAllList);
    };
    DepartmentCloud.prototype.save_or_modify_student_info = function (studentAdd) {
        return this.post(this.api('student/save_or_modify_student_info'), studentAdd);
    };
    DepartmentCloud.prototype.remove_student_info_by_id = function (id) {
        return this.post(this.api('student/remove_student_info_by_id'), id);
    };
    DepartmentCloud.prototype.modify_student_info_status_by_id = function (changeStatus) {
        return this.post(this.api('student/modify_student_info_status_by_id'), changeStatus);
    };
    DepartmentCloud.prototype.get_student_info_by_id = function (id) {
        return this.post(this.api('student/get_student_info_by_id'), id);
    };
    DepartmentCloud.prototype.batch_import_student_info = function (key) {
        return this.post(this.api('student/batch_import_student_info'), { key: key });
    };
    DepartmentCloud.prototype.batch_remove_student_info = function (ids) {
        return this.post(this.api('student/batch_remove_student_info'), { ids: ids });
    };
    // 教研员
    DepartmentCloud.prototype.list_page_all_instructor_info = function (queryInstructor) {
        return this.post(this.api('instructor/list_page_all_instructor_info'), queryInstructor);
    };
    DepartmentCloud.prototype.save_or_modify_instructor_info = function (instructorAdd) {
        return this.post(this.api('instructor/save_or_modify_instructor_info'), instructorAdd);
    };
    DepartmentCloud.prototype.remove_instructor_info_by_id = function (id) {
        return this.post(this.api('instructor/remove_instructor_info_by_id'), { id: id });
    };
    DepartmentCloud.prototype.batch_remove_instructor_info = function (ids) {
        return this.post(this.api('instructor/batch_remove_instructor_info'), { ids: ids });
    };
    DepartmentCloud.prototype.batch_import_instructor_info = function (key) {
        return this.post(this.api('instructor/batch_import_instructor_info'), key);
    };
    DepartmentCloud.prototype.get_instructor_info_by_id = function (key) {
        return this.post(this.api('instructor/get_instructor_info_by_id'), key);
    };
    // *****************************************************************************************************************
    DepartmentCloud.prototype.list_all_class_category_info = function (status, fk_unit_id) {
        return this.post(this.api('class_category/list_all_class_category_info'), { status: status, fk_unit_id: fk_unit_id });
    };
    DepartmentCloud.prototype.list_all_grade_info = function (queryAllGrade) {
        return this.post(this.api('grade/list_all_grade_info'), queryAllGrade);
    };
    DepartmentCloud.prototype.list_all_teacher_info = function (getTeacherAllList) {
        return this.post(this.api('teacher/list_all_teacher_info'), getTeacherAllList);
    };
    DepartmentCloud.prototype.list_all_unit_info = function () {
        return this.post(this.api('unit/list_all_unit_info'), {});
    };
    DepartmentCloud.prototype.list_all_unit_info_by_id = function (queryAllUnit) {
        return this.post(this.api('unit/list_all_unit_info'), queryAllUnit);
    };
    DepartmentCloud.prototype.list_all_school_list = function (queryList) {
        return this.post(this.api('unit/list_all_unit_info'), queryList);
    };
    DepartmentCloud.prototype.list_all_school_category_info = function (unitID) {
        return this.post(this.api('school_category/list_all_school_category_info'), unitID);
    };
    DepartmentCloud.prototype.list_all_class_info = function (queryAllClass) {
        return this.post(this.api('class/list_all_class_info'), queryAllClass);
    };
    DepartmentCloud.prototype.list_all_subject_info = function (unitID) {
        return this.post(this.api('subject/list_all_subject_info'), unitID);
    };
    DepartmentCloud.prototype.get_proccess = function (apiName) {
        return this.post(this.api('public/get_proccess'), apiName);
    };
    DepartmentCloud.prototype.list_all_discipline_info = function (apiName) {
        return this.post(this.api('discipline/list_all_discipline_info'), apiName);
    };
    return DepartmentCloud;
}(ICloud));
export { DepartmentCloud };
//# sourceMappingURL=department.api.js.map