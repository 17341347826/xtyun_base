<template>
    <div class="config-wrap">
            <div class="top">
                {{unit.unit_name}}
            </div>
            <div class="el-main" id="first" v-loading.fullscreen.lock="fullLoading">
                <div class="btns " id="btn-wrap">
                    <el-button plain type="success" class="role-btn" :class="{'btn-active':item.id === selectRole}"
                               v-for="item in bigRoleList" v-show="item.parent_id === '0' || item.modifier_name === userName || item.creator_name === userName"
                               @click="onSelectRole(item)">{{item.role_name}}
                    </el-button>
                </div>
                <el-row v-if="!configVisible">

                    <div v-for="item in findList">
                        <div class="title" v-if="item.module">
                            <span class="y_span"></span>
                            <span v-if="item">{{item.system_name}}</span>
                        </div>
                        <el-button style="border: none" v-for="value in (item.module)" @click="onOpenConfig(value)">
                            {{value.bm ? value.bm : value.menu_info_do.menu_name}}
                        </el-button>
                    </div>
                    <div class="line"></div>
                    <el-row style="text-align: center">
                        <el-button type="primary" size="medium" class="update_btn_cancel" @click="cancelBtn">取消
                        </el-button>
                        <el-button type="success" size="medium" class="update_btn_confirm" @click="saveBtn">保存
                        </el-button>
                    </el-row>
                </el-row>

                <el-row v-if="configVisible">
                    <!--check-strictly-->
                    <el-tree
                        ref="treeOpen"
                        :data="openConfigList"
                        show-checkbox
                        check-strictly
                        node-key="id"
                        :default-checked-keys="checkList"
                        :expand-on-click-node="false"
                        default-expand-all
                        @check="onCheck"
                        @check-change="getSaveList">
                    <span slot-scope="{ node, data }">
                        <span class="open_span">
                            {{data.value.bm ? data.value.bm : data.label}}
                            <i class="el-icon-tickets" v-if="data.value.menu_info_do.menu_type === 0"></i>
                            <i class="el-icon-menu" v-if="data.value.menu_info_do.menu_type === 1"></i>
                            <i class="el-icon-edit-outline" v-if="data.value.menu_info_do.menu_type === 2"></i>

                            <!--{{data.id}}-->
                            <span v-if="data.sel" style="margin-left: 25px;">别名：</span>
                            <el-input v-if="data.sel" size="mini" style="width: 75px;" v-model="data.value.next.bm" @input="getSaveListByBm(data.value)"></el-input>
                            <span v-if="data.sel" style="margin-left: 25px;">备注：</span>
                            <el-input v-if="data.sel" slot="reference" size="mini" style="width: 75px;" v-model="data.value.next.remark" @input="getSaveListByBm(data.value)"></el-input>
                            <span v-if="data.sel" style="margin-left: 25px;">序号：</span>
                            <el-input v-if="data.sel" size="mini" style="width: 75px;" v-model="data.value.next.xh" @input="getSaveListByBm(data.value)"></el-input>
                        </span>
                    </span>
                    </el-tree>
                    <el-row style="text-align: center;margin-top: 15px;">
                        <span>
                            <el-button @click="configVisible = false" class="update_btn_cancel">返 回</el-button>
                            <el-button type="danger" @click="onConfigConfirm()" class="update_btn_confirm">确 定</el-button>
                        </span>
                    </el-row>
                </el-row>
            </div>


        <!--<el-dialog
            :visible.sync="configVisible"
            width="40%"
            fullscreen
            center>
            <el-row>
                check-strictly
                <el-tree
                    ref="treeOpen"
                    :data="openConfigList"
                    show-checkbox
                    check-strictly
                    node-key="id"
                    :default-checked-keys="checkList"
                    :expand-on-click-node="false"
                    default-expand-all
                    @check="onCheck"
                    @check-change="getSaveList">
                    <span slot-scope="{ node, data }">
                        <span class="open_span">
                            {{data.bm ? data.bm : data.label}}
                            {{data.id}}
                            <span v-if="data.sel" style="margin-left: 25px;">别名：</span>

                            <el-input v-if="data.sel" size="mini" style="width: 75px;" v-model="data.value.next.bm" @input="getSaveListByBm(data.value)"></el-input>

                            <span v-if="data.sel" style="margin-left: 25px;">备注：</span>

                            <el-tooltip v-if="data.sel" class="item" effect="dark" :content="data.value.remark" placement="top">
                            </el-tooltip>
                            <el-input v-if="data.sel" slot="reference" size="mini" style="width: 75px;" v-model="data.value.next.remark" @input="getSaveListByBm(data.value)"></el-input>
                            <span v-if="data.sel" style="margin-left: 25px;">序号：</span>
                            <el-input v-if="data.sel" size="mini" style="width: 75px;" v-model="data.value.next.xh" @input="getSaveListByBm(data.value)"></el-input>
                        </span>
                    </span>
                </el-tree>
            </el-row>
            <span slot="footer">
                <el-button @click="configVisible = false" class="update_btn_cancel">取 消</el-button>
                <el-button type="danger" @click="onConfigConfirm()" class="update_btn_confirm">确 定</el-button>
            </span>
        </el-dialog>-->
    </div>
