<template>
    <div class="user-p-wrap">
        <div class="select-wrap" style="text-align: left">
            <div style="display: inline-block">
                <el-input
                    placeholder="请输入角色名称"
                    v-model="queryPrivilegeParam.role_name"
                    @keyup.enter.native="listPrivilege"
                    @blur="listPrivilege"
                    clearable>
                </el-input>
            </div>
            <div style="display: inline-block;float: right">
                <el-tooltip v-show="addBtn" class="item" effect="dark" content="无权限" placement="top">
                    <el-button class="pt_btn" size="mini">
                        <span class="add_span"><img src="../../assets/icon/add.png" class="add_img">新增</span>
                    </el-button>
                </el-tooltip>
                <el-button v-show="!addBtn" id="xz" class="add_btn" size="mini" @click="roleAddBtn">
                    <span class="add_span"><img src="../../assets/icon/add.png" class="add_img">新增</span>
                </el-button>
            </div>

        </div>
        <div style="margin-top:12px;">
            <el-table :data="tableInfo" style="width: 100%">
                <el-table-column type="index" label="序号" align="center" width="100"></el-table-column>
                <el-table-column prop="role_name" label="角色名称" align="center" width="260"></el-table-column>
                <el-table-column prop="user_rank" label="角色等级" align="center" width="260"></el-table-column>
                <el-table-column prop="user_type" label="角色类型" align="center" width="260"></el-table-column>
                <el-table-column fixed="right" label="操作" align="center" width="286">
                    <template slot-scope="scope">
                        <!--<el-tooltip v-show="configBtn" class="item" effect="dark" content="无权限" placement="top" style="margin-right: 8px;">-->
                            <!--<span class="config-btn-n"></span>-->
                        <!--</el-tooltip>-->
                        <!--<span v-show="!configBtn" class="config-btn" @click="onIntoConfig(scope.row)" title="权限配置"></span>-->

                        <el-tooltip v-show="scope.row.parent_id !== '0' && editBtn" class="item" effect="dark" content="无权限" placement="top">
                            <span class="img_span disabled_update" style="cursor: not-allowed"></span>
                        </el-tooltip>
                        <span class="update-btn" title="修改" @click="updateRoleBtn(scope.row)"
                              v-show="scope.row.parent_id !== '0' && !editBtn"></span>

                        <el-tooltip v-show="scope.row.parent_id !== '0' && deleteBtn" class="item" effect="dark" content="无权限" placement="top">
                            <span class="img_span disabled_del" style="cursor: not-allowed"></span>
                        </el-tooltip>
                        <span class="delete-btn" title="删除" @click="deleteRoleBtn(scope.row)"
                              v-show="scope.row.parent_id !== '0' && !deleteBtn"></span>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <el-dialog title="增加角色" :visible.sync="dialogVisible">
            <div id="add_user">
                <el-form ref="form" label-width="80px">
                    <el-form-item>
                        <el-input v-model="user.role_name" placeholder="请输入角色名称" maxlength="32"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-select v-model="parentsRole" placeholder="请选择父级角色" value="">
                            <el-option v-for="(bigRole,$index) in bigRoleList" :label="bigRole.role_name"
                                       :value="bigRole.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button class="update_btn_cancel" @click="dialogVisible = false">取消</el-button>
                        <el-button class="update_btn_confirm" type="primary" @click="onSubmit">确定</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-dialog>
        <el-dialog
            title="确定删除"
            :visible.sync="deleteDialogVisible"
            width="30%">
            <div style="text-align: left">是否删除该角色？</div>
            <el-button class="del_btn_cancel" @click="deleteDialogVisible = false">取 消</el-button>
            <el-button class="del_btn_confirm" @click="deleteRole()">确 定</el-button>
        </el-dialog>
    </div>
</template>

