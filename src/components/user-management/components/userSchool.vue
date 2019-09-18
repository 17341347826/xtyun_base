<template>
    <el-col class="right_table" style="width: 1166px;margin-left: 8px;">
        <!--新增、导入、批量操作-->
        <el-row class="float_right">
            <el-tooltip v-show="addBtn" class="item" effect="dark" content="无权限" placement="top" style="margin-left: 15px;">
                <el-button class="pt_btn" size="mini">
                    <span class="add_span"><img src="../../../assets/icon/add.png" class="add_img">新增</span>
                </el-button>
            </el-tooltip>
            <el-button v-show="!addBtn" class="add_btn" size="mini" @click="addUser()">
                <span class="add_span"><img src="../../../assets/icon/add.png" class="add_img">新增</span>
            </el-button>

        </el-row>
        <el-row class="float_right">
            <el-tooltip v-show="importBtn" class="item" effect="dark" content="无权限" placement="top">
                <el-button class="pt_btn">导入</el-button>
            </el-tooltip>
            <el-button v-show="!importBtn" class="add_btn" size="mini" @click="uploadBtn()">导入</el-button>

            <el-tooltip v-show="batchStartStopBtn" class="item" effect="dark" content="无权限" placement="top">
                <el-button class="pt_btn">批量状态</el-button>
            </el-tooltip>
            <el-button v-show="!batchStartStopBtn" class="add_btn" size="mini" @click="insureBtn(1)">批量状态</el-button>

            <el-tooltip v-show="batchUpdatePasswordBtn" class="item" effect="dark" content="无权限" placement="top">
                <el-button class="pt_btn">批量重置密码</el-button>
            </el-tooltip>
            <el-button v-show="!batchUpdatePasswordBtn" class="add_btn" size="mini" @click="insureBtn(2)">批量重置密码</el-button>

            <el-tooltip v-show="batchDeleteBtn" class="item" effect="dark" content="无权限" placement="top">
                <el-button class="pt_btn">批量删除</el-button>
            </el-tooltip>
            <el-button v-show="!batchDeleteBtn" class="add_btn" size="mini" @click="insureBtn(3)">批量删除</el-button>
        </el-row>
        <el-row></el-row>
        <el-row style="text-align: right">
            <el-tooltip class="item" effect="dark" content="可搜索账号或所属单位" placement="top">
                <el-input v-model="searchByInfo" clearable placeholder="搜索" style="width: 200px" @change="searchRole()"></el-input>
            </el-tooltip>
        </el-row>
        <!--表格-->
        <div class="table-wrap">
            <el-table
                v-loading="loading"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"
                :data="schoolUserList"
                ref="multipleTable"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange">
                <el-table-column header-align="center" type="selection" width="55"></el-table-column>
                <el-table-column header-align="center" label="序号" sortable
                                 width="100px">
                    <template scope="scope"><span>{{scope.$index+pageQuery.page_num*pageQuery.page_size+1}}</span></template>
                </el-table-column>
                <el-table-column header-align="center" prop="unit_name" label="学校名称"></el-table-column>
                <el-table-column header-align="center" prop="user_account" label="编号(账号)"></el-table-column>
                <el-table-column header-align="center" prop="user_name" label="管理员"></el-table-column>
                <el-table-column header-align="center" prop="cell_phone_num" label="联系电话"></el-table-column>
                <el-table-column header-align="center" label="角色">
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
                <el-table-column header-align="center" label="重置密码" width="95px">
                    <template slot-scope="scope">
                        <el-tooltip v-show="updatePasswordBtn" class="item" effect="dark" content="无权限" placement="top">
                            <span class="img_span btn-reset-pwd-no"></span>
                        </el-tooltip>
                        <span v-show="!updatePasswordBtn" class="img_span btn-reset-pwd"  @click="insureBtn(4,scope.row.id)"></span>
                    </template>
                </el-table-column>
                <el-table-column header-align="center" label="操作">
                    <template slot-scope="scope">
                        <el-tooltip v-show="editBtn" class="item" effect="dark" content="无权限" placement="top">
                            <span class="img_span disabled_update"></span>
                        </el-tooltip>
                        <span v-show="!editBtn" class="img_span update" @click="updateRow(scope.row)"></span>

                        <el-tooltip v-show="deleteBtn" class="item" effect="dark" content="无权限" placement="top">
                            <span class="img_span disabled_del"></span>
                        </el-tooltip>
                        <span v-show="!deleteBtn" class="img_span del" @click="insureBtn(5,scope.row.id)"></span>
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
            :total="pageTotal">
        </el-pagination>
        <!--新增弹框-->
        <el-dialog
            :title="addTitle"
            :visible.sync="addVisible"
            width="30%"
            :close-on-click-modal="false"
            center>
            <el-row class="dialog_center">
                <el-row>
                    <el-tooltip class="item" effect="dark" content="省" placement="right">
                        <el-select v-model="provinceChecked" placeholder="请选择省" clearable style="text-align: left" value="">
                            <el-option
                                v-for="item in provinceList"
                                :key="item.id"
                                :label="item.unit_name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-tooltip>
                </el-row>
                <el-row>
                    <el-tooltip class="item" effect="dark" content="市" placement="right">
                        <el-select v-model="cityChecked" placeholder="请选择市" clearable style="text-align: left" value="">
                            <el-option
                                v-for="item in cityList"
                                :key="item.id"
                                :label="item.unit_name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-tooltip>
                </el-row>
                <el-row>
                    <el-tooltip class="item" effect="dark" content="市" placement="right">
                        <el-select v-model="districtChecked" placeholder="请选择区县" clearable style="text-align: left" value="">
                            <el-option
                                v-for="item in districtList"
                                :key="item.id"
                                :label="item.unit_name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-tooltip>
                </el-row>
                <el-row>
                    <el-select v-model="saveUser.fk_unit_id" placeholder="请选择学校" clearable style="text-align: left" value="">
                        <el-option
                            v-for="item in schoolList"
                            :key="item.id"
                            :label="item.unit_name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-row>
                <!--<el-row>-->
                   <!--<el-input v-model="saveUser.unit_name" placeholder="请输入名称" clearable style="width: 315px"></el-input>-->
                <!--</el-row>-->
                <el-row>
                    <el-input v-model="saveUser.user_account" @blur="checkAccount" placeholder="请输入6-18位学校编号"
                              clearable style="width: 315px" maxlength="18"></el-input>
                </el-row>
                <el-row>
                    <el-input v-model="saveUser.user_name" placeholder="请输入管理员名称" clearable style="width: 315px"
                              maxlength="32"></el-input>
                </el-row>
                <el-row>
                    <el-input v-model="saveUser.cell_phone_num" @blur="checkPhone" placeholder="请输入联系电话"
                              clearable style="width: 315px" maxlength="11"></el-input>
                </el-row>
                <el-row>
                    <el-select v-model="userRoleType" @change="roleTypeChange" placeholder="请选择角色类型" style="width: 315px" clearable value="">
                        <el-option v-for="item in roleUnique"
                                   :label="item | typeNameFilters"
                                   :value="item" :key="item">
                        </el-option>
                    </el-select>
                </el-row>
                <el-row v-if="roleList.length>0">
                    <el-select v-model="roleDefaultId" @change="roleDefaultChange"  filterable placeholder="请选择默认角色" style="text-align: left" value="">
                        <el-option
                            v-for="item in roleList"
                            :key="item.id"
                            :label="item.role_name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-row>
                <el-row v-if="otherRoleList.length > 0" style="width: 315px;margin: 0 auto 8px;height: 80px;border: 0.5px solid #dcdfe6;border-radius: 5px;">
                    <div style="color: #BEC2CB;font-weight: 500;font-size: 14px;">请选择其他角色</div>
                    <el-checkbox-group v-model="otherRoleAry">
                        <el-checkbox v-for="item in otherRoleList" :label="item.id" :value="item.id" :key="item.id">{{item.role_name}}</el-checkbox>
                    </el-checkbox-group>
                </el-row>
                <el-row>
                    <el-input v-model="saveUser.remark" placeholder="请输入备注" clearable style="width: 315px"
                              maxlength="30"></el-input>
                </el-row>
            </el-row>

            <div style="color:red;font-size:14px;text-align: center;">{{addMsg}}</div>
            <span slot="footer">
                <el-button class="update_btn_cancel" @click="addVisible = false">取 消</el-button>
                <el-button class="update_btn_confirm" type="primary" @click="insureAddUser">确 定</el-button>
            </span>
        </el-dialog>
        <!--导入弹框-->
        <el-dialog title="上传文件" width="45%" top="35vh" :visible.sync="uploadVisible" center>
            <div style="border-top:1px solid #D4D4D4;width: 100%;text-align: center;position: absolute;left: 0;top:51px;"></div>
            <!--上传流程：检查上传的批量导入用户文件 -> 批量导入用户信息 -> 查询进度信息-->
            <el-upload
                class="upload-demo"
                ref="upload"
                :headers="uploadHeaders"
                accept=".xls,.xlsx"
                :action="uploadUrl"
                :before-upload="uploadBefore"
                :on-success="uploadSuccess"
                :file-list="fileList"
                :limit="1"
                :before-remove="beforeRemove"
                :on-exceed="handleExceed">
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                <div slot="tip" class="el-upload__tip download-module">
                    <div style="margin-bottom:10px">只能上传xls/xlsx文件</div>
                    <a href="./user_manage_module.xlsx">下载模板</a>
                </div>
            </el-upload>
            <!--导入报错提示-->
            <div v-show="uploadCheckData.length>0" v-for="item in uploadCheckData">
                <span>账号{{item.user_account}}：{{item.error_msg}}</span>
            </div>
            <div v-show="uploadCheckDataObj">
                <span>找不到账号信息</span>
            </div>
            <!--<div slot="footer" class="dialog-footer">-->
            <!--<el-button @click="uploadVisible = false">取 消</el-button>-->
            <!--<el-button type="primary" @click="uploadVisible = false;insureUpload()">确 定</el-button>-->
            <!--</div>-->
        </el-dialog>
        <!--导入进度-->
        <el-dialog
            :title="upload ? '文件上传中':'已完成'"
            :visible.sync="showUploadProgress"
            width="30%">
            <el-progress :text-inside="true" :stroke-width="18"
                         :percentage="Number(percentUpload.toFixed(2))"
                         status="success">
            </el-progress>
            <p v-if="upload">
                正在:{{progressUploadInfo.stage_desc}}
            </p>
            <p v-if="upload">
                速率:{{progressUploadInfo.current_num-lastProgressUploadInfo.current_num < 0 ? 0:
                progressUploadInfo.current_num-lastProgressUploadInfo.current_num}} 条/秒
            </p>
            <p v-if="uploadErrorMsg">
                导入出错,请稍后再试
            </p>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="showUploadProgress = false">确 定</el-button>
            </span>
        </el-dialog>
        <!--确认框：1-批量状态，2-批量重置密码，3-批量删除，4-重置密码,5-删除-->
        <el-dialog
            title="提示"
            :visible.sync="insureVisible"
            width="30%" top="30vh" center>
            <el-row style="text-align: center">
                <span v-if="insureNum !== 1">{{insureText}}</span>
            </el-row>
            <el-select v-if="insureNum === 1" v-model="batchStatus" style="text-align: left" value="">
                <el-option label="停用" value="0">停用</el-option>
                <el-option label="启用" value="1">启用</el-option>
            </el-select>
            <span slot="footer" class="dialog-footer">
                <el-button class="del_btn_cancel" @click="insureVisible = false">取 消</el-button>
                <el-button class="del_btn_confirm" @click="insureClick()">确 定</el-button>
            </span>
        </el-dialog>
    </el-col>
