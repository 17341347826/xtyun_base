<template>
    <el-row>
        <div class="Login" id="fmLogin" v-show="!yetLogin">
            <el-container>
                <el-header>
                    <el-row class="header-pc">
                        <el-col :span="12"><div class="grid-content bg-purple"></div></el-col>
                        <el-col :span="12"><div class="grid-content bg-purple"></div>400-028-4088</el-col>
                    </el-row>
                    <el-row class='header-wx'>
                        <el-col><div class="grid-content bg-purple"></div></el-col>
                    </el-row>
                </el-header>
                <el-main style="z-index: 10000">
                    <el-row>
                        <el-col>
                            <el-form ref="form" :model="form">
                                <el-form-item class="form-name">
                                    <el-row style="padding-top: 25px;">
                                        <el-col style="color:#61c1b7">[高教版]</el-col>
                                    </el-row>
                                </el-form-item>

                                <el-form-item class="form-input">
                                    <span class="user-icon"></span>
                                    <el-input placeholder="请输入用户名" v-model="form.user_account" suffix-icon="el-icon-account"
                                              autofocus @keyup.enter.native="onLogin"/>
                                </el-form-item>
                                <el-form-item class="form-input">
                                    <span class="pwd-icon"></span>
                                    <el-input placeholder="请输入密码" v-model="form.user_password" suffix-icon="el-icon-account"
                                              type="password" @keyup.enter.native="onLogin"/>
                                </el-form-item>
                                <el-form-item class="login-btn">
                                    <el-button type="primary" @click="onLogin">登陆</el-button>
                                    <!--<el-button v-on:click="scan">扫一扫</el-button>-->
                                </el-form-item>


                            </el-form>
                        </el-col>

                    </el-row>
                </el-main>
                <el-footer>
                    <span class="header-pc">版权所有：2007-2018@成都兴唐信息技术有限公司&nbsp;&nbsp;蜀ICP备07501515号</span>
                    <span class='header-wx'> Copyright © 成都兴唐信息技术有限公司</span>
                </el-footer>
            </el-container>
        </div>
        <el-row id="home" v-show="yetLogin">
            <el-col style="margin-top: 10%;" :span="8" v-for="item in systemList">
                <el-button class="home_system" type="primary" @click="onGoToGetMenu(item)">
                    <span class="home_span">{{item.system_name}}</span>
                </el-button>
            </el-col>
        </el-row>
    </el-row>
</template>

<script lang="ts">

    import {UserLogin} from "./user.def";
    import UserCnt from './user.cnt';
    import {AxiosResponse} from 'axios';
    import {XtVue, Component, XtRouter} from "../../common/common";
    import {ProjectParam} from "../menu/menu.def";

    @Component
    export default class Login extends XtVue {
        public form: UserLogin = new UserLogin();
        private systemList: any[] = [];
        private yetLogin: boolean = false;


        private onLogin(): void {
            if (this.form.user_account === '') {
                this.any().$notify.error({ title: '提示', message: '请输入账号', });
                return;
            }
            if (this.form.user_password === '') {
                this.any().$notify.error({ title: '提示', message: '请输入密码', });
                return;
            }
            UserCnt.cloud.login(this.form).then((response:AxiosResponse) => {
                if(response.data.status != 200){
                    // if (response.data.status == 254) {if(response.data.message.indexOf('user_password') != -1) {this.any().$notify.error({title: '提示',message: '请输入密码',});return;}if(response.data.message.indexOf('user_account') != -1) {this.any().$notify.error({title: '提示',message: '请输入账号',});return;}}
                    this.any().$notify.error({ title: '提示', message: response.data.message, })
                }
                else{
                    this.getSystemList();
                    // 登陆成功
                    this.any().$notify({type:'success', title:'提示', message:'登陆成功'});
                    window.sessionStorage.setItem("token", response.data.data.token);
                    window.sessionStorage.setItem("user_info", JSON.stringify(response.data.data.user_info));
                    //存到本地，方便跳转其他项目使用
                    window.localStorage.setItem("token", response.data.data.token);
                    window.localStorage.setItem("user_info", JSON.stringify(response.data.data.user_info));
                    // this.$router.go(0);
                    this.yetLogin = true;
                }
            });
        }
        mounted() {
            window.location.href = window.location.origin + '/login/login.html';
        }

        getSystemList(): void {
            //获取子系统下拉列表
            let param = new ProjectParam();
            param.status = '1';
            UserCnt.cloud.getFindList(param).then((response: AxiosResponse) => {
                if (response && response.data) {
                    if (response.data.status === '200') {
                        this.systemList = response.data.data.list;
                    } else {
                        this.any().$message.error(response.data.message);
                    }
                }
            })
        }

        onGoToGetMenu(item): void {
            // window.location.href = item.main_index
            window.sessionStorage.setItem("system_id", item.id);
            window.localStorage.setItem("system_id", item.id);
            // window.location.href = 'http://base.xtyun.net/#/home';
            //临时跳转
            if(item.system_name == '新分数'){
                window.location.href = 'http://127.0.0.1:8082/#/' + item.main_index;
            } else if (item.system_name == '基础项目') {
                window.location.href = 'http://base.xtyun.net/#/home';
            } else {
                window.location.href = location.origin + '/#/' + item.main_index;
            }
            //暂时干掉刷新当前页
            this.$router.go(0);
        }

    }
