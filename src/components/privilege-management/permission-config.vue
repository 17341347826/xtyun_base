<template>
    <div class="config-wrap">
        <div class="top">
            雅安市教育局
        </div>
        <div class="el-main" id="first">
            <div v-for="item in systemName">
                <div class="title">
                    <span class="y_span"></span>
                    <span v-if="item">{{item.system_name}}</span>
                </div>
                <!--<el-button style="border: none" v-for="value in (item.module)" @click="onOpenConfig(value)">{{item.bm ? item.bm : value.menu_info_do.menu_name}}</el-button>-->
            </div>
            <el-row style="text-align: center">
                <el-button type="primary" size="medium" @click="cancelBtn">取消</el-button>
                <el-button type="warning" size="medium" @click="saveBtn">保存</el-button>
            </el-row>
        </div>
        <div class="main-container">


        </div>
        <el-dialog title="选择权限" :visible.sync="dialogVisible">
            <div>
                <el-tree :data="menuData" show-checkbox node-key="id" :default-expanded-keys="[31, 32]" :default-checked-keys="[44]" :props="defaultProps">
                </el-tree>
                <el-row style="text-align: center">
                    <el-button type="success" size="medium" @click="save">确定</el-button>
                    <el-button type="danger" size="medium" @click="dialogVisible = false">取消</el-button>
                </el-row>
            </div>
        </el-dialog>
    </div>
</template>

