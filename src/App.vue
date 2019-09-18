<template>
    <div id="app" style="background-color: #fafafa;">
        <el-row id="header" v-if="user">
            <el-col  v-if="!user.user_account">
                <el-button style="float: right;margin: 15px 75px 0 0;" type="primary" @click="onToLogin()">
                    登录
                </el-button>
            </el-col>
            <el-col v-if="user.user_account">
                <el-button style="float: right;margin: 20px 75px 0 0;" type="primary" plain size="mini" @click="onGoToHomePage(1)">
                    角色切换
                </el-button>
                <el-button style="float: right;margin: 20px 75px 0 0;" type="primary" plain size="mini" @click="onLogout()">
                    注销
                </el-button>
                <span style="float: right;margin: 25px 75px 0 0;color:#fff;">
                    欢迎登录: {{user.custom_user_name ? user.custom_user_name : user.user_account}}
                </span>
            </el-col>
        </el-row>
        <el-row class="pad_45" style="width: 1366px;margin: 0 auto">
            <el-breadcrumb separator-class="el-icon-arrow-right" class="color_a2">
                <el-breadcrumb-item><span @click="onGoToHomePage(2)" style="cursor: pointer">首页</span></el-breadcrumb-item>

                <el-breadcrumb-item v-if="titleOneName">{{titleOneName}}</el-breadcrumb-item>
                <el-breadcrumb-item v-if="titleTwoName">{{titleTwoName}}</el-breadcrumb-item>
            </el-breadcrumb>
        </el-row>

        <el-row style="width: 1366px;margin: 0 auto;">
            <el-col :span="3" class="outer-container" style="margin-left: 8px;" v-loading="menuLoading">
                <el-col :span="3" class="left_menu b_color_ff">
                        <el-menu class="el-menu-vertical-demo" unique-opened  :default-openeds="keyMenu">
                            <el-submenu v-for="(item, key) in menuList" :index="key.toString()">
                                <template slot="title">
                                    <el-row class="left_menu_span">
                                        <el-col :span="3">
                                            <span class="border_left"></span>
                                        </el-col>
                                        <el-col :span="20" class="color_80cec6">
                                            <span class="left_menu_span">{{item.bm ? item.bm : item.menu_info_do.menu_name}}</span>
                                        </el-col>
                                    </el-row>
                                </template>
                                <el-menu-item-group>
                                    <span :class="{'color_a2': true, 'left_menu_span': true, 'pad_left_17': true,
                                          'pitch_on': val.menu_info_do.id === classID}" v-for="(val, index) in item.children"
                                          @click="onMenuSkip(item, val, key)"
                                          id="title_ceshi">{{val.bm ? val.bm : val.menu_info_do.menu_name}}
                                    </span>
                                </el-menu-item-group>
                            </el-submenu>
                        </el-menu>
                    </el-col>
            </el-col>

           <router-view @getMenu="getMenuList" style="min-height: 630px;"/>

        </el-row>
    </div>
</template>

