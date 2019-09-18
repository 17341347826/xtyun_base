<template>
    <el-col class="right_table" style="width: 1166px;margin-left: 8px;">
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
                <el-button class="pt_btn" size="mini">导入</el-button>
            </el-tooltip>
            <el-button v-show="!importBtn" class="add_btn" size="mini" @click="uploadBtn()">导入</el-button>

            <el-tooltip v-show="batchStartStopBtn" class="item" effect="dark" content="无权限" placement="top">
                <el-button class="pt_btn" size="mini">批量状态</el-button>
            </el-tooltip>
            <el-button v-show="!batchStartStopBtn" class="add_btn" size="mini" @click="insureBtn(1)">批量状态</el-button>

            <el-tooltip v-show="batchUpdatePasswordBtn" class="item" effect="dark" content="无权限" placement="top">
                <el-button class="pt_btn" size="mini">批量重置密码</el-button>
            </el-tooltip>
            <el-button v-show="!batchUpdatePasswordBtn" class="add_btn" size="mini" @click="insureBtn(2)">批量重置密码</el-button>

            <el-tooltip v-show="batchDeleteBtn" class="item" effect="dark" content="无权限" placement="top">
                <el-button class="pt_btn" size="mini">批量删除</el-button>
            </el-tooltip>
            <el-button v-show="!batchDeleteBtn" class="add_btn" size="mini" @click="insureBtn(3)">批量删除</el-button>
        </el-row>
        <el-row></el-row>
        <el-row style="text-align: right">
            <el-select v-model="searchByRole" filterable clearable placeholder="角色" value="" style="width: 200px;margin-right: 15px;">
                <el-option
                    v-for="item in roleTypeList"
                    :key="item"
                    :label="item | typeNameFilters"
                    :value="item">
                </el-option>
            </el-select>
            <el-tooltip class="item" effect="dark" content="可搜索账号或所属单位" placement="top">
                <el-input v-model="searchByInfo" clearable placeholder="搜索" style="width: 200px" @change="searchRole()"></el-input>
            </el-tooltip>
        </el-row>
        <el-row class="table-wrap">
            <el-table
                v-loading="loading"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"
                ref="multipleTable"
                :data="cityListData"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange">
                <el-table-column header-align="center" type="selection" width="55"></el-table-column>
                <!--<el-table-column header-align="center" type="index" label="序号" width="100"></el-table-column>-->
                <el-table-column fixed label="序号" width="100" align="center">
                    <template slot-scope="scope"><span>{{scope.$index+pageUserList.page_num*pageUserList.page_size+1}}</span></template>
                </el-table-column>
                <el-table-column header-align="center" prop="unit_name" label="所属单位" width="120" show-overflow-tooltip></el-table-column>
                <el-table-column header-align="center" prop="user_account" label="账号" width="120" show-overflow-tooltip></el-table-column>
                <el-table-column header-align="center" prop="custom_user_name" label="名称" show-overflow-tooltip></el-table-column>
                <el-table-column header-align="center" prop="cell_phone_num" label="联系电话" show-overflow-tooltip></el-table-column>
                <el-table-column header-align="center" label="角色">
                    <template slot-scope="scope">
                        <span>{{scope.row.role_info.role_type | typeRoleFilters(scope.row.role_info.role_rank)}}</span>
                    </template>
                </el-table-column>
                <el-table-column header-align="center" prop="status" label="使用状态" width="95px">
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
        </el-row>
        <!--分页-->
        <el-pagination
            background
            layout="total,prev, pager, next, jumper"
            :current-page.sync = 'pageUserList.pageNum'
            :page-size = "pageUserList.page_size"
            :total="pageTotal"
            @current-change = "handleCurrentChange"
            @prev-click = 'handlePrevClick'
            @next-click = "handleNextClick">
        </el-pagination>
        <!--新增弹框-->
        <el-dialog
            :title="addTitle"
            :close-on-click-modal="false"
            :visible.sync="dialogAddUser"
            width="30%"
            center>
            <el-row class="dialog_center">
                <el-row>
                    <el-tooltip class="item" effect="dark" content="省" placement="right">
                        <el-select v-model="provinceChecked" clearable placeholder="请选择省"
                                   style="width: 317px;" value="">
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
                        <el-select v-model="cityAdd.fk_unit_id" placeholder="请选择市" clearable style="width: 317px" value="">
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
                    <el-tooltip class="item" effect="dark" content="6-19位账号" placement="right">
                        <el-input v-model="cityAdd.user_account" clearable placeholder="请输入6-18位账号"
                                  @blur="checkAccount" style="width: 317px" maxlength="18"></el-input>
                    </el-tooltip>
                </el-row>
                <el-row>
                    <el-tooltip class="item" effect="dark" content="名称" placement="right">
                        <el-input v-model="cityAdd.custom_user_name" clearable placeholder="请输入名称" style="width: 317px"
                                  maxlength="32"></el-input>
                    </el-tooltip>
                </el-row>
                <el-row>
                    <el-tooltip class="item" effect="dark" content="联系电话" placement="right">
                        <el-input v-model="cityAdd.cell_phone_num" @blur="checkPhone" clearable
                                  placeholder="请输入联系电话" style="width: 317px" maxlength="11"></el-input>
                    </el-tooltip>
                </el-row>
                <el-row>
                    <el-tooltip class="item" effect="dark" content="角色类型" placement="right">
                        <el-select v-model="typeChecked" @change="roleTypeChange" clearable placeholder="请选择角色类型"
                                   style="width: 317px" value="">
                            <el-option
                                v-for="item in roleTypeList"
                                :key="item"
                                :label="item | typeNameFilters"
                                :value="item">
                            </el-option>
                        </el-select>
                    </el-tooltip>
                </el-row>
                <el-row v-show="roleList.length > 0">
                    <el-tooltip class="item" effect="dark" content="请选择默认角色" placement="right">
                        <el-select v-model="roleDefaultId" @change="roleDefaultChange" filterable
                                   placeholder="请选择默认角色" style="width: 317px" value="">
                            <el-option
                                v-for="item in roleList"
                                :key="item.id"
                                :label="item.role_name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-tooltip>
                </el-row>
                <el-row v-show="otherRoleList.length > 0">
                    <el-checkbox-group v-model="otherRoleAry"
                                       style="border-radius: 4px;border: 1px solid #dcdfe6;width: 306px;padding-left: 10px;min-height:40px;margin: 0 auto;">
                        <div style="color: #BEC2CB;font-weight: 500;font-size: 14px;">请选择其他角色</div>
                        <el-checkbox v-for="item in otherRoleList"
                                     :key="item.id"
                                     :label="item.id"
                                     :value="item.id">{{item.role_name}}
                        </el-checkbox>
                    </el-checkbox-group>
                </el-row>
                <el-row>
                    <el-tooltip class="item" effect="dark" content="备注" placement="right">
                        <el-input v-model="cityAdd.remark" clearable placeholder="请输入备注" style="width: 317px"
                                  maxlength="30"></el-input>
                    </el-tooltip>
                </el-row>
            </el-row>
            <div style="color:red;font-size:14px;text-align: center;">{{addMsg}}</div>
            <div slot="footer" class="dialog-footer">
                <el-button class="update_btn_cancel" @click="cacelAddUser">取 消</el-button>
                <el-button class="update_btn_confirm" type="primary" @click="insureAddUser">确 定</el-button>
            </div>
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
            <el-row style="text-align: center;">
                <span v-if="insureNum !== 1">{{insureText}}</span>
            </el-row>
            <el-row style="text-align: center">
                <el-select v-if="insureNum === 1" v-model="batchStatus" style="text-align: left" value="">
                    <el-option label="停用" value="0">停用</el-option>
                    <el-option label="启用" value="1">启用</el-option>
                </el-select>
            </el-row>
            <span slot="footer" class="dialog-footer">
                <el-button class="del_btn_cancel" @click="insureVisible = false">取 消</el-button>
                <el-button class="del_btn_confirm" @click="insureClick()">确 定</el-button>
            </span>
        </el-dialog>
    </el-col>