<script lang="ts">
    import {CombinMenuList, QueryMenuInfo} from "./privilege-management.def";
    import {XtVue, Component} from "../../common/common";
    import PrivilegeCnt from './privilege-management.cnt';
    import {AxiosResponse} from 'axios';

    @Component
    export default class Config extends XtVue{
        private defaultProps =  {};
        private menuData:Array<any> = [];

        //通过单位和角色查询菜单请求参数
        private unitRoleMenuReq: QueryMenuInfo = new QueryMenuInfo();
        //获取当前用户（登陆者）菜单信息列表
        public userMenuList: any = [];
        //系统名称
        public systemName: Array<any> = [];
        //获取当前选中角色菜单信息列表
        public menuList: Array<any> = [];

        //选择权限弹框
        private dialogVisible:boolean = false;


        mounted() {
            let useInfo: any = window.sessionStorage.getItem('user_info');
            useInfo = JSON.parse(useInfo);
            this.unitRoleMenuReq.unit_id = useInfo.fk_unit_id;
            //角色id
            if (window.sessionStorage.getItem('role_id')) {
                let roleID: any = window.sessionStorage.getItem('role_id');
                this.unitRoleMenuReq.role_id = roleID.toString();
            }
            //获取菜单信息
            PrivilegeCnt.cloud.find_menus_by_unit_and_role(this.unitRoleMenuReq).then((res: AxiosResponse) => {
                if (res && res.data) {
                    if (res.data.status != 200) {
                        this.any().$message.error(res.data.message);
                        return;
                    }
                    this.menuList = res.data.data.unit_role_menus;
                    let list: any = res.data.data.user_menus;
                    //系统去重集合
                    this.systemName = this.searchSystemName(list);
                    //取出每个系统对应的菜单组合组成新数组
                    this.userMenuList = this.combinSystemMenu(this.systemName,list);
                    console.log(this.systemName)
                    // this.userMenuList = res.data.data.user_menus;
                }
            });
            this.defaultProps = {
                children: 'children',
                label: 'label'
            };
            this.menuData = [{
                id: 1,
                label: '系统信息',
                children: [
                    {
                        id: 21,
                        label: '基础信息',
                        children: [
                            {
                                id: 31,
                                label: '学生管理'
                            },
                            {
                                id: 32,
                                label: '教师管理',
                                children: [
                                    {
                                        id: 41,
                                        label: '教师任课'
                                    },
                                    {
                                        id: 42,
                                        label: '教师列表',
                                        children: [
                                            {
                                                id: 51,
                                                label: '查看教师档案'
                                            },
                                            {
                                                id: 52,
                                                label: '删除教师档案'
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                id: 33,
                                label: '年级管理'
                            },
                            {
                                id: 34,
                                label: '学期管理'
                            },
                            {
                                id: 35,
                                label: '科目管理'
                            }
                        ]
                    },
                    {

                        id: 22,
                        label: '用户管理',
                        children:[
                            {
                                id:36,
                                label:'学生管理',
                                children:[
                                    {
                                        id:44,
                                        label:'增加学生'
                                    },
                                    {
                                        id:45,
                                        label:'修改学生信息'
                                    },
                                    {
                                        id:46,
                                        label:'重置学生密码'
                                    }
                                ]
                            },
                            {
                                id:37,
                                label:'学情分析'
                            }
                        ]
                    }
                ]
            }];
        }

        /**
         * 获取系统信息并去重
         * */
        public searchSystemName(ary:any): any{
            let draw_ary: any = [];
            let new_ary: any = [];
            let obj: object = {};
            for(let i=0;i<ary.length;i++){
                draw_ary.push(ary[i].menu_info_do.system_name_do);
            }
            //数组对象去重:利用对象访问属性的方法，判断对象中是否存在key
            //此处通过系统id去重
            for(let j=0;j<draw_ary.length;j++){
                if(!obj[draw_ary[j].id]){
                    new_ary.push(draw_ary[j]);
                    obj[draw_ary[j].id] = true;
                }
            }
            return new_ary;
        }

        /**
         * 系统对应菜单组合形成新数组
         * sysAry-系统数组集合，ary-所有菜单集合
         * */
        public combinSystemMenu(sysAry:any,menuAry:any): any{
            let self: any = this;
            let lastAry: any = [];
            //将各个系统和他的菜单分离出来
            for(let i=0;i<sysAry.length;i++){
                // let oneObj: object = {systemInfo:{},menuInfo:[]};
                let oneObj : CombinMenuList = new CombinMenuList();
                oneObj.systemInfo = sysAry[i];
                //获取当前系统所有菜单
                let mixedMenu: any = [];
                mixedMenu = this.serchNameAry(menuAry,sysAry[i].id);
                mixedMenu = [
                    {
                        time:'2019-01-01',
                        menu_info_do:{
                            id:'10',
                            name:'评级指标管理',
                            parent_id:'0',
                        }
                    },
                    {
                        time:'2019-01-01',
                        menu_info_do:{
                            id:'11',
                            name:'档案查看',
                            parent_id:'0',
                        }
                    },
                    {
                        time:'2019-01-01',
                        menu_info_do:{
                            id:'12',
                            name:'安全管理',
                            parent_id:'0',
                        }
                    },
                    {
                        time:'2019-01-01',
                        menu_info_do:{
                            id:'41',
                            name:'行政指标列表查看按钮',
                            parent_id:'31',
                        }
                    },
                    {
                        time:'2019-01-01',
                        menu_info_do:{
                            id:'31',
                            name:'行政指标列表',
                            parent_id:'23',
                        }
                    },
                    {
                        time:'2019-01-01',
                        menu_info_do:{
                            id:'23',
                            name:'行政指标',
                            parent_id:'10',
                        }
                    },
                    {
                        time:'2019-01-01',
                        menu_info_do:{
                            id:'21',
                            name:'成长档案',
                            parent_id:'11',
                        }
                    },
                    {
                        time:'2019-01-01',
                        menu_info_do:{
                            id:'22',
                            name:'毕业档案',
                            parent_id:'11',
                        }
                    },
                    {
                        time:'2019-01-01',
                        menu_info_do:{
                            id:'32',
                            name:'毕业档案详情',
                            parent_id:'22',
                        }
                    },
                ]
                let lastAry: any = [];
                //对菜单按级别排序
                oneObj.menuInfo = this.recursionMenus(mixedMenu,'0',lastAry);
                lastAry.push(oneObj);
            }
            //将各个系统的菜单整理成正确格式

            return lastAry;
        }

        /**
         * 菜单列表数组对象根据参数取出对象组成新数组
         * ary-数组，key-键，name-值
         * */
        public serchNameAry(ary:any,name:any): any{
            let new_ary: any = [];
            for(let a=0;a<ary.length;a++){
                if(name == ary[a].menu_info_do.system_name_do.id){
                    new_ary.push(ary[a]);
                }
            }
            return new_ary;
        }

        /**
         * 获取每一级的菜单
         * */
        public getMenu(parentID, menu) {
            let menuLength = menu.length;
            let arr: Array<any> = [];
            for (let i = 0; i < menuLength; i++) {
                if (menu[i].menu_info_do.parent_id == parentID) {
                    arr.push(menu[i]);
                }
            }
            return arr;
        }

        /**
         * 每个系统的菜单层级：递归
         * menuList:菜单列表，pId:上级菜单id
         * */
        public recursionMenus(menuList,pId,lastAry): void{
            // console.log(menuList);
            if(menuList.length == 0) return lastAry;
            for(let i=0;i<menuList.length;i++){
                if(pId == menuList[i].menu_info_do.parent_id){
                    lastAry.push(menuList[i]);
                    let pAry: any = [];
                    this.recursionMenus(menuList,menuList[i].menu_info_do.id,pAry);
                }
            }
            return lastAry;
        }


        public saveBtn():void{

        }
        public cancelBtn():void{

        }
        public save():void{

        }
    }

</script>

<style scoped lang="scss">
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
</style>
