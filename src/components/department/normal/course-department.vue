<template>
    <el-col class="right_table" style="width: 1166px;">
        <el-row>
            <el-col :span="3" style="float:left;">
                <el-tooltip v-show="batchImportBtn" class="item" effect="dark" content="无权限" placement="top">
                    <el-button class="pt_btn" size="mini" type="primary" style="float:left;">批量导入</el-button>
                </el-tooltip>
                <el-button v-show="!batchImportBtn" class="add_btn" size="mini" type="primary" style="float:left;"
                           @click="importVisible = true">批量导入
                </el-button>
            </el-col>
            <el-col :span="2" style="float: right;">
                <el-tooltip v-show="addBtn" class="item" effect="dark" content="无权限" placement="top" style="float: right">
                    <el-button class="pt_btn" size="mini">
                        <span class="add_span"><img src="../../../assets/icon/add.png" class="add_img">新增</span>
                    </el-button>
                </el-tooltip>
                <el-button v-show="!addBtn" id="xz" class="add_btn" size="mini" style="float: right;" @click="onAddVisible(0)">
                    <span @click="onAddVisible(0)" class="add_span"><img src="../../../assets/icon/add.png" class="add_img">新增</span>
                </el-button>
            </el-col>
        </el-row>
        <el-row>
            <el-table :data="courseList"
                      v-loading="loading"
                      element-loading-text="拼命加载中"
                      element-loading-spinner="el-icon-loading"
                      element-loading-background="rgba(0, 0, 0, 0.8)">
                <el-table-column header-align="center" label="序号" type="index" :index="ordinalAdd" sortable
                                 width="100px"></el-table-column>
                <el-table-column header-align="center" prop="class_info.grade_info.grade_name" label="年级姓名"></el-table-column>
                <el-table-column header-align="center" prop="class_info.class_name" label="班级名称"></el-table-column>
                <el-table-column header-align="center" prop="subject_info.subject_name" label="科目名称"></el-table-column>
                <el-table-column header-align="center" prop="teacher_info.teacher_name" label="任课教师"></el-table-column>
                <el-table-column header-align="center" label="操作">
                   <template slot-scope="scope">
                       <el-row>
                           <el-tooltip v-show="editBtn" class="item" effect="dark" content="无权限" placement="top">
                               <span class="img_span disabled_update" style="cursor: not-allowed"></span>
                           </el-tooltip>
                           <el-tooltip v-show="deleteBtn" class="item" effect="dark" content="无权限" placement="top">
                               <span class="img_span disabled_del" style="cursor: not-allowed"></span>
                           </el-tooltip>
                           <span v-show="!editBtn" :id="'bj'+ordinalAdd(0)" class="img_span update" @click="onAddVisible(0, scope.row)"></span>
                           <span v-show="!deleteBtn" :id="'sc'+ordinalAdd(0)" class="img_span del" @click="onDelete(scope.row.id)"></span>
                       </el-row>
                   </template>
                </el-table-column>
            </el-table>
        </el-row>
        <el-dialog
            :title="addTitle"
            :close-on-click-modal="false"
            :visible.sync="addVisible"
            width="30%"
            center>
            <el-row class="dialog_center">
                <el-row>
                    <el-select v-show="Number(this.userType) < 4" v-model="schoolID" clearable filterable placeholder="请选择所属学校" value="">
                        <el-option
                            v-for="item in schoolList"
                            :key="item.id"
                            :label="item.unit_name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                    <span class="required">*</span>
                </el-row>
                <el-row>
                    <el-select v-model="gradeID" clearable filterable placeholder="请选择所属年级" value="">
                        <el-option
                            v-for="item in gradeList"
                            :key="item.id"
                            :label="item.grade_name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                    <span class="required">*</span>
                </el-row>
                <el-row>
                    <el-select v-model="classID" clearable filterable placeholder="请选择所属班级" value=""
                               :no-data-text="!gradeID ? '请先选择年级' : '该年级下没有班级'">
                        <el-option
                            v-for="item in classList"
                            :key="item.id"
                            :label="item.class_name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                    <span class="required">*</span>
                </el-row>
                <el-row>
                    <el-select v-model="subjectID" clearable filterable placeholder="请选择科目名称" value=""
                               :no-data-text="!classID ?'请先选择班级' : '无数据' ">
                        <el-option
                            v-for="item in subjectList"
                            :key="item.id"
                            :label="item.subject_name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                    <span class="required">*</span>
                </el-row>
                <el-row>
                    <el-select v-model="teacherID" clearable filterable placeholder="请选择任课教师" value=""
                               :no-data-text="!classID ? '未选择班级' : '该班级所在学校下没有教师'">
                        <el-option
                            v-for="item in teacherList"
                            :key="item.id"
                            :label="item.teacher_name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                    <span class="required">*</span>
                </el-row>
            </el-row>
            <span slot="footer">
                        <el-button @click="onAddVisible(1)" class="update_btn_cancel">取 消</el-button>
                        <el-button type="primary" @click="onAddVisible(2)" class="update_btn_confirm">确 定</el-button>
                    </span>
        </el-dialog>
        <el-dialog
            title="提示"
            :visible.sync="delVisible"
            width="30%"
            center>
            <el-row class="dialog_center">
                <span style="font-size: 18px;">是否删除</span>
            </el-row>
            <span slot="footer">
                        <el-button @click="delVisible = false" class="del_btn_cancel">取 消</el-button>
                        <el-button type="danger" @click="onDelConfirm()" class="del_btn_confirm">确 定</el-button>
                    </span>
        </el-dialog>
        <!--导入-->
        <el-dialog :visible.sync="importVisible" width="30%" center>
            <el-row class="dialog_center">
                <el-col> <span style="font-size: 18px;">导入</span> </el-col>
            </el-row>
            <el-row style="text-align: center;">
                <el-row style="margin-top: 15px;">
                    <el-upload
                        class="upload-demo"
                        ref="upload"
                        accept=".xls,.xlsx"
                        action="/api/course/check_batch_import_course_excel"
                        :headers="{Token: token}"
                        :on-success="successUpload"
                        :on-error="errorUpload"
                        :file-list="fileList"
                        :auto-upload="false">
                        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                        <el-button style="margin-left: 10px;" size="small" type="success" @click="onUploading">导入</el-button>
                    </el-upload>
                </el-row>
                <el-row style="margin-bottom: 15px;">
                    <a href="./course_templet.xlsx">下载模板</a>
                </el-row>
                <el-row>
                    <el-button @click="importVisible = false" class="del_btn_cancel" style="margin: 0">取 消</el-button>
                </el-row>
            </el-row>
        </el-dialog>
        <!--进度-->
        <el-dialog title="上传进度" :visible.sync="progressDialog" width="30%" center>
            <el-progress :text-inside="true" :stroke-width="18" :percentage="Number(percentUpload.toFixed(2))" status="success"></el-progress>

        </el-dialog>
        <el-pagination
            background
            layout="prev, pager, next"
            :current-page.sync="pageNum"
            :page-size="pageQuery.page_size"
            :total="pageTotal"
            v-show="pageTotal / pageQuery.page_size > 1">>
        </el-pagination>
    </el-col>
