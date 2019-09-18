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
            <el-table :data="instructorList" @selection-change="handleSelectionChange"
                      v-loading="loading"
                      element-loading-text="拼命加载中"
                      element-loading-spinner="el-icon-loading"
                      element-loading-background="rgba(0, 0, 0, 0.8)">
                <el-table-column header-align="center" type="selection" width="55"></el-table-column>
                <el-table-column header-align="center" label="序号" type="index" :index="ordinalAdd" sortable width="100px"></el-table-column>
                <el-table-column header-align="center" label="等级" width="65">
                    <template slot-scope="scope">
                        <span v-show="scope.row.unit_info.unit_level === '1'">省级</span>
                        <span v-show="scope.row.unit_info.unit_level === '2'">市州</span>
                        <span v-show="scope.row.unit_info.unit_level === '3'">区县</span>
                        <span v-show="scope.row.unit_info.unit_level === '4'">校级</span>
                    </template>
                </el-table-column>
                <el-table-column header-align="center" prop="unit_info.unit_name" label="单位"></el-table-column>
                <el-table-column header-align="center" prop="instructor_name" label="姓名"></el-table-column>
                <el-table-column header-align="center" prop="instructor_num" label="编号"></el-table-column>
                <el-table-column header-align="center" prop="discipline_info.discipline_name" label="学科"></el-table-column>
                <el-table-column header-align="center" prop="contact_num" label="联系电话" width="108"></el-table-column>
                <el-table-column header-align="center" label="操作" width="80">
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
        <!--新增修改-->
        <el-dialog
            :title="addTitle"
            :close-on-click-modal="false"
            :visible.sync="addVisible"
            width="30%"
            center>
            <el-row class="dialog_center">
                <el-row>
                    <span>地区等级: </span>
                    <el-radio v-show="roleRank <= 1" v-model="unitLevel" label="1">省</el-radio>
                    <el-radio v-show="roleRank <= 2" v-model="unitLevel" label="2">市</el-radio>
                    <el-radio v-show="roleRank <= 3" v-model="unitLevel" label="3">区</el-radio>
                    <el-radio v-show="roleRank <= 4" v-model="unitLevel" label="4">校</el-radio>
                </el-row>
                <el-row v-show="roleRank <= 1">
                    <el-tooltip class="item" effect="dark" content="省" placement="right">
                        <el-select v-model="provinceID" clearable filterable placeholder="省" value="">
                            <el-option
                                v-for="item in provinceInfoList"
                                :key="item.id"
                                :label="item.unit_name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-tooltip>
                    <span class="required">*</span>
                </el-row>
                <el-row v-show="roleRank <= 2 && Number(unitLevel) >= 2">
                    <el-tooltip class="item" effect="dark" content="市" placement="right">
                        <el-select v-model="cityID" clearable filterable placeholder="市" value="">
                            <el-option
                                v-for="item in cityInfoList"
                                :key="item.id"
                                :label="item.unit_name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-tooltip>
                    <span class="required">*</span>
                </el-row>
                <el-row v-show="roleRank <= 3 && Number(unitLevel) >= 3">
                    <el-tooltip class="item" effect="dark" content="区" placement="right">
                        <el-select v-model="districtID" clearable filterable placeholder="区" value="">
                            <el-option
                                v-for="item in districtInfoList"
                                :key="item.id"
                                :label="item.unit_name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-tooltip>
                    <span class="required">*</span>
                </el-row>
                <el-row v-show="roleRank <= 4 && Number(unitLevel) >= 4">
                    <el-tooltip class="item" effect="dark" content="校" placement="right">
                        <el-select v-model="schoolID" clearable filterable placeholder="校" value="">
                            <el-option
                                v-for="item in schoolInfoList"
                                :key="item.id"
                                :label="item.unit_name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-tooltip>
                    <span class="required">*</span>
                </el-row>

                <el-row>
                    <el-tooltip class="item" effect="dark" content="姓名" placement="right">
                        <el-input v-model="instructorAdd.instructor_name" placeholder="姓名" clearable style="width: 315px"
                                  maxlength="15"></el-input>
                    </el-tooltip>
                    <span class="required">*</span>
                </el-row>
                <el-row>
                    <el-tooltip class="item" effect="dark" content="编号" placement="right">
                        <el-input v-model="instructorAdd.instructor_num" placeholder="编号" clearable style="width: 315px"
                                  @keyup.native="handleContactNum()" maxlength="11"></el-input>
                    </el-tooltip>
                    <span class="required">*</span>
                </el-row>
                <el-row>
                    <el-tooltip class="item" effect="dark" content="学科" placement="right">
                        <el-select v-model="addDisciplineID" clearable filterable placeholder="请选择学科" value="">
                            <el-option
                                v-for="item in allDisciplineInfo"
                                :key="item.id"
                                :label="item.discipline_name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-tooltip>
                    <span class="required">*</span>
                </el-row>
                <el-row>
                    <el-tooltip class="item" effect="dark" content="电话" placement="right">
                        <el-input v-model="instructorAdd.contact_num" placeholder="电话" clearable style="width: 315px"
                                  @keyup.native="handleUnitCode()" maxlength="11" minlength="11"></el-input>
                    </el-tooltip>
                    <span class="required">*</span>
                </el-row>
            </el-row>
            <span slot="footer">
                <el-button @click="onAddVisible(1)" class="update_btn_cancel">取 消</el-button>
                <el-button type="primary" @click="onAddVisible(2)" class="update_btn_confirm">确 定</el-button>
            </span>
        </el-dialog>
        <!--删除-->
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
                    <el-upload class="upload-demo"
                               ref="upload"
                               accept=".xls,.xlsx"
                               action="/api/instructor/check_batch_import_instructor_excel"
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
                    <a href="./instructor_templet.xlsx">下载模板</a>
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
            :page-size="queryInstructor.page_size"
            :total="pageTotal"
            v-show="pageTotal / queryInstructor.page_size > 1">>
        </el-pagination>
    </el-col>
