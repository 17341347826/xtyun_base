<template>
    <el-col class="right_table" style="width: 1166px;margin-left: 8px;">
        <div style="text-align: right;">
            <el-tooltip v-show="batchStartStopBtn" class="item" effect="dark" content="无权限" placement="top">
                <el-button class="pt_btn" size="mini">批量状态</el-button>
            </el-tooltip>
            <el-button v-show="!batchStartStopBtn" class="add_btn" size="mini" @click="batchReady('1')">批量状态</el-button>

            <el-tooltip v-show="batchUpdatePasswordBtn" class="item" effect="dark" content="无权限" placement="top" style="margin-left: 15px;">
                <el-button class="pt_btn" size="mini" type="success">批量重置密码</el-button>
            </el-tooltip>
            <el-button v-show="!batchUpdatePasswordBtn" class="add_btn" size="mini" @click="batchReady('2')">批量重置密码</el-button>
        </div>
        <el-row style="text-align: right">
            <el-tooltip class="item" effect="dark" content="市级" placement="top">
                <el-select v-show="roleRank < 2" v-model="searchByCity" filterable clearable placeholder="市级" value="" style="width: 200px;margin-right: 15px;"
                           @change="getDistrictList()">
                    <el-option
                        v-for="item in cityList"
                        :key="item.id"
                        :label="item.unit_name"
                        :value="item.id">
                    </el-option>
                </el-select>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="区县" placement="top">
                <el-select v-show="roleRank < 3" v-model="searchByDistrict" filterable clearable placeholder="区县" value=""
                           @change="getSchoolList()" style="width: 200px;margin-right: 15px;">
                    <el-option
                        v-for="item in districtList"
                        :key="item.id"
                        :label="item.unit_name"
                        :value="item.id">
                    </el-option>
                </el-select>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="学校" placement="top">
                <el-select v-show="roleRank < 4" v-model="searchBySchool" filterable clearable placeholder="学校" value="" style="width: 200px;margin-right: 15px;">
                    <el-option
                        v-for="item in schoolList"
                        :key="item.id"
                        :label="item.unit_name"
                        :value="item.id">
                    </el-option>
                </el-select>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="可搜索账号" placement="top">
                <el-input v-model="searchByInfo" clearable placeholder="搜索" style="width: 200px" @change="queryInfo()"></el-input>
            </el-tooltip>
        </el-row>
        <div class="table-wrap">
            <el-table
                v-loading="loading"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"
                ref="multipleTable"
                :data="tableData3"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55" align="center"> </el-table-column>
                <el-table-column label="序号" align="center" width="70">
                    <template scope="scope">
                        <span>{{scope.$index+pageQuery.page_num*pageQuery.page_size+1}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="user_account" align="center" label="账号"> </el-table-column>
                <el-table-column prop="user_name" align="center" label="姓名"> </el-table-column>
                <el-table-column prop="cell_phone_num" align="center" label="联系电话"> </el-table-column>
                <el-table-column align="center" label="角色">
                    <template slot-scope="scope">
                        <span>{{scope.row.role_info.role_type | typeRoleFilters(scope.row.role_info.role_rank)}}</span>
                    </template>
                </el-table-column>
                <!--<el-table-column prop="status" align="center" label="使用状态" :formatter="formatterColumn">-->
                <!--</el-table-column>-->
                <el-table-column align="center" label="使用状态" width="95px">
                    <template slot-scope="scope">
                        <el-tooltip v-show="startStopBtn" class="item" effect="dark" content="无权限" placement="top">
                            <img src="../../../assets/icon/close.png" style="vertical-align: middle;cursor:pointer">
                        </el-tooltip>
                        <span v-if="scope.row.status === '1' && !startStopBtn" class="status-style btn-start-using"  @click="columnStatus('0',scope.row.id)"></span>
                        <span v-if="scope.row.status === '0' && !startStopBtn" class="status-style btn-no-start-using"  @click="columnStatus('1',scope.row.id)"></span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="重置密码" width="95px">
                    <template slot-scope="scope">
                        <el-tooltip v-show="updatePasswordBtn" class="item" effect="dark" content="无权限" placement="top">
                            <span class="img_span btn-reset-pwd-no"></span>
                        </el-tooltip>
                        <span v-show="!updatePasswordBtn" class="img_span btn-reset-pwd"  @click="columnResetPwd(scope.row.id)"></span>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <!--页面分页-->
        <el-pagination
            background
            @prev-click = 'PrevClick'
            @next-click = "NextClick"
            @current-change="handleCurrentChange"
            layout="total,prev, pager, next, jumper"
            :current-page.sync="pageQuery.pageNum"
            :page-size="pageSize"
            :total="total">
        </el-pagination>

        <!--批量状态-->
        <el-dialog
            title="提示"
            :visible.sync="batchStatusDialog"
            width="30%" top="30vh" center>
            <el-select v-model="batchStatus" style="text-align: left">
                <el-option label="停用" value="0">停用</el-option>
                <el-option label="启用" value="1">启用</el-option>
            </el-select>
            <span slot="footer" class="dialog-footer">
                <el-button @click="batchStatusDialog = false">取 消</el-button>
                <el-button type="primary" @click="batchStatusDialog = false;insureStatus()">确 定</el-button>
            </span>
        </el-dialog>
        <!--批量重置密码-->
        <el-dialog
            title="提示"
            :visible.sync="batchResetPwdDialog"
            width="30%" top="30vh" center>
            <span>确认批量重置密码</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="batchResetPwdDialog = false">取 消</el-button>
                <el-button type="primary" @click="batchResetPwdDialog = false;insureResetPwd()">确 定</el-button>
            </span>
        </el-dialog>

    </el-col>


</template>

<script lang="ts">
    import {Teacher,PageQuery} from "../user-management.def";
    import {XtVue, Component,Watch, XtRouter} from "../../../common/common";
    import UserManageCnt from "../user-management.cnt";
    import {AxiosResponse} from "axios";
    import "./userFilters";
    import {getBtnList} from "../../common/mod/base"
    import {QueryAllUnit} from "../../department/department.def";


    @Component
    export default class Teach extends XtVue {
        private tableData3: Teacher[] = [];
        public multipleSelection:Array<any> = [];//table多选列表
        private pageQuery: PageQuery = new PageQuery();
        private delIDParams: string | null = null;
        private userRank: string | null = null;
        // 每页表格数目
        private pageSize: number = 0;
        // 总数据量
        private total: number  = 0;

        private batchStatusDialog: boolean = false;//批量状态弹框显示隐藏
        private batchStatus: string = '1';//0-停用；1-启用
        private batchResetPwdDialog: boolean = false;//批量重置密码弹框显示隐藏
        // 按钮权限
        private startStopBtn: boolean = true; // 状态
        private updatePasswordBtn: boolean = true; // 重置密码(单个)
        private batchStartStopBtn: boolean = true; // 批量状态
        private batchUpdatePasswordBtn: boolean = true; // 批量重置密码
        // 当前角色等级
        private roleRank: string | null = null;
        private searchByInfo: string | null = null;
        private loading: boolean = false; // 加载层
        private searchByCity: string | null = null;
        private searchByDistrict: string | null = null;
        private searchBySchool: string | null = null;
        private cityList: any = [];
        private schoolList: any = [];
        private districtList: any = [];
        private unitID: string | null = null; // 当前登录用户单位ID
        private queryAllUnit: QueryAllUnit = new QueryAllUnit(); // 查询所有单位 参数
        private provinceList: any = [];
        private allCityInfo: any = [];
        private allDistrictInfo: any = [];
        private allSchoolList: any = [];



        public mounted(): void {
           let userInfo:any  = sessionStorage.getItem('user_info');
           userInfo = JSON.parse(userInfo);
           this.roleRank = userInfo.role_info.role_rank;
           this.unitID = userInfo.fk_unit_id;
           this.getTeacherData();
           this.getUnitInfo();
           if (window.sessionStorage.getItem("val")) {
               let btnList: any = window.sessionStorage.getItem("val");
               btnList = JSON.parse(btnList).children;
               this.startStopBtn = getBtnList(btnList, 'start_stop');
               this.updatePasswordBtn = getBtnList(btnList, 'update_password');
               this.batchStartStopBtn = getBtnList(btnList, 'batch_start_stop');
               this.batchUpdatePasswordBtn = getBtnList(btnList, 'batch_update_password');
           }
        }
        /**
         * 查询
         */
        // public getInfo(): void {
        //     if (this.pageNum === 1) {
        //         delete this.pageQuery.page_num;
        //     } else if (this.pageNum > 1) {
        //         this.pageQuery.page_num = this.pageNum - 1;
        //     }
        //     this.pageTotal = 5;
        // }
        // @Watch("pageNum")
        // public onFlipOver(): void {
        //     this.getInfo();
        // }
        @Watch("searchByCity")
        @Watch("searchByDistrict")
        @Watch("searchBySchool")
        queryInfo(): void {
            if (this.searchByCity == '') {this.searchByCity = null; return}
            if (this.searchByDistrict == '') {this.searchByDistrict = null; return}
            if (this.searchBySchool == '') {this.searchBySchool = null; return}
            if (this.searchByInfo == '') {this.searchByInfo = null; return}
            this.pageQuery.page_num = 0;
            this.total = 1;
            this.getTeacherData();
        }
        public getTeacherData(): void{
            this.tableData3 =  [];
            let userInfo: any = window.sessionStorage.getItem('user_info');
            userInfo = JSON.parse(userInfo);
            this.pageQuery.fk_unit_id = userInfo.fk_unit_id;
            this.userRank = userInfo.user_type;
            let unitID: string | null = null;
            if (this.roleRank == '0') { unitID = null; } else { unitID = this.pageQuery.fk_unit_id; }
            if (this.searchByCity) { unitID = this.searchByCity}
            if (this.searchByDistrict) { unitID = this.searchByDistrict}
            if (this.searchBySchool) { unitID = this.searchBySchool; }
            let obj = {page_size: this.pageQuery.page_size, page_num: this.pageQuery.page_num, user_type: '5', fk_unit_id: unitID,
                search_info: this.searchByInfo};
            this.loading = true;
            UserManageCnt.cloud.ces(obj).then((response: AxiosResponse)=>{
                if(response.data.status != 200){
                    this.loading = false;
                    this.any().$notify.error({ title: '提示', message: response.data.message })
                }else{
                    this.loading = false;
                    this.tableData3 = response.data.data.content;
                    this.pageSize = response.data.data.size;
                    this.total = response.data.data.totalElements;
                }
            })
        }



        public getUnitInfo(): void{
            if (this.roleRank == '0') { this.queryAllUnit.id = null; }
            else { this.queryAllUnit.id = this.unitID; }
            UserManageCnt.cloud.list_all_unit_info_by_id(this.queryAllUnit).then((response: AxiosResponse) => {
                if(response.data.status != 200){
                    this.any().$notify.error({ title: '提示', message: response.data.message });
                }else{
                    let obj = response.data.data;
                    this.provinceList = [];
                    this.allCityInfo = [];
                    this.allDistrictInfo = [];
                    if (this.roleRank == '0') {
                        for (let i = 0; i < obj.length; i++) {
                            // if (obj[i].unit_level === '1') this.provinceList.push(obj[i]);
                            if (obj[i].unit_level === '2') this.cityList.push(obj[i]);
                            if (obj[i].unit_level === '3') this.allDistrictInfo.push(obj[i]);
                            if (obj[i].unit_level === '4') this.allSchoolList.push(obj[i])
                        }
                        return;
                    }
                    if (this.roleRank == '1') {
                        for (let i = 0; i < obj.length; i++) {
                            if (obj[i].unit_level === '2') this.cityList.push(obj[i]);
                            if (obj[i].unit_level === '3') this.allDistrictInfo.push(obj[i]);
                            if (obj[i].unit_level === '4') this.allSchoolList.push(obj[i])
                        }
                        return;
                    }
                    if (this.roleRank == '2') {
                        for (let i = 0; i < obj.length; i++) {
                            if (obj[i].unit_level === '3') this.districtList.push(obj[i]);
                            if (obj[i].unit_level === '4') this.allSchoolList.push(obj[i])
                        }
                        console.log(this.districtList);
                        return;
                    }
                    if (this.roleRank == '3') {
                        for (let i = 0; i < obj.length; i++) {
                            if (obj[i].unit_level === '4') this.schoolList.push(obj[i])
                        }
                    }
                }
            })
        }

        getDistrictList(): void {
            this.districtList = [];
            this.searchByDistrict = null;
            if (this.searchByCity) {
                for (let i = 0; i < this.allDistrictInfo.length; i++) {
                    if (this.allDistrictInfo[i].fk_parent_id === this.searchByCity) {
                        this.districtList.push(this.allDistrictInfo[i]);
                    }
                }
            }
        }
        getSchoolList(): void {
            if (this.searchByDistrict == '') return;
            this.schoolList = [];
            this.searchBySchool = null;
            if (this.searchByDistrict) {
                for (let i = 0; i < this.allSchoolList.length; i++) {
                    if (this.allSchoolList[i].fk_parent_id === this.searchByDistrict) {
                        this.schoolList.push(this.allSchoolList[i]);
                    }
                }
            }
        }








        /**
         * 账号状态转换对应内容
         */
        public formatterColumn(row, column) {
            switch (row.status) {
                case '0': return '停用'; break;
                case '1': return '启用'; break;
                case '2': return '待审核'; break;
                case '3': return '未审核通过'; break;
            }
        }

        //当选择项发生变化时会触发该事件
        public handleSelectionChange(val):void{
            this.multipleSelection = val;
            console.log(this.multipleSelection)
        }
        /**
         * 初始页currentPage、初始每页数据数pagesize和数据data
         */
        public handleCurrentChange(currentPage): void{
            this.pageQuery.page_num = currentPage - 1;
            this.getTeacherData();
        }
        //上一页
        public PrevClick() :void{
            if(0 == this.pageQuery.page_num){
                this.any().$notify.info({
                    title: '提示',
                    message: '已经是第一页了',
                });
                return;
            }
            this.pageQuery.page_num--;
            this.getTeacherData();
        }
        //下一页
        public NextClick() :void{
            if(this.total == this.pageQuery.page_num + 1){
                this.any().$notify.info({
                    title: '提示',
                    message: '已经是最后一页了',
                });
                return;
            }
            this.pageQuery.page_num++;
            this.getTeacherData();
        }

        /**
         * table列表单条修改状态
         * */
        columnStatus(status:string,id:string): void{
            let self: any = this;
            UserManageCnt.cloud.updateUserStatus(id,status).then((response:AxiosResponse)=>{
                if(response.data.status != 200){
                    self.any().$notify.error({
                        title: '提示',
                        message: response.data.message
                    })
                }else{
                    self.any().$notify.success({
                        title: '提示',
                        message: '状态修改成功'
                    });
                    self.getTeacherData();
                }
            })
        }

        /**
         * table列表单条重置密码
         * */
        columnResetPwd(id:string): void{
            let self: any = this;
            UserManageCnt.cloud.mulitpleResetUserPassword(id,'123456').then((response:AxiosResponse)=>{
                if(response.data.status != 200){
                    self.any().$notify.error({
                        title: '提示',
                        message: response.data.message
                    })
                }else{
                    self.any().$notify.success({
                        title: '提示',
                        message: '密码重置成功'
                    });
                    self.getTeacherData();
                }
            });
        }

        /**
         * 批量状态、批量重置密码
         * */
        batchReady(num: string): void{
            if(this.multipleSelection.length == 0){
                this.any().$notify.info({
                    title: '提示',
                    message: '请选择需要操作的账号'
                });
                return;
            }
            if(num == '1'){//批量状态
                this.batchStatusDialog = true;
            }else if(num == '2'){// 批量重置密码
                this.batchResetPwdDialog = true;
            }
        }

        /**
         * 批量状态弹框确定
         * */
        insureStatus(): void{
            let self: any = this;
            let idsAry: any = [];
            let ids: string | null = null;
            idsAry = this.aryGetElementDupRemoval(this.multipleSelection,'id');
            ids = idsAry.join(',');
            UserManageCnt.cloud.mulitpleEditUserStatus(ids,self.batchStatus).then((response:AxiosResponse)=>{
                if(response.data.status != 200){
                    self.any().$notify.error({
                        title: '提示',
                        message: response.data.message
                    });
                }else{
                    self.any().$notify.success({
                        title: '提示',
                        message: '状态修改成功'
                    });
                    self.getTeacherData();
                }
            })
        }

        /**
         * 批量重置密码弹框确定
         * */
        insureResetPwd(): void{
            let self: any = this;
            let idsAry: any = [];
            let ids: string | null = null;
            idsAry = this.aryGetElementDupRemoval(this.multipleSelection,'id');
            ids = idsAry.join(',');
            UserManageCnt.cloud.mulitpleResetUserPassword(ids,'123456').then((response:AxiosResponse)=>{
                if(response.data.status != 200){
                    self.any().$notify.error({
                        title: '提示',
                        message: response.data.message
                    })
                }else{
                    self.any().$notify.success({
                        title: '提示',
                        message: '密码重置成功'
                    });
                    self.getTeacherData();
                }
            });
        }

        /**
         * 获取数组（数组对象）中的某个元素
         * ary-数组，name-抽取名称（键）
         * */
        public aryGetAllElement(ary: any[], name: string){
            let new_ary: any[] = [];
            for(let i=0;i<ary.length;i++){
                new_ary.push(ary[i][name]);
            }
            return new_ary;
        }

        /**
         * 获取数组（数组对象）中的某个元素并去重
         * ary-数组，name-抽取名称（键）
         * */
        aryGetElementDupRemoval(ary,name):any{
            let new_ary: any = [];
            for(let i=0;i<ary.length;i++){
                new_ary.push(ary[i][name]);
            }
            /*
            * 数组去重（借助es6）:
            * Set数据结构，它类似于数组，其成员的值都是唯一的。利用Array.from将Set结构转换成数组
            * */
            return Array.from(new Set(new_ary));
        }
    }

</script>

<style scoped lang="scss">
    @import "./user-management";
</style>
