 <!--suppress ALL -->
<template>
    <div class="manage-wrap">
        <div class="select-wrap" style="text-align: left">
            <el-select v-show="roleRank === 0" class="each-sel" v-model="provinceValue" clearable placeholder="请选择省份">
                <el-option
                    v-for="item in provinceList"
                    :key="item.id"
                    :label="item.unit_name"
                    :value="item.id">
                </el-option>
            </el-select>
            <el-select v-show="roleRank <= 1" class="each-sel" v-model="cityValue" clearable placeholder="请选择城市"
                       :no-data-text="this.provinceValue === '' ? '未选择省份' : '该省份下没有城市信息'">
                <el-option
                    v-for="item in cityList"
                    :key="item.id"
                    :label="item.unit_name"
                    :value="item.id">
                </el-option>
            </el-select>
            <el-select v-show="roleRank <= 2" class="each-sel" v-model="districtValue" clearable placeholder="请选择区县"
                       :no-data-text="this.cityValue === '' ? '未选择城市' : '该城市下没有区县信息'">
                <el-option
                    v-for="item in districtList"
                    :key="item.id"
                    :label="item.unit_name"
                    :value="item.id">
                </el-option>
            </el-select>
            <el-select v-show="roleRank <= 3" class="each-sel" v-model="schoolValue" clearable placeholder="请选择学校"
                       :no-data-text="this.districtValue === '' ? '未选择区县' : '该区县下没有学校信息'">
                <el-option
                    v-for="item in schoolList"
                    :key="item.id"
                    :label="item.unit_name"
                    :value="item.id">
                </el-option>
            </el-select>
            <div style="display: inline-block">
                <el-input placeholder="请输入单位代码" v-model="unitCode" clearable> </el-input>
            </div>

        </div>
        <div class="table-wrap">
            <el-table :data="tableInfo" style="width: 100%" :default-sort = "{prop: 'unit_level', order: 'ascending'}"
                      v-loading="loading"
                      element-loading-text="拼命加载中"
                      element-loading-spinner="el-icon-loading"
                      element-loading-background="rgba(0, 0, 0, 0.8)">
                <el-table-column type="index" label="序号" align="center" width="70"></el-table-column>
                <el-table-column prop="unit_code" label="单位代码" align="center" width="173"></el-table-column>
                <el-table-column prop="unit_name" label="单位名称" align="center" width="172"></el-table-column>
                <el-table-column label="等级" prop="unit_level" align="center" width="172">
                    <template slot-scope="scope">
                        <span v-if="scope.row.unit_level === '1'">省</span>
                        <span v-if="scope.row.unit_level === '2'">市</span>
                        <span v-if="scope.row.unit_level === '3'">区</span>
                        <span v-if="scope.row.unit_level === '4'">校</span>
                    </template>
                </el-table-column>
                <el-table-column label="省份" align="center" width="172">
                    <template slot-scope="scope">
                        <!--<span v-if="scope.row.unit_level === '1'">{{scope.row.unit_name}}</span>-->
                        <!--<span v-if="scope.row.unit_level === '2'">{{scope.row.unit_info.unit_name}}</span>-->
                        <!--<span v-if="scope.row.unit_level === '3'">{{scope.row.unit_info.unit_info.unit_name}}</span>-->
                        <!--<span v-if="scope.row.unit_level === '4'">{{scope.row.unit_info.unit_info.unit_info.unit_name}}</span>-->
                    </template>
                </el-table-column>
                <el-table-column label="市" align="center" width="172">
                    <template slot-scope="scope">
                        <!--<span v-if="scope.row.unit_level === '2'">{{scope.row.unit_name}}</span>-->
                        <!--<span v-if="scope.row.unit_level === '3'">{{scope.row.unit_info.unit_name}}</span>-->
                        <!--<span v-if="scope.row.unit_level === '4'">{{scope.row.unit_info.unit_info.unit_name}}</span>-->
                    </template>
                </el-table-column>
                <el-table-column label="区" align="center" width="172">
                    <template slot-scope="scope">
                        <!--<span v-if="scope.row.unit_level === '3'">{{scope.row.unit_name}}</span>-->
                        <!--<span v-if="scope.row.unit_level === '4'">{{scope.row.unit_info.unit_name}}</span>-->
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" align="center" width="60">
                    <template slot-scope="scope">
                        <el-tooltip v-show="configBtn && roleRank != 0" class="item" effect="dark" content="无权限" placement="top">
                            <span class="config-btn-n"></span>
                        </el-tooltip>
                        <span v-show="!configBtn || roleRank == 0" class="config-btn" @click="onIntoOpenConfig(scope.row)"></span>
                    </template>
                </el-table-column>
            </el-table>
        </div>

    </div>