</template>

<script lang="ts">

    import {Component, Watch, XtVue} from "../../../common/common";
    import {InstructorAdd, QueryAllUnit, QueryInstructor} from "../department.def";
    import DepartmentCnt from "../department.cnt";
    import {AxiosResponse} from "axios";
    import {getBtnList} from "../../common/mod/base"




    @Component
    export default class Parent extends XtVue {
        // 分页查询
        private queryInstructor: QueryInstructor = new QueryInstructor();
        private pageTotal: number = 0;
        private pageNum: number = 0;
        private queryUnit: QueryAllUnit = new QueryAllUnit(); // 查询单位信息
        // 新增弹框
        private addVisible: boolean = false;
        private addTitle: string | null = null;
        private unitLevel: string | null = null; // 省市区选择
        private progressDialog: boolean = false; // 进度条弹框
        // 进度的百分比
        private percentUpload: number = 0;
        // 删除按钮弹框
        private delVisible: boolean = false;
        private batchDelVisible: boolean = false;
        private delId: string | null = null;
        // 数据
        private instructorList: any = [];
        private instructorAdd: InstructorAdd = new InstructorAdd();
        private addUnitID: string | null = null; // 添加/修改 弹框里的单位选择
        private addDisciplineID: string | null = null; // 添加/修改 弹框里的科目选择

        private allUnitInfo: any = []; // 单位信息
        private unitInfoList: any = []; // 单位信息
        private allCityInfoList: any = []; // 市级下拉信息
        private allDistrictInfoList: any = []; // 区县下拉信息
        private allSchoolInfoList: any = []; // 校级下拉信息
        private provinceInfoList: any = []; // 市级下拉信息
        private cityInfoList: any = []; // 市级下拉信息
        private districtInfoList: any = []; // 区县下拉信息
        private schoolInfoList: any = []; // 校级下拉信息
        private provinceID: string | null = null;
        private cityID: string | null = null;
        private districtID: string | null = null;
        private schoolID: string | null = null;
        private allDisciplineInfo: any = []; // 科目信息
        private multipleSelection: string = ''; // 勾选
        private fileList: any = []; // 导入时文件
        private token: any = '';
        private addBtn: boolean = true; // 新增权限
        private editBtn: boolean = true; // 修改权限
        private deleteBtn: boolean = true; // 删除权限
        private batchImportBtn: boolean = true; // 批量导入
        private importVisible: boolean = false; // 导入弹框
        private batchDeleteBtn: boolean = true; // 批量删除权限
        private unitID: string | null = null; // 当前登录账户的单位id
        private roleRank: string | null = null; // 当前登录账户的角色等级
        private loading: boolean = false; // 加载层
        private rowInfo: any = {}; // 加载层






        handleContactNum(): void {
            if (this.instructorAdd.instructor_num)
                this.instructorAdd.instructor_num = this.instructorAdd.instructor_num.replace(/[^\d]/g,'');
        }
        handleUnitCode(){
            if (this.instructorAdd.contact_num)
                this.instructorAdd.contact_num = this.instructorAdd.contact_num.replace(/[^\d]/g,'');
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
            if (this.pageNum === 1) {
                this.queryInstructor.page_num = 0;
            } else if (this.pageNum > 1) {
                this.queryInstructor.page_num = this.pageNum - 1;
            }
            let unitID: string | null = null;
            if (this.roleRank != '0') {
                unitID = this.unitID;
            }
            this.queryInstructor.unit_info = {id: unitID};
            delete this.queryInstructor.status;
            this.loading = true;
            DepartmentCnt.cloud.list_page_all_instructor_info(this.queryInstructor).then((response: AxiosResponse) => {
                this.loading = false;
                if (response.data.status === '200') {
                    this.pageTotal = response.data.data.totalElements;
                    this.instructorList = response.data.data.content;
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
            this.roleRank = user.role_info.role_rank;
            this.token = window.sessionStorage.getItem("token");
            if (window.sessionStorage.getItem("val")) {
                let btnList: any = window.sessionStorage.getItem("val");
                btnList = JSON.parse(btnList).children;
                this.addBtn = getBtnList(btnList, 'add');
                this.editBtn = getBtnList(btnList, 'edit');
                this.deleteBtn = getBtnList(btnList, 'delete');
                this.batchImportBtn = getBtnList(btnList, 'batch_import');
                this.batchDeleteBtn = getBtnList(btnList, 'batch_delete');
            }

            DepartmentCnt.cloud.list_all_discipline_info({fk_unit_id: this.unitID, status: '1'}).then((response: AxiosResponse) => {
                if (response.data.status === '200') {
                    this.allDisciplineInfo = response.data.data;
                } else {
                    this.any().$notify.error({title: '提示', message: '科目信息获取失败'});
                }
            });
            if (this.roleRank != '0') {
                this.queryUnit.id = this.unitID;
            }
            DepartmentCnt.cloud.list_all_unit_info_by_id(this.queryUnit).then((response: AxiosResponse) => {
                if (response.data.status === '200') {
                    // console.log(response.data.data.content);
                    this.allUnitInfo = response.data.data;
                    for (let i = 0; i < this.allUnitInfo.length; i++) {
                        if (this.allUnitInfo[i].unit_level == '1') {
                            this.provinceInfoList.push(this.allUnitInfo[i]);
                        } else if (this.allUnitInfo[i].unit_level == '2') {
                            this.allCityInfoList.push(this.allUnitInfo[i]);
                        } else if (this.allUnitInfo[i].unit_level == '3') {
                            this.allDistrictInfoList.push(this.allUnitInfo[i]);
                        } else if (this.allUnitInfo[i].unit_level == '4') {
                            this.allSchoolInfoList.push(this.allUnitInfo[i]);
                        }
                    }
                    if (this.roleRank == '2') { this.cityInfoList = this.allCityInfoList }
                    if (this.roleRank == '3') { this.districtInfoList = this.allDistrictInfoList }
                    if (this.roleRank == '4') { this.schoolInfoList = this.allSchoolInfoList }

                    this.unitInfoList = response.data.data;
                } else {
                    this.any().$notify.error({title: '提示', message: '单位信息获取失败'});
                }
            });

        }


        @Watch("unitLevel")
        getUnitInfoList(): void {
            this.unitInfoList = [];
            for (let i = 0; i < this.allUnitInfo.length; i++) {
                if (this.allUnitInfo[i].unit_level == this.unitLevel) {
                    this.unitInfoList.push(this.allUnitInfo[i])
                }
            }
        }

        @Watch("provinceID")
        getCityInfoList(): void {
            this.cityID = '';
            if (this.provinceID) {
                this.cityInfoList = [];
                for (let i = 0; i < this.allCityInfoList.length; i++) {
                    if (this.allCityInfoList[i].fk_parent_id === this.provinceID) {
                        this.cityInfoList.push(this.allCityInfoList[i]);
                    }
                }
                if (this.addTitle === '修改') {
                    for (let i = 0; i < this.rowInfo.unit_list.length; i++) {
                        if (this.rowInfo.unit_list[i].unit_level == '1') {
                            if (this.provinceID !== this.rowInfo.unit_list[i].id) { this.cityID = ''; return; }
                        }
                        if (this.rowInfo.unit_list[i].unit_level == '2') { this.cityID = this.rowInfo.unit_list[i].id }
                    }
                }
            } else {
                this.cityInfoList = this.allCityInfoList;
            }
        }
        @Watch("cityID")
        getDistrictInfoList(): void {
            this.districtID = '';
            if (this.cityID) {
                this.districtInfoList = [];
                for (let i = 0; i < this.allDistrictInfoList.length; i++) {
                    if (this.allDistrictInfoList[i].fk_parent_id === this.cityID) {
                        this.districtInfoList.push(this.allDistrictInfoList[i]);
                    }
                }
                if (this.addTitle === '修改') {
                    for (let i = 0; i < this.rowInfo.unit_list.length; i++) {
                        if (this.rowInfo.unit_list[i].unit_level == '2') {
                            if (this.cityID !== this.rowInfo.unit_list[i].id) { this.districtID = ''; return; }
                        }
                        if (this.rowInfo.unit_list[i].unit_level == '3') { this.districtID = this.rowInfo.unit_list[i].id }
                    }
                }
            } else {
                this.districtInfoList = this.allDistrictInfoList;
            }
        }
        @Watch("districtID")
        getSchoolInfoList(): void {
            this.schoolID = '';
            if (this.districtID) {
                this.schoolInfoList = [];
                for (let i = 0; i < this.allSchoolInfoList.length; i++) {
                    if (this.allSchoolInfoList[i].fk_parent_id === this.districtID) {
                        this.schoolInfoList.push(this.allSchoolInfoList[i]);
                    }
                }
                if (this.addTitle === '修改') {
                    for (let i = 0; i < this.rowInfo.unit_list.length; i++) {
                        if (this.rowInfo.unit_list[i].unit_level == '3') {
                            if (this.districtID !== this.rowInfo.unit_list[i].id) { this.schoolID = ''; return; }
                        }
                        if (this.rowInfo.unit_list[i].unit_level == '4') { this.schoolID = this.rowInfo.unit_list[i].id }
                    }
                }
            } else {
                this.schoolInfoList = this.allSchoolInfoList;
            }
        }






        // 新增
        onAddVisible(state: number, row: any = ''): void {
            if (state === 0) { // 点击新增
                this.unitLevel = '';
                this.addUnitID = '';
                this.addDisciplineID = '';
                this.provinceID = '';
                this.instructorAdd = new InstructorAdd();
                if (row) {
                    this.addTitle = '修改';
                    this.rowInfo = row;
                    this.instructorAdd.id = row.id;
                    this.unitLevel = row.unit_info.unit_level;
                    for (let i = 0; i < row.unit_list.length; i++) {
                        if (row.unit_list[i].unit_level == '1') { this.provinceID = row.unit_list[i].id }
                    }
                    this.addUnitID = row.unit_info.id;
                    this.addDisciplineID = row.discipline_info.id;
                    this.instructorAdd.instructor_name = row.instructor_name;
                    this.instructorAdd.instructor_num = row.instructor_num;
                    this.instructorAdd.contact_num = row.contact_num;
                } else {
                    this.addTitle = '新增';
                    let userInfo: any = window.sessionStorage.getItem("user_info");
                    userInfo = JSON.parse(userInfo);
                    let roleRank = Number(this.roleRank);
                    if (roleRank == 4) {
                        this.unitLevel = '4';
                        this.schoolID = userInfo.unit_info.id;
                    }
                    if (roleRank == 3) {
                        this.unitLevel = '3';
                        this.districtID = userInfo.unit_info.id;
                    }
                    if (roleRank == 2) {
                        this.unitLevel = '2';
                        this.cityID = userInfo.unit_info.id;
                    }
                    if (roleRank == 1) {
                        this.unitLevel = '1';
                        this.provinceID = userInfo.unit_info.id;
                    }
                    if (roleRank < 1) {
                        this.unitLevel = '1';
                    }
                }
                this.addVisible = true;
            }  else if (state === 1) { // 取消
                this.addVisible = false;
            } else if (state === 2) { // 确定
                if (this.unitLevel == '1') { this.addUnitID = this.provinceID }
                if (this.unitLevel == '2') { this.addUnitID = this.cityID }
                if (this.unitLevel == '3') { this.addUnitID = this.districtID }
                if (this.unitLevel == '4') { this.addUnitID = this.schoolID }
                if (!this.addUnitID) { this.any().$notify.error({title: '提示', message: "请选择单位"}); return; }
                if (!this.addDisciplineID) { this.any().$notify.error({title: '提示', message: "请选择科目"}); return; }
                if (!this.instructorAdd.instructor_name) { this.any().$notify.error({title: '提示', message: "请输入姓名"}); return; }
                if (!this.instructorAdd.instructor_num) { this.any().$notify.error({title: '提示', message: "请输入编号"}); return; }
                if (!this.instructorAdd.contact_num) { this.any().$notify.error({title: '提示', message: "请输入联系电话"}); return; }
                this.instructorAdd.unit_info = {id: this.addUnitID};
                this.instructorAdd.discipline_info = {id: this.addDisciplineID};
                this.loading = true;
                DepartmentCnt.cloud.save_or_modify_instructor_info(this.instructorAdd).then((response: AxiosResponse) => {
                    this.loading = false;
                    if (response.data.status === '200') {
                        this.getInfo();
                        this.addVisible = false;
                        this.any().$notify.success({title: '提示', message: '保存成功'});
                    } else {
                        this.any().$notify.error({title: '提示', message: response.data.message});
                    }
                })
            }
        }






        // 删除
        onDelete(id: string): void {
            this.delId = id;
            this.delVisible = true;
        }
        onDelConfirm(): void { // 确认删除
            // console.log(this.delId)
            this.loading = false;
            DepartmentCnt.cloud.remove_instructor_info_by_id(this.delId).then((response: AxiosResponse) => {
                this.loading = false;
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
            this.loading = true;
            DepartmentCnt.cloud.batch_remove_instructor_info(this.multipleSelection).then((response: AxiosResponse) => {
                this.loading = false;
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
                DepartmentCnt.cloud.batch_import_instructor_info({key: response.data.key}).then((res: AxiosResponse) => {
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
            DepartmentCnt.cloud.get_proccess({api_name: '/instructor/batch_import_instructor_info'}).then((response: AxiosResponse) => {
                if (response.data.data.error_msg) {
                    this.getInfo();
                    this.progressDialog = false;
                    return;
                }
                if (response.data.status != 200) {
                    this.getInfo();
                    this.progressDialog = false;
                    return;
                }else {
                    this.progressDialog = true;
                    this.percentUpload = response.data.data.current_num / response.data.data.tota_num * 100;
                    if (response.data.data.tota_num === response.data.data.current_num) {
                        this.progressDialog = false;
                        // this.getInfo();
                        this.importVisible = false;
                        this.any().$notify.success({title: '提示', message: "导入成功"});
                        history.go(0);
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