</template>

<script lang="ts">
    import {Component, Watch, XtVue} from "../../../common/common";
    import {PageQuery, SaveUser, RoleQueryParam, ProgressInfo, CheckUpload, QueryAllUnit} from "../user-management.def";
    import userManagerCnt from "../user-management.cnt";
    import {AxiosResponse} from "axios";
    import "./userFilters";
    import {getBtnList} from "../../common/mod/base"


    @Component
    export default class userSchool extends XtVue{
        private userType: string | null = null;
        private roleRank: string | null = null;
        private roleType: string | null = null;
        private schoolUserList: PageQuery[] = [];
        private pageQuery: PageQuery = new PageQuery();
        private multipleSelection: any[] = [];//table多选列表
        private roleQueryParam: RoleQueryParam = new RoleQueryParam();//角色列表请求参数
        // 每页表格数目
        private pageSize: number = 0;
        // 总数据量
        private pageTotal: number  = 0;

       // 新增弹框
        private addVisible: boolean = false;//新增框显示、隐藏
        private saveUser: SaveUser = new SaveUser();//新增参数
        private addTitle: string | null = null;//新增标题
        private roleQueryList: any[] = [];//所有当前角色下角色列表
        private userRoleType: number | null = null;//角色类型选中
        private roleUnique: any = [];//角色类型列表
        private roleDefaultId: string | null = null; //默认角色选中
        private roleList: any[] = []; //默认角色列表
        private otherRoleList: any = [];//其他角色列表
        private otherRoleAry: any[] = [];//其他角色选中id列表
        private phoneTrue: boolean = false;//电话号码校验
        private accountTrue: boolean = false;//账号校验（学校编号）
        private addMsg: string | null = null;//提示信息

        //导入
        private uploadVisible: boolean = false;//导入弹出框显示隐藏
        private fileList: any = [];//导入上传的文件
        private uploadUrl: string = '/api/user/check_batch_import_user_excel';//文件上传地址
        private showUploadProgress : boolean = false;//导入进度显示隐藏
        private upload: boolean = false;//进度条是否显示
        private percentUpload: number = 0; // 进度的百分比
        private progressUploadInfo: ProgressInfo = new ProgressInfo(); // 获取进度接口返回的数据
        private lastProgressUploadInfo: ProgressInfo = new ProgressInfo();// 上一次获取进度的数据
        private uploadErrorMsg: boolean = false;// 判断导入进度出错否
        private uploadHeaders: CheckUpload = new CheckUpload(); //设置上传的请求头部
        private uploadCheckData: any = [];//检查上传的批量导入用户文件返回数据错误提示为数组时
        private uploadCheckDataObj: boolean = false;//检查上传的批量导入用户文件返回数据错误提示是否对象：false-不是，true-就是

        //确认框
        private insureVisible: boolean = false;//确认框显示隐藏
        private insureText: string | null = null;//确认框文本信息
        private insureNum: number = -1;//确认框类型：1-批量状态，2-批量重置密码，3-批量删除，4-重置密码,5-删除
        private currentId: string | null = null;//当前记录id,针对确认框：4,5
        private batchStatus: string = '1';//0-停用，1-启用
        // 按钮权限
        private addBtn: boolean = true; // 新增
        private editBtn: boolean = true; // 修改
        private deleteBtn: boolean = true; // 删除
        private startStopBtn: boolean = true; // 状态
        private updatePasswordBtn: boolean = true; // 重置密码(单个)
        private importBtn: boolean = true; // 导入
        private batchStartStopBtn: boolean = true; // 批量状态
        private batchUpdatePasswordBtn: boolean = true; // 批量重置密码
        private batchDeleteBtn: boolean = true; // 批量删除
        private provinceList: any = [];
        private cityList: any = [];
        private allCityList: any = [];
        private districtList: any = [];
        private districtChecked: string | null = null;
        private schoolList: any = [];
        private allSchoolList: any = [];
        private allDistrictList: any = [];
        private allUnitInfo: any = [];
        private unitID: string | null = null;
        private userID: string | null = null;
        private unitInfo: any = {};
        private provinceChecked: string | null = null;
        private cityChecked: string | null = null;
        // 查询所有单位 参数
        private queryAllUnit: QueryAllUnit = new QueryAllUnit();
        private rowInfo: any = {};
        private rowAdd: boolean = false;
        private rowCityChecked: string | null = null;
        private loading: boolean = false; // 加载层
        private searchByInfo: string | null = null;
        private allRoleData: any = [];

        /**
         * 挂载
         */
        public mounted(): void{
            let token: any = sessionStorage.getItem('token');
            this.uploadHeaders.Token = token;
            let userInfo:any  = sessionStorage.getItem('user_info');
            userInfo = JSON.parse(userInfo);
            let unitInfo: any = sessionStorage.getItem('unit_info');
            this.unitInfo = JSON.parse(unitInfo);
            this.userType = userInfo.user_type;
            this.unitID = userInfo.fk_unit_id;
            this.userID = userInfo.id;
            this.roleRank = userInfo.role_info.role_rank;
            this.roleType = userInfo.role_info.role_type;
            this.roleQueryParam.role_rank = Number(this.userType);
            this.roleQueryParam.status = '1';
            this.getSchoolData();
            this.searchRoleID();
            this.getProvCityInfo();
            if (window.sessionStorage.getItem("val")) {
                let btnList: any = window.sessionStorage.getItem("val");
                btnList = JSON.parse(btnList).children;
                this.addBtn = getBtnList(btnList, 'add');
                this.editBtn = getBtnList(btnList, 'edit');
                this.deleteBtn = getBtnList(btnList, 'delete');
                this.startStopBtn = getBtnList(btnList, 'start_stop');
                this.updatePasswordBtn = getBtnList(btnList, 'update_password');
                this.importBtn = getBtnList(btnList, 'import');
                this.batchStartStopBtn = getBtnList(btnList, 'batch_start_stop');
                this.batchUpdatePasswordBtn = getBtnList(btnList, 'batch_update_password');
                this.batchDeleteBtn = getBtnList(btnList, 'batch_delete');

            }
        }

        /**
         * 获取省、市信息
         * */
        public getProvCityInfo(): void{
            if (this.roleRank == '0') {
                this.queryAllUnit.id = '';
            } else {
                this.queryAllUnit.id = this.unitID;
            }
            userManagerCnt.cloud.list_all_unit_info_by_id(this.queryAllUnit).then((response: AxiosResponse) => {
                if(response.data.status != 200){
                    this.any().$notify.error({
                        title: '提示',
                        message: response.data.message
                    });
                }else{
                    let obj = response.data.data;
                    this.allUnitInfo = response.data.data;
                    this.provinceList = [];
                    let unitInfo: any = window.sessionStorage.getItem("unit_info");
                    unitInfo = JSON.parse(unitInfo);
                    if (this.roleRank == '0') {
                        for (let i = 0; i < obj.length; i++) {
                            if (obj[i].unit_level === '1') { this.provinceList.push(obj[i]); }
                            if (obj[i].unit_level === '2') { this.allCityList.push(obj[i]); }
                            if (obj[i].unit_level === '3') { this.allDistrictList.push(obj[i]); }
                            if (obj[i].unit_level === '4') { this.allSchoolList.push(obj[i]); }
                        }
                    }
                    if (this.roleRank == '1') {
                        this.provinceList.push(unitInfo);
                        this.provinceChecked = unitInfo.id;
                        for (let i = 0; i < obj.length; i++) {
                            if (obj[i].unit_level === '2') { this.cityList.push(obj[i]) }
                            if (obj[i].unit_level === '3') { this.allDistrictList.push(obj[i]); }
                            if (obj[i].unit_level === '4') { this.allSchoolList.push(obj[i]); }
                        }
                    } else if (this.roleRank == '2') {
                        this.provinceList.push(unitInfo.unit_info);
                        this.provinceChecked = unitInfo.fk_parent_id;
                        this.cityList.push(unitInfo);
                        this.cityChecked = unitInfo.id;
                        for (let i = 0; i < obj.length; i++) {
                            if (obj[i].unit_level === '3') { this.districtList.push(obj[i]); }
                            if (obj[i].unit_level === '4') { this.allSchoolList.push(obj[i]); }
                        }
                    } else if (this.roleRank == '3') {
                        this.provinceList.push(unitInfo.unit_info.unit_info);
                        this.provinceChecked = unitInfo.unit_info.unit_info.id;
                        this.cityList.push(unitInfo.unit_info);
                        this.cityChecked = unitInfo.unit_info.id;
                        this.districtList.push(unitInfo);
                        this.districtChecked = unitInfo.id;
                        for (let i = 0; i < obj.length; i++) {
                            if (obj[i].unit_level === '4') { this.schoolList.push(obj[i]); }
                        }
                    } else if (this.roleRank == '4') {
                        this.provinceList.push(unitInfo.unit_info.unit_info.unit_info);
                        this.provinceChecked = unitInfo.unit_info.unit_info.unit_info.id;
                        this.cityList.push(unitInfo.unit_info.unit_info);
                        this.cityChecked = unitInfo.unit_info.unit_info.id;
                        this.districtList.push(unitInfo.unit_info);
                        this.districtChecked = unitInfo.unit_info.id;
                        this.schoolList.push(unitInfo);
                        this.saveUser.fk_unit_id = unitInfo.id;

                    }
                }
            })
        }
        @Watch("provinceChecked")
        getCityList(): void {
            if (this.roleRank == '0') {
                this.cityList = [];
                this.cityChecked = '';
                this.districtList = [];
                this.districtChecked = '';
                this.schoolList = [];
                this.saveUser.fk_unit_id = '';

                if (this.provinceChecked) {
                    for (let i = 0; i < this.allCityList.length; i++) {
                        if (this.allCityList[i].fk_parent_id === this.provinceChecked) {
                            this.cityList.push(this.allCityList[i])
                        }
                    }
                    if (this.addTitle == '修改' && this.rowAdd == true) {
                        this.cityChecked = this.rowCityChecked;
                    }
                }
            }
        }
        @Watch("cityChecked")
        getDistrictList(): void {
            if (this.userType ===  '1') {
                this.districtList = [];
                this.districtChecked = '';
                this.schoolList = [];
                this.saveUser.fk_unit_id = '';
                if (this.cityChecked) {
                    for (let i = 0; i < this.allDistrictList.length; i++) {
                        if (this.allDistrictList[i].fk_parent_id === this.cityChecked) {
                            this.districtList.push(this.allDistrictList[i])
                        }
                    }
                }
            }
            if (this.addTitle === '修改' && this.rowAdd == true) {
                this.districtChecked = this.rowInfo.unit_info.id;
            }
        }
        @Watch("districtChecked")
        getSchoolList(): void {
            if (this.userType ===  '1' || this.userType === '2') {
                this.schoolList = [];
                this.saveUser.fk_unit_id = '';
                if (this.districtChecked) {
                    for (let i = 0; i < this.allSchoolList.length; i++) {
                        if (this.allSchoolList[i].fk_parent_id === this.districtChecked) {
                            this.schoolList.push(this.allSchoolList[i])
                        }
                    }
                    if (this.addTitle === '修改' && this.rowAdd == true) {
                        this.saveUser.fk_unit_id = this.rowInfo.id;
                        this.rowAdd = false;
                    }
                }

            }

        }



        searchRole(): void {
            if (this.searchByInfo === '') {
                this.searchByInfo = null;
                this.searchRole();
                return;
            }
            this.pageQuery.page_num = 0;
            this.pageTotal = 1;
            this.getSchoolData();
        }

        /**
         * 发送ajax获取区县列表数据
         * @param {number} state
         * @param row
         */
        public getSchoolData(): void{
            let user_info: any =window.sessionStorage.getItem("user_info");
            user_info = JSON.parse(user_info);
            this.pageQuery.fk_unit_id = user_info.fk_unit_id;
            let obj = {};
            let unitID: string | null = null;
            if (this.roleType == '0') unitID = null;
            else unitID = this.pageQuery.fk_unit_id;
            obj = {page_size: this.pageQuery.page_size, page_num: this.pageQuery.page_num, user_type: '4', fk_unit_id: unitID,
                search_info: this.searchByInfo};
            this.loading = true;
            userManagerCnt.cloud.ces(obj).then((response: AxiosResponse)=>{
                this.loading = false;
                if(response.data.status != 200){
                    this.any().$notify.error({ title: '提示', message: response.data.message })
                }else{
                    this.pageSize = response.data.data.size;
                    let userInfo = response.data.data.content;
                    this.pageTotal = response.data.data.totalElements;
                    this.schoolUserList = response.data.data.content;
                    // this.schoolUserList = [];
                    // if (this.roleRank != '4') {
                    //     for (let i = 0; i < userInfo.length; i++) {
                    //         if (userInfo[i].role_info.role_type != 2) {
                    //             this.schoolUserList.push(userInfo[i])
                    //         }
                            // if (this.roleRank == '0') {if (userInfo[i].role_info.role_type != 2 && userInfo[i].fk_creator_user_id === this.unitID) {this.schoolUserList.push(userInfo[i])}} else {if (userInfo[i].role_info.role_type != 2) {this.schoolUserList.push(userInfo[i])}}
                    //     }
                    //     this.pageTotal = this.schoolUserList.length;
                    // } else {
                    //     for (let i = 0; i < userInfo.length; i++) {
                    //         if (userInfo[i].id != this.userID) {
                    //             this.schoolUserList.push(userInfo[i])
                    //         }
                    //     }
                    //     this.pageTotal = this.schoolUserList.length;
                    // }
                }
            });
        }

        /**
         * 初始页currentPage、初始每页数据数pagesize和数据data
         */
        public handleCurrentChange(currentPage): void{
            this.pageQuery.page_num = currentPage - 1;
            this.getSchoolData();
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
            this.getSchoolData();
        }
        //下一页
        public NextClick() :void{
            if(this.pageTotal == this.pageQuery.page_num + 1){
                this.any().$notify.info({
                    title: '提示',
                    message: '已经是最后一页了',
                });
                return;
            }
            this.pageQuery.page_num++;
            this.getSchoolData();
        }

        /**
         * 点击导入
         * */
        uploadBtn(): void{
            this.uploadVisible = true;
            this.fileList = [];
            this.uploadCheckData = [];
        }

        /**
         *删除文件之前的钩子，参数为上传的文件和文件列表，若返回 false 或者返回 Promise 且被 reject，则停止上传。
         * */
        beforeRemove(file, fileList) {
            return this.any().$confirm(`确定移除 ${ file.name }？`);
            // this.$confirm('确定移除'+ file.name, '提示', {
            //     confirmButtonText: '确定',
            //     cancelButtonText: '取消',
            //     type: 'warning'
            // }).then(() => {
            //     this.$message({
            //         type: 'success',
            //         message: '删除成功!'
            //     });
            //     this.uploadCheckData = [];
            // }).catch(() => {
            //     this.$message({
            //         type: 'info',
            //         message: '已取消删除'
            //     })
            //     console.log(file);
            //     fileList = file;
            // })
        }

        /**
         *上传文件之前的钩子，参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传
         * */
        uploadBefore(file): void{
            this.uploadCheckData = [];
        }

        /**
         *文件超出个数限制时的钩子
         * */
        handleExceed(files, fileList): void{
            this.any().$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件,请先删除文件再重新选择文件`);
        }

        /**
         * 文件上传成功时的钩子
         * */
        uploadSuccess(res, file, fileList): void{
            // console.log(this.fileList);
            this.uploadCheckData = [];
            if(res.status != 200 || res.status != '200'){
                this.any().$notify.error({
                    title: '提示',
                    message: res.message
                });
                if(res.data == '{}'){
                    this.uploadCheckDataObj = true;
                }else{
                    this.uploadCheckData = res.data;
                }
                return;
            }
            let key: string = res.data.key;
            userManagerCnt.cloud.mulitpleImportUserInfo(key).then((response:AxiosResponse)=>{
                if(response.data.status != 200){
                    this.any().$notify.error({
                        title: '提示',
                        message: response.data.message
                    })
                }else{
                    //导入弹框隐藏
                    this.uploadVisible = false;
                    //进度显示
                    this.showUploadProgress = true;
                    this.upload = false;
                    this.uploadErrorMsg = false;
                    this.percentUpload = 0;
                    this.seeProgressInfo();
                }
            })
        }

        /**
         * 查询进度信息
         * */
        seeProgressInfo(): void{
            let apiName: any = '/user/batch_import_user_info';
            userManagerCnt.cloud.getProccess(apiName).then((response:AxiosResponse)=>{
                if (response.data.status != 200) {
                    this.upload = false;
                    this.uploadErrorMsg = true;
                    return;
                } else {
                    this.upload = true;
                    this.lastProgressUploadInfo = this.progressUploadInfo;
                    this.progressUploadInfo = response.data.data;
                    this.percentUpload = this.progressUploadInfo.current_num / this.progressUploadInfo.tota_num * 100;

                    if (this.progressUploadInfo.tota_num === this.progressUploadInfo.current_num) {
                        this.upload = false;
                    } else {
                        let self: any = this;
                        setTimeout(function () {
                            self.seeProgressInfo()
                        }, 2000);
                    }
                }
            });
        }

        /**
         * 查询角色编号
         */
        public searchRoleID(): void{
            userManagerCnt.cloud.getRoleList(this.roleQueryParam).then((response: AxiosResponse)=>{
                if(response.data.status != 200){
                    this.any().$notify.error({
                        title: '提示',
                        message: response.data.message
                    })
                }else{
                    //对当前身份从角色列表中获取能够操作的角色
                    this.allRoleData = response.data.data.content;
                    this.roleQueryList = this.unique(this.allRoleData, 4, 'role_rank');
                    //角色类型：0:超管、1:系统管理员、2：管理者、3：教师、4:学生、5:家长'
                    this.roleUnique = this.aryGetElementDupRemoval(this.roleQueryList,'role_type');
                }
            })
        }

        /**
         * 选择角色类型切换角色
         */
        public roleTypeChange() :void{
            this.roleList = [];
            this.roleDefaultId = '';
            this.otherRoleAry = [];
            this.roleQueryList = this.unique(this.allRoleData, 4, 'role_rank');
            this.roleList = this.unique(this.roleQueryList, this.userRoleType, 'role_type');
            if (this.roleList.length == 1) {
                this.roleDefaultId = this.roleList[0].id;
                this.roleDefaultChange();
            }
        }

        /**
         * 进行默认角色筛选
         * */
        public roleDefaultChange(): void{
            this.otherRoleAry = [];
            let list: any = [];
            //深拷贝
            list = JSON.stringify(this.roleQueryList);
            list = JSON.parse(list);
            //根据角色类型筛选角色列表
            this.otherRoleList = this.deleteAryObj(list,this.roleDefaultId,'id');
        }

        /**
         * 新增按钮点击
         * */
        addUser(): void{
            this.addVisible = true;
            this.addTitle = '新增';
            this.addMsg = '';
            this.userRoleType = null;
            this.roleDefaultId = '';
            if (this.roleRank == '0') {
                this.provinceChecked = '';
            }
            this.roleList = [];
            this.otherRoleAry = [];
            for(let key in this.saveUser){
                this.saveUser[key] = '';
            }
            if (this.roleRank == '4') {
                this.saveUser.fk_unit_id = this.unitID;
            }
            let userInfo:any  = sessionStorage.getItem('user_info');
            userInfo = JSON.parse(userInfo);
            this.saveUser.user_type  = '4';
            this.saveUser.status = '1';//新增时才默认为‘1’
            this.saveUser.user_password = '123456';
        }

        /**
         * 新增点确定
         * */
        insureAddUser(): void{
            if(this.saveUser.user_account == '' || !this.accountTrue){ this.addMsg = '请输入6-19位学校编号'; return; }
            if(this.saveUser.user_name == ''){ this.addMsg = '请输入管理员'; return; }
            if(this.saveUser.cell_phone_num == '' || !this.phoneTrue){ this.addMsg = '请输入正确的电话号码'; return; }
            if(this.userRoleType == null){ this.addMsg = '请选角色类型'; return; }
            if(this.roleDefaultId == ''){ this.addMsg = '请选择默认角色'; return; }
            if (this.saveUser.fk_unit_id == '') { this.addMsg = '请选择学校'; return; }
            for (let i = 0; i < this.schoolList.length; i++) {
                if (this.schoolList[i].id === this.saveUser.fk_unit_id) {
                    this.saveUser.unit_name = this.schoolList[i].unit_name;
                }
            }
            this.saveUser.role_info = {id: this.roleDefaultId};
            this.saveUser.role_ids = this.roleDefaultId;
            // //存在其他角色
            if (this.otherRoleAry.length > 0) {
                for (let i = 0; i < this.otherRoleAry.length; i++) {
                    this.saveUser.role_ids = this.saveUser.role_ids + ',' + this.otherRoleAry[i];
                }
            }
            for (let i = 0; i < this.schoolList.length; i++) {
                if (this.schoolList[i].id === this.saveUser.fk_unit_id) {
                    this.saveUser.unit_name = this.schoolList[i].unit_name;
                }
            }
            this.loading = true;
            userManagerCnt.cloud.saveUser(this.saveUser).then((response: AxiosResponse) => {
                this.loading = false;
                if (response.data.status != 200) {
                    this.any().$notify.error({title: '提示', message: response.data.message})
                } else {
                    let successMsg: string | null = null;
                    if (this.addTitle == '新增') {
                        successMsg = '添加成功';
                    } else if (this.addTitle == '修改') {
                        successMsg = '修改成功';
                    }
                    this.any().$notify.success({
                        title: '提示',
                        message: successMsg
                    });
                    this.getSchoolData();
                }
                this.addVisible = false;
            });
        }



        @Watch("addVisible")
        clearRowInfo(): void {
            if (!this.addVisible) {
                this.addTitle = '';
                if (Number(this.roleRank) < 2) {
                    this.cityChecked = '';
                    this.districtChecked = '';
                    return;
                }
                if (Number(this.roleRank) < 3) {
                    this.districtChecked = '';
                    return;
                }
            }
        }
        /**
         * 修改
         * */
        updateRow(listInfo:any): void{
            this.addVisible = true;
            this.addTitle = '修改';
            this.rowAdd = true;
            this.addMsg = '';
            this.accountTrue = true;
            this.phoneTrue = true;
            //将新增框数据全部置为空
            this.userRoleType = null;
            this.roleDefaultId = '';
            this.roleList = [];
            this.otherRoleAry = [];
            if (Number(this.roleRank) < 2) {
                this.cityChecked = '';
            }
            for(let key in this.saveUser){
                this.saveUser[key] = '';
            }
            for (let i = 0; i < this.allUnitInfo.length; i++) {
                if (this.allUnitInfo[i].id === listInfo.fk_unit_id) {
                    this.rowInfo = this.allUnitInfo[i];
                    let rowUnitInfo = this.allUnitInfo[i];
                    if (Number(this.roleRank) < 2) {
                        this.cityChecked = rowUnitInfo.unit_info.unit_info.id;
                    }
                    this.rowCityChecked = rowUnitInfo.unit_info.unit_info.id;
                    if (this.roleRank == '0') {
                        this.provinceChecked = rowUnitInfo.unit_info.unit_info.unit_info.id;
                    }
                }
            }
            if (this.roleRank == '1') {

            } else if (this.roleRank == '2') {
                this.getDistrictList();
            } else if (this.roleRank == '3') {

            } else if (this.roleRank == '4') {

            }
            this.saveUser.fk_unit_id = listInfo.fk_unit_id;
            this.saveUser.id = listInfo.id;
            this.saveUser.unit_name  = listInfo.unit_name;
            this.saveUser.user_password_flag  = listInfo.user_password_flag;
            this.saveUser.fk_user_id = listInfo.fk_user_id;
            this.saveUser.user_type  = listInfo.user_type;
            this.saveUser.status = listInfo.status;
            this.saveUser.user_password = listInfo.user_password;
            delete this.saveUser.user_password;
            this.saveUser.user_account = listInfo.user_account;
            this.saveUser.user_name = listInfo.user_name;
            this.saveUser.cell_phone_num = listInfo.cell_phone_num;
            this.saveUser.remark = listInfo.remark;
            // this.districtChecked = listInfo.fk_creator_unit_id;
            //默认角色id
            this.saveUser.role_info = {
                id:listInfo.role_info.id
            };
            //根据默认角色id得到角色类型
            this.userRoleType = this.unique(this.roleQueryList,listInfo.role_info.id,'id')[0].role_type;
            //根据选中角色类型得到默认角色列表
            this.roleList = this.unique(this.roleQueryList,this.userRoleType,'role_type');
            //默认角色id绑定
            this.roleDefaultId = listInfo.role_info.id;
            //其他角色
            let list: any = [];
            list = JSON.stringify(this.roleQueryList);
            list = JSON.parse(list);
            //根据角色类型筛选角色列表
            this.otherRoleList = this.deleteAryObj(list,this.roleDefaultId,'id');
            //其他角色是否存在并判断选择那些
            if (listInfo.role_info_list) {
                let idsList:any = this.aryGetElementDupRemoval(listInfo.role_info_list,'id');
                //剥离选中角色列表中默认角色id
                for(let i=0;i<idsList.length;i++){
                    if(idsList[i] == this.roleDefaultId){
                        idsList.splice(i,1);
                    }
                }
                this.otherRoleAry = idsList;
            }
        }

        /**
         * 学校编号校验：
         * 1、6-19位
         * */
        checkAccount(): void{
            if (this.saveUser.user_account) {
                let len: any = this.saveUser.user_account.length;
                if(len<6 || len>19){
                    this.accountTrue = false;
                }else{
                    this.accountTrue = true;
                }
            }
        }

        //电话号码校验
        public checkPhone():void{
            let reg: any = /^((1(3|4|5|7|8)\d{9}))$/;
            if(reg.test(this.saveUser.cell_phone_num)){
                this.phoneTrue = true;
            }else{
                this.phoneTrue = false;
            }
        }

        //当选择项发生变化时会触发该事件
        handleSelectionChange(val:any):any {
            this.multipleSelection = val;
            // console.log(this.multipleSelection);
        }

        /**
         * 确认框操作：1-批量状态，2-批量重置密码，3-批量删除，4-重置密码,5-删除
         * */
        insureBtn(idx:number,id: string | null): void{
            this.insureNum = idx;
            this.currentId = id;
            switch (idx) {
                case 1:
                    if(this.multipleSelection.length == 0){
                        this.any().$notify.info({ title: '提示', message: '请选择需要操作的账号' });
                    }else{
                        this.insureVisible = true;
                    }
                    this.insureText = '确认批量改变状态';
                    break;
                case 2:
                    if(this.multipleSelection.length == 0){
                        this.any().$notify.info({ title: '提示', message: '请选择需要操作的账号' });
                    }else{
                        this.insureVisible = true;
                    }
                    this.insureText = '确认批量重置密码';
                    break;
                case 3:
                    if(this.multipleSelection.length == 0){
                        this.any().$notify.info({ title: '提示', message: '请选择需要操作的账号' });
                    }else{
                        this.insureVisible = true;
                    }
                    this.insureText = '确认批量删除';
                    break;
                case 4:
                    this.insureVisible = true;
                    this.insureText = '确认重置密码';
                    break;
                case 5:
                    this.insureVisible = true;
                    this.insureText = '确认删除';
                    break;
            }
        }

        /**
         * 确认框确定
         * */
        insureClick():void{
            this.insureVisible = false;
            let idx = this.insureNum;
            // let id = this.currentId;
            switch (idx) {
                case 1://批量改变状态
                    this.batchChangeStatus();
                    break;
                case 2://批量重置密码
                    this.batchResetPwd();
                    break;
                case 3://批量删除
                    this.batchDelete();
                    break;
                case 4://重置密码
                    this.columnResetPwd();
                    break;
                case 5://删除
                    this.columnDelete();
                    break;
            }
        }

        /**
         * 批量改变状态
         * */
        batchChangeStatus(): void{
            let ids: string | null = null;
            let idsAry: any = [];
            idsAry = this.aryGetElementDupRemoval(this.multipleSelection,'id');
            ids = idsAry.join(',');
            this.loading = true;
            userManagerCnt.cloud.mulitpleEditUserStatus(ids,this.batchStatus).then((response:AxiosResponse)=>{
                this.loading = false;
                if(response.data.status != 200){
                    this.any().$notify.error({title: '提示',message: response.data.message})
                }else{
                    this.any().$notify.success({title: '提示',message: '状态修改成功'});
                    this.getSchoolData();
                }
            })
        }

        /***
         * 批量重置密码
         * */
        batchResetPwd(): void{
            let ids: string | null = null;
            let idsAry: any = [];
            idsAry = this.aryGetElementDupRemoval(this.multipleSelection,'id');
            ids = idsAry.join(',');
            console.log(ids);
            this.loading = true;
            userManagerCnt.cloud.mulitpleResetUserPassword(ids,'123456').then((response:AxiosResponse)=>{
                this.loading = false;
                if(response.data.status != 200){
                    this.any().$notify.error({ title: '提示', message: response.data.message })
                }else{
                    this.any().$notify.success({ title: '提示', message: '密码重置成功' });
                    this.getSchoolData();
                }
            });
        }

        /**
         * 批量删除
         * */
        batchDelete(): void{
            let ids: string | null = null;
            let idsAry: any = [];
            idsAry = this.aryGetElementDupRemoval(this.multipleSelection,'id');
            ids = idsAry.join(',');
            console.log(ids);
            this.loading = true;
            userManagerCnt.cloud.mulitpleDelUserInfo(ids).then((response:AxiosResponse)=>{
                this.loading = false;
                if(response.data.status != 200){
                    this.any().$notify.error({ title: '提示', message: response.data.message })
                }else{
                    this.any().$notify.success({ title: '提示', message: '删除成功' });
                    this.getSchoolData();
                }
            });
        }

        /**
         *table列表单条删除
         **/
        columnDelete(): void{
            if (this.currentId) {
                this.loading = true;
                userManagerCnt.cloud.deleteUser(this.currentId).then((response: AxiosResponse)=>{
                    if(response.data.status != 200){
                        this.loading = false;
                        this.any().$notify.error({ title: '提示', message: response.data.message })
                    }else{
                        this.loading = false;
                        this.any().$notify.success({ title: '提示', message: '删除成功' });
                        this.getSchoolData();
                    }
                })
            }
        }

        /**
         * table列表单条修改状态
         * */
        columnStatus(status:string,id:string): void{
            this.loading = true;
            userManagerCnt.cloud.updateUserStatus(id,status).then((response:AxiosResponse)=>{
                if(response.data.status != 200){
                    this.loading = false;
                    this.any().$notify.error({ title: '提示', message: response.data.message })
                }else{
                    this.loading = false;
                    this.any().$notify.success({ title: '提示', message: '状态修改成功' });
                    this.getSchoolData();
                }
            })
        }

        /**
         * table列表单条重置密码
         * */
        columnResetPwd(): void{
            if (this.currentId) {
                this.loading = true;
                userManagerCnt.cloud.mulitpleResetUserPassword(this.currentId,'123456').then((response:AxiosResponse)=>{
                    if(response.data.status != 200){
                        this.loading = false;
                        this.any().$notify.error({ title: '提示', message: response.data.message })
                    }else{
                        this.loading = false;
                        this.any().$notify.success({ title: '提示', message: '密码重置成功' });
                        this.getSchoolData();
                    }
                });
            }
        }

        /**
         * 根据一个参数从对象数组中取出对应对象组成新数组
         * ary-对象数组，value-参数值，name-参数名称
         * @param ary
         * @param value
         * @param name
         */
        public unique(ary:any,value:any,name:string):any{
            let newAry:any = [];
            if (name === 'role_rank' && this.roleRank != '4') {
                for(let i=0;i<ary.length;i++){
                    if(value == ary[i][name] && ary[i].role_type != 2){
                        newAry.push(ary[i]);
                    }
                }
            } else {
                for(let i=0;i<ary.length;i++){
                    if(value == ary[i][name]){
                        newAry.push(ary[i]);
                    }
                }
            }
            return newAry;
        }

        /**
         * 根据一个参数从数组（数组对象）中删除掉形成新数组
         * ary-数组，value-参数值，name-参数名称
         * */
        deleteAryObj(ary:any,value:any,name:string): any{
            let new_ary: any = [];
            for(let i=0;i<ary.length;i++){
                if(value == ary[i][name]){
                    new_ary = ary;
                    new_ary.splice(i,1);
                    return new_ary;
                } else {
                    new_ary.push(ary[i]);
                }
            }
            return new_ary;
        }

        /**
         * 获取数组（数组对象）中的某个元素并去重
         * ary-数组，name-抽取名称（键）
         * */
        aryGetElementDupRemoval(ary,name):any{
            let new_ary: any = [];
            if (name === 'role_type') {
                if (this.roleRank == '4') {
                    for(let i=0;i<ary.length;i++){
                        new_ary.push(ary[i][name]);
                    }
                } else {
                    for(let i=0;i<ary.length;i++){
                        if (ary[i].role_type == 1 || ary[i].role_type == 6 || ary[i].role_type == 3) {
                            new_ary.push(ary[i][name]);
                        }
                    }
                }
            } else {
                for(let i=0;i<ary.length;i++){
                    new_ary.push(ary[i][name]);
                }
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
