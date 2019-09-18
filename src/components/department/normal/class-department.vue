<template>
    <el-col class="right_table" style="width: 1166px;">
        <el-row>
            <el-col :span="3" style="float:left;">
                <el-tooltip v-show="classSortBtn" class="item" effect="dark" content="无权限" placement="top">
                    <el-button class="pt_btn" size="mini" style="float:left;">班级类别</el-button>
                </el-tooltip>
                <el-button v-show="!classSortBtn" class="add_btn" size="mini" type="primary" style="float:left;margin-left: 0;" @click="onGoToClassSort()">班级类别</el-button>
            </el-col>
            <el-col :span="4">
                <el-tooltip v-show="batchImportBtn" class="item" effect="dark" content="无权限" placement="top">
                    <el-button class="pt_btn" size="mini" style="float:left;">批量导入</el-button>
                </el-tooltip>
                <el-button v-show="!batchImportBtn" class="add_btn" size="mini" type="primary" style="float:left;"
                           @click="importVisible = true">批量导入
                </el-button>
            </el-col>
            <el-col :span="2" style="float: right;">
                <el-tooltip v-show="addBtn" class="item" effect="dark" content="无权限" placement="top">
                    <el-button class="pt_btn" size="mini">
                        <span class="add_span"><img src="../../../assets/icon/add.png" class="add_img">新增</span>
                    </el-button>
                </el-tooltip>
                <el-button v-show="!addBtn" id="xz" class="add_btn" size="mini" style="float: right;" @click="onAddVisible(0)">
                    <span @click="onAddVisible(0)" class="add_span"><img src="../../../assets/icon/add.png" class="add_img">新增</span>
                </el-button>
            </el-col>
        </el-row>
        <el-row style="margin-bottom: 15px;text-align: left">
            <el-select v-model="schoolID" filterable clearable placeholder="所属学校" value="" style="width: 200px;margin-right: 15px;">
                <el-option
                    v-for="item in schoolList"
                    :key="item.id"
                    :label="item.unit_name"
                    :value="item.id">
                </el-option>
            </el-select>
            <el-select v-model="classSubjectType" filterable clearable placeholder="班级科类" value="" style="width: 200px;margin-right: 15px;">
                <el-option label="文科" value="1"></el-option>
                <el-option label="理科" value="2"></el-option>
                <el-option label="不分文理" value="0"></el-option>
            </el-select>
            <el-select v-model="classCategory" filterable clearable placeholder="班级类别" value="" style="width: 200px;margin-right: 15px;">
                <el-option
                    v-for="item in classSortList"
                    :key="item.id"
                    :label="item.category_name"
                    :value="item.id">
                </el-option>
            </el-select>
            <el-tooltip class="item" effect="dark" content="搜索班级名称(精准查询)" placement="top" style="float: right;">
                <el-input v-model="className" clearable placeholder="搜索" style="width: 200px" @change="searchInfo()"></el-input>
            </el-tooltip>
        </el-row>
        <el-row>
            <el-table :data="classList"
                      v-loading="loading"
                      element-loading-text="拼命加载中"
                      element-loading-spinner="el-icon-loading"
                      element-loading-background="rgba(0, 0, 0, 0.8)">
                <el-table-column header-align="center" label="序号" type="index" :index="ordinalAdd" sortable
                                 width="100px"></el-table-column>
                <el-table-column header-align="center" prop="class_name" label="班级名称"></el-table-column>
                <el-table-column header-align="center" prop="class_code" label="班级代码" width="185px"></el-table-column>
                <el-table-column header-align="center" prop="teacher_info.unit_info.unit_name" label="所属学校"></el-table-column>
                <el-table-column header-align="center" prop="grade_info.grade_name" label="所属年级"></el-table-column>
                <el-table-column header-align="center" prop="class_category_info.category_name" label="班级类别"></el-table-column>
                <el-table-column header-align="center" prop="literary_scientific_type" label="班级科类">
                    <template slot-scope="scope">
                        <span v-if="scope.row.literary_scientific_type === '0'">不分文理</span>
                        <span v-if="scope.row.literary_scientific_type === '1'">文科</span>
                        <span v-if="scope.row.literary_scientific_type === '2'">理科</span>
                    </template>
                </el-table-column>
                <el-table-column header-align="center" prop="teacher_info.teacher_name" label="班主任"></el-table-column>
                <el-table-column header-align="center" prop="status" label="状态" width="80px">
                    <template slot-scope="scope">
                        <el-tooltip v-show="startStopBtn" class="item" effect="dark" content="无权限" placement="top">
                            <img src="../../../assets/icon/close.png" style="vertical-align: middle;cursor:pointer">
                        </el-tooltip>

                        <el-row v-show="!startStopBtn" :id="'zt'+ordinalAdd(0)">
                            <el-tooltip v-if="scope.row.status === '1'" class="item" effect="dark" content="已启用"
                                        placement="top" :enterable="false">
                                <img src="../../../assets/icon/open.png"
                                     @click="onChangeStatus(scope.row)" style="vertical-align: middle;cursor:pointer">
                            </el-tooltip>
                            <el-tooltip v-if="scope.row.status === '0'" class="item" effect="dark" content="已停用"
                                        placement="top" :enterable="false">
                                <img src="../../../assets/icon/close.png"
                                     @click="onChangeStatus(scope.row)" style="vertical-align: middle;cursor:pointer">
                            </el-tooltip>
                        </el-row>
                    </template>
                </el-table-column>
                <el-table-column header-align="center" label="操作">
                    <template slot-scope="scope">
                        <el-row>
                            <el-tooltip v-show="editBtn" class="item" effect="dark" content="无权限" placement="top">
                                <span class="img_span disabled_update" style="cursor: not-allowed"></span>
                            </el-tooltip>
                            <el-tooltip v-show="deleteBtn" class="item" effect="dark" content="无权限" placement="top">
                                <span class="img_span disabled_del" style="cursor: not-allowed"></span>
                            </el-tooltip>
                            <span v-show="!editBtn" :id="'bj'+ordinalAdd(0)" class="img_span update" @click="onAddVisible(0, scope.row)"> </span>
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
                    <!--@keyup.native="proving()"-->
                    <el-input v-model="classAdd.class_name" placeholder="班级" clearable  style="width: 300px"
                              maxlength="5"></el-input>
                    <span>班</span>
                    <span class="required">*</span>
                </el-row>
                <el-row>
                    <el-tooltip class="item" effect="dark" content="所属学校" placement="right">
                        <el-select v-model="schoolInfo.id" filterable clearable placeholder="请选择或输入所属学校" value="">
                            <el-option
                                v-for="item in schoolList"
                                :key="item.id"
                                :label="item.unit_name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-tooltip>
                    <span class="required">*</span>
                </el-row>
                <el-row>
                    <el-tooltip class="item" effect="dark" content="所属年级" placement="right">
                        <el-select v-model="gradeID" filterable clearable placeholder="请选择或输入所属年级" value="">
                            <el-option
                                v-for="item in gradeList"
                                :key="item.id"
                                :label="item.grade_name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-tooltip>
                    <span class="required">*</span>
                </el-row>
                <el-row>
                    <el-tooltip class="item" effect="dark" content="班级代码" placement="right">
                        <el-input v-model="classCode" placeholder="班级代码" clearable style="width: 315px"
                                  maxlength="3" oninput="value=value.replace(/[^\d]/g,'')"></el-input>
                    </el-tooltip>
                    <span class="required">*</span>
                </el-row>
                <el-row>
                    <el-tooltip class="item" effect="dark" content="班级类别" placement="right">
                        <el-select v-model="classCategoryID" filterable clearable placeholder="请选择或输入班级类别" value="">
                            <el-option
                                v-for="item in classSortList"
                                :key="item.id"
                                :label="item.category_name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-tooltip>
                    <span class="required">*</span>
                </el-row>
                <el-row>
                    <el-tooltip class="item" effect="dark" content="班级科类" placement="right">
                        <el-select v-model="classAdd.literary_scientific_type" clearable filterable placeholder="请选择或输入班级科类" value="">
                            <el-option
                                v-for="item in subType"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-tooltip>
                    <span class="required">*</span>
                </el-row>
                <el-row>
                    <el-row>
                        <el-tooltip class="item" effect="dark" content="班主任" placement="right">
                            <el-select v-model="teacherID" clearable filterable placeholder="请选择或输入班主任" value="">
                                <el-option
                                    v-for="item in teacherList"
                                    :key="item.id"
                                    :label="item.teacher_name"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                        </el-tooltip>
                        <span class="required">*</span>
                    </el-row>
                </el-row>
            </el-row>
            <span slot="footer">
                <el-button @click="onAddVisible(1)" class="update_btn_cancel">取 消</el-button>
                <el-button type="primary" @click="onAddVisible(2)" class="update_btn_confirm">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="提示" :visible.sync="delVisible" width="30%" center>
            <el-row class="dialog_center">
                <span style="font-size: 18px;">是否删除</span>
            </el-row>
            <span slot="footer">
                <el-button @click="delVisible = false" class="del_btn_cancel">取 消</el-button>
                <el-button type="danger" @click="onDelConfirm()" class="del_btn_confirm">确 定</el-button>
            </span>
        </el-dialog>
        <!--导入-->
        <el-dialog
            :visible.sync="importVisible"
            width="30%"
            center>
            <el-row class="dialog_center">
                <el-col>
                    <span style="font-size: 18px;">导入</span>
                </el-col>
            </el-row>
            <el-row style="text-align: center;">
                <el-row style="margin-top: 15px;">
                    <el-upload class="upload-demo"
                               ref="upload"
                               accept=".xls,.xlsx"
                               action="/api/class/check_batch_import_class_excel"
                               :on-success="successUpload"
                               :on-error="errorUpload"
                               :headers="{Token: token}"
                               :file-list="fileList"
                               :auto-upload="false">
                        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                        <el-button style="margin-left: 10px;" size="small" type="success" @click="onUploading">导入</el-button>
                    </el-upload>
                </el-row>
                <el-row style="margin-bottom: 15px;">
                    <a href="./class_templet.xlsx">下载模板</a>
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
    import {ChangeStatus, PageQuery, ClassAdd, SchoolInfo, QueryAll} from "../department.def";
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
        private delId: string | null = null;
        // 状态数据
        private changeStatus: ChangeStatus = new ChangeStatus();
        // 数据
        private classList: any = [];
        private classAdd: ClassAdd = new ClassAdd();
        private classSortList: any = [];
        private classCategoryID: string | null = null;
        private gradeList: any = [];
        private gradeID: string | null = null;
        private schoolList: any[] = [];
        private schoolInfo: SchoolInfo = new SchoolInfo();
        private subType: any = [];
        private teacherList: any = [];
        private allTeacherList: any[] = []; // 临时数据
        private teacherID: string | null = null;
        private classCode: string | null = null;
        private fileList: any[] = [];
        private token: any = '';
        private rowInfo: any = '';
        private schoolCode: string | null = null;
        private gradeCode:string | null = null;
        // 按钮权限
        private addBtn: boolean = true; // 新增
        private editBtn: boolean = true; // 修改
        private deleteBtn: boolean = true; // 删除
        private startStopBtn: boolean = true; // 状态
        private classSortBtn: boolean = true; // 学校内别
        private batchImportBtn: boolean = true; // 导入
        private unitID: string = '';
        private userID: string | null = null;
        private userType: string = '';
        private roleRank: string = '';
        private classSubjectType: string | null = null;
        private className: string | null = null;
        private classCategory: string | null = null;
        private districtID: string | null = null; // 区县单位ID
        private cityID: string | null = null; // 市级单位ID
        private schoolID: string | null = null;
        private loading: boolean = false; // 加载层
        private importVisible: boolean = false; // 导入弹框




        // 查询
        @Watch("classSubjectType")
        @Watch("classCategory")
        @Watch("schoolID")
        searchInfo(): void {
            if (this.className === '') {
                this.className = null;
            }
            if (this.classSubjectType === '') {
                this.classSubjectType = null;
                return;
            }
            if (this.classCategory === '') {
                this.classCategory = null;
                return;
            }
            if (this.className === '') {
                this.className = null;
                return;
            }
            this.getInfo();
        }
        getInfo(): void {

            let unitID: string | null = null;
            if (Number(this.userType) < 4) { unitID = null; }
            else { unitID = this.unitID; }
            if (this.schoolID) { unitID = this.schoolID }
            let queryList = {
                page_num: 1,
                page_size: 15,
                teacher_info : { id: this.userID, unit_info: { id : unitID } },
                class_category_info: { id: this.classCategory},
                literary_scientific_type: this.classSubjectType,
                class_name: this.className,
                fk_city_id: this.cityID,
                fk_district_id: this.districtID
            };
            if (this.pageNum === 1) {
                queryList.page_num = 0;
            } else if (this.pageNum > 1) {
                queryList.page_num = this.pageNum - 1;
            }
            this.loading = true;
            DepartmentCnt.cloud.list_page_all_class_info(queryList).then((response: AxiosResponse) => {
                this.loading = false;
                if (response.data.status === '200') {
                    this.pageTotal = response.data.data.totalElements;
                    this.classList = response.data.data.content;
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
            this.subType = [{value: '0', label: '不分文理'}, {value: '2', label: '理科'}, {value: '1', label: '文科'}];
            let userInfo: any = window.sessionStorage.getItem("user_info");
            userInfo = JSON.parse(userInfo);
            this.unitID = userInfo.fk_unit_id;
            this.roleRank = userInfo.role_info.role_rank;
            let unitID: string | null = null;
            this.userType = userInfo.user_type;
            if (this.roleRank == '0') { unitID = null; }
            else { unitID = this.unitID; }
            let unitInfo: any = window.sessionStorage.getItem("unit_info");
            unitInfo = JSON.parse(unitInfo);
            if (this.userType === '2') { this.cityID = unitInfo.id; }
            if (this.userType === '3') { this.districtID = unitInfo.id; }
            if (this.userType === '5') { this.userID = userInfo.fk_user_id; }
            this.token = window.sessionStorage.getItem("token");





            DepartmentCnt.cloud.list_all_class_category_info('1', this.unitID).then((response: AxiosResponse) => {
                if (response.data.status === '200') {
                    this.classSortList = response.data.data;
                    console.log(this.classSortList)
                } else {
                    this.any().$notify.error({title: '提示', message: response.data.message});
                }
            });

            this.queryAll.fk_unit_id = unitID;
            DepartmentCnt.cloud.list_all_grade_info(this.queryAll).then((response: AxiosResponse) => {
                if (response.data.status === '200') {
                    this.gradeList = response.data.data;
                    let s;
                    for (let i = 1; i < this.gradeList.length; i++) {
                        for (let j = i; j > 0; j--) {
                            if (this.gradeList[j].grade_name < this.gradeList[j - 1].grade_name) {
                                s=this.gradeList[j];
                                this.gradeList[j] = this.gradeList[j-1];
                                this.gradeList[j-1] = s ;
                            }
                        }
                    }
                } else {
                    this.any().$notify.error({title: '提示', message: response.data.message});
                }

            });

            let querySchool = { unit_level: '4', id: unitID, status: '1', };
            DepartmentCnt.cloud.list_all_school_list(querySchool).then((response: AxiosResponse) => {
                if (response.data.status === '200') {
                    this.schoolList = response.data.data;
                } else {
                    this.any().$notify.error({title: '提示', message: response.data.message});
                }
            });

            let getTeacherAllList: object = { unit_info: { id: unitID }, status: '1' };
            DepartmentCnt.cloud.list_all_teacher_info(getTeacherAllList).then((response: AxiosResponse) => {
                if (response.data.status === '200') {
                    this.allTeacherList = response.data.data;
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
                this.classSortBtn = getBtnList(btnList, 'class_sort');
                this.startStopBtn = getBtnList(btnList, 'start_stop');
                this.batchImportBtn = getBtnList(btnList, 'batch_import');
            }
        }

        // 新增
        onAddVisible(state: number, row: any = ''): void {
            if (state === 0) { // 点击修改
                this.cleanInfo();
                if (row) {
                    this.addTitle = '修改';
                    this.rowInfo = row;
                    this.classAdd.id = row.id;
                    this.classAdd.status = row.status;
                    this.classAdd.class_name = row.class_name.replace("班", '');
                    this.classCategoryID = row.class_category_info.id;
                    this.classAdd.literary_scientific_type = row.literary_scientific_type;
                    this.gradeID = row.grade_info.id;
                    this.schoolInfo.id = row.teacher_info.unit_info.id;
                    this.teacherID = '';
                    // this.classAdd.class_code = row.class_code;
                    this.classCode = row.class_code;
                    let self = this;
                    setTimeout(function () {
                        self.teacherList = [];
                        for (let i = 0; i < self.allTeacherList.length; i++) {
                            if (row.teacher_info.unit_info.id === self.allTeacherList[i].unit_info.id) {
                                self.teacherList.push(self.allTeacherList[i]);
                            }
                        }
                        self.teacherID = row.teacher_info.id;
                    }, 500)
                } else {
                    this.addTitle = '新增';
                    this.classAdd = new ClassAdd();
                }
                this.addVisible = true;
            }  else if (state === 1) { // 取消
                this.addVisible = false;
            } else if (state === 2) { // 确定
                if (this.classAdd.class_name && this.classCode && this.classAdd.literary_scientific_type && this.teacherID) {
                    this.classAdd.class_category_info = {id: this.classCategoryID};
                    this.classAdd.grade_info = {id: this.gradeID};
                    this.classAdd.teacher_info = {id: this.teacherID};
                    this.classAdd.class_name += '班';
                    if (this.classCode.length === 1) { this.classCode = '00' + this.classCode; }
                    if (this.classCode.length === 2) { this.classCode = '0' + this.classCode; }
                    this.classAdd.class_code = this.classCode;
                    this.loading = true;
                    DepartmentCnt.cloud.save_or_modify_class_info(this.classAdd).then((response: AxiosResponse) => {
                        this.loading = false;
                        if (response.data.status === '200') {
                            this.addVisible = false;
                            this.getInfo();
                            this.cleanInfo();
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
            this.classAdd = new ClassAdd();
            this.classCode = '';
            this.classCategoryID = '';
            this.schoolInfo.id = '';
            this.gradeID = '';
            this.teacherID = '';
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
            DepartmentCnt.cloud.modify_class_info_status_by_id(this.changeStatus).then((response: AxiosResponse) => {
                this.loading = false;
                if (response.data.status === '200') {
                    this.getInfo();
                } else {
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
            this.loading = true;
            DepartmentCnt.cloud.remove_class_info_by_id({id: this.delId}).then((response: AxiosResponse) => {
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
                DepartmentCnt.cloud.batch_import_class_info(response.data.key).then((res: AxiosResponse) => {
                    if (res.data.status === '200') {
                        this.getProgress();
                    } else {
                        this.any().$notify.error({title: '提示', message: "导入失败"});
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
            DepartmentCnt.cloud.get_proccess({api_name: '/class/batch_import_class_info'}).then((response: AxiosResponse) => {
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
                        this.any().$notify.success({title: '提示', message: "导入成功"});
                        this.any().$refs.upload.clearFiles();
                        this.progressDialog = false;
                        this.importVisible = false;
                        this.getInfo();
                    } else {
                        let self: any = this;
                        setTimeout(function () {
                            self.getProgress()
                        }, 2000);
                    }
                }
            });
        }


        onGoToClassSort(): void { XtRouter.skipNamed("DepartmentClassSort"); }


        @Watch("schoolInfo.id")
        getClassCode(): void {
            this.teacherID = '';
            this.teacherList = [];
            // this.classAdd.class_code = '';
            for (let i = 0; i < this.allTeacherList.length; i++) {
                if (this.schoolInfo.id === this.allTeacherList[i].unit_info.id)
                    this.teacherList.push(this.allTeacherList[i]);
            }
            if (this.schoolInfo.id) {
                for (let i = 0; i < this.schoolList.length; i++) {
                    if (this.schoolInfo.id === this.schoolList[i].id) {
                        // this.classAdd.class_code += this.schoolList[i].unit_code;
                        this.schoolCode = this.schoolList[i].unit_code;
                    }
                }
                // if (this.gradeID) { this.classAdd.class_code += this.gradeCode; this.classAdd.class_code += this.classAdd.class_name;}
            }

        }
        @Watch("gradeID")
        getClassCodeByGradeID(): void {
            // this.classAdd.class_code = '';
            // if (this.schoolInfo.id) { this.classAdd.class_code += this.schoolCode; }
            if (this.gradeID) {
                for (let i = 0; i < this.gradeList.length; i++) {
                    if (this.gradeList[i].id === this.gradeID) {
                        // this.classAdd.class_code += this.gradeList[i].grade_code; this.classAdd.class_code += this.classAdd.class_name;
                        this.gradeCode = this.gradeList[i].grade_code;
                    }
                }
            }
        }

        // 表单序号
        ordinalAdd(index: number): number { return index + 1; }

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
