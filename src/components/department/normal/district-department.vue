<template>
    <el-col class="right_table" style="width: 1166px;">
        <el-row style="text-align: right">
            <el-tooltip v-show="addBtn" class="item" effect="dark" content="无权限" placement="top">
                <el-button class="pt_btn" size="mini" @click="onAddVisible(0)">
                    <span class="add_span"><img src="../../../assets/icon/add.png" class="add_img">新增</span>
                </el-button>
            </el-tooltip>
            <el-button v-show="!addBtn" id="xz" class="add_btn" size="mini" @click="onAddVisible(0)">
                <span @click="onAddVisible(0)" class="add_span"><img src="../../../assets/icon/add.png" class="add_img">新增</span>
            </el-button>
        </el-row>
        <el-row style="text-align: left;margin-bottom: 15px;">
            <!--<el-select v-model="queryUnitByRank" filterable clearable placeholder="单位等级" value="" style="width: 200px;margin-right: 15px;">-->
                <!--<el-option label="省级" value="1"></el-option>-->
                <!--<el-option label="市级" value="2"></el-option>-->
                <!--<el-option label="区级" value="3"></el-option>-->
            <!--</el-select>-->
            <el-select v-model="searchUnitCode" filterable clearable placeholder="单位代码" value="" style="width: 200px;margin-right: 15px;">
                <el-option
                    v-for="item in allDistrict"
                    :key="item.unit_code"
                    :label="item.unit_code"
                    :value="item.unit_code">
                </el-option>
            </el-select>
            <el-select v-model="searchUnitName" filterable clearable placeholder="单位名称" value="" style="width: 200px;margin-right: 15px;">
                <el-option
                    v-for="item in allDistrict"
                    :key="item.id"
                    :label="item.unit_name"
                    :value="item.id">
                </el-option>
            </el-select>
        </el-row>

        <el-row>
            <el-table :data="districtList" :default-sort="{prop: 'unit_code', order: 'ascending'}"
                      v-loading="loading"
                      element-loading-spinner="el-icon-loading"
                      element-loading-background="rgba(0, 0, 0, 0.8)"
                      :element-loading-text="loadingTitle">
                <el-table-column header-align="center" label="序号" type="index" :index="ordinalAdd" sortable
                                 width="60px"></el-table-column>
                <el-table-column header-align="center" prop="unit_code" label="单位代码"></el-table-column>
                <el-table-column header-align="center" prop="unit_name" label="单位名称"></el-table-column>
                <el-table-column header-align="center" label="地区等级">
                    <template slot-scope="scope">
                        <span v-if="scope.row.unit_level === '1'">省级</span>
                        <span v-if="scope.row.unit_level === '2'">市级</span>
                        <span v-if="scope.row.unit_level === '3'">区级</span>
                    </template>
                </el-table-column>
                <el-table-column header-align="center" label="所属省份">
                    <template slot-scope="scope">
                        <span v-if="scope.row.unit_level === '1'">{{scope.row.unit_name}}</span>
                        <span v-if="scope.row.unit_level === '2'">{{scope.row.unit_info.unit_name}}</span>
                        <span v-if="scope.row.unit_level === '3'">{{scope.row.unit_info.unit_info.unit_name}}</span>
                    </template>
                </el-table-column>

                <el-table-column header-align="center" label="所属市级">
                    <template slot-scope="scope">
                        <span v-if="scope.row.unit_level === '2'">{{scope.row.unit_name}}</span>
                        <span v-if="scope.row.unit_level === '3'">{{scope.row.unit_info.unit_name}}</span>
                    </template>
                </el-table-column>

                <el-table-column header-align="center" label="所属区县">
                    <template slot-scope="scope">
                        <span v-if="scope.row.unit_level === '3'">{{scope.row.unit_name}}</span>
                    </template>
                </el-table-column>

                <el-table-column header-align="center" prop="contact_man" label="联系人"></el-table-column>
                <el-table-column header-align="center" prop="contact_num" label="联系电话"></el-table-column>
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
                    <el-radio v-show="roleRank <= 0" v-model="unitAdd.unit_level" label="1">省</el-radio>
                    <el-radio v-show="roleRank <= 1" v-model="unitAdd.unit_level" label="2">市</el-radio>
                    <el-radio v-show="roleRank <= 2" v-model="unitAdd.unit_level" label="3">区</el-radio>
                </el-row>
                <el-row v-if="unitAdd.unit_level === '1'">
                    <el-row>
                        <el-tooltip class="item" effect="dark" content="省份名称" placement="right">
                            <el-input v-model="unitAdd.unit_name" placeholder="请输入省份名称"
                                      clearable style="width: 315px" maxlength="10"></el-input>
                        </el-tooltip>
                        <span class="required">*</span>
                    </el-row>
                    <el-row>
                        <el-tooltip class="item" effect="dark" content="省份代码" placement="right">
                            <el-input v-model="unitAdd.unit_code" placeholder="请输入省份代码" clearable
                                      oninput="value=value.replace(/[^\d]/g,'')" style="width: 315px" maxlength="10"></el-input>
                        </el-tooltip>
                        <span class="required">*</span>
                    </el-row>
                </el-row>
                <el-row v-if="unitAdd.unit_level === '2'">
                    <el-row>
                        <el-tooltip class="item" effect="dark" content="所属省份" placement="right">
                            <el-select v-model="provinceID" filterable clearable placeholder="请选择或输入所属省份" value="">
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
                        <el-tooltip class="item" effect="dark" content="市级名称" placement="right">
                            <el-input v-model="unitAdd.unit_name" placeholder="请输入市级名称" clearable style="width: 315px" maxlength="10"></el-input>
                        </el-tooltip>
                        <span class="required">*</span>
                    </el-row>
                    <el-row>
                        <el-tooltip class="item" effect="dark" content="市级代码" placement="right">
                            <el-input v-model="unitAdd.unit_code" oninput="value=value.replace(/[^\d]/g,'')"
                                      placeholder="请输入市级代码" clearable style="width: 315px" maxlength="10"></el-input>
                        </el-tooltip>
                        <span class="required">*</span>
                    </el-row>
                </el-row>
                <el-row v-if="unitAdd.unit_level === '3'">
                    <el-row>
                        <el-tooltip class="item" effect="dark" content="所属省份" placement="right">
                            <el-select v-model="provinceID" filterable clearable placeholder="请选择或输入所属省份" value="">
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
                            <el-select v-model="cityID" filterable clearable placeholder="请选择或输入所属城市" value="">
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
                        <el-tooltip class="item" effect="dark" content="区县名称" placement="right">
                            <el-input v-model="unitAdd.unit_name" placeholder="请输入区县名称" clearable style="width: 315px" maxlength="10"></el-input>
                        </el-tooltip>
                        <span class="required">*</span>
                    </el-row>
                    <el-row>
                        <el-tooltip class="item" effect="dark" content="区县代码" placement="right">
                            <el-input v-model="unitAdd.unit_code" oninput="value=value.replace(/[^\d]/g,'')"
                                      placeholder="请输入区县代码" clearable style="width: 315px" maxlength="10"></el-input>
                        </el-tooltip>
                        <span class="required">*</span>
                    </el-row>
                </el-row>

                <el-row>
                    <el-tooltip class="item" effect="dark" content="联系人" placement="right">
                        <el-input v-model="unitAdd.contact_man" placeholder="联系人" clearable style="width: 315px" maxlength="15"></el-input>
                    </el-tooltip>
                </el-row>
                <el-row>
                    <el-tooltip class="item" effect="dark" content="联系电话" placement="right">
                        <el-input v-model="unitAdd.contact_num" oninput="value=value.replace(/[^\d]/g,'')"
                                  placeholder="联系电话" clearable style="width: 315px"
                                  maxlength="11" minlength="11"></el-input>
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
    import {ChangeStatus, GetDistrictList, QueryAllUnit, UnitAdd} from "../department.def";
    import DepartmentCnt from "../department.cnt";
    import {AxiosResponse} from "axios";
    import {getBtnList} from "../../common/mod/base"



    @Component
    export default class District extends XtVue {
        // 查询所有区县参数
        private queryAllUnit: QueryAllUnit = new QueryAllUnit();
        // 分页查询
        private pageQuery: GetDistrictList = new GetDistrictList();
        private pageTotal: number = 0;
        private pageNum: number = 0;
        // 表格数据
        private districtList: any = [];
        // 新增弹框
        private addVisible: boolean = false;
        private addTitle: string | null = null;
        private unitAdd: UnitAdd = new UnitAdd();
        private addList: any = {};
        // 删除按钮弹框
        private delVisible: boolean = false;
        private delId: string | null = null;
        // 修改按钮弹框
        private updateVisible: boolean = false;
        // 状态
        private changeStatus: ChangeStatus = new ChangeStatus();
        // 数据
        private provinceList: any[] = [];
        private provinceID: string | null = null;
        private cityID: string | null = null;
        private cityList: any = [];
        private unitInfo: any = [];
        private userType: string = '';
        private roleRank: string = '';
        private unitID: string | null = null;
        // private uninInfo: any = {};
        // 按钮权限
        private addBtn: boolean = true; // 新增
        private editBtn: boolean = true; // 修改
        private deleteBtn: boolean = true; // 删除
        private startStopBtn: boolean = true;
        private rowInfo: any = {};
        private queryUnitByRank: string | null = null; // 单位等级查询框
        private searchInfo: string | null = null; // 查询
        private unitCode: string | null = null;
        private unitName: string | null = null;
        private searchUnitName: string | null = null;
        private searchUnitCode: string | null = null;
        private allDistrict: any = [];
        private loading: boolean = false;
        private loadingTitle: string = '';



        // 查询
        @Watch("searchUnitName")
        @Watch("searchUnitCode")
        queryInfo(): void {
            if (this.searchUnitCode === '') { this.searchUnitCode = null; return }
            if (this.searchUnitName === '') { this.searchUnitName = null; return }
            this.pageQuery.unit_code = this.searchUnitCode;
            this.pageNum = 1;
            this.pageQuery.page_num = 0;
            this.getInfo();
        }
        getInfo(): void {
            if (this.roleRank == '0') {this.pageQuery.id = this.searchUnitName ? this.searchUnitName : ''}
            else {this.pageQuery.id = this.searchUnitName ? this.searchUnitName : this.unitID}
            if (this.pageNum === 1) this.pageQuery.page_num = 0;
            else if (this.pageNum > 1) this.pageQuery.page_num = this.pageNum - 1;
            delete this.pageQuery.status;
            delete this.pageQuery.unit_level;
            let listLevel: string[] = [];
            if (this.roleRank == '0') { listLevel = ['1', '2', '3'] }
            if (this.roleRank == '1') { listLevel = ['2', '3'] }
            if (this.roleRank == '2') { listLevel = ['3'] }
            if (Number(this.roleRank) > 2) { return; }
            this.pageQuery.list_unit_level = listLevel;
            this.loading = true;
            this.loadingTitle = '数据加载中';
            DepartmentCnt.cloud.list_page_all_unit_info(this.pageQuery).then((response: AxiosResponse) => {
                this.loading = false;
                if (response.data.status === '200') {
                    this.pageTotal = response.data.data.totalElements;
                    this.unitInfo = response.data.data.content;
                    this.districtList = response.data.data.content;

                } else {
                    this.any().$notify.error({title: '提示', message: response.data.message});
                }
            });
        }

        @Watch("pageNum")
        onFlipOver(): void {
            this. getInfo();
        }
        @Watch("queryUnitByRank")
        queryUnitInfoByRank(): void {
            if (this.queryUnitByRank) {
                if (this.pageNum === 1) {this.pageQuery.page_num = 0;}
                else if (this.pageNum > 1) {this.pageQuery.page_num = this.pageNum - 1;}
                delete this.pageQuery.status;
                this.pageQuery.unit_level = this.queryUnitByRank;
                delete this.pageQuery.list_unit_level;
                if (this.roleRank == '0') {this.pageQuery.id = this.searchUnitName ? this.searchUnitName : ''}
                else {this.pageQuery.id = this.searchUnitName ? this.searchUnitName : this.unitID}

                DepartmentCnt.cloud.list_page_all_unit_info(this.pageQuery).then((response: AxiosResponse) => {
                    if (response.data.status === '200') {
                        this.districtList = response.data.data.content;
                        this.pageTotal = response.data.data.totalElements;

                    } else {
                        this.any().$notify.error({title: '提示', message: response.data.message});
                    }
                });
            } else {
                this.pageNum = 1;
                this.pageQuery.page_num = 0;
                this.getInfo();
            }
        }
        mounted() {
            let userInfo: any = window.sessionStorage.getItem("user_info");
            this.unitID = JSON.parse(userInfo).fk_unit_id;
            this.userType = JSON.parse(userInfo).user_type;
            this.roleRank = JSON.parse(userInfo).role_info.role_rank;

            if (this.roleRank == '0') {
                this.queryAllUnit.id = null;
            } else {
                this.queryAllUnit.id = this.unitID;
            }
            this.queryAllUnit.list_unit_level = ['1', '2', '3'];
            delete this.queryAllUnit.status;
            DepartmentCnt.cloud.list_all_unit_info_by_id(this.queryAllUnit).then((response: AxiosResponse) => {
                if (response.data.status === '200') {
                    this.allDistrict = response.data.data;
                    this.provinceList = [];
                    let unitInfo: any = window.sessionStorage.getItem("unit_info");
                    unitInfo = JSON.parse(unitInfo);
                    if (this.roleRank == '0') {
                        for (let i = 0; i < this.allDistrict.length; i++) {
                            if (this.allDistrict[i].unit_level == '1') { this.provinceList.push(this.allDistrict[i]); }
                        }
                    } else if (this.roleRank == '1') this.provinceList.push(unitInfo);
                    else if (this.roleRank == '2') this.provinceList.push(unitInfo.unit_info);
                    else if (this.roleRank == '3') this.provinceList.push(unitInfo.unit_info.unit_info);
                }
                else { this.any().$notify.error({title: '提示', message: response.data.message}); }
            });


            if (window.sessionStorage.getItem("val")) {
                let btnList: any = window.sessionStorage.getItem("val");
                btnList = JSON.parse(btnList).children;
                this.addBtn = getBtnList(btnList, 'add');
                this.editBtn = getBtnList(btnList, 'edit');
                this.deleteBtn = getBtnList(btnList, 'delete');
                this.startStopBtn = getBtnList(btnList, 'start_stop');
            }
        }
        @Watch("provinceID")
        getCityList(): void {
            this.cityList = [];
            if (this.provinceID) {
                for (let i = 0; i < this.allDistrict.length; i++) {
                    if (this.userType === '2') {
                        if (this.unitID === this.allDistrict[i].id) this.cityList.push(this.allDistrict[i]);
                    } else if (this.userType === '3') {
                        let unitInfo: any = window.sessionStorage.getItem("unit_info");
                        unitInfo = JSON.parse(unitInfo);
                        this.cityList.push(unitInfo.unit_info);
                    } else {
                        if (this.allDistrict[i].unit_level === '2' && this.provinceID === this.allDistrict[i].fk_parent_id) {
                            this.cityList.push(this.allDistrict[i]);
                        }
                    }
                }
                if (this.addTitle === '修改') {
                    if (this.unitAdd.unit_level === '2' && this.provinceList.length > 0) {
                        this.cityID = this.rowInfo.id;
                    } else if (this.unitAdd.unit_level === '3' && this.provinceList.length > 0) {
                        this.cityID = this.rowInfo.unit_info.id;
                        this.unitAdd.id = this.rowInfo.id;
                    }
                }
            } else {
                this.cityID = '';
                // this.getUnitID();
            }

        }
        // 新增
        onAddVisible(state: number, row: any = ''): void {
            if (state === 0) { // 点击新增
                this.unitAdd = new UnitAdd();
                this.clean();
                if (row) {
                    this.rowInfo = row;
                    this.addTitle = '修改';
                    this.unitAdd.unit_level = row.unit_level;
                    if (this.unitAdd.unit_level === '1' && this.provinceList.length > 0) {
                        this.provinceID = row.id;
                    } else if (this.unitAdd.unit_level === '2' && this.provinceList.length > 0) {
                        this.provinceID = row.unit_info.id;
                        // this.cityID = row.id;
                    } else if (this.unitAdd.unit_level === '3' && this.provinceList.length > 0) {
                        this.provinceID = row.unit_info.unit_info.id;
                        // this.cityID = row.unit_info.id;
                        // this.unitAdd.id = row.id;
                    }
                    this.unitAdd.id = row.id;
                    this.unitAdd.unit_code = row.unit_code;
                    this.unitAdd.unit_name = row.unit_name;
                    this.unitAdd.contact_man = row.contact_man;
                    this.unitAdd.contact_num = row.contact_num;
                    this.unitAdd.status = row.status;
                } else {
                    this.addTitle = '新增';
                    this.addList.unit_code = '';
                    let userInfo: any = window.sessionStorage.getItem("user_info");
                    userInfo = JSON.parse(userInfo);
                    let roleRank = Number(this.roleRank);
                    if (roleRank <= 2 && roleRank != 0) {
                        this.unitAdd.unit_level = '3';
                        this.provinceID = userInfo.unit_info.fk_parent_id;
                        this.cityID = userInfo.unit_info.id;
                    }
                    if (roleRank <= 1) {
                        this.unitAdd.unit_level = '2';
                        this.provinceID = userInfo.unit_info.id;
                    }
                    if (roleRank <= 0) { this.unitAdd.unit_level = '1'; }
                    // this.getUnitID();
                }
                this.addVisible = true;
            }  else if (state === 1) { // 取消
                this.addVisible = false;
            } else if (state === 2) { // 确定
                if (this.unitAdd.unit_name && this.unitAdd.unit_code) {
                    if (this.unitAdd.unit_level === '1') {
                        // this.unitAdd.unit_info = {id: '0'};
                    } else if (this.unitAdd.unit_level === '2') {
                        this.unitAdd.fk_parent_id = this.provinceID;
                    } else if (this.unitAdd.unit_level === '3') {
                        this.unitAdd.fk_parent_id = this.cityID;
                    }
                    this.loading = true;
                    this.loadingTitle = '数据加载中';
                    DepartmentCnt.cloud.save_or_modify_unit_info(this.unitAdd).then((response: AxiosResponse) => {
                        this.loading = false;
                        if (response.data.status === '200') {
                            this.addVisible = false;
                            this.getInfo();
                            this.clean();
                        } else {
                            this.any().$notify.error({title: '提示', message: response.data.message});
                        }
                    })
                } else {
                    this.any().$notify.error({title: '提示', message: "必填项不能有空"});
                }

            }
        }
        @Watch("addVisible")
        updateByAddInfo(): void {
            if (!this.addVisible) {
                this.unitAdd = new UnitAdd();
                this.provinceID = '';
            }
        }

        // 获取当前用户单位ID
        getUnitID(): void {
            if (this.userType === '2') {
                this.unitAdd.unit_level = '3';
                let unit: any = window.sessionStorage.getItem("unit_info");
                unit = JSON.parse(unit);
                this.provinceID = unit.fk_parent_id;
                this.cityID = unit.id;
            }
        }

        onSearchInfo(): void {
            this.unitAdd.unit_code = this.unitCode;
            this.unitAdd.unit_name = this.unitName;
        }




        // 清空
        clean(): void {
            this.unitAdd = new UnitAdd();
            this.provinceID = '';
            this.cityID = '';
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
            DepartmentCnt.cloud.modify_unit_info_status_by_id(this.changeStatus).then((response: AxiosResponse) => {
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
            this.delVisible = false;
            this.loading = true;
            this.loadingTitle = '正在删除';
            DepartmentCnt.cloud.remove_unit_info_by_id({id: this.delId}).then((response: AxiosResponse) => {
                this.loading = false;
                if (response.data.status === '200') {
                    this.any().$notify.success({title: '提示', message: '删除成功'});
                    this.getInfo();
                } else {
                    this.any().$notify.error({title: '提示', message: response.data.message});
                }

            })
        }
        // setAdministrative(administrative: any): void {
        //     this.addList = administrative;
        // }


        // 表单序号
        ordinalAdd(index: number): number {
            return index + 1;
        }

    }
</script>

<style scoped lang="scss">
    @import "../department.scss";
    .float_right {
        float: right;
        z-index: 2;
    }





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