</template>

<script lang="ts">
    import {BaseSelect, PrivilegeInfo} from "./privilege-management.def";
    import {XtVue, Component, Watch, XtRouter} from "../../common/common";
    import PrivilegeCnt from "./privilege-management.cnt";
    import {AxiosResponse} from "axios";
    import {getBtnList} from "../common/mod/base"
    import {QueryAllUnit} from "../user-management/user-management.def";


    @Component
    export default class Management extends XtVue {
        private selectData: BaseSelect = new BaseSelect();
        private unitCode: string | null = null;
        private provinceList: any = [];
        private provinceValue: string | null = null;
        private cityList: any = [];
        private cityValue: string | null = null;
        private cityClean: boolean = true;
        private districtList: any = [];
        private districtValue: string | null = null;
        private schoolList: any = [];
        private allSchoolList: any = [];
        private schoolValue: string | null = null;
        private tableInfo:any = [];
        //省级
        private PROVINCE_LEVEL :number = 1;
        //市级
        private CITY_LEVEL:number = 2;
        //区县级
        private DISTRICT_LEVEL:number = 3;
        //校级
        private SCHOOL_LEVEL :number = 4;
        private roleRank: any = '';
        private unitID: any = '';
        private allUnitList: any[] = [];
        // 按钮权限
        private configBtn: boolean = true;
        // 查询所有单位接口参数
        private queryAllInfo: QueryAllUnit = new QueryAllUnit();
        // 加载mod层
        private loading: boolean = false;


        public queryOpenFuntion(): void {
            if (this.roleRank == 0) {
                PrivilegeCnt.cloud.lowerLowerUnitInfo({}).then((res: AxiosResponse) => {
                    this.provinceList = [];
                    this.tableInfo = [];
                    if (res && res.data) {
                        if (res.data.status === '200') {
                            this.allUnitList = res.data.data;
                            this.tableInfo = this.allUnitList;
                            for (let i = 0; i < res.data.data.length; i++) {
                                if (res.data.data[i].unit_level === '1') {
                                    this.provinceList.push(res.data.data[i])
                                }
                            }
                        } else {
                            this.any().$message.error(res.data.message);
                        }
                    }
                });
            } else {
                PrivilegeCnt.cloud.lowerLowerUnitInfo({id: this.unitID}).then((res: AxiosResponse) => {
                    this.provinceList = [];
                    this.tableInfo = [];
                    if (res && res.data) {
                        if (res.data.status === '200') {
                            this.allUnitList = res.data.data;
                            this.tableInfo = this.allUnitList;
                        } else {
                            this.any().$message.error(res.data.message);
                            return;
                        }
                        if (this.roleRank === 1) {
                            for (let i = 0; i < res.data.data.length; i++) {
                                if (res.data.data[i].unit_level === '2' && res.data.data[i].unit_info.id === this.unitID) {
                                    this.cityList.push(res.data.data[i])
                                }
                                console.log(res.data.data)
                            }
                        } else if (this.roleRank === 2) {
                            for (let i = 0; i < res.data.data.length; i++) {
                                if (res.data.data[i].unit_level === '3' && res.data.data[i].unit_info.id === this.unitID) {
                                    this.districtList.push(res.data.data[i])
                                }
                            }
                        } else if (this.roleRank === 3) {
                            for (let i = 0; i < res.data.data.length; i++) {
                                if (res.data.data[i].unit_level === '4' && res.data.data[i].unit_info.id === this.unitID) {
                                    this.schoolList.push(res.data.data[i])
                                }
                            }
                        }
                    }
                })
            }


        }


        mounted() {
            let user: any = window.sessionStorage.getItem("user_info");
            this.roleRank = JSON.parse(user).role_info.role_rank;
            console.log(this.roleRank)
            this.unitID = JSON.parse(user).fk_unit_id;
            this.queryOpenFuntion();
            if (window.sessionStorage.getItem("val")) {
                let btnList: any = window.sessionStorage.getItem("val");
                btnList = JSON.parse(btnList).children;
                this.configBtn = getBtnList(btnList, 'config');
            }
        }

        @Watch("provinceValue")
        getCityList(): void {
            if (this.provinceValue === '') {this.provinceValue = null; return}
            this.cityList = [];
            this.cityValue = null;
            if (this.provinceValue) {
                this.queryAllInfo.id = this.provinceValue;
                this.loading = true;
                PrivilegeCnt.cloud.lowerLowerUnitInfo({id: this.provinceValue}).then((res: AxiosResponse) => {
                    this.loading = false;
                    if (res && res.data) {
                        if (res.data.status === '200') {
                            this.tableInfo = res.data.data;
                            for (let i = 0; i < this.tableInfo.length; i++) {
                                if (this.tableInfo[i].unit_level == 2) { this.cityList.push(this.tableInfo[i]); }
                            }
                        } else {
                            this.any().$message.error(res.data.message);
                        }
                    }
                });
            } else {
                this.tableInfo = this.allUnitList;
            }
        }

        @Watch("cityValue")
        getDistrictList(): void {
            if (this.cityValue === '') {this.cityValue = null; return}
            if (this.roleRank <= 1) {
                this.districtValue = null;
                this.districtList = [];
                if (this.cityValue) {
                    this.loading = true;
                    PrivilegeCnt.cloud.lowerLowerUnitInfo({id: this.cityValue}).then((res: AxiosResponse) => {
                        if (res && res.data) {
                            if (res.data.status === '200') {
                                this.tableInfo = res.data.data;
                                for (let i = 0; i < this.tableInfo.length; i++) {
                                    if (this.tableInfo[i].unit_level == 3) {
                                        this.districtList.push(this.tableInfo[i]);
                                    }
                                }
                                this.loading = false;
                            } else {
                                this.any().$message.error(res.data.message);
                                this.loading = false;
                            }
                        }
                    });
                } else {
                    if (this.provinceValue) {
                        this.getCityList()
                    } else {
                        this.tableInfo = this.allUnitList;
                    }
                }
            }
        }

        @Watch("districtValue")
        getSchoolList(): void {
            if (this.districtValue === '') {this.districtValue = null; return}
            this.schoolValue = null;
            this.schoolList = [];
            if (this.districtValue) {
                this.loading = true;
                PrivilegeCnt.cloud.lowerLowerUnitInfo({id: this.districtValue}).then((res: AxiosResponse) => {
                    if (res && res.data) {
                        if (res.data.status === '200') {
                            this.tableInfo = res.data.data;
                            for (let i = 0; i < this.tableInfo.length; i++) {
                                if (this.tableInfo[i].unit_level == 4) {
                                    this.schoolList.push(this.tableInfo[i]);
                                }
                            }
                            this.loading = false;
                        } else {
                            this.any().$message.error(res.data.message);
                            this.loading = false;
                        }
                    }
                });
            } else {
                if (this.cityValue) {
                    this.getDistrictList();
                } else {
                    this.tableInfo = this.allUnitList
                }
            }
        }

        @Watch("schoolValue")
        getTableInfoList(): void {
            if (this.schoolValue === '') {this.schoolValue = null; return}
            if (this.schoolValue) {
                this.loading = true;
                PrivilegeCnt.cloud.lowerLowerUnitInfo({id: this.schoolValue}).then((res: AxiosResponse) => {
                    if (res && res.data) {
                        if (res.data.status === '200') {
                            this.tableInfo = res.data.data;
                            this.loading = false;
                        } else {
                            this.any().$message.error(res.data.message);
                            this.loading = false;
                        }
                    }
                });
            } else {
                if (this.districtValue) {
                    this.getDistrictList();
                } else {
                    this.tableInfo = this.allUnitList
                }
            }
        }


        @Watch("unitCode")
        getListByUnitCode(): void {
            if (this.unitCode) {
                this.tableInfo = [];
                for (let i = 0; i < this. allUnitList.length; i++) {
                    if (this.allUnitList[i].id.indexOf(this.unitCode.toUpperCase()) !== -1) {
                        this.tableInfo.push(this.allUnitList[i])
                    }
                }
            } else {
                this.tableInfo = this.allUnitList
            }
        }

        // 点击操作 跳转
        onIntoOpenConfig(row: any = ''): void {
            console.log(row)
            XtRouter.skipNamed("OpenConfig", {unit: row});
        }
    }
</script>

<style scoped lang="scss">
    @import "./privilege-management";
</style>
