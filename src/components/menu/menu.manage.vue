<template>
    <el-row class="menu_mana">
        <div class="projects">
            <el-select v-model="menuParam.system_id" @change="queryMenus(true)" clearable placeholder="请选择子系统" value="">
                <el-option
                    v-for="item in projects"
                    :key="item.id"
                    :label="item.system_name"
                    :value="item.id">
                </el-option>
            </el-select>
        </div>



        <el-button size="mini" type="primary" plain @click="onMenuAppend(1)">
            添加一级菜单
        </el-button>
        <!--:expand-on-click-node="false"  点击三角才展开-->
        <el-row>
            <div class="custom-tree-container">
                <div class="block">
                    <el-tree
                        :data="menuList"
                        node-key="id"
                        draggable
                        :expand-on-click-node="false"
                        @node-drop="prentUpdate"
                        default-expand-all>
                        <span class="custom-tree-node" slot-scope="{ node, data }">
                            <span style="display: inline-block;text-align: left;min-width: 80px;">{{ data.menu_info_do.menu_name }}</span>
                            <span>
                                <el-button type="text" size="mini" @click="onMenuAppend(data)">
                                    <i class="el-icon-circle-plus-outline" style="font-size: 16px"></i>
                                </el-button>
                                <el-button type="text" size="mini" @click="onMenuRemove(node, data)">
                                    <img src="../../assets/privilege/delete-config.png" style="width: 60%;">
                                </el-button>
                                <el-button type="text" size="mini" @click="onMenuUpdate(data)">
                                    <img src="../../assets/privilege/update-config.png" style="width: 60%;">
                                </el-button>
                            </span>
                        </span>
                    </el-tree>
                </div>
            </div>
        </el-row>

        <el-dialog
            :title="menuTitle"
            :close-on-click-modal="false"
            :visible.sync="newAdd"
            width="30%"
            center>
            <el-row class="dialog_center">
                <el-row>
                    <el-tooltip class="item" effect="dark" content="名称" placement="right">
                        <el-input v-model="menu.menu_name" placeholder="名称" style="width: 315px"
                                  maxlength="32"></el-input>
                    </el-tooltip>
                </el-row>
                <el-row>
                    <el-tooltip class="item" effect="dark" content="类型" placement="right">
                        <el-select v-model.number="menu.menu_type" placeholder="类型" clearable value="">
                            <el-option label="目录" :value="0"></el-option>
                            <el-option label="菜单" :value="1"></el-option>
                            <el-option label="按钮" :value="2"></el-option>
                        </el-select>
                    </el-tooltip>
                </el-row>
                <el-row>
                    <el-tooltip class="item" effect="dark" content="路径(URL)" placement="right">
                        <el-input v-model="menu.url" placeholder="路径(URL)" style="width: 315px"
                                  maxlength="64"></el-input>
                    </el-tooltip>
                </el-row>
                <!--<el-row v-show="Number(menu.menu_type) === 2">-->
                    <!--<el-select v-model="menu.button_identify" placeholder="按钮标识" clearable value="">-->
                        <!--<el-option :label="btnIdentify.button_name" :value="btnIdentify.button_identify"-->
                                   <!--v-for="btnIdentify in btnIdentifyList"></el-option>-->
                    <!--</el-select>-->
                <!--</el-row>-->
                <el-row>
                    <el-tooltip class="item" effect="dark" content="按钮标识" placement="right">
                        <el-input v-model="menu.button_identify" placeholder="按钮标识" style="width: 315px" maxlength="15"></el-input>
                    </el-tooltip>
                </el-row>

                <el-row v-show="Number(menu.menu_type) !== 2">
                    <el-tooltip class="item" effect="dark" content="图片(icon)" placement="right">
                        <el-input v-model="menu.icon" placeholder="图片(icon)" style="width: 315px" maxlength="32"></el-input>
                    </el-tooltip>
                </el-row>
                <el-row>
                    <el-tooltip class="item" effect="dark" content="排序号" placement="right">
                        <el-input v-model="menu.order_number" placeholder="排序号" style="width: 315px" clearable maxlength="10"></el-input>
                    </el-tooltip>
                </el-row>
                <el-row>
                    <el-tooltip class="item" effect="dark" content="备注" placement="right">
                        <el-input v-model="menu.remark" placeholder="备注" style="width: 315px" clearable
                                  maxlength="30"></el-input>
                    </el-tooltip>
                </el-row>

                <el-row>
                    <el-row style="display: block;width: 315px;min-height: 75px;border: 1px solid #dddddd;border-radius: 4px;margin: 0 auto">
                        <el-checkbox-group v-model="checkedBigRole" style="text-align: left">
                            <el-checkbox v-for="item in bigRoleList" :label="item.role_rank + '-' + item.role_type"
                                         :key="item.id" style="width: 150px;margin-left: 5px">
                                {{item.role_name}}
                            </el-checkbox>
                        </el-checkbox-group>
                        {{checkedBigRole}}
                    </el-row>
                </el-row>

            </el-row>
            <span slot="footer">
                <el-button @click="newAdd=false" class="update_btn_cancel">取 消</el-button>
                <el-button type="primary" @click="newAddSubmit" class="update_btn_confirm">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog
            title="确定删除"
            :visible.sync="newDelete"
            width="30%">
            <div style="text-align: left">是否删除该条菜单？</div>
            <span slot="footer" class="dialog-footer">
                <el-button class="del_btn_cancel" @click="newDelete = false">取 消</el-button>
                <el-button class="del_btn_confirm" type="danger" @click="newDeleteMenu()">确 定</el-button>
            </span>
        </el-dialog>










    </el-row>
