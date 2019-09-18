<template>
    <el-col class="right_table" style="width: 1166px;">
        <el-row>
            <el-col :span="6" style="float:left;">
                <el-tooltip v-show="batchImportBtn" class="item" effect="dark" content="无权限" placement="top" style="float: left">
                    <el-button class="pt_btn" size="mini" type="primary" style="float:left;">批量导入</el-button>
                </el-tooltip>
                <el-button v-show="!batchImportBtn" class="add_btn" size="mini" type="primary" style="float:left;"
                           @click="importVisible = true">批量导入
                </el-button>
                <el-tooltip v-show="batchDeleteBtn" class="item" effect="dark" content="无权限" placement="top" style="float: right">
                    <el-button class="pt_btn" size="mini" type="primary" style="margin-left: 15px;float:left;">批量删除</el-button>
                </el-tooltip>
                <el-button v-show="!batchDeleteBtn" class="add_btn" size="mini" type="primary" style="margin-left: 15px;float:left;" @click="onBatchDelete()">批量删除</el-button>
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
            <el-table :data="parentList" @selection-change="handleSelectionChange"
                      v-loading="loading"
                      element-loading-text="拼命加载中"
                      element-loading-spinner="el-icon-loading"
                      element-loading-background="rgba(0, 0, 0, 0.8)" >
                <el-table-column header-align="center" type="selection" width="55"></el-table-column>
                <el-table-column header-align="center" label="序号" type="index" :index="ordinalAdd" sortable
                                 width="100px"></el-table-column>
                <el-table-column header-align="center" prop="student_info.class_info.grade_info.grade_name" label="年级"></el-table-column>
                <el-table-column header-align="center" prop="student_info.class_info.class_name" label="班级"></el-table-column>
                <el-table-column header-align="center" prop="student_info.student_name" label="学生姓名"></el-table-column>
                <el-table-column header-align="center" prop="student_info.student_num" label="学籍号"></el-table-column>
                <el-table-column header-align="center" prop="parent_name" label="家长姓名"></el-table-column>
                <el-table-column header-align="center" prop="parent_contact_num" label="家长电话"></el-table-column>
                <el-table-column header-align="center" prop="id_number" label="身份证号" width="160px"></el-table-column>
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
                    <el-tooltip class="item" effect="dark" content="学生姓名-学籍号" placement="right">
                        <el-select v-model="studentInfo" clearable filterable placeholder="请选择学生姓名-学籍号" value="">
                            <el-option
                                v-for="item in studentNameNumList"
                                :key="item.stu.id"
                                :label="item.name"
                                :value="item.stu.id">
                            </el-option>
                        </el-select>
                    </el-tooltip>
                    <span class="required">*</span>
                </el-row>
                <el-row>
                    <span style="width: 315px;display: inline-block;text-align: left;line-height: 40px">年级： {{className}}</span>
                </el-row>
                <el-row>
                    <span style="width: 315px;display: inline-block;text-align: left;line-height: 40px">班级： {{gradeName}}</span>
                </el-row>
                <el-row>
                    <el-tooltip class="item" effect="dark" content="家长姓名" placement="right">
                        <el-input v-model="parentAdd.parent_name" placeholder="家长姓名" clearable style="width: 315px"
                                  maxlength="15"></el-input>
                    </el-tooltip>
                    <span class="required">*</span>
                </el-row>
                <el-row>
                    <el-tooltip class="item" effect="dark" content="家长电话" placement="right">
                        <el-input v-model="parentAdd.parent_contact_num" placeholder="家长电话" clearable style="width: 315px"
                                  @keyup.native="handleContactNum()" maxlength="11" minlength="11"></el-input>
                    </el-tooltip>
                    <span class="required">*</span>
                </el-row>
                <el-row>
                    <el-tooltip class="item" effect="dark" content="身份证号" placement="right">
                        <el-input v-model="parentAdd.id_number" placeholder="身份证号" clearable style="width: 315px"
                                  oninput="value=value.replace(/[^xX\d]/g,'')" maxlength="18" minlength="18"></el-input>
                    </el-tooltip>
                    <span style="color: transparent;">*</span>
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
        <!--批量删除-->
        <el-dialog
            title="提示"
            :visible.sync="batchDelVisible"
            width="30%"
            center>
            <el-row class="dialog_center">
                <span style="font-size: 18px;">是否删除</span>
            </el-row>
            <span slot="footer">
                        <el-button @click="batchDelVisible = false" class="del_btn_cancel">取 消</el-button>
                        <el-button type="danger" @click="onBatchDelConfirm()" class="del_btn_confirm">确 定</el-button>
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
                        action="/api/parent/check_batch_import_parent_excel"
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
                    <a href="./parent_templet.xlsx">下载模板</a>
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

    import {Component, Watch, XtRouter, XtVue} from "../../../common/common";
    import {ChangeStatus, PageQuery, ParentAdd, StudentQuery} from "../department.def";
    import DepartmentCnt from "../department.cnt";
    import {AxiosResponse} from "axios";
    import {getBtnList} from "../../common/mod/base"




    @Component
    export default class Parent extends XtVue {
        // 分页查询
        private pageQuery: PageQuery = new PageQuery();
        private parentStu: StudentQuery = new StudentQuery();
        private pageTotal: number = 0;
        private pageNum: number = 0;
        // 新增弹框
        private addVisible: boolean = false;
        private addTitle: string | null = null;
        // 进度条弹框
        private progressDialog: boolean = false;
        // 进度的百分比
        private percentUpload: number = 0;
        // 删除按钮弹框
        private delVisible: boolean = false;
        private batchDelVisible: boolean = false;
        private delId: string | null = null;
        // 数据
        private parentList: any = [];
        private parentAdd: ParentAdd = new ParentAdd();
        private gradeList: any = [];
        private studentInfo: string | null = null;
        private student: any = '';
        private className: string | null = null;
        private gradeName: string | null = null;
        private studentNameNumList: any = [];
        private multipleSelection: string | null = null;
        private fileList: any[] = [];
        private token: any = '';
        // 按钮权限
        private addBtn: boolean = true; // 新增
        private editBtn: boolean = true; // 修改
        private deleteBtn: boolean = true; // 删除
        private batchImportBtn: boolean = true; // 批量导入
        private importVisible: boolean = false; // 导入弹框
        private batchDeleteBtn: boolean = true; // 批量删除
        private unitID: string | null = null;
        private roleType: string | null = null;
        private roleRank: string | null = null;
        private teacherID: string | null = null;
        private loading: boolean = false; // 加载层






        handleContactNum(): void {
            if (this.parentAdd.parent_contact_num)
                this.parentAdd.parent_contact_num = this.parentAdd.parent_contact_num.replace(/[^\d]/g,'');
        }
        handleUnitCode(){
            if (this.parentAdd.id_number)
                this.parentAdd.id_number = this.parentAdd.id_number.replace(/[^\d]/g,'');
            // console.log(this.unitAdd.unit_code.replace(/[^\d]/g,''))
        }
        @Watch("studentInfo")
        getStudentInfo(): void {
            if (!this.studentInfo) {
                this.className = '';
                this.gradeName = '';
                return;
            }
            for (let i: number = 0; i < this.studentNameNumList.length; i++) {
                if (this.studentNameNumList[i].stu.id === this.studentInfo) {
                    this.student = this.studentNameNumList[i].stu;
                    this.className = this.student.class_info.class_name;
                    this.gradeName = this.student.class_info.grade_info.grade_name;
                }
            }


        }
        // 勾选
        handleSelectionChange(val): void {
            this.multipleSelection = '';
            for (let i = 0; i < val.length; i++) {
                if (i === val.length - 1) {
                    this.multipleSelection += val[i].id;
                } else {
                    this.multipleSelection += val[i].id + ','
                }
            }
        }
        // 查询
        getInfo(): void {
            delete this.pageQuery.fk_unit_id;
            if (this.pageNum === 1) {
                this.pageQuery.page_num = 0;
            } else if (this.pageNum > 1) {
                this.pageQuery.page_num = this.pageNum - 1;
            }
            delete this.pageQuery.status;
            this.loading = true;
            DepartmentCnt.cloud.list_page_all_parent_info(this.pageQuery).then((response: AxiosResponse) => {
                if (response) { this.loading = false; }
                else { this.loading = false; }
                if (response.data.status === '200') {
                    this.pageTotal = response.data.data.totalElements;
                    this.parentList = response.data.data.content;
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
            let user: any = window.sessionStorage.getItem("user_info");
            user = JSON.parse(user);
            this.unitID = user.fk_unit_id;
            this.roleType = user.role_info.role_type;
            this.roleRank = user.role_info.role_rank;
            this.token = window.sessionStorage.getItem("token");
            this.parentStu.page_size = 9999999;
            if (this.roleRank == '6') { this.teacherID = user.id; }
            let getStudentAllList: object = {
                page_num: 0,
                page_size: 9999999,
                class_info: {
                    grade_info: {id: null},
                    id: null,
                    teacher_info: { id: this.teacherID, unit_info: { id: this.unitID }}}
            };
            DepartmentCnt.cloud.list_page_all_student_info_by_page(getStudentAllList).then((response: AxiosResponse) => {
                if (response.data.status === '200') {
                    for (var i = 0; i < response.data.data.content.length;i++) {
                        this.studentNameNumList.push(
                            {
                                name: response.data.data.content[i].student_name + '-' + response.data.data.content[i].student_num,
                                stu: response.data.data.content[i]
                            }
                        )
                    }
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
                this.batchDeleteBtn = getBtnList(btnList, 'batch_delete');
            }
        }

        // 新增
        onAddVisible(state: number, row: any = ''): void {
            if (state === 0) { // 点击新增
                this.parentAdd = new ParentAdd();
                this.studentInfo = '';
                this.className = '';
                this.gradeName = '';
                if (row) {
                    this.parentAdd.id = row.id;
                    this.studentInfo = row.student_info.id;
                    this.parentAdd.parent_contact_num = row.parent_contact_num;
                    this.parentAdd.parent_name = row.parent_name;
                    this.parentAdd.id_number = row.id_number;
                } else {
                    this.addTitle = '新增';
                    this.parentAdd = new ParentAdd();
                }
                this.addVisible = true;
            }  else if (state === 1) { // 取消
                this.parentAdd = new ParentAdd();
                this.addVisible = false;
            } else if (state === 2) { // 确定
                if (this.studentInfo && this.parentAdd.parent_name && this.parentAdd.parent_contact_num) {
                    if (this.parentAdd.parent_contact_num.length < 11) {
                        this.any().$notify.error({title: '提示', message: "手机号位数有误, 应为11位数字"});
                        return;
                    }
                    // if (this.parentAdd.id_number.length < 18) {
                    //     this.any().$notify.error({title: '提示', message: "身份证位数有误, 应为18位"});
                    //     return;
                    // }
                    this.parentAdd.student_info = {id: this.studentInfo};
                    this.loading = true;
                    DepartmentCnt.cloud.save_or_modify_parent_info(this.parentAdd).then((response: AxiosResponse) => {
                        if (response) { this.loading = false; }
                        else { this.loading = false; }
                        if (response.data.status === '200') {
                            this.addVisible = false;
                            this.parentAdd = new ParentAdd();
                            this.studentInfo = '';
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






        // 删除
        onDelete(id: string): void {
            this.delId = id;
            this.delVisible = true;
        }
        onDelConfirm(): void { // 确认删除
            // console.log(this.delId)
            this.loading = true;
            DepartmentCnt.cloud.remove_parent_info_by_id({id: this.delId}).then((response: AxiosResponse) => {
                if (response) { this.loading = false; }
                else { this.loading = false; }
                if (response.data.status === '200') {
                    this.delVisible = false;
                    this.getInfo();
                } else {
                    this.any().$notify.error({title: '提示', message: response.data.message});
                }

            })
        }
        // 批量删除
        onBatchDelete(): void {
            if (this.multipleSelection) {
                this.batchDelVisible = true;
            } else {
                this.any().$notify.error({title: '提示', message: "未勾选信息"});
            }
        }
        onBatchDelConfirm(): void {            this.loading = true;

            DepartmentCnt.cloud.batch_remove_parent_info({ids: this.multipleSelection}).then((response: AxiosResponse) => {
                if (response) { this.loading = false; }
                else { this.loading = false; }
                if (response.data.status === '200') {
                    this.batchDelVisible = false;
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
                DepartmentCnt.cloud.batch_import_parent_info(response.data.key).then((res: AxiosResponse) => {
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
            DepartmentCnt.cloud.get_proccess({api_name: '/parent/batch_import_parent_info'}).then((response: AxiosResponse) => {
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