</template>

<script lang="ts">
    import {
        OpenConfigSaveList,
        QueryBigRoleParam,
        QueryMenuInfo,
        QueryPrivilegeParam,
        SelectField
    } from "./privilege-management.def";
    import {XtVue, Component, XtRouter} from "../../common/common";
    import PrivilegeCnt from "./privilege-management.cnt";
    import {AxiosResponse} from "axios";
    import {ProjectParam} from "../menu/menu.def";

    @Component
    export default class Management extends XtVue {
        private unit: any = '';
        private userRoleID: string | null = null;
        private userName:string | null = null;
        //查询大角色参数
        private queryBigRoleParam: QueryPrivilegeParam = new QueryPrivilegeParam();
        //大角色下拉列表
        private bigRoleList: Array<any> = [];
        // 权限弹框
        private configVisible: boolean = false;
        private openModule: string | null = null;
        // 菜单列表
        private menuList: any[] = [];
        private findList: any[] = [];
        private selectRole: string | null = null;
        private user: any = '';
        // 权限弹框勾选数据
        private queryMenuInfo: QueryMenuInfo = new QueryMenuInfo();
        private openConfigList: any[] = [];
        // 自动勾选
        private checkOpenConfig: string = '';
        private checkList: any = [];
        // 试用
        private saveList: OpenConfigSaveList = new OpenConfigSaveList();
        private unitRoleMenus: any[] = [];
        private addConfig: any[] = [];
        private delConfig: any[] = [];
        private booleanOpen: boolean = false;
        private booleanBtn: boolean = false;
        private fullLoading: boolean = false;
        private openMenuID: string | null = null;




        getChildOneChecked(e): void {
            if (e.length > 0) {
                for (let j = 0; j < e.length; j++) {
                    e[j].checked = this.booleanOpen;
                    this.getChildTwoChecked(e[j].childNodes);
                }
            }
        }
        getChildTwoChecked(e): void {
            if (e.length > 0) {
                for (let j = 0; j < e.length; j++) {
                    e[j].checked = this.booleanOpen;
                    this.getChildThreeChecked(e[j].childNodes);
                }
            }
        }
        getChildThreeChecked(e): void {
            if (e.length > 0) {
                for (let j = 0; j < e.length; j++) {
                    e[j].checked = this.booleanOpen;
                }
            }
        }
        onCheck(data, nodes): void {
            this.addConfig = [];
            this.booleanBtn = true;
            let half = nodes.halfCheckedNodes;
            if (half.length > 0) {
                for (let i = 0; i < half.length; i++) {
                    this.addConfig.push({id:half[i].value.id, bm: half[i].value.bm, remark: half[i].value.remark, xh: half[i].value.xh, menu_info_do: {id: half[i].value.menu_info_do.id}});
                }
            }
            let check = nodes.checkedNodes;
            if (check.length > 0) {
                for (let i = 0; i < check.length; i++) {
                    this.addConfig.push({id: check[i].value.id, bm: check[i].value.bm, remark: check[i].value.remark, xh: check[i].value.xh, menu_info_do: {id: check[i].value.menu_info_do.id}});
                }
            }
        }

        getSaveList(data, checked, indeterminate): void {
            data.sel = checked || indeterminate;
            this.booleanOpen = checked;
            let per = (this.$refs.treeOpen as any).getNode(data);
            if (this.booleanBtn) {
                if (per.childNodes.length > 0) {
                    for (let i = 0; i < per.childNodes.length; i++) {
                        per.childNodes[i].checked = this.booleanOpen;
                        this.getChildOneChecked(per.childNodes[i].childNodes)
                    }
                    this.booleanBtn = false;
                }
            }
            if (checked) {
                if (per.parent) {
                    per.parent.checked = checked;
                }
                per.data.value.next = {
                    bm: '',
                    xh: '',
                    remark: ''
                };
                if (this.unitRoleMenus.length > 0) {
                    for (let i = 0; i < this.unitRoleMenus.length; i++) {
                        if (this.unitRoleMenus[i].menu_info_do.id === per.data.value.menu_info_do.id) {
                            per.data.value.next.bm = this.unitRoleMenus[i].bm;
                            per.data.value.id = this.unitRoleMenus[i].id;
                            per.data.value.next.xh = this.unitRoleMenus[i].xh;
                            per.data.value.next.remark = this.unitRoleMenus[i].remark
                        }
                    }
                }
            }
            if (!checked && !indeterminate) {
                per.checked = checked;
                if (per.childNodes.length > 0) {
                    for (let i = 0; i < per.childNodes.length; i++) {
                        per.childNodes[i].checked = checked;
                    }
                }
                for (let i = 0; i < this.unitRoleMenus.length; i++) {
                    if (this.unitRoleMenus[i].menu_info_do.id === data.value.menu_info_do.id) {
                        this.delConfig.push({id: this.unitRoleMenus[i].id, bm: this.unitRoleMenus[i].bm, remark: this.unitRoleMenus[i].remark, xh: this.unitRoleMenus[i].xh, menu_info_do: {id: this.unitRoleMenus[i].menu_info_do.id}});
                    }
                }
            } else {
                for (let j = 0; j < this.delConfig.length; j++) {
                    if (data.value.menu_info_do.id === this.delConfig[j].menu_info_do.id) {
                        this.delConfig.splice(j, 1);
                        if (j < this.delConfig.length - 1) {
                            j--;
                        }
                    }
                }
            }
        }
        getSaveListByBm(data): void {
            this.addConfig.push({id:data.id, bm: data.next.bm, remark: data.next.remark, xh: data.next.xh, menu_info_do: {id: data.menu_info_do.id}});
            for (let i = 0; i < this.addConfig.length; i++) {
                for (let j = i + 1; j < this.addConfig.length; j++) {
                    if (this.addConfig[i].menu_info_do.id === this.addConfig[j].menu_info_do.id) {
                        this.addConfig.splice(i, 1);
                        if (i < this.addConfig.length - 1) {
                            i--;
                        }
                    }
                }
            }
       }
        public cancelBtn():void{
            XtRouter.skipNamed("PrivilegeManage");
        }
        public saveBtn():void{
            // XtRouter.skipNamed("PrivilegeManage");
            return
        }

        mounted() {
            // this.account = window.sessionStorage.getItem("account");
            if (this.$route.params.unit) {
                this.unit = this.$route.params.unit;
            } else {
                window.history.go(-1);
                return;
            }
            this.queryMenuInfo.unit_id = this.unit.id;
            this.user = window.sessionStorage.getItem("user_info");
            this.user = JSON.parse(this.user);
            this.userRoleID = this.user.role_info.id;
            this.userName = this.user.user_name;
            this.queryBigRoleParam.parent_id = null;
            this.queryBigRoleParam.status = "1";
            this.queryBigRoleParam.role_rank = this.unit.unit_level;
            // this.queryBigRoleParam.role_name = this.user.role_info.role_name;
            // this.queryBigRoleParam.role_type = this.user.role_info.role_type;
            // this.queryBigRoleParam.role_rank = this.user.role_info.role_rank;
            this.fullLoading = true;
            this.queryBigRoleParam.page_num = 0;
            this.queryBigRoleParam.page_size = 9999;
            this.queryBigRoleParam.fk_creator_unit_id = this.queryMenuInfo.unit_id;
            PrivilegeCnt.cloud.getPrivilege(this.queryBigRoleParam).then((res: AxiosResponse) => {
                if (res && res.data) {
                    this.fullLoading = false;
                    if (res.data.status == 200) {
                        if (!res.data.data || !res.data.data.content) return;
                        this.bigRoleList = res.data.data.content;
                        // console.log(this.bigRoleList)
                        this.selectRole = this.bigRoleList[0].id;
                        this.queryMenuInfo.role_id = this.bigRoleList[0].id;
                        this.queryMenuInfo.role_rank = this.bigRoleList[0].role_rank;
                        this.queryMenuInfo.role_type = this.bigRoleList[0].role_type;
                        this.getMenuList();
                        return;
                    }
                    this.any().$message.error(res.data.message);
                }
            });
        }
        getMenuList(): void {
            this.fullLoading = true;
            PrivilegeCnt.cloud.find_menus_by_unit_and_role(this.queryMenuInfo).then((res: AxiosResponse) => { // 需修改!
                this.fullLoading = true;
                if (res && res.data) {
                    this.fullLoading = false;
                    if (res.data.status === '200') {
                        this.menuList = [];
                        this.unitRoleMenus = [];
                        this.checkOpenConfig = '';
                        this.menuList = res.data.data.user_menus;
                        this.unitRoleMenus = res.data.data.unit_role_menus;
                        if (res.data.data.unit_role_menus.length > 0) {
                            for (let a = 0; a < this.unitRoleMenus.length; a++) {
                                if (a === this.unitRoleMenus.length - 1) {
                                    this.checkOpenConfig += this.unitRoleMenus[a].menu_info_do.id;
                                } else {
                                    this.checkOpenConfig += this.unitRoleMenus[a].menu_info_do.id + ",";
                                }
                            }
                        } else {
                            this.checkOpenConfig = '';
                        }
                        //获取子系统下拉列表
                        let param = new ProjectParam();
                        PrivilegeCnt.cloud.find_list(param).then((res: AxiosResponse) => {
                            this.findList = res.data.data.list;
                            for (let i = 0; i < this.menuList.length; i++) {
                                for (let j = 0; j < this.findList.length; j++) {
                                    if (this.menuList[i].menu_info_do.system_name_do.id === this.findList[j].id && this.menuList[i].menu_info_do.parent_id === "0") {
                                        if (this.findList[j].module) {
                                            this.findList[j].module.push(this.menuList[i]);
                                        } else {
                                            this.findList[j].module = [];
                                            this.findList[j].module.push(this.menuList[i]);
                                        }
                                    }
                                }
                            }
                        });
                    } else {
                        this.any().$message.error(res.data.message);
                        this.findList = [];
                    }
                }
            });


        }

        // 点击模块按钮
        onOpenConfig(value): void {
            this.openMenuID = value.menu_info_do.id;
            this.booleanBtn = false;
            this.configVisible = true;
            this.openModule = value.menu_info_do.menu_name;
            this.openConfigList = [];
            this.openConfigList.push({sel: false, id: value.menu_info_do.id, value: value, label: this.openModule});
            // this.openConfigList
            // this.unitRoleMenus
            let obj = this.menuList;
            this.openConfigList[0].children = this.filterArray(obj, value.menu_info_do.id);
            this.checkList = [];
            let self = this;
            setTimeout(function(){
                self.checkList = self.checkOpenConfig.split(',')
            }, 100);
            setTimeout(function(){
                self.booleanBtn = true;
            }, 500)
        }
        filterArray(data, parent): any {
            var tree: any[] = [];
            var temp;
            for (var i = 0; i < data.length; i++) {
                if (data[i].menu_info_do.parent_id == parent) {
                    var obj = {sel: false, id: data[i].menu_info_do.id, value: data[i], label: data[i].menu_info_do.menu_name, children: []};
                    temp = this.filterArray(data, data[i].menu_info_do.id);
                    if (temp.length > 0) {
                        obj.children = temp;
                    }
                    tree.push(obj);
                }
            }
            return tree;
        }




        onConfigConfirm(): void {
            this.fullLoading = true;
            this.saveList.delete_menus = this.delConfig;
            this.saveList.save_menus = this.addConfig;
            this.saveList.role_id = this.queryMenuInfo.role_id;
            this.saveList.unit_id = this.queryMenuInfo.unit_id;
            PrivilegeCnt.cloud.openConfigSave(this.saveList).then((res: AxiosResponse) => {
                if (res && res.data) {
                    this.fullLoading = false;
                    if (res.data.status === "200") {
                        this.configVisible = false;
                        this.any().$notify.success({title: '提示',message: '配置成功'});
                        this.getMenuList();
                    } else {
                        this.any().$message.error(res.data.message);
                    }
                }
            })
        }

        // 选择角色
        onSelectRole(item): void {
            this.configVisible = false;
            this.addConfig = [];
            this.delConfig = [];
            this.selectRole = item.id;
            this.queryMenuInfo.role_id = item.id;
            this.queryMenuInfo.role_rank = item.role_rank;
            this.queryMenuInfo.role_type = item.role_type;
            console.log(item);
            this.getMenuList();
        }
    }

