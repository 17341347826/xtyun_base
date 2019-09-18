<template>
    <el-col class="right_table" style="width: 1166px;margin-left: 8px;">
        <!--新增、导入、批量操作-->
        <el-row>
            <el-col :span="8" style="float: right;text-align: right">
                <el-tooltip v-show="batchStartStopBtn" class="item" effect="dark" content="无权限" placement="top">
                    <el-button class="pt_btn" type="primary">批量状态</el-button>
                </el-tooltip>
                <el-button v-show="!batchStartStopBtn" class="add_btn" size="mini" @click="batchReady('1')">批量状态</el-button>

                <el-tooltip v-show="batchUpdatePasswordBtn" class="item" effect="dark" content="无权限" placement="top" style="margin-left: 15px;">
                    <el-button class="pt_btn" type="success">批量重置密码</el-button>
                </el-tooltip>
                <el-button v-show="!batchUpdatePasswordBtn" class="add_btn" size="mini" @click="batchReady('2')">批量重置密码</el-button>
            </el-col>
        </el-row>
        <el-row></el-row>
        <el-row style="text-align: right">
            <el-tooltip class="item" effect="dark" content="区县" placement="top">
                <el-select v-show="roleRank < 3" v-model="searchByDistrict" filterable clearable placeholder="区县" value="" style="width: 200px;margin-right: 15px;">
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
            <el-tooltip class="item" effect="dark" content="按年级筛选" placement="top">
                <el-select v-model="searchByGrade" filterable clearable placeholder="年级" value="" style="width: 200px;margin-right: 15px;">
                    <el-option
                        v-for="item in gradeList"
                        :key="item.id"
                        :label="item.grade_name"
                        :value="item.id">
                    </el-option>
                </el-select>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="按班级筛选" placement="top">
                <el-select v-model="searchByClass" filterable clearable placeholder="班级" value="" style="width: 200px;margin-right: 15px;">
                    <el-option
                        v-for="item in classList"
                        :key="item.id"
                        :label="item.class_name"
                        :value="item.id">
                    </el-option>
                </el-select>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="可搜索姓名和学籍号" placement="top">
                <el-input v-model="searchByInfo" clearable placeholder="搜索" style="width: 200px" @change="queryInfo()"></el-input>
            </el-tooltip>
        </el-row>
        <!--表格-->
        <div class="table-wrap">
            <el-table
                v-loading="loading"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"
                ref="multipleTable"
                style="width: 100%"
                tooltip-effect="dark"
                :data="studentList"
                @selection-change="handleSelectionChange">
                <el-table-column header-align="center" type="selection" width="55"></el-table-column>
                <el-table-column header-align="center" label="序号" width="100px">
                    <template scope="scope"><span>{{scope.$index+pageQuery.page_num*pageQuery.page_size+1}}</span></template>
                </el-table-column>
                <el-table-column header-align="center" prop="user_name" label="姓名"></el-table-column>
                <el-table-column header-align="center" prop="student_info.student_num" label="学籍号(账号)" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column header-align="center" prop="student_info.class_info.grade_info.grade_name" label="年级" width="95px"></el-table-column>
                <el-table-column header-align="center" prop="student_info.class_info.class_name" label="班级" width="95px"></el-table-column>
                <!--<el-table-column header-align="center" prop="user_account" label="账号"></el-table-column>-->
                <el-table-column header-align="center" label="角色" width="75px">
                    <template slot-scope="scope">
                        <span>{{scope.row.role_info.role_type | typeRoleFilters(scope.row.role_info.role_rank)}}</span>
                    </template>
                </el-table-column>
                <el-table-column header-align="center" label="使用状态" width="95px">
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
    import {Component, Watch, XtVue} from "../../../common/common";
    import {PageQuery, QueryAllUnit} from "../user-management.def";
    import userManagerCnt from "../user-management.cnt";
    import {AxiosResponse} from "axios";
    import './userFilters';
    import {getBtnList} from "../../common/mod/base"


    @Component
    export default class userStudent1 extends XtVue{
        private studentList: any = [];
        private multipleSelection:Array<any> = [];
        private userRank: string | null = null;
        private pageQuery: PageQuery = new PageQuery();
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
        // 当前用户角色等级
        private roleRank: string | null = null;
        // 搜索
        private unitID: string | null = null;
        private searchByInfo: string | null = null;
        private searchByGrade: string | null = null;
        private searchByClass: string | null = null;
        private searchByDistrict: string | null = null;
        private searchBySchool: string | null = null;
        private classList: any = [];
        private allClassList: any = [];
        private gradeList: any = [];
        private unitList: any = [];
        private districtList: any = [];
        private allSchoolList: any = [];
        private schoolList: any = [];
        private loading: boolean = false; // 加载层


        /**
         * 挂载
         */
        public mounted(): void{
            let userInfo:any  = sessionStorage.getItem('user_info');
            userInfo = JSON.parse(userInfo);
            this.roleRank = userInfo.role_info.role_rank;
            this.unitID = userInfo.fk_unit_id;
            this.getStudentData();
            this.queryClassInfo();
            this.queryGradeInfo();
            this.queryUnitInfo();


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
         * 获取学生用户数据
         */
        @Watch("searchByGrade")
        @Watch("searchByClass")
        @Watch("searchByDistrict")
        @Watch("searchBySchool")
        queryInfo(): void {
            if (this.searchByInfo == '') { this.searchByInfo = null; return; }
            if (this.searchByGrade == '') { this.searchByGrade = null; this.searchByClass = null; this.classList = []; return;  }
            else if (this.searchByGrade) {
                this.classList = [];
                for (let i = 0; i < this.allClassList.length; i++) {
                    if (this.allClassList[i].grade_info.id === this.searchByGrade) {
                        this.classList.push(this.allClassList[i]);
                    }
                }
            }
            if (this.searchByClass == '') { this.searchByClass = null; return; }
            if (this.searchByDistrict == '') { this.searchByDistrict = null; this.schoolList = this.allSchoolList; return; }
            else if (this.searchByDistrict) {
                this.schoolList = [];
                for (let i = 0; i < this.allSchoolList.length; i++) {
                    if (this.allSchoolList[i].fk_parent_id === this.searchByDistrict) {
                        this.schoolList.push(this.allSchoolList[i]);
                    }
                }
            }
            if (this.searchBySchool == '') { this.searchBySchool = null; return; }
            this.pageQuery.page_num = 0;
            this.total = 1;

            this.getStudentData();
        }

        public getStudentData(): void{
            this.studentList = [];
            let userInfo: any = window.sessionStorage.getItem('user_info');
            userInfo = JSON.parse(userInfo);
            this.pageQuery.fk_unit_id = userInfo.fk_unit_id;
            this.userRank = userInfo.user_type;

            let unitID: string | null = null;
            if (this.roleRank == '0') { unitID = null; } else { unitID = this.pageQuery.fk_unit_id; }
            if (this.searchByDistrict) { unitID = this.searchByDistrict}
            if (this.searchBySchool) { unitID = this.searchBySchool; }
            let obj: object = {page_size: this.pageQuery.page_size, page_num: this.pageQuery.page_num, user_type: '6', fk_unit_id: unitID,
                class_info: {id: this.searchByClass, grade_info: {id: this.searchByGrade}}, search_info: this.searchByInfo};
            this.loading = true;
            userManagerCnt.cloud.ces(obj).then((response: AxiosResponse)=>{
                if(response.data.status != 200){
                    this.loading = false;
                    this.any().$notify.error({ title: '提示', message: response.data.message })
                }else{
                    this.loading = false;
                    this.studentList = response.data.data.content;
                    this.pageSize = response.data.data.size;
                    this.total = response.data.data.totalElements;
                }
            })

        }
        //当选择项发生变化时会触发该事件
        public handleSelectionChange(val):void{
            this.multipleSelection = val;
        }

        /**
         * 账号状态转换对应内容
         */
        public formatterColumn(row, column) {
            switch (row.status) {
                case '0': return '停用';
                case '1': return '启用';
                case '2': return '待审核';
                case '3': return '未审核通过';
            }
        }

        /**
         * 初始页currentPage、初始每页数据数pagesize和数据data
         */
        public handleCurrentChange(currentPage): void{
            this.pageQuery.page_num = currentPage - 1;
            this.getStudentData();
        }
        //上一页
        public PrevClick() :void{
            if(0 == this.pageQuery.page_num){
                this.any().$notify.info({ title: '提示', message: '已经是第一页了', });
                return;
            }
            this.pageQuery.page_num--;
            this.getStudentData();
        }
        //下一页
        public NextClick() :void{
            if(this.total == this.pageQuery.page_num + 1){
                this.any().$notify.info({ title: '提示', message: '已经是最后一页了', });
                return;
            }
            this.pageQuery.page_num++;
            this.getStudentData();
        }

        /**
         * table列表单条修改状态
         * */
        columnStatus(status:string,id:string): void{
            let self: any = this;
            this.loading = true;
            userManagerCnt.cloud.updateUserStatus(id,status).then((response:AxiosResponse)=>{
                if(response.data.status != 200){
                    this.loading = false;
                    self.any().$notify.error({ title: '提示', message: response.data.message })
                }else{
                    this.loading = false;
                    self.any().$notify.success({ title: '提示', message: '状态修改成功' });
                    self.getStudentData();
                }
            })
        }

        /**
         * table列表单条重置密码
         * */
        columnResetPwd(id:string): void{
            let self: any = this;
            this.loading = true;
            userManagerCnt.cloud.mulitpleResetUserPassword(id,'123456').then((response:AxiosResponse)=>{
                if(response.data.status != 200){
                    this.loading = false;
                    self.any().$notify.error({ title: '提示', message: response.data.message })
                }else{
                    this.loading = false;
                    self.any().$notify.success({ title: '提示', message: '密码重置成功' });
                    self.getStudentData();
                }
            });
        }

        /**
         * 批量状态、批量重置密码
         * */
        batchReady(num: string): void{
            if(this.multipleSelection.length == 0){
                this.any().$notify.info({ title: '提示', message: '请选择需要操作的账号' });
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
            let idsAry: any = this.aryGetElementDupRemoval(this.multipleSelection,'id');
            let ids: string | null = idsAry.join(',');
            this.loading = true;
            userManagerCnt.cloud.mulitpleEditUserStatus(ids,self.batchStatus).then((response:AxiosResponse)=>{
                if(response.data.status != 200){
                    this.loading = false;
                    self.any().$notify.error({ title: '提示', message: response.data.message });
                }else{
                    this.loading = false;
                    self.any().$notify.success({ title: '提示', message: '状态修改成功' });
                    self.getStudentData();
                }
            })
        }

        /**
         * 批量重置密码弹框确定
         * */
        insureResetPwd(): void{
            let self: any = this;
            let idsAry: any  = this.aryGetElementDupRemoval(this.multipleSelection,'id');
            let ids: string | null  = idsAry.join(',');
            this.loading = true;
            userManagerCnt.cloud.mulitpleResetUserPassword(ids,'123456').then((response:AxiosResponse)=>{
                if(response.data.status != 200){
                    this.loading = false;
                    self.any().$notify.error({ title: '提示', message: response.data.message })
                }else{
                    this.loading = false;
                    self.any().$notify.success({ title: '提示', message: '密码重置成功' });
                    self.getStudentData();
                }
            });
        };





        // 班级筛选框内容
        queryClassInfo(): void {
            let userInfo: any = window.sessionStorage.getItem('user_info');
            userInfo = JSON.parse(userInfo);
            let cityID: string | null = null;
            let districtID: string | null = null;
            let unit: string | null = null;
            let teacherID: string | null = null;
            if (this.roleRank == '2') {cityID = this.unitID;}
            if (this.roleRank == '3') { districtID = this.unitID; }
            if (this.roleRank == '4') { unit = this.unitID; }
            if (this.roleRank == '6') { teacherID = userInfo.id; }
            let queryAllClass: object = {
                fk_city_id: cityID,
                fk_district_id: districtID,
                teacher_info: { id: teacherID, unit_info: { id: unit } }
            };
            userManagerCnt.cloud.list_all_class_info(queryAllClass).then((response: AxiosResponse)=>{
                if(response.data.status != 200){
                    this.any().$notify.error({ title: '提示', message: response.data.message })
                }else{
                    this.allClassList = response.data.data;
                }
            });
        };
        // 年级筛选框内容
        queryGradeInfo(): void {
            let queryAllGrade: object = { fk_unit_id: this.unitID, status: '1' };
            userManagerCnt.cloud.list_all_grade_info(queryAllGrade).then((response: AxiosResponse)=>{
                if(response.data.status != 200){ this.any().$notify.error({ title: '提示', message: response.data.message }) }
                else{ this.gradeList = response.data.data; }
            });
        }
        // 单位筛选框
        queryUnitInfo(): void {
            let queryAllUnit: QueryAllUnit = new QueryAllUnit();
            queryAllUnit.id = this.unitID;
            userManagerCnt.cloud.list_all_unit_info_by_id(queryAllUnit).then((response: AxiosResponse)=>{
                if(response.data.status != 200){ this.any().$notify.error({ title: '提示', message: response.data.message }) }
                else{
                    this.unitList = response.data.data;
                    for (let i = 0; i < this.unitList.length; i++) {
                        if (this.unitList[i].unit_level == '3') {
                            this.districtList.push(this.unitList[i]);
                        }
                        if (this.unitList[i].unit_level == '4') {
                            this.allSchoolList.push(this.unitList[i]);
                            this.schoolList.push(this.unitList[i]);
                        }
                    }
                }
            });
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

<style lang="scss" scoped>
    @import "./user-management";
</style>
