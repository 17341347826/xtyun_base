<template>
    <el-col class="right_table" style="width: 1166px;margin-left: 8px;">
        <!--新增、导入、批量操作-->
        <el-row class="float_right">
            <el-tooltip v-show="addBtn" class="item" effect="dark" content="无权限" placement="top" style="margin-left: 15px;">
                <el-button class="pt_btn" size="mini">
                    <span class="add_span"><img src="../../../assets/icon/add.png" class="add_img">新增</span>
                </el-button>
            </el-tooltip>
            <el-button v-show="!addBtn" class="add_btn"  size="mini" @click="addUser()">
                <span class="add_span"><img src="../../../assets/icon/add.png" class="add_img">新增</span>
            </el-button>
        </el-row>
        <el-row class="float_right">
            <el-tooltip v-show="importBtn" class="item" effect="dark" content="无权限" placement="top">
                <el-button class="pt_btn" >导入</el-button>
            </el-tooltip>
            <el-button v-show="!importBtn" class="add_btn"  size="mini" @click="uploadBtn()">导入</el-button>

            <el-tooltip v-show="batchStartStopBtn" class="item" effect="dark" content="无权限" placement="top">
                <el-button class="pt_btn" >批量状态</el-button>
            </el-tooltip>
            <el-button v-show="!batchStartStopBtn" class="add_btn"  size="mini" @click="insureBtn(1)">批量状态</el-button>

            <el-tooltip v-show="batchUpdatePasswordBtn" class="item" effect="dark" content="无权限" placement="top">
                <el-button class="pt_btn" >批量重置密码</el-button>
            </el-tooltip>
            <el-button v-show="!batchUpdatePasswordBtn" class="add_btn"  size="mini" @click="insureBtn(2)">批量重置密码</el-button>

            <el-tooltip v-show="batchDeleteBtn" class="item" effect="dark" content="无权限" placement="top">
                <el-button class="pt_btn" >批量删除</el-button>
            </el-tooltip>
            <el-button v-show="!batchDeleteBtn" class="add_btn"  size="mini" @click="insureBtn(3)">批量删除</el-button>
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
        <!--表格-->
        <div class="table-wrap">
            <el-table
                v-loading="loading"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"
                ref="multipleTable"
                :data="districtListData"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange">
                <el-table-column header-align="center" type="selection" width="55"></el-table-column>
                <el-table-column header-align="center" label="序号" width="100px">
                    <template scope="scope"><span>{{scope.$index+pageQuery.page_num*pageQuery.page_size+1}}</span></template>
                </el-table-column>
                <el-table-column header-align="center" prop="user_account" label="账号"></el-table-column>
                <el-table-column header-align="center" label="所属单位">
                    <template slot-scope="scope">
                        <span>{{scope.row.unit_name ? scope.row.unit_name : scope.row.user_name}}</span>
                    </template>
                </el-table-column>
                <el-table-column header-align="center" prop="custom_user_name" label="名称"></el-table-column>
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
            center>
            <el-row class="dialog_center">
                <el-row>
                    <el-select v-model="provinceChecked" placeholder="请选择省" clearable style="text-align: left" value="">
                        <el-option
                            v-for="item in provinceList"
                            :key="item.id"
                            :label="item.unit_name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-row>
                <el-row>
                    <el-select v-model="cityChecked" placeholder="请选择市" clearable style="text-align: left" value="">
                        <el-option
                            v-for="item in cityList"
                            :key="item.id"
                            :label="item.unit_name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-row>
                <el-row>
                    <el-select v-model="saveUser.fk_unit_id" placeholder="请选择区县" clearable style="text-align: left" value="">
                        <el-option
                            v-for="item in districtList"
                            :key="item.id"
                            :label="item.unit_name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-row>
                <el-row>
                    <el-input v-model="saveUser.user_account" @blur="checkAccount" placeholder="请输入6-18位账号" clearable style="width: 315px"
                              maxlength="18"></el-input>
                </el-row>
                <el-row>
                    <el-input v-model="saveUser.custom_user_name" placeholder="请输入名称" clearable style="width: 315px"
                              maxlength="32"></el-input>
                </el-row>
                <el-row>
                    <el-input v-model="saveUser.cell_phone_num" @blur="checkPhone" placeholder="请输入联系电话" clearable style="width: 315px"
                              maxlength="11"></el-input>
                </el-row>
                <el-row>
                    <el-select v-model="roleType" @change="roleTypeChange" placeholder="请选择角色类型" style="width: 315px" clearable value="">
                        <el-option v-for="item in roleTypeList"
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
                        <el-checkbox v-for="item in otherRoleList"
                                     :label="item.id"
                                     :value="item.id"
                                     :key="item.id">
                            {{item.role_name}}
                        </el-checkbox>
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
            <span v-if="insureNum !== 1">{{insureText}}</span>
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
    import userManagementCnt from "../user-management.cnt";
    import {AxiosResponse} from "axios";
    import "./userFilters";
    import {getBtnList} from "../../common/mod/base"


    @Component
    export default class userDistrict extends XtVue {
        private userType: string | null = null;
        private userUnitID: string | null = null;
        private userID: string | null = null;
        private cityTimeID: string | null = null;
        //多选
        public multipleSelection:Array<any> = [];
        private pageQuery: PageQuery = new PageQuery();
        private roleQueryParam: RoleQueryParam = new RoleQueryParam();//查询角色列表请求参数
        // private pageTotal: number = 0;
        // private pageNum: number = 0;
        // 每页表格数目
        private pageSize: number = 0;
        // 当前页码
        private currentPage: number = 0;
        // 总数据量
        private pageTotal: number  = 0;

        //新增框
        private saveUser: SaveUser = new SaveUser();
        private addVisible: boolean = false;//新增显示、隐藏
        private addTitle: string | null = null;//新增框标题
        private allUnitInfo: any[] = [];//所有单位列表（全国的）
        private provinceList: any = [];//省列表
        private provinceChecked: string | null = null;//省选中
        private allCityInfo: any[] = [];//所有市级列表（全国的）
        private cityChecked: string | null = null;//市选中
        private cityList: any[] = [];//市列表（某个省份下的）
        private allDistrictInfo: any[] = []; //全部区县列表（全国）
        private districtList: any[] = [];//区县列表（某个省份下的）
        private districtListData: any = [];//区县列表（某个省份下的）
        private allRoleList: any[] = [];//所有当前角色下角色列表
        private roleTypeList: any = [];//角色类型数组
        private roleType: number | null = null;//角色类型绑定
        private userRoleRank: string | null = null;
        private userRoleType: string | null = null;
        private roleList: any[] = [];//默认角色列表
        private roleDefaultId: string | null = null;  //默认角色ID
        private otherRoleList: any = [];//其他角色列表
        private otherRoleAry: any[] = [];//其他角色选中id列表
        private phoneTrue: boolean = false;//电话号码校验
        private accountTrue: boolean = false;//账号校验
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
        // 查询所有单位 参数
        private queryAllUnit: QueryAllUnit = new QueryAllUnit();
        // 当前行信息
        private rowInfo: any = {};
        private rowCityID: string | null = null;
        private rowAdd: boolean = false;
        private searchByRole: string | null = null;
        private searchByInfo: string = '';
        private loading: boolean = false; // 加载层
        private allRoleData: any = []; // 加载层





        /**
         * 挂载
         */
        public mounted(): void{
            this.uploadUrl = '/api/user/check_batch_import_user_excel';
            let token: any = sessionStorage.getItem('token');
            this.uploadHeaders.Token = token;
            let userInfo:any  = sessionStorage.getItem('user_info');
            userInfo = JSON.parse(userInfo);
            this.userType = userInfo.user_type;
            this.userRoleRank = userInfo.role_info.role_rank;
            this.userRoleType = userInfo.role_info.role_type;
            this.userUnitID = userInfo.fk_unit_id;
            this.userID = userInfo.id;
            this.roleQueryParam.role_rank = Number(this.userType);
            this.roleQueryParam.status = '1';
            this.getDistrictData();
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
         * 发送ajax获取区县列表数据
         */
        @Watch("searchByRole")
        searchRole(): void {
            if (this.searchByRole === '') {
                this.searchByRole = null;
                return;
            }
            this.pageQuery.page_num = 0;
            this.pageTotal = 1;
            this.getDistrictData();
        }
        public getDistrictData(): void{
            let user_info: any = window.sessionStorage.getItem('user_info');
            user_info = JSON.parse(user_info);
            this.pageQuery.fk_unit_id = user_info.fk_unit_id;

            let obj = {};
            let unitID: string | null = null;
            if (this.userRoleType == '0') unitID = null;
            else unitID = this.pageQuery.fk_unit_id;
            obj = {page_size: this.pageQuery.page_size, page_num: this.pageQuery.page_num, user_type: '3',
                fk_unit_id: unitID, role_info:{role_type: this.searchByRole, role_rank: this.userRoleRank},
                search_info: this.searchByInfo};
            this.loading = true;
            userManagementCnt.cloud.ces(obj).then((response: AxiosResponse)=>{
                this.loading = false;
                if(response.data.status != 200){
                    this.any().$notify.error({ title: '提示', message: response.data.message })
                }else{
                    this.pageTotal = response.data.data.totalElements;
                    this.pageSize = response.data.data.size;
                    this.districtListData = response.data.data.content;
                    let userInfo = response.data.data.content;
                    // this.districtListData = [];
                    // if (this.userRoleRank != '3') {
                    //     for (let i = 0; i < userInfo.length; i++) {
                    //         if (this.userRoleRank == '0') {
                    //             if (userInfo[i].role_info.role_type != 2 && userInfo[i].fk_creator_user_id === this.userUnitID) {
                    //                 this.districtListData.push(userInfo[i])
                    //             }
                    //         } else {
                    //             if (userInfo[i].role_info.role_type != 2) {
                    //                 this.districtListData.push(userInfo[i])
                    //             }
                    //         }
                    //     }
                    //     this.pageTotal = this.districtListData.length;
                    // } else {
                    //     this.districtListData = userInfo;
                    //     this.pageTotal = this.districtListData.length;
                    // }
                }
            })
        }

        /**
         * 初始页currentPage、初始每页数据数pagesize和数据data
         */
        public handleCurrentChange(currentPage): void{
            this.pageQuery.page_num = currentPage - 1;
            this.getDistrictData();
        }
        //上一页
        public PrevClick() :void{
            if(0 == this.pageQuery.page_num){
                this.any().$notify.info({ title: '提示', message: '已经是第一页了', });
                return;
            }
            this.pageQuery.page_num--;
            this.getDistrictData();
        }
        //下一页
        public NextClick() :void{
            if(this.pageTotal == this.pageQuery.page_num + 1){
                this.any().$notify.info({ title: '提示', message: '已经是最后一页了', });
                return;
            }
            this.pageQuery.page_num++;
            this.getDistrictData();
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
            this.uploadCheckData = [];
            if(res.status != 200 || res.status != '200'){
                this.any().$notify.error({ title: '提示', message: res.message });
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
                    this.any().$notify.error({ title: '提示', message: response.data.message })
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
        public getProvCityInfo(): void{
            if (this.userRoleRank == '0') {
                this.queryAllUnit.id = '';
            } else {
                this.queryAllUnit.id = this.userUnitID;
            }
            userManagementCnt.cloud.list_all_unit_info_by_id(this.queryAllUnit).then((response: AxiosResponse) => {
                if(response.data.status != 200){
                    this.any().$notify.error({
                        title: '提示',
                        message: response.data.message
                    });
                }else{
                    let obj = response.data.data;
                    this.allUnitInfo = response.data.data;
                    this.provinceList = [];
                    this.allCityInfo = [];
                    this.allDistrictInfo = [];
                    let unitInfo: any = window.sessionStorage.getItem("unit_info");
                    unitInfo = JSON.parse(unitInfo);
                    if (this.userRoleRank == '0') {
                        for (let i = 0; i < obj.length; i++) {
                            if (obj[i].unit_level === '1') this.provinceList.push(obj[i]);
                            if (obj[i].unit_level === '2') this.allCityInfo.push(obj[i]);
                            if (obj[i].unit_level === '3') this.allDistrictInfo.push(obj[i]);
                        }
                        return;
                    }
                    if (this.userRoleRank == '1') {
                        this.provinceChecked = unitInfo.id;
                        this.provinceList.push(unitInfo);
                        for (let i = 0; i < obj.length; i++) {
                            if (obj[i].unit_level === '2') this.cityList.push(obj[i]);
                            if (obj[i].unit_level === '3') this.allDistrictInfo.push(obj[i]);
                        }
                        return;
                    }
                    if (this.userRoleRank == '2') {
                        this.provinceList.push(unitInfo.unit_info);
                        this.provinceChecked = unitInfo.fk_parent_id;
                        this.cityList.push(unitInfo);
                        this.cityTimeID = unitInfo.id;
                        for (let i = 0; i < obj.length; i++) {
                            if (obj[i].unit_level === '3') this.districtList.push(obj[i]);
                        }
                        return;
                    }
                    if (this.userRoleRank == '3') {
                        this.provinceList.push(unitInfo.unit_info.unit_info);
                        this.provinceChecked = unitInfo.unit_info.unit_info.id;
                        this.cityList.push(unitInfo.unit_info);
                        this.cityTimeID = unitInfo.unit_info.id;
                        this.districtList.push(unitInfo);

                    }
                }
            })
        }

        /**
         * 省级筛选
         * */
        @Watch("provinceChecked")
        public provinceChange():void{
            if (this.userRoleRank == '0') {
                this.cityList = [];
                this.cityChecked = '';
                this.saveUser.fk_unit_id = '';
                // unit_level：地区等级（1：省；2：市；3：区；4：校）
                if (this.provinceChecked) {
                    for(let i = 0; i < this.allCityInfo.length; i++){
                        if(this.provinceChecked === this.allCityInfo[i].fk_parent_id)
                            this.cityList.push(this.allCityInfo[i]);
                    }
                    if (this.addTitle == '修改' && this.rowAdd) this.cityChecked = this.rowCityID;
                }
            }
        }

        /**
         * 市级筛选
         * */
        @Watch("cityChecked")
        public cityChange() :void{
            if (this.userType !== '3' && this.userType !== '2') { this.saveUser.fk_unit_id = ''; this.districtList = []; }
            if (this.cityChecked && this.userType === '1') {
                let new_ary: any = [];
                for (let i = 0; i < this.allDistrictInfo.length; i++) {
                    if (this.cityChecked == this.allDistrictInfo[i].unit_info.id) new_ary.push(this.allDistrictInfo[i]);
                }
                this.districtList = new_ary;
            }
            if (this.cityChecked) {
                if (this.addTitle === '修改' && this.rowAdd) {
                    this.saveUser.fk_unit_id = this.rowInfo.fk_unit_id;
                    this.rowAdd = false;
                }
            }

        }

        @Watch("saveUser.fk_unit_id")
        getUserName(): void {
            if (this.saveUser.fk_unit_id) {
                for (let i = 0; i < this.districtList.length; i++) {
                    if (this.districtList[i].id === this.saveUser.fk_unit_id)
                        this.saveUser.user_name = this.districtList[i].unit_name;
                }
            } else {
                this.saveUser.user_name = '';
            }
        }

        /**
         * 获取用户角色信息
         */
        public searchRoleID(): void{
            userManagementCnt.cloud.getRoleList(this.roleQueryParam).then((response: AxiosResponse)=>{
                if(response.data.status != 200){
                    this.any().$notify.error({ title: '提示', message: response.data.message })
                }else{
                    //对当前身份从角色列表中获取能够操作的角色
                    this.allRoleData = response.data.data.content;
                    this.allRoleList =  this.screenAryObj(this.allRoleData, 3, 'role_rank');
                    //角色类型：0:超管、1:系统管理员、2：管理者、3：教师、4:学生、5:家长'
                    this.roleTypeList = this.aryGetElementDupRemoval(this.allRoleList,'role_type');

                }
            })
        }

        /**
         * 选择角色类型切换角色
         */
        public roleTypeChange() :void{
            this.roleList = [];
            this.roleDefaultId = '';
            this.otherRoleList = [];
            this.otherRoleAry = [];
            this.roleList = this.screenAryObj(this.allRoleList, this.roleType, 'role_type');
            if (this.roleList.length == 1)  {
                this.roleDefaultId = this.roleList[0].id;
                this.roleDefaultChange();
            }
        }


        /**
         * 进行默认角色筛选
         * */
        public roleDefaultChange(): void{
            // this.otherRoleList = [];
            // this.otherRoleAry = [];
            this.allRoleList =  this.screenAryObj(this.allRoleData, 3, 'role_rank');
            let list: any = this.allRoleList;
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
            if (this.userRoleRank == '0') this.provinceChecked = '';
            this.cityChecked = '';
            this.roleType = null;
            this.roleDefaultId = '';
            this.roleList = [];
            this.otherRoleAry = [];
            this.otherRoleList = [];
            // this.provinceChange();
            for(let key in this.saveUser){
                this.saveUser[key] = '';
            }
            if (this.userType === '2') this.cityChecked = this.cityTimeID;
            if (this.userType === '3') { this.cityChecked = this.cityTimeID; this.saveUser.fk_unit_id = this.userUnitID; }
            let userInfo:any  = sessionStorage.getItem('user_info');
            this.saveUser.user_type  = '3';
            this.saveUser.status = '1';//新增时才默认为‘1’
            this.saveUser.user_password = '123456';
        }

        /**
         * 新增点击确定
         * */
        insureAddUser(): void{
            if(this.provinceChecked == '') this.addMsg = '请选择省份';
            else if(this.cityChecked == '' && this.cityList.length == 0) this.addMsg = '当前省份没有市级信息，请重新选择省份';
            else if(this.cityChecked == '' && this.cityList.length == 0) this.addMsg = '当前市没有区县信息，请重新选择市';
            else if(this.cityChecked == '') this.addMsg = '请选择市';
            else if(this.saveUser.fk_unit_id == '') this.addMsg = '请选择区县';
            else if(this.saveUser.user_account == '' || !this.accountTrue) this.addMsg = '请输入6-19位账号';
            else if(this.saveUser.user_name == '') this.addMsg = '请输入姓名';
            else if(this.saveUser.cell_phone_num == '' || !this.phoneTrue) this.addMsg = '请输入正确的电话号码';
            else if(this.roleType == null) this.addMsg = '请选角色类型';
            else if(this.roleDefaultId == '') this.addMsg = '请选择默认角色';
            else{
                this.saveUser.role_info = {
                    id: this.roleDefaultId
                };
                this.saveUser.role_ids = this.roleDefaultId;
                // //存在其他角色
                if(this.otherRoleAry.length>0){
                    for(let i=0;i<this.otherRoleAry.length;i++){
                        this.saveUser.role_ids = this.saveUser.role_ids + ',' + this.otherRoleAry[i];
                    }
                }
                this.loading = true;
                userManagementCnt.cloud.saveUser(this.saveUser).then((response: AxiosResponse)=>{
                    this.loading = false;
                    if(response.data.status != 200){
                        this.any().$notify.error({ title: '提示', message: response.data.message })
                    }else{
                        let successMsg: string | null = null;
                        if(this.addTitle == '新增') successMsg = '添加成功';
                        else if(this.addTitle == '修改') successMsg = '修改成功';
                        this.any().$notify.success({ title: '提示', message: successMsg });
                        this.getDistrictData();
                    }
                    this.addVisible = false;
                });
            }
        }
        @Watch("addVisible")
        clearInfo(): void {
            if (!this.addVisible) this.cityChecked = ''
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
            this.cityChecked = '';
            this.roleType = null;
            this.roleDefaultId = '';
            this.roleList = [];
            this.otherRoleAry = [];
            this.otherRoleList = [];
            for(let key in this.saveUser){
                this.saveUser[key] = '';
            }
            this.rowInfo = listInfo;

            for (let i = 0; i < this.allUnitInfo.length; i++) {
               if (this.allUnitInfo[i].id === listInfo.fk_unit_id) {
                   this.saveUser.id = listInfo.id;
                   this.saveUser.fk_user_id = listInfo.fk_user_id;
                   this.saveUser.user_password_flag = listInfo.user_password_flag;
                   this.saveUser.user_type = listInfo.user_type;
                   this.saveUser.status = listInfo.status;
                   this.saveUser.user_password = listInfo.user_password;
                   delete this.saveUser.user_password;
                   this.saveUser.user_account = listInfo.user_account;
                   this.saveUser.user_name = listInfo.user_name;
                   this.saveUser.cell_phone_num = listInfo.cell_phone_num;
                   this.saveUser.custom_user_name = listInfo.custom_user_name;
                   this.saveUser.remark = listInfo.remark;
                   if (this.userRoleRank == "0") this.provinceChecked = this.allUnitInfo[i].unit_info.fk_parent_id;
                   this.cityChecked = this.allUnitInfo[i].fk_parent_id;
                   this.rowCityID = this.allUnitInfo[i].fk_parent_id;
                   this.roleType = this.screenAryObj(this.allRoleList, listInfo.role_info.id, 'id')[0].role_type;
                   //根据选中角色类型得到默认角色列表
                   this.roleList = this.screenAryObj(this.allRoleList, this.roleType, 'role_type');
                   this.roleDefaultId = listInfo.role_info.id;
                   //其他角色
                   let list: any = [];
                   list = JSON.stringify(this.allRoleList);
                   list = JSON.parse(list);
                   //根据角色类型筛选角色列表
                   this.otherRoleList = this.deleteAryObj(list, this.roleDefaultId, 'id');
                   //其他角色是否存在并判断选择那些
                   if (listInfo.role_info_list) {
                       let idsList: any = this.aryGetElementDupRemoval(listInfo.role_info_list, 'id');
                       //剥离选中角色列表中默认角色id
                       for (let i = 0; i < idsList.length; i++) {
                           if (idsList[i] == this.roleDefaultId) idsList.splice(i, 1);
                       }
                       this.otherRoleAry = idsList;
                   }
               }
           }
                //     //还原省份、市级和区县筛选:根据fk_unit_id:
                //     //还原选中的市
                //     let proDistrictInfo: any =  this.screenAryOnlyObj(this.allUnitInfo,info.fk_unit_id,'id');
                //     this.cityChecked = proDistrictInfo.unit_info.id;
                //     //获取当前选中市的信息（对象）
                //     let currentCityInfo = this.screenAryOnlyObj(this.allCityInfo,this.cityChecked,'id');
                //     //获取当前选中省
                //     this.provinceChecked = currentCityInfo.unit_info.id;
                //     //选出市列表
                //     let city_ary: any = [];
                //     for(let i=0;i<this.allCityInfo.length;i++){
                //         if(this.provinceChecked == this.allCityInfo[i].unit_info.id){
                //             city_ary.push(this.allCityInfo[i]);
                //         }
                //     }
                //     this.cityList = city_ary;
                //     //选出区县列表
                //     let discrict_ary: any = [];
                //     for(let i=0;i<this.allDistrictInfo.length;i++){
                //         if(this.cityChecked == this.allDistrictInfo[i].unit_info.id){
                //             discrict_ary.push(this.allDistrictInfo[i]);
                //         }
                //     }
                //     this.districtList = discrict_ary;
                //     this.saveUser.fk_unit_id = info.fk_unit_id;
                //     //默认角色id
                //     this.saveUser.role_info = {
                //         id:info.role_info.id
                //     };
                //     //根据默认角色id得到角色类型
                //     this.roleType = this.screenAryObj(this.allRoleList,info.role_info.id,'id')[0].role_type;
                //     //根据选中角色类型得到默认角色列表
                //     this.roleList = this.screenAryObj(this.allRoleList,this.roleType,'role_type');
                //     //默认角色id绑定
                //     this.roleDefaultId = info.role_info.id;
                //     //其他角色
                //     let list: any = [];
                //     list = JSON.stringify(this.roleList);
                //     list = JSON.parse(list);
                //     //根据角色类型筛选角色列表
                //     this.otherRoleList = this.deleteAryObj(list,this.roleDefaultId,'id');
                //     //其他角色是否存在并判断选择那些
                //     let idsList:any = this.aryGetElementDupRemoval(info.user_role_relation_info_list,'fk_role_id');
                //     //剥离选中角色列表中默认角色id
                //     for(let i=0;i<idsList.length;i++){
                //         if(idsList[i] == this.roleDefaultId){
                //             idsList.splice(i,1);
                //         }
                //     }
                //     this.otherRoleAry = idsList;
        }

        //账号验证
        checkAccount(): void{
            if (this.saveUser.user_account) {
                let len: any = this.saveUser.user_account.length;
                if(len<6 || len>19){
                    this.accountTrue = false
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
        public handleSelectionChange(val):void{
            this.multipleSelection = val;
        }

        /**
         * 确认框操作：1-批量状态，2-批量重置密码，3-批量删除，4-重置密码,5-删除
         * */
        insureBtn(idx:number,id: string | null): void{
            this.insureNum = idx;
            this.currentId = id;
            switch (idx) {
                case 1:
                    if(this.multipleSelection.length == 0)
                        this.any().$notify.info({ title: '提示', message: '请选择需要操作的账号' });
                    else
                        this.insureVisible = true;
                    this.insureText = '确认批量改变状态';
                    break;
                case 2:
                    if(this.multipleSelection.length == 0)
                        this.any().$notify.info({ title: '提示', message: '请选择需要操作的账号' });
                    else
                        this.insureVisible = true;
                    this.insureText = '确认批量重置密码';
                    break;
                case 3:
                    if(this.multipleSelection.length == 0)
                        this.any().$notify.info({ title: '提示', message: '请选择需要操作的账号' });
                    else
                        this.insureVisible = true;
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
            userManagementCnt.cloud.mulitpleEditUserStatus(ids,this.batchStatus).then((response:AxiosResponse)=>{
                this.loading = false;
                if(response.data.status != 200){
                    this.any().$notify.error({ title: '提示', message: response.data.message })
                }else{
                    this.any().$notify.success({ title: '提示', message: '状态修改成功' });
                    this.getDistrictData();
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
            this.loading = true;
            userManagementCnt.cloud.mulitpleResetUserPassword(ids,'123456').then((response:AxiosResponse)=>{
                this.loading = false;
                if(response.data.status != 200){
                    this.any().$notify.error({ title: '提示', message: response.data.message })
                }else{
                    this.any().$notify.success({ title: '提示', message: '密码重置成功' });
                    this.getDistrictData();
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
            this.loading = true;
            userManagementCnt.cloud.mulitpleDelUserInfo(ids).then((response:AxiosResponse)=>{
                this.loading = false;
                if(response.data.status != 200){
                    this.any().$notify.error({ title: '提示', message: response.data.message })
                }else{
                    this.any().$notify.success({ title: '提示', message: '删除成功' });
                    this.getDistrictData();
                }
            });
        }

        /**
         *table列表单条删除
         **/
        columnDelete(): void{
            if (this.currentId) {
                this.loading = true;
                userManagementCnt.cloud.deleteUser(this.currentId).then((response: AxiosResponse)=>{
                    this.loading = false;
                    if(response.data.status != 200){
                        this.any().$notify.error({ title: '提示', message: response.data.message })
                    }else{
                        this.any().$notify.success({ title: '提示', message: '删除成功' });
                        this.getDistrictData();
                    }
                })
            }
        }

        /**
         * table列表单条修改状态
         * */
        columnStatus(status:string,id:string): void{
            this.loading = true;
            userManagementCnt.cloud.updateUserStatus(id,status).then((response:AxiosResponse)=>{
                this.loading = false;
                if(response.data.status != 200){
                    this.any().$notify.error({ title: '提示', message: response.data.message })
                }else{
                    this.any().$notify.success({ title: '提示', message: '状态修改成功' });
                    this.getDistrictData();
                }
            })
        }

        /**
         * table列表单条重置密码
         * */
        columnResetPwd(): void{
            if (this.currentId) {
                this.loading = true;
                userManagementCnt.cloud.mulitpleResetUserPassword(this.currentId,'123456').then((response:AxiosResponse)=>{
                    this.loading = false;
                    if(response.data.status != 200){
                        this.any().$notify.error({ title: '提示', message: response.data.message })
                    }else{
                        this.any().$notify.success({ title: '提示', message: '密码重置成功' });
                        this.getDistrictData();
                    }
                });
            }
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
         * 根据一个参数从对象数组中取出对应对象组成新数组
         * ary-对象数组，value-参数值，name-参数名称
         * @param ary
         * @param value
         * @param name
         */
        public screenAryObj(ary, value,name):any{
            let newAry:any = [];
            if (name === 'role_rank' && this.userRoleRank != '3') {
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

        /**
         * 获取数组（数组对象）中的某个元素并去重
         * ary-数组，name-抽取名称（键）
         * */
        aryGetElementDupRemoval(ary,name):any{
            let new_ary: any = [];
            if (name === 'role_type') {
                if (this.userRoleRank == '3') {
                    for(let i=0;i<ary.length;i++){
                        new_ary.push(ary[i][name]);
                    }
                } else {
                    for(let i=0;i<ary.length;i++){
                        if (ary[i].role_type == 1 || ary[i].role_type == 6) {
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
    .el-checkbox+.el-checkbox {
        margin-left: 7px;
    }
</style>
