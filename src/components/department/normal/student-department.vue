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

        <el-row style="margin-bottom: 25px;">
            <el-col :span="4" style="margin-right: 8px;">
                <el-select v-show="Number(roleRank) < 3" v-model="districtID" clearable filterable placeholder="请选择区县" value="" style="float:left;">
                    <el-option
                        v-for="item in districtList"
                        :key="item.id"
                        :label="item.unit_name"
                        :value="item.id">
                    </el-option>
                </el-select>
            </el-col>
            <el-col v-show="Number(roleRank) < 4" :span="4" style="margin-right: 8px;">
                <el-select v-model="schoolID" clearable filterable placeholder="请选择学校" value="" style="float:left;">
                    <el-option
                        v-for="item in schoolList"
                        :key="item.id"
                        :label="item.unit_name"
                        :value="item.id">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="4" style="margin-right: 8px;">
                <el-select v-model="gradeID" clearable filterable placeholder="请选择年级"
                           no-data-text="暂无数据" value="" style="float:left;">
                    <el-option
                        v-for="item in gradeList"
                        :key="item.id"
                        :label="item.grade_name"
                        :value="item.id">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="4" style="margin-right: 8px;">
                <el-select v-model="classID" clearable filterable placeholder="请选择班级"
                           no-data-text="未选择学校和年级" value="" style="float:left;">
                    <el-option
                        v-for="item in classList"
                        :key="item.id"
                        :label="item.class_name"
                        :value="item.id">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="4" style="margin-right: 8px;">
                <el-input v-model="studentName" clearable placeholder="请输入姓名" value=""
                          @change="getStudentList()" style="float:left;"></el-input>
            </el-col>
        </el-row>
        <el-row>
            <el-table :data="studentList"   @selection-change="handleSelectionChange"  v-loading.fullscreen.lock="fullLoading"
                      v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"
                      element-loading-background="rgba(0, 0, 0, 0.8)">
                <el-table-column header-align="center" type="selection" width="55"></el-table-column>
                <el-table-column header-align="center" label="序号" type="index" :index="ordinalAdd" sortable
                                 width="100px"></el-table-column>
                <el-table-column header-align="center" prop="student_name" label="姓名"></el-table-column>
                <el-table-column header-align="center" prop="sex" label="性别">
                    <template slot-scope="scope">
                        <span>{{scope.row.sex === '1' ? '男' : '女'}}</span>
                    </template>
                </el-table-column>
                <el-table-column header-align="center" prop="student_num" label="学籍号" width="175px"></el-table-column>
                <el-table-column header-align="center" prop="class_info.teacher_info.unit_info.unit_name" label="学校"></el-table-column>
                <el-table-column header-align="center" prop="class_info.grade_info.grade_name" label="年级"></el-table-column>
                <el-table-column header-align="center" prop="class_info.class_name" label="班级"></el-table-column>
                <!--<el-table-column header-align="center" prop="status" label="使用状态">
                    <template slot-scope="scope">
                        <el-tooltip v-show="startStopBtn" class="item" effect="dark" content="无权限" placement="top">
                            <img src="../../../assets/icon/close.png" style="vertical-align: middle;cursor:pointer">
                        </el-tooltip>
                        <el-popover v-show="!startStopBtn" trigger="hover" placement="right">
                            <p v-if="scope.row.status === '1'">已启用</p>
                            <p v-if="scope.row.status === '0'">已停用</p>
                            <div slot="reference" class="name-wrapper" :id="'zt'+ordinalAdd(0)">
                                <img src="../../../assets/icon/open.png" v-if="scope.row.status === '1'"
                                     @click="onChangeStatus(scope.row)" style="vertical-align: middle;cursor:pointer">
                                <img src="../../../assets/icon/close.png" v-if="scope.row.status === '0'"
                                     @click="onChangeStatus(scope.row)" style="vertical-align: middle;cursor:pointer">
                            </div>
                        </el-popover>
                    </template>
                </el-table-column>-->
                <el-table-column header-align="center" label="操作">
                    <template slot-scope="scope">
                        <el-row>
                            <el-tooltip v-show="editBtn" class="item" effect="dark" content="无权限" placement="top">
                                <span class="img_span disabled_update" style="cursor: not-allowed"></span>
                            </el-tooltip>
                            <el-tooltip v-show="deleteBtn" class="item" effect="dark" content="无权限" placement="top">
                                <span class="img_span disabled_del" style="cursor: not-allowed"></span>
                            </el-tooltip>
                            <span v-show="!editBtn" :id="'bj'+ordinalAdd(0)" class="img_span update" @click="onAddVisible(scope.row)"></span>
                            <span v-show="!deleteBtn" :id="'sc'+ordinalAdd(0)" class="img_span del" @click="onDelete(scope.row.id)"></span>
                        </el-row>
                    </template>
                </el-table-column>
            </el-table>
        </el-row>
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
                        action="/api/student/check_batch_import_student_excel"
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
                    <a href="./student_templet.xlsx">下载模板</a>
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
    import {ChangeStatus, StudentQuery, PageQuery, QueryAll, QueryAllUnit} from "../department.def";
    import DepartmentCnt from "../department.cnt";
    import {AxiosResponse} from "axios";
    import {getBtnList} from "../../common/mod/base"



    @Component
    export default class Student extends XtVue {
        // 分页查询
        private pageQuery: PageQuery = new PageQuery();
        private pageAllQuery: PageQuery = new PageQuery();
        private studentInfo: StudentQuery = new StudentQuery();
        private pageTotal: number = 0;
        private pageNum: number = 0;
        // 查询所有
        private queryAll: QueryAll = new QueryAll();
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
        // 状态数据
        private changeStatus: ChangeStatus = new ChangeStatus();
        // 数据
        private districtList: any = [];
        private districtID: string | null = null;
        private studentList: any = [];
        private schoolList: any = [];
        private allSchoolList: any = [];
        private schoolID: string | null = null;
        private gradeList: any = [];
        private allGradeList: any = [];
        private gradeID: string | null = null;
        private classList: any = [];
        private classID: string | null = null;
        private studentName: string | null = null;
        private multipleSelection: string | null = null;
        private fileList: any = [];
        private token: any = '';
        private fullLoading: boolean = false;
        private userInfo: object = {};
        private userType: string = '';
        private roleType: string = '';
        private roleRank: string = '';
        private userID: string = '';
        private unitID: string = '';
        private checkUnitID: string | null = null;
        // 按钮权限
        private addBtn: boolean = true; // 新增
        private editBtn: boolean = true; // 修改
        private deleteBtn: boolean = true; // 删除
        private startStopBtn: boolean = true; // 状态
        private batchImportBtn: boolean = true; // 批量导入
        private importVisible: boolean = false; // 导入弹框
        private batchDeleteBtn: boolean = true; // 批量删除
        private loading: boolean = false; // 加载等待
        private teacherID: any = null;
        private repeatQueryInfo: boolean = true; // 防止页面加载时重复调用2次查询接口
        // 查询所有单位参数
        private queryAllUnit: QueryAllUnit = new QueryAllUnit();




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
            if (this.pageNum == 1) {
                this.pageQuery.page_num = 0;
                this.studentInfo.page_num = 0;
            } else if (this.pageNum > 1) {
                this.pageQuery.page_num = this.pageNum - 1;
                this.studentInfo.page_num = this.pageNum - 1;
            }
            if (this.roleRank == '6') { this.teacherID = this.userID; }

            if (!this.checkUnitID) {
                this.checkUnitID= this.unitID
            }

            if (this.roleType == '0') {
                this.studentInfo.class_info = {
                    id: this.classID,
                    grade_info: {id: this.gradeID},
                    teacher_info: {id: this.teacherID, unit_info: {id: ''}}
                };
            } else if (this.roleRank <= '4' || this.roleRank == '6') {
                this.studentInfo.class_info = {
                    id: this.classID,
                    grade_info: {id: this.gradeID},
                    teacher_info: {id: this.teacherID, unit_info: {id: this.checkUnitID}}
                };
            }
            if (this.studentName) {
                this.studentInfo.student_name = this.studentName;
            }
            this.loading = true;
            DepartmentCnt.cloud.list_page_all_student_info(this.studentInfo).then((response: AxiosResponse) => {
                this.loading = false;
                this.repeatQueryInfo = false;
                if (response.data.status === '200') {
                    // console.log(response.data.data.content);
                    this.pageTotal = response.data.data.totalElements;
                    this.studentList = response.data.data.content;
                } else {
                    this.any().$notify.error({title: '提示', message: response.data.message});
                }

            });
        }




        @Watch("districtID")
        getInfoByDistrict(): void {
            this.schoolID = '';
            if (!this.districtID) {
                this.schoolList = this.allSchoolList;
                this.checkUnitID = '';
                this.getInfo();
                return;
            }
            if (this.districtID) {
                this.checkUnitID = this.districtID;
                this.schoolList = [];
                for (let i = 0; i < this.allSchoolList.length; i++) {
                    if (this.allSchoolList[i].fk_parent_id === this.districtID) {
                        this.schoolList.push(this.allSchoolList[i]);
                    }
                }
            }
            this.studentInfo.class_info = {
                grade_info: {id: this.gradeID},
                id: this.classID,
                teacher_info: {id: this.teacherID, unit_info: {id: this.checkUnitID}}
            };
            this.queryStudentByInfo();
        }


        @Watch("schoolID")
        getInfoBySchool(): void {
            this.studentList = [];
            if (!this.districtID && !this.schoolID) {
                this.classList = [];
                this.classID = '';
                this.checkUnitID = '';
                this.getInfo();
                return;
            }
            if (this.schoolID) {
                this.checkUnitID = this.schoolID;
            }
            this.studentInfo.class_info = {
                grade_info: {id: this.gradeID},
                id: this.classID,
                teacher_info: {id: this.teacherID, unit_info: {id: this.checkUnitID}}
            };
            this.queryStudentByInfo();
            this.queryClass();
        }
        @Watch("gradeID")
        getInfoByGrade(): void {
            this.studentList = [];
            if (!this.gradeID) {
                this.classList = [];
                this.classID = '';
                this.getInfo();
                return;
            }
            if (!this.checkUnitID) {
                this.checkUnitID = this.unitID;
            }
            this.studentInfo.class_info = {
                grade_info: {id: this.gradeID},
                id: this.classID,
                teacher_info: { id: this.teacherID, unit_info: {id: this.checkUnitID}}
            };
            this.queryStudentByInfo();
            this.queryClass();

        }
        @Watch("classID")
        getInfoByClass(): void {
            this.studentList = [];
            if (!this.classID) {
                this.getInfo();
                return;
            }
            if (!this.checkUnitID) {
                this.checkUnitID = this.unitID;
            }
            this.studentInfo.class_info = {
                id: this.classID,
                grade_info: { id: this.gradeID },
                teacher_info: { id: this.teacherID, unit_info: { id: this.checkUnitID } }
            };
            this.queryStudentByInfo();
        }

        // 姓名查询
        getStudentList(): void {
            this.studentList = [];
            this.studentInfo.student_name = this.studentName;
            if (!this.studentName) {
                this.getInfo();
                return;
            }
            this.queryStudentByInfo();
        }


        queryStudentByInfo(): void {
            if (this.repeatQueryInfo) { return; }
            this.loading = true;
            this.studentInfo.page_num = 0;
            DepartmentCnt.cloud.list_page_all_student_info(this.studentInfo).then((response: AxiosResponse) => {
                if (response.data.status === '200') {
                    this.pageTotal = response.data.data.totalElements;
                    this.studentList = response.data.data.content;
                    this.loading = false;
                } else {
                    this.any().$notify.error({title: '提示', message: response.data.message});
                    this.loading = false;
                }
            });
        }
        queryClass(): void {
            if (!this.schoolID || !this.gradeID) return;
            let queryAllClass = {
                status: '1',
                teacher_info: {id: this.teacherID, unit_info: {id: this.schoolID}},
                grade_info: {id: this.gradeID}
            };
            DepartmentCnt.cloud.list_all_class_info(queryAllClass).then((response: AxiosResponse) => { // 班级
                if (response.data.status === '200') {
                    this.classList = response.data.data;
                } else {
                    this.any().$notify.error({title: '提示', message: response.data.message});
                }
            });
        }




        @Watch("pageNum")
        onFlipOver(): void {
            let userInfo: any = window.sessionStorage.getItem("user_info");
            userInfo = JSON.parse(userInfo);
            this.userInfo = userInfo;
            this.userType = userInfo.user_type;
            this.userID = userInfo.fk_user_id;
            this.unitID = userInfo.fk_unit_id;
            this.getInfo();
        }
        mounted() {
            let userInfo: any = window.sessionStorage.getItem("user_info");
            userInfo = JSON.parse(userInfo);
            this.userInfo = userInfo;
            this.userType = userInfo.user_type;
            this.roleType = userInfo.role_info.role_type;
            this.roleRank = userInfo.role_info.role_rank;
            this.userID = userInfo.fk_user_id;
            this.unitID = userInfo.fk_unit_id;
            if (this.userType === '4' || this.userType === '5') {
                this.schoolID = this.unitID;
                this.checkUnitID = this.unitID;
            }
            this.token = window.sessionStorage.getItem("token");
            this.queryAllUnit.id = this.unitID;
            this.queryAllUnit.status = '1';
            DepartmentCnt.cloud.list_all_unit_info_by_id(this.queryAllUnit).then((response: AxiosResponse) => {
                if (response.data.status === '200') {
                    this.districtList = [];
                    for (let i = 0; i < response.data.data.length; i++) {
                        if (response.data.data[i].unit_level === '3') {
                            this.districtList.push(response.data.data[i]);
                        }
                        if (response.data.data[i].unit_level === '4') {
                            this.allSchoolList.push(response.data.data[i]);
                            this.schoolList.push(response.data.data[i]);
                        }
                    }
                } else {
                    this.any().$notify.error({title: '提示', message: response.data.message});
                }
            });

            this.queryAll.fk_unit_id = this.unitID;
            DepartmentCnt.cloud.list_all_grade_info(this.queryAll).then((response: AxiosResponse) => {
                if (response.data.status === '200') {
                    this.allGradeList = response.data.data;
                    this.gradeList = this.allGradeList;
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
                this.startStopBtn = getBtnList(btnList, 'start_stop');
                this.batchImportBtn = getBtnList(btnList, 'batch_import');
                this.batchDeleteBtn = getBtnList(btnList, 'batch_delete');
            }
        }
        // 新增
        onAddVisible(row): void {
            XtRouter.skipNamed("DepartmentStudentAdd", {row: row});
        }


        // 状态
        onChangeStatus(obj: any): void {
            this.changeStatus.id = obj.id;
            if (obj.status === '1') {
                obj.status = '0';
            } else if (obj.status === '0') {
                obj.status = '1';
            }
            this.changeStatus.status = obj.status;
            this.loading = true;
            DepartmentCnt.cloud.remove_student_info_by_id(this.changeStatus).then((response: AxiosResponse) => {
                if (response.data.status === '200') {
                    this.loading = false;
                    this.getInfo();
                } else {
                    this.loading = false;
                    this.any().$notify.error({title: '提示', message: response.data.message});
                }

            })
        }

        // 删除
        onDelete(id: string): void {
            this.delId = id;
            this.delVisible = true;
        }
        onDelConfirm(): void { // 确认删除
            // console.log(this.delId)
            DepartmentCnt.cloud.remove_student_info_by_id({id: this.delId}).then((response: AxiosResponse) => {
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
        onBatchDelConfirm(): void {
            DepartmentCnt.cloud.batch_remove_student_info(this.multipleSelection).then((response: AxiosResponse) => {
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
                DepartmentCnt.cloud.batch_import_student_info(response.data.key).then((res: AxiosResponse) => {
                    if (res.data.status === '200') {
                        this.getProgress();
                    } else {
                        this.any().$notify.error({title: '提示', message: "导入失败"});
                        this.progressDialog = false;
                        return;
                    }
                });
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
            DepartmentCnt.cloud.get_proccess({api_name: '/student/batch_import_student_info'}).then((response: AxiosResponse) => {
                if (response.data.data.error_msg) {
                    this.progressDialog = false;
                    this.any().$notify.error({title: '提示', message: response.data.data.error_msg});
                    return;
                }
                if (response.data.status != 200) {
                    this.progressDialog = false;
                    this.any().$notify.error({title: '提示', message: response.data.data.error_msg});
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