<script lang="ts">

    import "babel-polyfill";
    import {Component, Watch, XtRouter, XtVue} from "./common/common";
    import FieldAddCnt from "./components/field-add/field-add.cnt"
    import UserCnt from "./components/user/user.cnt"
    import {AxiosResponse} from "axios";
    import {MenuByUser} from "./components/user/user.def";



    @Component
    export default class App extends XtVue {
        private titleOneName: string | null = null;
        private titleTwoName: string | null = null;
        // private infoName: any[] = [];
        // private admin: any[] = [{name: '字段管理'}];
        // private adminUpdate: number = 0;
        private user: any = '';
        // private user_rank: any = '';
        private privilegeList: object[] = [{title: '权限管理'}, {title: '用户权限'}];
        private systemID: any = '';
        private val: any = '';
        private menuList: any[] = [];
        private classID: string | null = null;
        private keyMenu: any[] = [];
        private menuByUser: MenuByUser = new MenuByUser();
        private menuLoading: boolean = false;




        mounted() {
            if (window.sessionStorage.getItem("menuObj")){
                let menuObj: any = window.sessionStorage.getItem("menuObj");
                this.keyMenu = [];
                this.titleOneName = '';
                this.titleTwoName = '';
                this.classID = '';
                this.keyMenu[0] = (JSON.parse(menuObj).index).toString();
                this.titleOneName = JSON.parse(menuObj).oneName;
                this.titleTwoName = JSON.parse(menuObj).twoName;
                this.classID = JSON.parse(menuObj).classID;
            }
            if (window.sessionStorage.getItem("user_info")) {
                this.user = window.sessionStorage.getItem("user_info");
                this.user = JSON.parse(this.user);
                this.menuByUser.role_id = this.user.role_info.id;
            } else {
                this.user = window.localStorage.getItem("user_info");
                this.user = JSON.parse(this.user);
                this.menuByUser.role_id = this.user.role_info.id;
                window.sessionStorage.setItem("user_info", JSON.stringify(this.user));
                let token: any = window.localStorage.getItem("token");
                window.sessionStorage.setItem("token", token);
            }

            if (window.sessionStorage.getItem("system_id")) {
                this.systemID = window.sessionStorage.getItem("system_id");
            } else {
                this.systemID = window.localStorage.getItem("system_id");
                window.sessionStorage.setItem("system_id", this.systemID);
            }
            if (!this.user) { this.onToLogin(); return;}
            this.menuByUser.system_id = this.systemID;
            if (this.titleOneName) { this.getMenuList(); }
            if (!window.sessionStorage.getItem("menuObj")) { XtRouter.skipNamed("HomePage"); }
        }


        getMenuList(id: string | null = null): void {
            this.menuLoading = true;
            if (id) { this.menuByUser.role_id = id; }
            UserCnt.cloud.find_menus_by_user(this.menuByUser).then((res: AxiosResponse) => {
                this.menuLoading = false;
                if (res && res.data) {
                    if (res.data.status === '200') {
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
                    } else {
                        this.any().$notify.error({title: '提示',message: res.data.message})
                    }
                }
            });
        }
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
                var value4 = b[x];
                if (value3 == value4) {
                    var value1 = a[p][k];
                    var value2 = b[p][k];
                    return value1 - value2;
                } else {
                    return value3 - value4;
                }

            }
        }

        // @Watch("adminUpdate")
        // adminChange(): void {
        //     this.admin = [{name: '字段管理'}];
        //     FieldAddCnt.cloud.list_tree_basic_info_attr().then((response: AxiosResponse) =>{
        //         this.infoName = response.data.data;
        //         for(let i = 0; i < this.infoName.length; i++) {
        //             this.admin.push(this.infoName[i]);
        //         }
        //     });
        // }

        onToLogin(): void {
            window.location.href = window.location.origin + '/login/login.html';
        }
        onGoToHomePage(type): void {
            if (type === 1) {
                XtRouter.skipNamed("HomePage");

            } else {
                window.location.href = window.location.origin + '/login/system.html';
            }
            this.titleOneName = '';
            this.titleTwoName = '';
            window.sessionStorage.removeItem("val");
            window.sessionStorage.removeItem("menuObj");
        }
        onLogout(): void {
            window.sessionStorage.removeItem('token');
            window.sessionStorage.removeItem('account');
            window.sessionStorage.removeItem('user_info');
            window.sessionStorage.removeItem('user');
            window.sessionStorage.removeItem('systemID');
            window.sessionStorage.removeItem("val");
            window.sessionStorage.removeItem("menuObj");
            window.sessionStorage.removeItem("unit_info");
            window.location.href = window.location.origin + '/login/login.html';
        }

        onMenuSkip(item, val, key): void {
            // console.log(item,val, val.menu_info_do.url)
            this.classID = val.menu_info_do.id;
            this.titleOneName = item.menu_info_do.menu_name;
            this.titleTwoName = val.menu_info_do.menu_name;
            let menuObj: object = {
                classID: this.classID,
                index: key,
                oneName: this.titleOneName,
                twoName: this.titleTwoName
            };
            window.sessionStorage.setItem("menuObj", JSON.stringify(menuObj));
            if (val.menu_info_do.url === "BlankPage") {
                window.sessionStorage.removeItem("val");
                window.sessionStorage.setItem("val", JSON.stringify(val));
                XtRouter.skipNamed("BlankPage", {indexInfo: val.xh ? val.xh : val.menu_info_do.order_number});
            } else {
                window.sessionStorage.removeItem("val");
                window.sessionStorage.setItem("val", JSON.stringify(val));
                XtRouter.skipNamed(val.menu_info_do.url, {val: val});
            }
        }
    };
</script>