</template>

<script lang="ts">

    import {Component, Watch, XtVue} from "../../../common/common";
    import {PageQuery, CourseAdd, QueryAll, QueryAllUnit} from "../department.def";
    import DepartmentCnt from "../department.cnt";
    import {AxiosResponse} from "axios";
    import {getBtnList} from "../../common/mod/base"



    @Component
    export default class School extends XtVue {
        // 分页查询
        private pageQuery: PageQuery = new PageQuery();
        private pageTotal: number = 0;
        private pageNum: number = 0;
        // 查询所有
        private queryAllGrade: QueryAll = new QueryAll();
        // 新增弹框
        private addVisible: boolean = false;
        private addTitle: string | null = null;
        // 进度条弹框
        private progressDialog: boolean = false;
        // 进度的百分比
        private percentUpload: number = 0;
        // 删除按钮弹框
        private delVisible: boolean = false;
        private delId: string | null = null;
        // 数据
        private courseList: any = [];
        private courseAdd: CourseAdd = new CourseAdd();
        private gradeList: any = [];
        private gradeID: string | null = null;
        private schoolList: any = [];
        private classAllList: any = [];
        private classList: any = [];
        private classID: string | null = null;
        private schoolID: string | null = null;
        private allSubjectList: any = [];
        private subjectList: any = [];
        private subjectID: string | null = null;
        private teacherList: any = [];
        private teacherID: string | null = null;
        private rowInfo: any = '';
        private fileList: any = [];
        private token: any = '';
        // 按钮权限
        private addBtn: boolean = true; // 新增
        private editBtn: boolean = true; // 修改
        private deleteBtn: boolean = true; // 删除
        private batchImportBtn: boolean = true; // 批量导入
        private importVisible: boolean = false; // 导入弹框
        private unitID: string | null = null;
        private userType: string | null = null;
        private updateChange: boolean = false;
        private loading: boolean = false; // 加载层




        // 查询
        getInfo(): void {
            let getCourseList: object = {
                page_num: this.pageNum,
                page_size: 15,
                teacher_info: { unit_info: { id: this.unitID } }
            };
            if (this.pageNum === 1) {
                this.pageQuery.page_num = 0;
                getCourseList = {
                    page_num: this.pageQuery.page_num = 0,
                    page_size: 15,
                    teacher_info: { unit_info: { id: this.unitID } }
                };
            } else if (this.pageNum > 1) {
                this.pageQuery.page_num = this.pageNum - 1;
                getCourseList = {
                    page_num: this.pageQuery.page_num = this.pageNum - 1,
                    page_size: 15,
                    teacher_info: { unit_info: { id: this.unitID } }
                };
            }
            this.loading = true;
            DepartmentCnt.cloud.list_page_all_course_info(getCourseList).then((response: AxiosResponse) => {
                this.loading = false;
                if (response.data.status === '200') {
                    // console.log(response.data.data.content);
                    this.pageTotal = response.data.data.totalElements;
                    this.courseList = response.data.data.content;
                } else {
                    this.any().$notify.error({title: '提示', message: response.data.message});
                }

            })
        }
        @Watch("pageNum")
        onFlipOver(): void {
            this. getInfo();
        }
        mounted() {
            let userInfo: any = window.sessionStorage.getItem("user_info");
            userInfo = JSON.parse(userInfo);
            this.unitID = userInfo.fk_unit_id;
            this.userType = userInfo.user_type;
            this.token = window.sessionStorage.getItem("token");


            if (Number(this.userType) < 4) { this.querySchoolList() }
            if (Number(this.userType) === 4) {
                this.queryClassList();
                this.queryTeacherList();
            }
            this.queryGradeList();

            DepartmentCnt.cloud.list_all_subject_info({fk_unit_id: this.unitID, status: '1'}).then((response: AxiosResponse) => {
                if (response.data.status === '200') {
                    this.allSubjectList = response.data.data;
                } else {
                    this.any().$notify.error({title: '提示', message: response.data.message});
                }
            });


            if (window.sessionStorage.getItem("val")) {
                let btnList: any = window.sessionStorage.getItem("val");
                btnList = JSON.parse(btnList).children;
                this.addBtn = getBtnList(btnList, 'add');
                this.editBtn = getBtnList(btnList, 'edit');
                this.deleteBtn = getBtnList(btnList, 'delete');
                this.batchImportBtn = getBtnList(btnList, 'batch_import');
            }
        }

        querySchoolList(): void {
            let querySchool: QueryAllUnit = new QueryAllUnit();
            querySchool.id = this.unitID;
            querySchool.status = '1';
            querySchool.unit_level = '4';
            DepartmentCnt.cloud.list_all_unit_info_by_id(querySchool).then((response: AxiosResponse) => {
                if (response.data.status === '200') {
                    this.schoolList = response.data.data;
                    console.log(this.schoolList);
                } else {
                    this.any().$notify.error({title: '提示', message: response.data.message});
                }

            });
        }
        @Watch("schoolID")
        getGradeList(): void {
            this.teacherList = [];
            this.teacherID = null;
            this.classID = null;
            if (this.schoolID) {
                this.queryClassList();
                this.queryTeacherList();
            }
        }
        queryGradeList(): void {
            this.queryAllGrade.fk_unit_id = this.unitID;
            DepartmentCnt.cloud.list_all_grade_info(this.queryAllGrade).then((response: AxiosResponse) => {
                if (response.data.status === '200') {
                    this.gradeList = response.data.data;
                    let str;
                    for (let i = 1; i < this.gradeList.length; i++) {
                        for (let j = i; j > 0; j--) {
                            if (this.gradeList[j].grade_name < this.gradeList[j - 1].grade_name) {
                                str=this.gradeList[j];
                                this.gradeList[j] = this.gradeList[j-1];
                                this.gradeList[j-1] = str ;
                            }
                        }
                    }
                } else {
                    this.any().$notify.error({title: '提示', message: response.data.message});
                }

            });
        }
        @Watch("gradeID")
        getClassList(): void {
            this.classList = [];
            this.classID = null;
            for (let i = 0; i < this.classAllList.length; i++) {
                if (this.classAllList[i].grade_info.id === this.gradeID) {
                    this.classList.push(this.classAllList[i]);
                }
            }
            if (this.addTitle === '修改' && this.classList.length > 0) {
                this.classID = this.rowInfo.class_info.id;
            }
        }
        queryClassList(): void {
            let unitID: string | null = this.unitID;
            if (this.schoolID) unitID = this.schoolID;
            let queryAllClass = {
                status: '1',
                teacher_info: {unit_info: {id: unitID}}
            };
            DepartmentCnt.cloud.list_all_class_info(queryAllClass).then((response: AxiosResponse) => {
                if (response.data.status === '200') {
                    this.classAllList = response.data.data;
                    this.classList = [];
                    for (let i = 0; i < this.classAllList.length; i++) {
                        if (this.classAllList[i].grade_info.id === this.gradeID) {
                            this.classList.push(this.classAllList[i]);
                        }
                    }
                    if (this.addTitle === '修改' && this.classList.length > 0) {
                        this.classID = this.rowInfo.class_info.id;
                    }
                } else {
                    this.any().$notify.error({title: '提示', message: response.data.message});
                }

            });
        }
        @Watch("classID")
        getSubjectList(): void {
            this.subjectList = [];
            if (!this.updateChange) { this.subjectID = ''; }
            if (this.gradeID && this.classID) {
                for (let i = 0; i < this.classList.length; i++) {
                    if (this.classID === this.classList[i].id) {
                        for (let j = 0; j < this.allSubjectList.length; j++) {
                            if (this.allSubjectList[j].subject_type === this.classList[i].literary_scientific_type
                                || this.allSubjectList[j].subject_type === '0') {
                                this.subjectList.push(this.allSubjectList[j]);
                            }
                        }
                    }
                }
            }
            this.updateChange = false;
        }
        queryTeacherList(): void {
            let unitID: string | null = this.unitID;
            if (this.schoolID) unitID = this.schoolID;
            let getTeacherAllList: object = { unit_info: { id: unitID } };
            DepartmentCnt.cloud.list_all_teacher_info(getTeacherAllList).then((response: AxiosResponse) => {
                if (response.data.status === '200') {
                    this.teacherList = response.data.data;
                    if (this.addTitle === '修改') {
                        for (let i = 0; i < this.teacherList.length; i++) {
                            if (this.teacherList[i].id === this.rowInfo.teacher_info.id) {
                                this.teacherID = this.rowInfo.teacher_info.id;
                            }
                        }
                    }
                } else {
                    this.any().$notify.error({title: '提示', message: response.data.message});
                }

            });
        }

















        @Watch("addVisible")
        getUpdateInfo(): void {
            if (!this.addVisible)
                this.cleanInfo();
        }
        // 新增
        onAddVisible(state: number, row: any = ''): void {
            if (state === 0) { // 点击新增
                if (row) {
                    this.rowInfo = row;
                    this.addTitle = '修改';
                    this.courseAdd.id = row.id;
                    this.schoolID = row.class_info.teacher_info.unit_info.id;
                    this.gradeID = row.class_info.grade_info.id;
                    this.subjectID = row.subject_info.id;
                    this.updateChange = true;
                    this.teacherID = row.teacher_info.id;
                } else {
                    this.addTitle = '新增';
                    this.courseAdd = new CourseAdd();
                }
                this.addVisible = true;
            }  else if (state === 1) { // 取消
                this.courseAdd = new CourseAdd();
                this.addVisible = false;
            } else if (state === 2) { // 确定
                if (this.gradeID && this.classID && this.subjectID && this.teacherID) {
                    this.courseAdd.class_info = {id: this.classID};
                    this.courseAdd.subject_info = {id: this.subjectID};
                    this.courseAdd.teacher_info = {id: this.teacherID};
                    this.loading = true;
                    DepartmentCnt.cloud.save_or_modify_course_info(this.courseAdd).then((response: AxiosResponse) => {
                        this.loading = false;
                        if (response.data.status === '200') {
                            this.addVisible = false;
                            this.courseAdd = new CourseAdd();
                            this.getInfo();
                        } else {
                            this.any().$notify.error({title: '提示', message: response.data.message});
                        }

                    })
                } else {
                    this.any().$notify.error({title: '提示', message: "必填项不能有空"});
                }

            }
        }

        // 清空
        cleanInfo(): void {
            this.gradeID = '';
            this.classID = '';
            this.subjectID = '';
            this.teacherID = '';
        }





        // 删除
        onDelete(id: string): void {
            this.delId = id;
            this.delVisible = true;
        }
        onDelConfirm(): void { // 确认删除
            // console.log(this.delId)
            this.loading = true;
            DepartmentCnt.cloud.remove_course_info_by_id({id: this.delId}).then((response: AxiosResponse) => {
                this.loading = false;
                if (response.data.status === '200') {
                    this.delVisible = false;
                    this.getInfo();
                } else {
                    this.any().$notify.error({title: '提示', message: response.data.message});
                }

            })
        }


        // 导入检测
        onUploading(): void {
            if (this.any().$refs.upload.uploadFiles.length) {
                this.any().$refs.upload.submit();
            } else {
                this.any().$notify.error({title: '提示', message: "请先选择文件"});
            }
        }
        // 导入检测成功
        successUpload(response, file, fileList): void {
            console.log(response, file, fileList);
            if (response.status === '200') {
                DepartmentCnt.cloud.batch_import_course_info(response.data.key).then((res: AxiosResponse) => {
                    if (res.data.status === '200') {
                        this.getProgress();
                    } else {
                        this.any().$notify.error({title: '提示', message: "导入失败"});
                        return;
                    }
                })
            } else {
                let item = response.data;
                for (let i = 0; i < item.length; i++) {
                    if (item[i].error_msg) {
                        this.any().$notify.error({title: '提示', message: item[i].error_msg + '来自第' + item[i].row_no + '行'});
                        return;
                    }
                }
                this.any().$notify.error({title: '提示', message: response.message});
            }
        }
        // 导入检测失败
        errorUpload(err, file, fileList): void { console.log(file, fileList); this.any().$notify.error({title: '提示', message: err}); }

        // 进度
        getProgress(): void {
            DepartmentCnt.cloud.get_proccess({api_name: '/course/batch_import_course_info'}).then((response: AxiosResponse) => {
                if (response.data.data.error_msg) {
                    this.progressDialog = false;
                    return;
                }
                if (response.data.status != 200) {
                    this.progressDialog = false;
                    return;
                }else {
                    this.progressDialog = true;
                    this.percentUpload = response.data.data.current_num / response.data.data.tota_num * 100;
                    if (response.data.data.tota_num === response.data.data.current_num) {
                        this.progressDialog = false;
                        this.getInfo();
                        this.any().$notify.success({title: '提示', message: "导入成功"});
                    } else {
                        let self: any = this;
                        setTimeout(function () {
                            self.getProgress()
                        }, 2000);
                    }
                }
            });
        }

        // 表单序号
        ordinalAdd(index: number): number {
            return index + 1;
        }
    }
</script>

<style scoped lang="scss">
    @import "../department.scss";




    .img_span {
        display: inline-block;
        height: 24px;
        width: 24px;
        cursor: pointer;
    }

    .color_black .el-input__inner {
        color: #000 !important;
    }
</style>