</script>

<style  lang="scss">
    .config-wrap {
        width: 1188px;
        margin-left: 137px;
        margin-top: 10px;
    }

    .el-main {
        padding: 24px;
        min-height: 593px;
        text-align: left;
        background-color: #FFFFFF;
        .my-checkbox {
            margin-bottom: 20px;

        }
    }

    .top {
        width: 100%;
        height: 54px;
        line-height: 54px;
        font-size: 20px;
        color: rgba(119, 119, 119, 1);
        background: rgba(238, 238, 238, 1);
        border: 1px solid rgba(224, 224, 224, 1)
    }

    .title {
        margin-bottom: 10px;
        font-size: 18px;
        .y_span {
            display: inline-block;
            width: 2px;
            height: 16px;
            background-color: rgba(119, 119, 119, 1);
            margin-right: 11px;
        }
    }

    .line {
        height: 1px;
        margin-top: 50px;
        margin-bottom: 36px;
        border-bottom: 1px dashed rgba(226, 226, 226, 1);
    }
    .update_btn_confirm, .update_btn_confirm:hover, .update_btn_confirm:active {
        height:29px;
        line-height: 5px;
        background:rgba(13,186,158,1);
        border-radius:4px;
        border: 1px solid transparent;
    }
    .update_btn_cancel, .update_btn_cancel:hover, .update_btn_cancel:active {
        height:29px;
        line-height: 5px;
        margin-right: 45px;
        border: 1px solid #ddd;
        border-radius:4px;
    }

    #btn-wrap{
        display: flex;
        flex-wrap: wrap;
        .role-btn{
            margin-left: 0;
            margin-right: 10px;
            min-width: 126px;
            margin-bottom: 6px;
        }
        .btn-active{
            background-color: #67c23a;
            color: #FFFFFF;
        }
    }

    .el-dialog {
        overflow:hidden;
        table-layout: fixed;
        word-wrap:break-word;
        word-break:break-all;
    }
    .el-tree-node__content {
        height: 35px;
    }
</style>
