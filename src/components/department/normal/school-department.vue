<template>
    <el-col class="right_table" style="width: 1166px;">
        <el-row>
            <el-col :span="6" style="float:left;">
                <el-tooltip v-show="schoolSortBtn" class="item" effect="dark" content="无权限" placement="top">
                    <el-button class="pt_btn" size="mini" type="primary" style="float:left;">学校类别</el-button>
                </el-tooltip>
                <el-button v-show="!schoolSortBtn" class="add_btn" size="mini" type="primary" @click="onIntoSchoolSort()"  style="float:left;margin: 0">学校类别</el-button>
            </el-col>
            <el-col :span="3" style="float: right;text-align: right">
                <el-tooltip v-show="addBtn" class="item" effect="dark" content="无权限" placement="top">
                    <el-button :disabled="addBtn" class="pt_btn" size="mini">
                        <span class="add_span"><img src="../../../assets/icon/add.png" class="add_img">新增</span>
                    </el-button>
                </el-tooltip>
                <el-button v-show="!addBtn" id="xz" class="add_btn" size="mini" @click="onAddVisible(0)">
                    <span @click="onAddVisible(0)" class="add_span"><img src="../../../assets/icon/add.png" class="add_img">新增</span>
                </el-button>
            </el-col>
            <el-col :span="3" style="float:right;">
                <el-tooltip v-show="batchImportBtn" class="item" effect="dark" content="无权限" placement="top">
                    <el-button class="pt_btn" size="mini" type="primary" style="float:left;">批量导入</el-button>
                </el-tooltip>

                <el-button v-show="!batchImportBtn" class="add_btn" size="mini" type="primary" style="float:left;"
                           @click="onImport()">批量导入</el-button>
            </el-col>
        </el-row>
        <el-row style="margin-bottom: 15px;text-align: left">
            <el-select v-model="searchUnitName" filterable clearable placeholder="学校名称" value="" style="width: 200px;margin-right: 15px;">
                <el-option
                    v-for="item in allSchoolList"
                    :key="item.id"
                    :label="item.unit_name"
                    :value="item.id">
                </el-option>
            </el-select>
            <el-select v-model="searchUnitCode" filterable clearable placeholder="学校代码" value="" style="width: 200px;margin-right: 15px;">
                <el-option
                    v-for="item in allSchoolList"
                    :key="item.unit_code"
                    :label="item.unit_code"
                    :value="item.unit_code">
                </el-option>
            </el-select>
        </el-row>
        <el-row>
            <el-table :data="schoolList"
                      v-loading="loading"
                      element-loading-text="拼命加载中"
                      element-loading-spinner="el-icon-loading"
                      element-loading-background="rgba(0, 0, 0, 0.8)">
                <el-table-column header-align="center" label="序号" type="index" :index="ordinalAdd" sortable
                                 width="60px"></el-table-column>
                <el-table-column header-align="center" prop="unit_name" label="学校名称" width="130px"></el-table-column>
                <el-table-column header-align="center" prop="unit_code" label="学校代码"></el-table-column>
                <el-table-column header-align="center" prop="unit_info.unit_name" label="所属区县"></el-table-column>
                <el-table-column header-align="center" prop="school_category_info.category_name" label="学校类别"></el-table-column>
                <el-table-column header-align="center" prop="area" label="所属区域"></el-table-column>
                <el-table-column header-align="center" prop="address" label="地址"></el-table-column>
                <el-table-column header-align="center" prop="contact_man" label="联系人"></el-table-column>
                <el-table-column header-align="center" prop="contact_num" label="联系电话" width="110px"></el-table-column>
                <el-table-column header-align="center" prop="status" label="状态" width="60px">
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
                           <span v-show="!editBtn" :id="'bj'+ordinalAdd(0)" class="img_span update" @click="onAddVisible(0, scope.row)"></span>
                           <span v-show="!deleteBtn" :id="'sc'+ordinalAdd(0)" class="img_span del" @click="onDelete(scope.row.id)"></span>
                       </el-row>
                   </template>
                </el-table-column>
            </el-table>
        </el-row>
        <!--新增 / 修改-->
        <el-dialog
            :title="addTitle"
            :visible.sync="addVisible"
            width="30%"
            :close-on-click-modal="false"
            center>
            <el-row class="dialog_center">
                <el-row>
                    <el-tooltip class="item" effect="dark" content="学校名称" placement="right">
                        <el-input v-model="schoolAdd.unit_name" placeholder="学校名称" clearable style="width: 315px"
                                  maxlength="15"></el-input>
                    </el-tooltip>
                    <span class="required">*</span>
                </el-row>
                <el-row>
                    <el-tooltip class="item" effect="dark" content="学校代码" placement="right">
                        <el-input v-model="schoolAdd.unit_code" placeholder="学校代码: 10位纯数字" clearable style="width: 315px"
                                  oninput="value=value.replace(/[^\d]/g,'')" maxlength="10"></el-input>
                    </el-tooltip>
                    <span class="required">*</span>
                </el-row>
                <el-row>
                    <el-tooltip class="item" effect="dark" content="所属省份" placement="right">
                        <el-select v-model="provinceID" placeholder="请选择所属省份" clearable value="">
                            <el-option
                                v-for="item in provinceList"
                                :key="item.id"
                                :label="item.unit_name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-tooltip>
                    <span class="required">*</span>
                </el-row>
                <el-row>
                    <el-tooltip class="item" effect="dark" content="所属城市" placement="right">
                        <el-select v-model="cityID" placeholder="请选择所属城市" clearable value="">
                            <el-option
                                v-for="item in cityList"
                                :key="item.id"
                                :label="item.unit_name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-tooltip>
                    <span class="required">*</span>
                </el-row>
                <el-row>
                    <el-tooltip class="item" effect="dark" content="所属区县" placement="right">
                        <el-select v-model="districtID" placeholder="请选择所属区县" clearable value="">
                            <el-option
                                v-for="item in districtList"
                                :key="item.id"
                                :label="item.unit_name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-tooltip>
                    <span class="required">*</span>
                </el-row>
                <el-row>
                    <el-tooltip class="item" effect="dark" content="学校类别" placement="right">
                        <el-select v-model="schoolSortId" placeholder="请选择学校类别" clearable value="">
                            <el-option
                                v-for="item in schoolSortList"
                                :key="item.id"
                                :label="item.category_name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-tooltip>
                    <span class="required">*</span>
                </el-row>
                <el-row>
                    <el-tooltip class="item" effect="dark" content="所属区域" placement="right">
                        <el-input v-model="schoolAdd.area" placeholder="所属区域" clearable style="width: 315px"
                                  maxlength="15"></el-input>
                    </el-tooltip>
                    <span class="required">*</span>
                </el-row>
                <el-row>
                    <el-tooltip class="item" effect="dark" content="地址" placement="right">
                        <el-input v-model="schoolAdd.address" placeholder="地址" clearable style="width: 315px"
                                  maxlength="64"></el-input>
                    </el-tooltip>
                </el-row>
                <el-row>
                    <el-tooltip class="item" effect="dark" content="联系人" placement="right">
                        <el-input v-model="schoolAdd.contact_man" placeholder="联系人" clearable style="width: 315px"
                                  maxlength="15"></el-input>
                    </el-tooltip>
                </el-row>
                <el-row>
                    <el-tooltip class="item" effect="dark" content="联系电话" placement="right">
                        <el-input v-model="schoolAdd.contact_num" placeholder="联系电话" clearable style="width: 315px"
                                  maxlength="11" oninput="value=value.replace(/[^\d]/g,'')"></el-input>
                    </el-tooltip>
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
                    <el-upload
                        class="upload-demo"
                        ref="upload"
                        accept=".xls,.xlsx"
                        action="/api/unit/check_batch_import_unit_excel"
                        :headers="{Token: token}"
                        :on-success="successUpload"
                        :on-error="errorUpload"
                        :file-list="fileList"
                        :auto-upload="false">
                        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                        <el-button style="margin-left: 10px;" size="small" type="success" @click="onUploading">导入</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传xlsx/xls文件</div>
                    </el-upload>

                </el-row>
                <el-row style="margin-bottom: 15px;">
                    <a v-show="Number(roleRank) < 3" href="./省、市学校导入模板.xlsx">下载模板</a>
                    <a v-show="Number(roleRank) === 3" href="./区县学校导入模板.xlsx">下载模板</a>
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
    import {ChangeStatus, GetDistrictList, PageQuery, QueryAllUnit, UnitAdd} from "../department.def";
    import DepartmentCnt from "../department.cnt";
    import {AxiosResponse} from "axios";
    import {getBtnList} from "../../common/mod/base"



    @Component
    export default class School extends XtVue {
        // 分页查询
        private pageQuery: GetDistrictList = new GetDistrictList();
        private pageTotal: number = 0;
        private pageNum: number = 0;
        // 新增弹框
        private addVisible: boolean = false;
        private addTitle: string | null = null;
        // 删除按钮弹框
        private delVisible: boolean = false;
        private importVisible: boolean = false;
        private delId: string | null = null;
        // 修改按钮弹框
        private updateVisible: boolean = false;
        // 状态数据
        private changeStatus: ChangeStatus = new ChangeStatus();
        // 数据
        private schoolList: any = [];
        private schoolAdd: UnitAdd = new UnitAdd();
        private districtList: any = [];
        private districtID: string | null = null;
        private schoolSortList: any = [];
        private schoolSortId: string | null = null;
        private provinceList: any[] = [];
        private provinceID: string | null = null;
        private cityID: string | null = null;
        private cityList: any = [];
        private count: number = 0;
        private rowInfo: any = '';
        private allUnitInfo: any[] = [];
        private userType: string | null = null;
        private unitID: string | null = null;
        private roleRank: string | null = null;
        private unitCityID: string | null = null;
        private unitDistrictID: string | null = null;
        // 按钮权限
        private addBtn: boolean = true; // 新增
        private editBtn: boolean = true; // 修改
        private deleteBtn: boolean = true; // 删除
        private startStopBtn: boolean = true; // 状态
        private schoolSortBtn: boolean = true; // 学校类别
        private batchImportBtn: boolean = true; // 批量导入
        // 查询所有单位参数
        private queryAllUnit: QueryAllUnit = new QueryAllUnit();
        // 导入
        private fileList: any[] = [];
        private token: any = '';
        // 进度条弹框
        private progressDialog: boolean = false;
        // 进度的百分比
        private percentUpload: number = 0;
        private searchInfo: string | null = null; // 查询传参
        private searchUnitName: string | null = null;
        private searchUnitCode: string | null = null;
        private allSchoolList: any = [];
        private loading: boolean = false;




        // 查询
        @Watch("searchUnitName")
        @Watch("searchUnitCode")
        getInfo(): void {
            if (this.pageNum === 1) {
                this.pageQuery.page_num = 0
            } else if (this.pageNum > 1) {
                this.pageQuery.page_num = this.pageNum - 1;
            }
            if (this.userType === '0') {
                this.pageQuery.id = '';
            } else {
                this.pageQuery.id = this.unitID;
            }
            delete this.pageQuery.unit_code;
            if (this.searchUnitCode) {
                this.pageQuery.unit_code = this.searchUnitCode;
            }
            if (this.searchUnitName) {
                this.pageQuery.id = this.searchUnitName;
            }
            this.pageQuery.unit_level = '4';
            delete this.pageQuery.status;
            this.loading = true;
            DepartmentCnt.cloud.list_page_all_unit_info(this.pageQuery).then((response: AxiosResponse) => {
                this.loading = false;
                if (response.data.status === '200') {
                    // console.log(response.data.data.content);
                    // this.allUnitInfo = response.data.data.content;
                    this.pageTotal = response.data.data.totalElements;
                    this.schoolList = response.data.data.content;
                } else {
                    this.any().$notify.error({title: '提示', message: response.data.message});
                }

            })
        }
        @Watch("pageNum")
        onFlipOver(): void {
            this.getInfo();
        }
        mounted() {
            this.token = window.sessionStorage.getItem("token");
            let userInfo: any = window.sessionStorage.getItem("user_info");
            userInfo = JSON.parse(userInfo);
            this.userType = userInfo.user_type;
            this.roleRank = userInfo.role_info.role_rank;
            this.unitID = userInfo.fk_unit_id;
            DepartmentCnt.cloud.list_all_school_category_info({fk_unit_id: this.unitID, status: '1'}).then((response: AxiosResponse) => {
                if (response.data.status === '200') { this.schoolSortList = response.data.data; }
                else { this.any().$notify.error({title: '提示', message: response.data.message}); }
            });
            this.queryAllUnit.id = this.unitID;
            // this.queryAllUnit.list_unit_level = ['1', '2', '3'];
            delete this.queryAllUnit.unit_level;
            DepartmentCnt.cloud.list_all_unit_info_by_id(this.queryAllUnit).then((response: AxiosResponse) =>{
                if (response.data.status === '200') {
                    this.provinceList = [];
                    this.allSchoolList = [];
                    this.allUnitInfo = response.data.data;
                    for (let i = 0; i < this.allUnitInfo.length; i++) {
                        if (this.allUnitInfo[i].unit_level === '4') {
                            this.allSchoolList.push(this.allUnitInfo[i]);
                        }
                    }


                    let unitInfo: any = window.sessionStorage.getItem("unit_info");
                    unitInfo = JSON.parse(unitInfo);
                    if (this.userType === '1') {
                        this.provinceList.push(unitInfo);
                    } else if (this.userType === '2') {
                        this.provinceList.push(unitInfo.unit_info);
                    } else if (this.userType === '3') {
                        this.provinceList.push(unitInfo.unit_info.unit_info);
                    }
                    console.log(this.provinceList)

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
                this.schoolSortBtn = getBtnList(btnList, 'school_sort');
                this.batchImportBtn = getBtnList(btnList, 'batch_import')
            }
        }


        @Watch("provinceID")
        getCityList(): void {
            this.cityList = [];
            if (this.provinceID) {
                if (this.userType === '3') {
                    let unitInfo: any = window.sessionStorage.getItem("unit_info");
                    unitInfo = JSON.parse(unitInfo);
                    this.cityList.push(unitInfo.unit_info);
                } else {
                    for (let i = 0; i < this.allUnitInfo.length; i++) {
                        if (this.userType === '2') {
                            if (this.unitID === this.allUnitInfo[i].id) {
                                this.cityList.push(this.allUnitInfo[i]);
                            }
                        } else {
                            if (this.allUnitInfo[i].fk_parent_id === this.provinceID) {
                                this.cityList.push(this.allUnitInfo[i]);
                            }
                        }
                    }
                }
                if (this.provinceList.length > 0 && this.addTitle === '修改') {
                    this.cityID = this.rowInfo.unit_info.unit_info.id;
                }
            } else {
                this.cityID = '';
                // this.getUnitID();
            }

        }
        @Watch("cityID")
        getDistrictList(): void {
            this.districtList = [];
            if (this.cityID) {
                if (this.userType === '3') {
                    for (let i = 0; i < this.allUnitInfo.length; i++) {
                        if (this.unitID === this.allUnitInfo[i].id) {
                            this.districtList.push(this.allUnitInfo[i]);
                        }
                    }
                } else {
                    for (let i = 0; i < this.allUnitInfo.length; i++) {
                        if (this.allUnitInfo[i].fk_parent_id === this.cityID) {
                            this.districtList.push(this.allUnitInfo[i]);
                        }
                    }
                }
                if (this.provinceList.length > 0 && this.addTitle === '修改') {
                    this.districtID = this.rowInfo.unit_info.id;
                }
            } else {
                this.districtID = '';
                // this.getUnitID();
            }
        }

        // 查询
        onSearchInfo(): void {
            console.log(this.searchInfo)
        }



        // 新增
        onAddVisible(state: number, row: any = ''): void {
            if (state === 0) { // 点击新增
                this.cleanInfo();
                this.addVisible = true;
                let self = this;
                setTimeout(function(){
                    if (row) {
                        self.addTitle = '修改';
                        self.rowInfo = row;
                        self.schoolAdd.id = row.id;
                        self.schoolAdd.unit_name = row.unit_name;
                        self.schoolAdd.unit_code = row.unit_code;
                        self.provinceID = row.unit_info.unit_info.unit_info.id;
                        self.schoolSortId = row.fk_school_category_id;
                        self.schoolAdd.area = row.area;
                        self.schoolAdd.address = row.address;
                        self.schoolAdd.contact_man = row.contact_man;
                        self.schoolAdd.contact_num = row.contact_num;

                    } else {
                        self.schoolAdd = new UnitAdd();
                        self.addTitle = '新增';
                        let unitInfo: any = window.sessionStorage.getItem("unit_info");
                        unitInfo = JSON.parse(unitInfo);
                        let roleRank =Number(self.roleRank);
                        if (roleRank == 1) { self.provinceID = unitInfo.id; }
                        if (roleRank == 2) { self.provinceID = unitInfo.unit_info.id; self.cityID = unitInfo.id; }
                        if (roleRank == 3) {
                            self.provinceID = unitInfo.unit_info.unit_info.id;
                            self.cityID = unitInfo.unit_info.id;
                            self.districtID = unitInfo.id;
                        }
                    }
                }, 100);

            }  else if (state === 1) { // 取消
                this.addVisible = false;
            } else if (state === 2) { // 确定
                if (this.schoolAdd.unit_name && this.schoolAdd.unit_code && this.districtID && this.schoolSortId) {
                    if (this.schoolAdd.unit_code.length == 10) {
                        this.schoolAdd.unit_level = '4';
                        this.schoolAdd.fk_parent_id = this.districtID;
                        this.schoolAdd.fk_school_category_id = this.schoolSortId;
                        this.loading = true;
                        DepartmentCnt.cloud.save_or_modify_unit_info(this.schoolAdd).then((response: AxiosResponse) => {
                            this.loading = false;
                            if (response.data.status === '200') {
                                this.cleanInfo();
                                this.getInfo();
                                this.addVisible = false;
                            } else {
                                this.any().$notify.error({title: '提示', message: response.data.message});
                            }

                        })
                    } else {
                        this.any().$notify.error({title: '提示', message: '学校代码格式为十位纯数字!'});
                    }
                } else {
                    this.any().$notify.error({title: '提示', message: "必填项不能有空"});
                }
            }
        }
        // 获取当前用户单位ID
        getUnitID(): void {
            let unit: any = window.sessionStorage.getItem("unit_info");
            unit = JSON.parse(unit);
            if (this.userType === '1') {
                this.provinceID = unit.id;
            } else if (this.userType === '2') {
                this.provinceID = unit.fk_parent_id;
                this.unitCityID = unit.id;
                this.cityID = this.unitCityID;
            } else if (this.userType === '3') {
                this.unitCityID = unit.fk_parent_id;
                this.cityID = this.unitCityID;
                this.unitDistrictID = unit.id;
                this.districtID = this.unitDistrictID;
            }

        }

        // 清空
        cleanInfo(): void {
            this.provinceID = '';
            this.schoolSortId = '';
            this.districtID = '';
            this.cityID = '';
            this.schoolAdd = new UnitAdd();
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
            DepartmentCnt.cloud.modify_unit_info_status_by_id(this.changeStatus).then((response: AxiosResponse) => {
                this.loading = false;
                if (response.data.status === '200') {
                    this.any().$notify.success({title: '提示',message: '状态更改成功'});
                } else {
                    this.any().$notify.error({title: '提示', message: response.data.message});
                }

            })
        }

        // 点击修改


        // 删除
        onDelete(id: string): void {
            this.delId = id;
            this.delVisible = true;
        }
        onDelConfirm(): void { // 确认删除
            this.loading = true;
            DepartmentCnt.cloud.remove_unit_info_by_id({id: this.delId}).then((response: AxiosResponse) => {
                this.loading = false;
                if (response.data.status === '200') {
                    this.delVisible = false;
                    this.getInfo();
                } else {
                    this.any().$notify.error({title: '提示', message: response.data.message});
                }

            })
        }



        // 导入
        onImport(): void {
            this.importVisible = true;
        }
        // 导入
        onUploading(): void {
            if (this.any().$refs.upload.uploadFiles.length) {
                this.any().$refs.upload.submit();
            } else {
                this.any().$notify.error({title: '提示', message: "请先选择文件"});
            }
        }
        successUpload(response, file, fileList): void {
            console.log(response, file, fileList);
            if (response.status === '200') {
                DepartmentCnt.cloud.batch_import_unit_info(response.data.key).then((res: AxiosResponse) => {
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
        errorUpload(err, file, fileList): void { console.log(file, fileList); this.any().$notify.error({title: '提示', message: err}); }
        // 进度
        getProgress(): void {
            DepartmentCnt.cloud.get_proccess({api_name: '/unit/batch_import_unit_info'}).then((response: AxiosResponse) => {
                if (response.data.data.error_msg) {
                    this.progressDialog = false;
                    this.any().$notify.error({title: '提示', message: response.data.data.error_msg});
                    return;
                }
                if (response.data.status != 200) {
                    this.progressDialog = false;
                    this.any().$notify.error({title: '提示', message: response.data.data.error_msg});
                    return;
                }
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
            });
        }
        onIntoSchoolSort(): void {
            XtRouter.skipNamed("DepartmentSchoolSort");
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