</template>

<script lang="ts">
    import {XtVue, Component} from "../../common/common";
    import {AxiosResponse} from "axios";
    import {Menu, MenuParam, Project, ProjectParam, MenuByUser} from "./menu.def";
    import menuCnt from "./menu.cnt";
    import {QueryBigRoleParam} from "../privilege-management/privilege-management.def";

    @Component
    export default class MenuManage extends XtVue {
        private menuByUser: MenuByUser = new MenuByUser();
        private projects: Project[] = []; // 子系统列表
        private menuParam = new MenuParam(); // 菜单查询参数
        private menus: any = []; // 所有菜单数据
        private menu: Menu = new Menu(); // 添加或修改菜单（ dialog中 ）
        private addVisible: boolean = false; // 修改或添加dialog是否显示
        private btnIdentifyList: any = []; // 按钮标识列表
        //查询大角色参数
        private queryBigRoleParam: QueryBigRoleParam = new QueryBigRoleParam();
        //大角色下拉列表--所有角色列表
        private bigRoleList: any = [];
        private checkedBigRole: any = []; // 勾选的角色

        //目录
        private directories: any = [];
        //一级菜单
        private firstMenu: any = [];
        //二级菜单
        private secondMenu: any = [];
        //三级菜单
        private threeMenu: any = [];
        //四级菜单
        private fourMenu: any = [];

        //默认选择的目录
        private dirDefault: number = 0;
        private firstMenuDefault: number = 0;
        private secondMenuDefault: number = 0;
        private threeMenuDefault: number = 0;
        private fourMenuDefault: number = 0;

        private deleteMenuId: string = ""; // 需要删除的菜单id

        //------------------------------------
        private menuList: any[] = [];
        private menuTitle: string | null = null;
        private newAdd: boolean = false;
        private newDelete: boolean = false;


        // 删除↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
        onMenuRemove(node, data): void {
            console.log('删除按钮', node, data, data.menu_info_do.menu_name);
            this.menuTitle = '删除当前菜单';
            this.newDelete = true;
            this.deleteMenuId = data.menu_info_do.id;
        }
        newDeleteMenu(): void {
            menuCnt.cloud.deleteMenu(this.deleteMenuId).then((res: AxiosResponse) => {
                if (res && res.data) {
                    if (res.data.status == 200) {
                        this.newDelete = false;
                        this.any().$message({ message: "删除成功", type: "success" });
                        this.queryMenus(false);
                        return;
                    }
                    this.any().$message.error(res.data.message);
                }
            });
        }
        // 删除↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑



        // 新增↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
        onMenuAppend(data): void {
            this.menuTitle = '添加下级菜单';

            this.menu = new Menu();
            this.checkedBigRole = [];
            this.newAdd = true;
            if (data === 1) {
                this.menu.parent_id = '0';
            } else {
                this.menu.parent_id = data.menu_info_do.id;
            }
        }
        newAddSubmit(): void {
            this.menu.system_name_do.id = this.menuParam.system_id;
            if (this.menu.menu_type !== 2) {
                this.menu.button_identify = '';
            }
            this.menu.visible_roles = this.checkedBigRole.toString();
            if (this.menuTitle === '修改当前菜单') {
                menuCnt.cloud.updateMenus(this.menu).then((res: AxiosResponse) => {
                    if (res && res.data) {
                        if (res.data.status === "200") {
                            this.any().$message.success(res.data.message);
                            this.newAdd = false;
                            console.log(this.menu.menu_name);
                            this.menu = new Menu();
                            this.queryMenus(false);
                            return;
                        }
                        this.any().$message.error(res.data.message);
                    }
                });
                return;
            }
            if (this.menuTitle === '添加下级菜单') {
                delete this.menu.id;
                menuCnt.cloud.addMenus(this.menu).then((res: AxiosResponse) => {
                    if (res && res.data) {
                        if (res.data.status === "200") {
                            this.any().$message.success(res.data.message);
                            this.newAdd = false;
                            this.menu = new Menu();
                            this.queryMenus(false);
                            return;
                        }
                        this.any().$message.error(res.data.message);
                        //  这里要调修改接口大氿歌
                    }
                });
            }

        }
        // 新增↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑



        // 修改↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
        onMenuUpdate(data): void {
            this.menuTitle = '修改当前菜单';
            this.newAdd = true;

            if (data.menu_info_do.visible_roles) {
                let str: string = data.menu_info_do.visible_roles;
                this.checkedBigRole = str.split(',');
            }
            this.menu.id = data.menu_info_do.id;
            this.menu.menu_name = data.menu_info_do.menu_name;
            this.menu.menu_type = data.menu_info_do.menu_type;
            this.menu.order_number = data.menu_info_do.order_number;
            this.menu.system_name_do.id = data.menu_info_do.system_name_do.id;
            this.menu.url = data.menu_info_do.url;
            this.menu.icon = data.menu_info_do.icon;
            this.menu.parent_id = data.menu_info_do.parent_id;
            this.menu.button_identify = data.menu_info_do.button_identify;
        }
        // 拖动变更父级
        prentUpdate(self, prent, where, $event): void {
            let selfInfo = self.data.menu_info_do;
            console.log($event);
            this.menu.button_identify = selfInfo.button_identify;
            this.menu.icon = selfInfo.icon;
            this.menu.id = selfInfo.id;
            this.menu.menu_name = selfInfo.menu_name;
            this.menu.menu_type = selfInfo.menu_type;
            this.menu.order_number = selfInfo.order_number;
            if (where === 'inner') {
                this.menu.parent_id = prent.data.menu_info_do.id;
            } else {
                this.menu.parent_id = '0';
            }
            this.menu.permission = selfInfo.permission;
            this.menu.remark = selfInfo.remark;

            this.menu.url = selfInfo.url;
            this.menu.system_name_do = { id: selfInfo.system_name_do.id };
            menuCnt.cloud.updateMenus(this.menu).then((res: AxiosResponse) => {
                if (res && res.data) {
                    if (res.data.status === "200") {
                        this.any().$message.success(res.data.message);
                        this.menu = new Menu();
                        this.queryMenus(false);
                        return;
                    }
                    this.queryMenus(false);
                    this.any().$message.error(res.data.message);
                }
            });
        }
        // 修改↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑



        // 递归获取菜单
        filterArray(data, parent): any {
            let tree: any[] = [];
            let temp;
            for (var i = 0; i < data.length; i++) {
                if (data[i].menu_info_do.parent_id == parent) {
                    let obj = data[i];
                    temp = this.filterArray(data, data[i].menu_info_do.id);
                    if (temp.length > 0) {
                        obj.children = temp;
                    }
                    tree.push(obj);
                }
            }
            return tree;
        }
        // 菜单排序
        compare(x, p, k): any {
            return function(a,b){
                var value3 = a[x];
                var value4 = a[x];
                if (value3 == value4) {
                    var value1 = a[p][k];
                    var value2 = b[p][k];
                    return value1 - value2;
                } else {
                    return value3 - value4;
                }
            }
        }
        public mounted(): void {
            if (window.sessionStorage.getItem("user_info")) {
                let user: any = window.sessionStorage.getItem("user_info");
                user = JSON.parse(user);
                this.menuByUser.role_id = user.role_info.id;
            }
            //获取子系统下拉列表
            let param = new ProjectParam();
            menuCnt.cloud.getProjects(param).then((res: AxiosResponse) => {
                if (res && res.data) {
                    if (res.data.status === "200") {
                        if (res.data.data) {
                            this.projects = res.data.data.list;
                            if(this.projects.length>0){
                                this.menuParam.system_id = this.projects[0].id;
                                this.queryMenus(true);
                            }
                        }
                        return;
                    }
                    this.any().$message.error(res.data.message);
                }
            });
            this.listBigRole();
            this.getBtn();
            // this.queryRoles();
        }

        /**
         * 获取大角色列表
         * */
        public listBigRole(): void {
            //
            this.queryBigRoleParam.parent_id = "0";
            this.queryBigRoleParam.status = "1";
            menuCnt.cloud.getBitRolesHaveMe(this.queryBigRoleParam).then((res: AxiosResponse) => {
                if (res && res.data) {
                    if (res.data.status == 200) {
                        this.bigRoleList = [];
                        if (!res.data.data || !res.data.data.list) return;
                        for (let i = 0; i < res.data.data.list.length; i++) {
                            if (res.data.data.list[i].parent_id == '0') {
                                this.bigRoleList.push(res.data.data.list[i]);
                            //
                            }
                        }
                        return;
                    }
                    this.any().$message.error(res.data.message);
                }
            });
        }
        /**
         * 获取按钮标识
         * */
        public getBtn(): void {
            //
            this.queryBigRoleParam.parent_id = "0";
            this.queryBigRoleParam.status = "1";
            menuCnt.cloud.queryBtnIdentification().then((res: AxiosResponse) => {
                if (res && res.data) {
                    if (res.data.status == 200) {
                        this.btnIdentifyList = res.data.data.list;
                        return;
                    }
                    this.any().$message.error(res.data.message);
                }
            });
        }




        /**
         * 获取每一级的获取菜单
         * */
        public getMenu(parentID, menu) {
            if (menu.length > 0) {
                let menuLength = menu.length;
                let arr: any = [];
                for (let i = 0; i < menuLength; i++) {
                    if (menu[i].menu_info_do.parent_id == parentID) {
                        arr.push(menu[i]);
                    }
                }
                return arr;
            }
        }


        /**
         * @param menuList 全部菜单
         * 获取菜单
         * */
        public getMenus(menuList): void {
            this.directories = [];
            this.firstMenu = [];
            this.secondMenu = [];
            this.threeMenu = [];
            this.fourMenu = [];
            this.directories = this.getMenu(0, menuList);
            if (this.directories) {
                if (!this.directories.length) return;
            } else {
                return;
            }
            let dirID = this.directories[this.dirDefault].menu_info_do.id;
            this.firstMenu = this.getMenu(dirID, menuList);
            if (!this.firstMenu.length) return;
            let firstMenuId = this.firstMenu[this.firstMenuDefault].menu_info_do.id;
            this.secondMenu = this.getMenu(firstMenuId, menuList);
            if (!this.secondMenu.length) return;
            let secondMenuId = this.secondMenu[this.secondMenuDefault].menu_info_do.id;
            this.threeMenu = this.getMenu(secondMenuId, menuList);
            if (!this.threeMenu.length) return;
            let threeMenuId = this.threeMenu[this.threeMenuDefault].menu_info_do.id;
            this.fourMenu = this.getMenu(threeMenuId, menuList);
        }

        /**
         * 菜单查询
         * */
        public queryMenus(indexReset): void {
            this.menuByUser.system_id = this.menuParam.system_id;
            menuCnt.cloud.getUserMenus(this.menuByUser).then((res: AxiosResponse) => {
                if (res && res.data) {
                    if (res.data.status === "200") {
                        if (!res.data.data || !res.data.data.list) return;
                        this.menus = res.data.data.list;
                        let menuList = res.data.data.list;
                        if (indexReset) {
                            this.dirDefault = 0;
                            this.firstMenuDefault = 0;
                            this.secondMenuDefault = 0;
                            this.threeMenuDefault = 0;
                            this.fourMenuDefault = 0;
                        }
                        this.getMenus(menuList);

                        let arrMenu = res.data.data.list;
                        let index = 0;
                        this.menuList = [];
                        for (let i = 0; i < arrMenu.length; i ++) {
                            if (arrMenu[i].menu_info_do.parent_id === '0') {
                                this.menuList.push(arrMenu[i]);
                                this.menuList[index].children = [];
                                this.menuList[index].children = this.filterArray(arrMenu, arrMenu[i].menu_info_do.id);
                                this.menuList[index].children.sort(this.compare('xh','menu_info_do', 'order_number'));
                                this.menuList.sort(this.compare('xh','menu_info_do', 'order_number'));
                                index++;
                            }
                        }
                        return;
                    }
                    this.any().$message.error(res.data.message);
                }
            });
        }









    }
</script>

<style scoped lang="scss">
    @import "./menu.scss";
    .update_btn_confirm, .update_btn_confirm:hover, .update_btn_confirm:active {
        height:29px;
        line-height: 5px;
        background:rgba(13,186,158,1);
        border-radius:4px;
    }
    .update_btn_cancel, .update_btn_cancel:hover, .update_btn_cancel:active {
        height:29px;
        line-height: 5px;
        margin-right: 45px;
        border:1px solid rgba(191,191,191,1);
        border-radius:4px;
    }
</style>