<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        padding-bottom: 25px;
    }

    body, html, #app {
        margin: 0;
    }

    #header {
        height: 68px;
        width: 100%;
        min-width: 1366px;
        background-color: #24b79a;
    }
    #header>div {
        height: 68px;
    }
    .color_a2 { /* 左侧导航栏字体颜色 */
        color: #a2a2a2;
        font-size: 16px;
    }

    .dialog_center {
        text-align: center;
        border-top: 1px solid #cfcfcf;
        margin-top: -20px;
        padding-top: 15px;
    }

    .dialog_center .el-row {
        margin-bottom: 12px;
    }

    .dialog_center .el-select {
        width: 315px;
    }

    .left_menu span {
        display: inline-block;
        width: 113px;
    }

    .color_80cec6 { /* 二级菜单选中的字体样式 */
        color: #80cec6;
        font-size: 18px;
    }

    .left_menu_span { /* 三级菜单的字体样式 */
        font-size: 16px !important;
    }

    .left_menu_span:hover { /* 三级菜单的字体样式 */
        color: #80cec6;
        cursor: pointer;
    }

    .pitch_on { /* 三级菜单选中的字体样式 */
        background-color: #80cec6;
        color: #fff !important;
    }

    .border_left { /* 二级菜单选中后的左边框 */
        border-left: 4px solid #80cec6;
        height: 18px;
    }

    .b_color_ff { /* 内容区域背景颜色 */
        background-color: #fff;
    }

    .color_a2 { /* 左侧导航栏字体颜色 */
        color: #a2a2a2;
        font-size: 16px;
    }

    .left_menu { /* 左侧导航栏排版 */
        margin: 10px 8px 0 0 ;
        text-align: left;
        position: absolute;
        left: 0;
        overflow-x: hidden;
        overflow-y: auto;
    }
    .outer-container {
        overflow: hidden;
    }
    .outer-container, .left_menu {
        height: 650px;
        width: 130px;
    }
    .left_menu::-webkit-scrollbar {
        display: none;
    }

    .pad_left_17 { /* 左侧导航栏排版 */
        padding-left: 17px;
        line-height: 45px;
    }

    /*.b_color_fa { !* 全局背景 *!*/
        /*background-color: #fafafa;*/
    /*}*/

    .el-table th > .cell { /* 表头字体 */
        font-size: 18px;
        font-weight: normal;
    }
    .el-table thead{
        color:#777;
    }
    .pad_45 { /* 全局padding */
        padding: 25px;
    }

    .file {
        background: url("./assets/icon/guidang.png");
    }

    .file:hover {
        background: url("./assets/icon/guidang-h.png");
    }

    .update {
        margin-right: 8px;
        background: url("./assets/icon/bianji.png");
    }

    .update:hover {
        background: url("./assets/icon/bianji-h.png");
    }

    .del {
        background: url("./assets/icon/shanchu.png");
    }

    .del:hover {
        background: url("./assets/icon/shanchu-h.png");
    }
    .disabled_update {
        background: url("./assets/icon/bianji-n.png");
        margin-right: 8px;
    }
    .disabled_del {
        background: url("./assets/icon/shanchu-n.png");
    }
    /*停用、启用样式*/
    .status-style{
        display: inline-block;
        height: 19px;
        width: 40px;
        cursor: pointer;
        margin-right: 8px;
        margin-left: 9px;
    }
    /*启用*/
    .btn-start-using{
        background: url("./assets/icon/qiyong.png");
    }
    /*停用*/
    .btn-no-start-using{
        background: url("./assets/icon/tingyong.png");
    }

    /*重置密码*/
    .btn-reset-pwd{
        background: url("./assets/icon/reset-pwd.png");
    }
    .btn-reset-pwd:hover{
        background: url("./assets/icon/reset-pwd-h.png");
    }
    .btn-reset-pwd-no{
        background: url("./assets/icon/reset-pwd-n.png");
    }

    .el-submenu__title { /* element-ui导航栏 */
        padding: 0 !important;
    }
    .el-submenu__title i {
        height: 0;
        display: none;
    }
    .el-menu-item-group__title {
        display: none;
    }

    .el-table td {
        text-align: center !important;
    }

    .el-dialog {
        max-height:550px;
        min-width: 500px;
        overflow-y: auto !important;
    }

    .el-select .el-input__inner{
        cursor: text !important;
    }

    .required {
        color: red;
    }
    .el-table--fit {
        border: 1px solid rgba(230,230,230,1);
    }
    /*面包屑*/
    .el-breadcrumb__inner.is-link {
        color: #a2a2a2;
        font-size: 18px;
        font-weight: 500;
    }
    .el-breadcrumb__inner {
        font-size: 18px;
        color: #a2a2a2 !important;
    }

    .float_right {
        float: right;
        z-index: 2;
    }
</style>