</template>

<script lang="ts">
    import {Component, Watch, XtRouter, XtVue} from "../../../common/common";
    import {RoleQueryParam, PageQuery, SaveUser, ProgressInfo, CheckUpload, QueryAllUnit} from "../user-management.def";
    import userManagementCnt from "../user-management.cnt";
    import {AxiosResponse} from "axios";
    import "./userFilters";
    import {getBtnList} from "../../common/mod/base"


    @Component
    export default class City extends XtVue{
        private roleParam:RoleQueryParam = new RoleQueryParam();//查询角色列表请求参数
        private userInfo: object = {};
        private userUnitID: string | null = null; // 用户单位id
        private userID: string | null = null;
        private userType: string | null = null;// 用户等级:（1：省；2：市；3：区；4：校；5：教师；6：学生；7：家长）
        private roleRank: string | null = null;
        private roleType: string | null = null; // 当前角色等级(0:超管、1:系统管理员、2：管理者、3：教师、4:学生、5:家长)
        private cityListData: any = [];// 市级列表表格数据
        private multipleSelection: any[] = [];//table多选列表
        // 分页查询信息列表
        private pageUserList: PageQuery = new PageQuery();
        // private pageNum : number = 0;//当前页数
        private pageTotal: number = 0;//总数据量

        //新增
        private dialogAddUser: boolean = false;//新增显示框显示隐藏
        private addTitle: string = '新增';//新增框名称
        private cityAdd: SaveUser = new SaveUser();//保存或者修改角色
        private allUnitInfo: any[] = [];//所有地区列表(全国)
        private provinceList: any = [];//省列表
        private provinceChecked: string | null = null;//省选中
        private userProvinceID: string | null = null;
        private cityList: any[] = [];//市列表（某个省份下的）
        private allRoleList: any[] = [];//所有当前角色下角色列表
        private roleTypeList: any = [];//角色类型列表
        private typeChecked: number | null = null;//角色类型选中
        private roleList: any[] = [];//角色列表（用于默认角色筛选）
        private roleDefaultId: string | null = null;//默认角色id
        private otherRoleList: any = [];//除默认角色外的其他角色
        private otherRoleAry: any[] = [];//其他角色选中id列表
        private phoneTrue: boolean = false;//电话号码校验
        private accountTrue: boolean = false;//账号验证
        private addMsg: string | null = null;//提示信息

        //导入
        private uploadVisible: boolean = false;//导入弹出框显示隐藏
        private fileList: any = [];//导入上传的文件
        private uploadUrl: string = '';//文件上传地址
        private showUploadProgress : boolean = false;//导入进度显示隐藏
        private upload: boolean = false;//进度条是否显示
        private percentUpload: number = 0; // 进度的百分比
        private progressUploadInfo: ProgressInfo = new ProgressInfo(); // 获取进度接口返回的数据
        private lastProgressUploadInfo: ProgressInfo = new ProgressInfo();// 上一次获取进度的数据
        private uploadErrorMsg: boolean = false;// 判断导入进度出错否
        private uploadHeaders: CheckUpload = new CheckUpload(); //设置上传的请求头部
        private uploadCheckData: any = [];//检查上传的批量导入用户文件返回数据错误提示为数组时
        private uploadCheckDataObj: boolean = false;//检查上传的批量导入用户文件返回数据错误提示是否对象：false-不是，true-就是

        //确认框：1-批量状态，2-批量重置密码，3-批量删除，4-重置密码,5-删除
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
        // 查询所有单位参数
        private queryAllUnit: QueryAllUnit = new QueryAllUnit();
        // 当前选中行信息
        private rowInfo: any = {};
        private rowAdd: boolean = false;
        private searchByRole: string | null = null; // 角色搜索框
        private searchByInfo: string | null = null;
        private loading: boolean = false; // 加载层
        private allRoleData: any = [];







        /**
         * 挂载
         */
        mounted(): void{
            this.uploadUrl = '/api/user/check_batch_import_user_excel';
            let token: any = sessionStorage.getItem('token');
            this.uploadHeaders.Token = token;
            //用户信息
            let userInfo:any  = sessionStorage.getItem('user_info');
            userInfo = JSON.parse(userInfo);
            this.userInfo = userInfo;
            this.userUnitID = userInfo.fk_unit_id;
            this.userID = userInfo.id;
            this.userType = userInfo.user_type;
            this.roleRank = userInfo.role_info.role_rank;
            this.roleType = userInfo.role_info.role_type;

            this.roleParam.role_rank = Number(this.userType);
            //获取单位编号
            this.pageUserList.fk_unit_id = userInfo.fk_unit_id;
            this.roleParam.status = '1';
           this.searchUserList();
            this.getProvCityInfo();
            this.getRoleInfo();
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



        @Watch("searchByRole")
        searchRole(): void {
            if (this.searchByRole === '') {
                this.searchByRole = null;
                return;
            }
            if (this.searchByInfo === '') {
                this.searchByInfo = null;
            }
            this.pageUserList.page_num = 0;
            this.pageTotal = 1;
            this.searchUserList();
        }
        /**
         * 查询分页的用户信息列表
         * */
        searchUserList():any {
            let obj = {};
            let unitID: string | null = null;
            if (this.roleType == '0') unitID = null;
            else unitID = this.pageUserList.fk_unit_id;
            obj = {page_size: this.pageUserList.page_size, page_num: this.pageUserList.page_num, user_type: '2',
                fk_unit_id: unitID, role_info:{role_type: this.searchByRole, role_rank: this.roleRank},
                search_info: this.searchByInfo};
            this.loading = true;
            userManagementCnt.cloud.ces(obj).then((response: AxiosResponse) => {
                if(response.data.status != 200){
                    this.loading = false;
                    this.any().$notify.error({ title: '提示', message: response.data.message });
                }else{
                    this.loading = false;
                    this.pageTotal = response.data.data.totalElements;
                    let userInfo = response.data.data.content;
                    this.cityListData  = response.data.data.content;
                    // this.cityListData = [];
                    // if (this.roleRank != '2') {
                    //     console.log(userInfo)
                    //     for (let i = 0; i < userInfo.length; i++) {
                    //         if (this.roleRank == '0') {
                    //             if (userInfo[i].role_info.role_type != 2 && userInfo[i].fk_creator_user_id === this.userUnitID) {
                    //                 this.cityListData.push(userInfo[i])
                    //             }
                    //         } else {
                    //             if (userInfo[i].role_info.role_type != 2) {
                    //                 this.cityListData.push(userInfo[i])
                    //             }
                    //         }
                    //     }
                    //     // this.pageTotal = this.cityListData.length;
                    // } else {
                    //     for (let i = 0; i < userInfo.length; i++) {
                    //         if (userInfo[i].id != this.userID) {
                    //             this.cityListData.push(userInfo[i])
                    //         }
                    //     }
                    //     // this.pageTotal = this.cityListData.length;
                    // }
                }
            })
        }

        /**
         * 页码改变时触发
         * */
        handleCurrentChange(val): void{
            this.pageUserList.page_num = val-1;
            this.searchUserList();
        }

        /**
         * 上一页按钮触发
         * */
        handlePrevClick(): void{
            if(0 == this.pageUserList.page_num){
                this.any().$notify.error({title: '提示', message: "已经是第一页了"});
                return;
            }
            this.pageUserList.page_num--;
            this.searchUserList();
        }

        /**
         * 下一页按钮触发
         * */
        handleNextClick(): void{
            if(this.pageTotal == this.pageUserList.page_num+1){
                this.any().$notify.error({title: '提示', message: "已经是最后一页了"});
                return;
            }
            this.pageUserList.page_num++;
            this.searchUserList();
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
            console.log(this.fileList);
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
            userManagementCnt.cloud.mulitpleImportUserInfo(key).then((response:AxiosResponse)=>{
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
            userManagementCnt.cloud.getProccess(apiName).then((response:AxiosResponse)=>{
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
         * 获取省、市信息
         * */
        getProvCityInfo(): void{
            let unitInfo: any = window.sessionStorage.getItem("unit_info");
            unitInfo = JSON.parse(unitInfo);
            if (this.userType == '1') {
                this.userProvinceID = unitInfo.id;
            } else if (this.userType == '2') {
                this.userProvinceID = unitInfo.unit_info.id;
            }
            this.queryAllUnit.list_unit_level = ['1', '2', '3'];
            userManagementCnt.cloud.list_all_unit_info_by_id(this.queryAllUnit).then((response: AxiosResponse) => {
                if(response.data.status != 200){
                    this.any().$notify.error({ title: '提示', message: response.data.message });
                }else{
                    let obj = response.data.data;
                    this.allUnitInfo = response.data.data;
                    this.provinceList = [];
                    let unitInfo: any = window.sessionStorage.getItem("unit_info");
                    unitInfo = JSON.parse(unitInfo);
                    if (this.roleRank == '0') {
                        for (let i = 0; i < obj.length; i++) {
                            if (obj[i].unit_level === '1') {
                                this.provinceList.push(obj[i]);
                            }
                        }
                        return;
                    }
                    if (this.roleRank == '1') {
                        this.provinceList.push(unitInfo);
                        this.provinceChecked = unitInfo.id;
                        for (let i = 0; i < obj.length; i++) {
                            if (obj[i].unit_level === '2' && obj[i].fk_parent_id === unitInfo.id) {
                                this.cityList.push(obj[i])
                            }
                        }
                        return;
                    }
                    if (this.roleRank == '2') {
                        this.provinceList.push(unitInfo.unit_info);
                        this.provinceChecked = unitInfo.fk_parent_id;
                        this.cityList.push(unitInfo);
                        this.cityAdd.fk_unit_id = unitInfo.id;
                    }
                }
            })
        }

        /**
         * 省级筛选
         * */
        @Watch("provinceChecked")
        provinceChange(): void {
            if (this.roleRank == "0") {
                this.cityAdd.fk_unit_id = "";
                this.cityList = [];
                if (this.provinceChecked) {
                    for (let i = 0; i < this.allUnitInfo.length; i++) {
                        if (this.allUnitInfo[i].unit_level === "2" && this.allUnitInfo[i].fk_parent_id === this.provinceChecked) {
                            this.cityList.push(this.allUnitInfo[i]);
                        }
                    }
                    if (this.addTitle == '修改' && this.rowAdd) {
                        this.cityAdd.fk_unit_id = this.rowInfo.fk_unit_id;
                        this.rowAdd = false;
                    }
                } else {

                }
            }
        }
        @Watch("cityAdd.fk_unit_id")
        unitChange(): void {
            if (this.cityAdd.fk_unit_id) {
                for (let i = 0; i < this.cityList.length; i++) {
                    if (this.cityAdd.fk_unit_id === this.cityList[i].id) {
                        this.cityAdd.user_name = this.cityList[i].unit_name;
                    }
                }
            } else {
                this.cityAdd.user_name = '';
            }
        }

        /**
         * 获取用户角色信息
         * */
        getRoleInfo():any{
            userManagementCnt.cloud.getRoleList(this.roleParam).then((response: AxiosResponse) => {
                if(response.data.status != 200){
                    this.any().$notify.error({
                        title: '提示',
                        message: response.data.message
                    });
                }else{
                    //对当前身份从角色列表中获取能够操作的角色
                    this.allRoleData = response.data.data.content;
                    this.allRoleList =  this.screenAryObj(this.allRoleData, 2, 'role_rank');
                    //角色类型：0:超管、1:系统管理员、2：管理者、3：教师、4:学生、5:家长'
                    this.roleTypeList = this.aryGetElementDupRemoval(this.allRoleList,'role_type');
                }
            })
        }

        /**
         * 新增点击事件
         * */
        addUser():any{
            this.dialogAddUser = true;
            this.addTitle = '新增';
            if (this.roleRank == '0') {
                this.provinceChecked = '';
            }
            this.addMsg = '';
            //将新增框数据全部置为空
            this.typeChecked = null;
            this.roleList = [];
            this.roleDefaultId = '';
            this.otherRoleList = [];
            this.otherRoleAry = [];
            for(let key in this.cityAdd){
                this.cityAdd[key] = '';
            }
            if (this.userType === '2') {
                this.cityAdd.fk_unit_id = this.userUnitID;
            }
            let userInfo:any  = sessionStorage.getItem('user_info');
            userInfo = JSON.parse(userInfo);
            // this.cityAdd.fk_unit_id = this.userInfo.fk_unit_id;
            // this.cityAdd.fk_user_id = userInfo.fk_user_id;
            this.cityAdd.user_type  = '2';
            this.cityAdd.status = '1';//新增时才默认为‘1’
            this.cityAdd.user_password = '123456';
        }

        /**
         * 修改
         * */
        updateRow(listInfo:any): void{
            console.log(listInfo);
            this.dialogAddUser = true;
            this.addTitle = '修改';
            this.rowAdd = true;
            this.addMsg = '';
            this.accountTrue = true;
            this.phoneTrue = true;
            this.typeChecked = null;
            this.roleList = [];
            this.roleDefaultId = '';
            this.otherRoleList = [];
            this.otherRoleAry = [];
            this.rowInfo = listInfo;
            for(let key in this.cityAdd){
                this.cityAdd[key] = '';
            }
            if (this.roleRank == '0') {
                userManagementCnt.cloud.get_unit_info_by_id(listInfo.fk_unit_id).then((res: AxiosResponse) => {
                    if (res.data.status === '200') {
                        this.provinceChecked = '';
                        this.provinceChecked = res.data.data.fk_parent_id;
                    } else {

                    }
                })
            }
            this.cityAdd.id = listInfo.id;
            this.cityAdd.fk_unit_id = listInfo.fk_unit_id;
            this.cityAdd.user_password_flag = listInfo.user_password_flag;
            this.cityAdd.fk_user_id = listInfo.fk_user_id;
            this.cityAdd.user_type  = listInfo.user_type;
            this.cityAdd.user_password = listInfo.user_password;
            this.cityAdd.user_account = listInfo.user_account;
            delete this.cityAdd.user_password;
            this.cityAdd.user_name = listInfo.user_name;
            this.cityAdd.cell_phone_num = listInfo.cell_phone_num;
            this.cityAdd.custom_user_name = listInfo.custom_user_name;
            this.cityAdd.remark = listInfo.remark;
            //默认角色id
            this.cityAdd.role_info = {
                id:listInfo.role_info.id
            };
            this.cityAdd.status = listInfo.status;

            this.allRoleList =  this.screenAryObj(this.allRoleData, 2, 'role_rank');
            //根据默认角色id得到角色类型
            this.typeChecked = this.screenAryObj(this.allRoleList,listInfo.role_info.id,'id')[0].role_type;
            //根据选中角色类型得到默认角色列表
            this.roleList = this.screenAryObj(this.allRoleList,this.typeChecked,'role_type');
            //默认角色id绑定
            this.roleDefaultId = listInfo.role_info.id;
            //其他角色
            let list: any = this.allRoleList;
            //根据角色类型筛选角色列表
            this.otherRoleList = this.deleteAryObj(list,this.roleDefaultId,'id');
            if (listInfo.role_info_list) {
                //其他角色是否存在并判断选择那些
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
         * 角色类型改变
         * */
        roleTypeChange(selVal):void{
            this.roleList = [];
            this.roleDefaultId = '';
            this.otherRoleList = [];
            this.otherRoleAry = [];
            //根据角色类型筛选角色列表
            this.allRoleList =  this.screenAryObj(this.allRoleData, 2, 'role_rank');
            let list: any = this.allRoleList;
            this.roleList = this.screenAryObj(list,this.typeChecked,'role_type');
            if (this.roleList.length == 1) {
                this.roleDefaultId = this.roleList[0].id;
                this.roleDefaultChange('1');
            }
        }

        /**
         * 默认角色筛选
         * */
        roleDefaultChange(selVal): void{
            this.otherRoleList = [];
            this.otherRoleAry = [];
            let list: any = this.allRoleList;
            // if (this.roleRank != '2') {
            //     list = this.roleList;
            // }
            //根据角色类型筛选角色列表
            this.otherRoleList = this.deleteAryObj(list,this.roleDefaultId,'id');
        }

        /**
         * 账号校验:
         * 1、6-19位
         * */
        checkAccount(): void{

            if (this.cityAdd.user_account) {
                let len: any = this.cityAdd.user_account.length;
                if(len<6 || len>19){
                    this.accountTrue = false
                }else{
                    this.accountTrue = true;
                }
            }


        }

        //电话号码校验
        checkPhone(): void{
            let reg: any = /^((1(3|4|5|7|8)\d{9}))$/;
            if(reg.test(this.cityAdd.cell_phone_num)){
                this.phoneTrue = true;
            }else{
                this.phoneTrue = false;
            }
        }

        //新增框-取消
        cacelAddUser(): void{
            this.dialogAddUser = false;
        }
        //新增框-确定
        insureAddUser(): void{
            if(this.provinceChecked == ''){
                this.addMsg = '请选择省份';
                return;
            }
            else if(this.cityAdd.fk_unit_id == '' && this.cityList.length == 0){
                this.addMsg = '当前省份没有市级信息，请重新选择省份';
                return;
            }
            else if(this.cityAdd.fk_unit_id == '' && this.cityList.length != 0){
                this.addMsg = '请选择市';
                return;
            }
            else if(this.cityAdd.user_account == '' || !this.accountTrue){
                this.addMsg = '请输入6-19位账号';
                return;
            }
            else if(this.cityAdd.cell_phone_num == '' || !this.phoneTrue){
                this.addMsg = '请输入正确的电话号码';
                return;
            }
            else if(this.typeChecked == null){
                this.addMsg = '请选角色类型';
                return;
            }else if(this.roleDefaultId == ''){
                this.addMsg = '请选择默认角色';
                return;
            }
            else{
                this.cityAdd.role_info = {
                    id:this.roleDefaultId,
                };
                this.cityAdd.role_ids = this.roleDefaultId;
                //存在其他角色
                if(this.otherRoleAry.length>0){
                    console.log(this.otherRoleAry)
                    for(let i=0;i<this.otherRoleAry.length;i++){
                        this.cityAdd.role_ids = this.cityAdd.role_ids + ',' + this.otherRoleAry[i];
                    }
                }
                for (let i = 0; i < this.cityList.length; i++) {
                    if (this.cityList[i].id === this.cityAdd.fk_unit_id) {
                        this.cityAdd.unit_name = this.cityList[i].unit_name;
                    }
                }
                this.loading = true;
                userManagementCnt.cloud.saveUser(this.cityAdd).then((response: AxiosResponse) => {
                    if(response.data.status != 200){
                        this.loading = false;
                        this.any().$notify.error({ title: '提示', message: response.data.message });
                    }else{
                        this.loading = false;
                        let successMsg: string | null = null;
                        if (this.addTitle == '新增') {
                            successMsg = '添加成功';
                        } else if (this.addTitle == '修改'){
                            successMsg = '修改成功';
                        }
                        this.any().$notify.success({ title: '提示', message: successMsg });
                        this.searchUserList();
                    }
                    this.dialogAddUser = false;
                })
            }
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
                    }else{ this.insureVisible = true; }
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

        //当选择项发生变化时会触发该事件
        handleSelectionChange(val:any):any {
            this.multipleSelection = val;
        }

        /**
         * 批量改变状态
         * */
        batchChangeStatus(): void{
            let ids: string | null = null;
            let idsAry: any = [];
            idsAry = this.aryGetElementDupRemoval(this.multipleSelection,'id');
            ids = idsAry.join(',');
            userManagementCnt.cloud.mulitpleEditUserStatus(ids,this.batchStatus).then((response:AxiosResponse)=>{
                if(response.data.status != 200){
                    this.any().$notify.error({ title: '提示', message: response.data.message })
                }else{
                    this.any().$notify.success({ title: '提示', message: '状态修改成功' });
                    this.searchUserList();
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
            userManagementCnt.cloud.mulitpleResetUserPassword(ids,'123456').then((response:AxiosResponse)=>{
                if(response.data.status != 200){
                    this.any().$notify.error({ title: '提示', message: response.data.message })
                }else{
                    this.any().$notify.success({ title: '提示', message: '密码重置成功' });
                    this.searchUserList();
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
            userManagementCnt.cloud.mulitpleDelUserInfo(ids).then((response:AxiosResponse)=>{
                if(response.data.status != 200){
                    this.any().$notify.error({ title: '提示', message: response.data.message })
                }else{
                    this.any().$notify.success({ title: '提示', message: '删除成功' });
                    this.searchUserList();
                }
            });
        }

        /**
         *table列表单条删除
         **/
        columnDelete(): void{
            if (this.currentId !== null) {
                this.loading = true;
                userManagementCnt.cloud.deleteUser(this.currentId).then((response: AxiosResponse) => {
                    if (response.data.status != 200) {
                        this.loading = false;
                        this.any().$notify.error({ title: '提示',message: response.data.message })
                    } else {
                        this.loading = false;
                        this.any().$notify.success({ title: '提示',message: '删除成功' });
                        this.searchUserList();
                    }
                })
            }
        }

        /**
         * table列表单条修改状态
         * */
        columnStatus(status:string,id:string): void{
            userManagementCnt.cloud.updateUserStatus(id,status).then((response:AxiosResponse)=>{
                if(response.data.status != 200){
                    this.any().$notify.error({ title: '提示', message: response.data.message })
                }else{
                    this.any().$notify.success({ title: '提示', message: '状态修改成功' });
                    this.searchUserList();
                }
            })
        }

        /**
         * table列表单条重置密码
         * */
        columnResetPwd(): void{
            if (this.currentId !== null) {
                userManagementCnt.cloud.mulitpleResetUserPassword(this.currentId,'123456').then((response:AxiosResponse)=>{
                    if(response.data.status != 200){
                        this.any().$notify.error({ title: '提示', message: response.data.message })
                    }else{
                        this.any().$notify.success({ title: '提示', message: '密码重置成功' });
                        this.searchUserList();
                    }
                });
            }

        }

        //  //导入限制文件个数
        // handleExceed(files, fileList): void {
        //     this.any().$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
        // }

        /**
         * 根据一个参数从对象数组中取出对应对象组成新数组
         * ary-对象数组，value-参数值，name-参数名称
         * */
        screenAryObj(ary:any[],value:any,name:string):any{
            let newAry:any = [];
            if (name === 'role_rank' && this.roleRank != '3') {
                for(let i=0;i<ary.length;i++){
                    if(value == ary[i][name] && ary[i].role_type != 2){
                        newAry.push(ary[i]);
                    }
                }
            } else {
                for (let i = 0; i < ary.length; i++) {
                    if ( value == ary[i][name] ) {
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
        deleteAryObj(ary:any[],value:any,name:string): any{
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
                if (this.roleType == '1' && this.roleRank == '2') {
                    for(let i=0;i<ary.length;i++){
                        new_ary.push(ary[i][name]);
                    }
                } else {
                    for(let i=0;i<ary.length;i++){
                        if (ary[i].role_type != 2) {
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

        /**
         * 根据一个参数从数组（数组对象）获取当前对象，这个参数具有唯一性
         * ary-数组，value-参数值（值），name-参数名称（键）
         * */
        screenAryOnlyObj(ary:any[],value:any,name:string): any{
            for(let i=0;i<ary.length;i++){
                if(ary[i][name] == value){
                    return ary[i];
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "./user-management";
    .el-checkbox+.el-checkbox {
        margin-left: 0;
    }
    .el-checkbox{
        margin-right:20px;
    }
    .el-checkbox:last-child{
        margin-right:0;
    }
    .el-dialog__header .el-dialog__title {
        color: #777;
        font-size: 16px;
    }
    .float_right {
        float: right;
        z-index: 2;
    }
</style>