</script>

<style >
    #fmLogin {
        color: #fefdfa;
        width: 100%;
        height: 100%;
        background-size: cover;
        position: fixed;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        background-image: url("image/login_background.png");
        overflow: auto;
    }
    #fmLogin .header-wx{
        display:none;
    }
    #fmLogin  .el-header{
        margin-top:10px;
        padding-left: 51px;
        padding-right: 69px;
    }
    #fmLogin  .el-header .el-row{
        height:64px;
        line-height:64px;
    }
    #fmLogin .el-header .el-col:first-child div{
        width:64px;
        height:64px;
        background-image: url("image/logo.png");
    }
    #fmLogin .el-header .el-col:last-child{
        text-align: right;
    }
    #fmLogin .el-header .el-col:last-child div{
        width:30px;
        height:30px;
        background-image: url("image/tel.png");
        background-repeat: no-repeat;
        background-position:right center;
        position: absolute;
        top: 17px;
        right: 121px;
    }
    #fmLogin .el-main{
        width: 333px;
        min-height: 353px;
        background-color: #ffffff;
        border-radius:7px;
        margin: auto;
        position: absolute;
        top: 53%;
        left: 75%;
        transform: translate(-50%, -50%);
        text-align: center;
        z-index: 0;
    }
    #fmLogin .el-main .form-name{
        height:34px;
        background-image: url("image/logo_name.png");
        background-repeat: no-repeat;
        background-position:center;
        margin-bottom: 60px;
        margin-top: 14px;
    }
    #fmLogin .el-main .form-input{
        position:relative;
    }
    #fmLogin .el-main .el-input,
    #fmLogin .el-main  .el-button{
        width: 250px;
        height: 38px;
        border-radius: 4px;
    }
    #fmLogin .el-main .el-input{
        background-color: #fff;
    }
    #fmLogin .el-main  .login-btn{
        margin-top:17px;
    }
    #fmLogin .el-input__inner {
        padding-left: 40px !important;
        border: 1px solid #ccc;
    }
    #fmLogin .el-main  .el-button{
        background-color: #22baad;
        border: none;
    }
    #fmLogin .el-main .user-icon,
    #fmLogin .el-main .pwd-icon{
        display: inline-block;
        position: absolute;
        left: 30px;
        z-index: 99999;
        top: 8px;
    }
    #fmLogin .el-main .user-icon{
        width:20px;
        height:23px;
        background-image: url("image/user_icon.png");
    }
    #fmLogin .el-main .pwd-icon{
        width:19px;
        height:22px;
        background-image: url("image/pwd-icon.png");
    }
    #fmLogin .el-form-item{
        margin-bottom: 0;
        padding-bottom: 10px;
    }
    #fmLogin .el-form-item__error{
        position: relative;
    }
    #fmLogin .el-footer{
        margin: 0;
        width: 100%;
        font-size: 14px;
        /*color: #fefdfa;*/
        position: fixed;
        text-align: center;
        bottom: 0;
        padding-top: 20px;
    }


    #home {
        color: #fefdfa;
        width: 100%;
        height: 100%;
        background-size: cover;
        position: fixed;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        background-image: url("image/login_background.png");
        overflow: auto;
    }
    .home_system {
        width: 300px;
        height: 125px;
    }
    .home_span {
        font-size: 28px;
    }
</style>