<script lang="ts">
    import {
        QueryBigRoleParam,
        QueryPrivilegeParam,
        UpdateRoleParam,
        User
    } from "./privilege-management.def";
    import {XtVue, Component, XtRouter} from "../../common/common";
    import PrivilegeCnt from "./privilege-management.cnt";
    import {AxiosResponse} from "axios";
    import {sortBy} from "@/common/mod/xt.algorithm";
    import {getBtnList} from "../common/mod/base"


    @Component
    export default class Management extends XtVue {
        //表格数据
        private tableInfo: Array<any> = [];

        //增加dialog是否显示
        private dialogVisible: boolean = false;
        //添加的角色参数
        private user: User = new User();
        //查询权限表格数据参数
        public queryPrivilegeParam: QueryPrivilegeParam = new QueryPrivilegeParam();
        //查询大角色参数
        public queryBigRoleParam: QueryBigRoleParam = new QueryBigRoleParam();
        public updateRoleParam: UpdateRoleParam = new UpdateRoleParam();
        public addRoleParam: UpdateRoleParam = new UpdateRoleParam();
        //大角色下拉列表--所有角色列表
        public bigRoleList: Array<any> = [];
        //父级角色序号
        public parentsRole: string | null = null;

        //删除弹框
        public deleteDialogVisible: boolean = false;
        //需要删除的角色
        public deleteRoleID: string = "";
        //是否是修改
        public isUpdate: boolean = false;
        // 按钮权限
        private addBtn: boolean = true; // 新增
        private editBtn: boolean = true; // 修改
        private deleteBtn: boolean = true; // 删除
        private configBtn: boolean = true;
        // 当前角色的灯具
        private roleRank: string | null = null;

        //角色等级
        private RANK: object = {
            1: "省级",
            2: "市级",
            3: "区县级",
            4: "校级",
            5: "年级",
            6: "班级",
            7: "个人"
        };
        //角色类型
        private TYPE: object = {
            0: "超级管理员",
            1: "系统管理员",
            2: "管理者",
            3: "教师",
            4: "学生",
            5: "家长",
            6: "教研员"
        };

        // public onIntoConfig(p): void {
        //     // XtRouter.skipNamed("PrivilegeConfig",{
        //     //     role_id:p.id
        //     // });
        //     XtRouter.skipNamed("PrivilegeConfig");
        //     sessionStorage.setItem('role_id',p.id);
        // }

        public updateRoleBtn(role): void {
            this.dialogVisible = true;
            this.user.role_name = role.role_name;
            this.parentsRole = role.parent_id;
            this.updateRoleParam.id = role.id;
            this.isUpdate = true;
        }

        /**
         * 点击删除角色按钮
         * */
        public deleteRoleBtn(role): void {
            this.deleteDialogVisible = true;
            this.deleteRoleID = role.id;
        }

        /**
         * 删除角色
         * */
        public deleteRole(): void {
            PrivilegeCnt.cloud.deleteRole(this.deleteRoleID).then((res: AxiosResponse) => {
                console.log(res);
                if (res && res.data) {
                    if (res.data.status == 200) {
                        this.any().$message({
                            message: "删除成功",
                            type: "success"
                        });
                        this.deleteDialogVisible = false;
                        this.listPrivilege();
                        return;
                    }
                    this.any().$message.error(res.data.message);
                }
            });
        }

        /**
         * 增加按钮点击
         * */
        public roleAddBtn(): void {
            this.dialogVisible = true;
            this.user = new User();
            this.parentsRole = null;
            this.isUpdate = false;
        }

        /**
         * 添加
         * */
        public onSubmit(): void {
            let bigRoleListLength = this.bigRoleList.length;
            for (let i = 0; i < bigRoleListLength; i++) {
                if (this.bigRoleList[i].id == this.parentsRole) {
                    this.user.role_rank = this.bigRoleList[i].role_rank;
                    this.user.role_type = this.bigRoleList[i].role_type;
                    this.user.parent_id = this.bigRoleList[i].id;
                    break;
                } else {
                    if (this.roleRank == '0') {
                        this.user.role_rank = '1';
                    } else {
                        this.user.role_rank = this.roleRank;
                    }
                    this.user.parent_id = '0';
                    this.user.role_type = '';

                }
            }
            if (this.user.role_name == null) {
                this.any().$message.error("请输入角色名称");
                return;
            }

            //添加
            if (!this.isUpdate) {
                PrivilegeCnt.cloud.addRole(this.user).then((res: AxiosResponse) => {
                    if (res && res.data) {
                        if (res.data.status == 200) {
                            this.any().$message({
                                message: "添加成功",
                                type: "success"
                            });
                            this.dialogVisible = false;
                            this.listPrivilege();
                            return;
                        }
                        this.any().$message.error(res.data.message);
                    }
                });
                return;
            }
            for (let key in this.user) {
                this.updateRoleParam[key] = this.user[key];
            }
            PrivilegeCnt.cloud.updateRole(this.updateRoleParam).then((res: AxiosResponse) => {
                if (res && res.data) {
                    if (res.data.status == 200) {
                        this.any().$message({
                            message: "修改成功",
                            type: "success"
                        });
                        this.dialogVisible = false;
                        this.listPrivilege();
                        return;
                    }
                    this.any().$message.error(res.data.message);
                }
            });


        }

        /**
         * 获取大角色列表
         * */
        public listBigRole(): void {
            //
            if (this.roleRank != '0') {
                this.queryBigRoleParam.parent_id = "0";
            }
            this.queryBigRoleParam.status = "1";
            PrivilegeCnt.cloud.getBitRolesHaveMe(this.queryBigRoleParam).then((res: AxiosResponse) => {
                // console.log(res)
                if (res && res.data) {
                    if (res.data.status == 200) {
                        if (!res.data.data || !res.data.data.list) return;
                        this.bigRoleList = res.data.data.list;
                        console.log(this.bigRoleList);
                        return;
                    }
                    this.any().$message.error(res.data.message);
                }
            });
        }

        /**
         * 查询列表
         */
        public listPrivilege(): void {
            PrivilegeCnt.cloud.getPrivilege(this.queryPrivilegeParam).then((res: AxiosResponse) => {
                if (res && res.data) {
                    if (res.data.status == 200) {
                        if (!res.data.data || !res.data.data.content) return;
                        let list = res.data.data.content;

                        let listLength = list.length;
                        for (let i = 0; i < listLength; i++) {
                            list[i].user_type = this.TYPE[list[i].role_type];
                            list[i].user_rank = this.RANK[list[i].role_rank];
                        }
                        sortBy(list, ["+parent_id"]);
                        this.tableInfo = list;
                        return;
                    }
                    this.any().$message.error(res.data.message);
                }
            });
        }

        mounted() {
            //获取登陆者信息
            let userInfo: any = sessionStorage.getItem('user_info');
            userInfo = JSON.parse(userInfo);
            this.roleRank = userInfo.role_info.role_rank;
            this.queryPrivilegeParam.status = "1";
            this.queryPrivilegeParam.page_num = 0;
            this.queryPrivilegeParam.page_size = 9999;
            this.queryPrivilegeParam.role_rank = Number(userInfo.user_type);
            this.queryBigRoleParam.role_rank = Number(userInfo.user_type);
            //获取登录用户的角色等级
            this.listPrivilege();
            this.listBigRole();

            if (window.sessionStorage.getItem("val")) {
                let btnList: any = window.sessionStorage.getItem("val");
                btnList = JSON.parse(btnList).children;
                this.addBtn = getBtnList(btnList, 'add');
                this.editBtn = getBtnList(btnList, 'edit');
                this.deleteBtn = getBtnList(btnList, 'delete');
                this.configBtn = getBtnList(btnList, 'config');
            }

        }
    }
</script>

<style scoped lang="scss">
    @import "./privilege-management";

    .img_span {
        display: inline-block;
        height: 24px;
        width: 24px;
        cursor: pointer;
    }
</style>
