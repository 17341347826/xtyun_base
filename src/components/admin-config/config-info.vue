<template>
    <el-col style="width: 1166px;background-color: #fff;margin-top: 10px;">
        <h2 style="height: 54px;background-color: #EEEEEE;line-height: 54px;margin: 0">{{oneName}}配置</h2>
        <el-col class="right_info">
            <el-checkbox :indeterminate="isWws" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
            <el-row v-for="item in childrenTow">
                <el-row class="tow_title">
                    {{item.name}}
                </el-row>
                <el-row style="text-align: left;margin: 10px 0 15px 18px;">
                    <el-checkbox-group v-model="checkList">
                        <el-checkbox v-for="(item, index) in item.childrens" :label="item.attr_name" style="width: 90px">
                            {{item.name}}
                        </el-checkbox>
                    </el-checkbox-group>
                </el-row>
            </el-row>
            <!--{{saveList.attr_config}}-->
            <!--<br>-->
            <!--{{checkList}}-->
            <el-row>
                <hr>
            </el-row>
            <el-row>
                <el-button class="button_width_97" size="small">取消</el-button>
                <el-button @click="onSave()" class="button_width_97 back_color" size="small">确定</el-button>
            </el-row>
        </el-col>
    </el-col>
</template>

<script lang="ts">

    import {Component, Watch, XtVue} from "../../common/common";
    import AdminConfigCnt from './admin-config.cnt';
    import {AxiosResponse} from "axios";
    import {SaveBasicInfo} from "./admin-config.def";


    @Component
    export default class AdminConfig extends XtVue {
        private indexInfo: number | string = 0;
        private oneName: string | null = null;
        private childrenTow: any[] = [];
        private checkList: any[] = [];
        private allList: any[] = [];
        private saveList: SaveBasicInfo = new SaveBasicInfo();
        private isWws: boolean = true;
        private checkAll: boolean = false;
        private id: string | null = null;


        mounted() {
            // console.log(this.$route.params.indexInfo);
            if (this.$route.params.indexInfo || this.$route.params.indexInfo == '0') {
                this.indexInfo = Number(this.$route.params.indexInfo ) - 2;
            }
            let index = Number(this.indexInfo) + 1;
            AdminConfigCnt.cloud.list_tree_all_basic_info_attr().then((response: AxiosResponse) => {
                this.id = response.data.data[this.indexInfo].id;
                let domain = response.data.data[this.indexInfo].another_name;
                window.location.hash = 'admin/' + domain.toLowerCase();
                this.childrenTow = response.data.data[this.indexInfo].childrens;
                this.oneName = response.data.data[this.indexInfo].name;
                this.saveList.another_name = response.data.data[this.indexInfo].another_name;
                for (let i = 0; i < this.childrenTow.length; i++) {
                    for (let j = 0; j < this.childrenTow[i].childrens.length; j++) {
                        this.allList.push(this.childrenTow[i].childrens[j].name);
                    }
                }

                AdminConfigCnt.cloud.get_basic_info_config_by_another_name(this.saveList.another_name).then((response: AxiosResponse) => {
                    if (!response.data.data) {
                        return;
                    }
                    this.saveList.attr_config = '';
                    this.saveList.attr_config += response.data.data.attr_config;
                    this.checkList = [];
                    this.checkList = this.saveList.attr_config.split(',');
                })
            });
            this.getCheck();
        }

        onSave(): void {
            this.saveList.name = this.oneName;
            AdminConfigCnt.cloud.save_or_modify_basic_info_config(this.saveList).then((response: AxiosResponse) => {

            })
        }

        getIndex(): void {
            console.log(123)
        }

        @Watch("checkList")
        getCheck(): void {
            this.saveList.attr_config = this.checkList.toString();
            if (this.checkList.length == 0) {
                this.isWws = false;
                this.checkAll = false;
            } else if (this.checkList.length != 0 && this.checkList.length < this.allList.length) {
                this.isWws = true;
            } else if (this.checkList.length == this.allList.length) {
                this.isWws = false;
                this.checkAll = true;
            }
        }

        handleCheckAllChange(): void {
            this.isWws = false;
            if (this.checkAll === false) {
                this.checkList = [];
                this.saveList.attr_config = '';
            } else {
                for (let i = 0; i < this.childrenTow.length; i++) {
                    for (let j = 0; j < this.childrenTow[i].childrens.length; j++) {
                        this.checkList.push(this.childrenTow[i].childrens[j].attr_name);
                        this.saveList.attr_config = '';
                        this.saveList.attr_config += this.childrenTow[i].childrens[j].attr_name;
                    }
                }
            }
        }
    }
</script>

<style>
    .right_info {
        width: 1166px;
        background-color: #fff;
        padding: 10px 25px;
        margin-top: 10px;
    }

    .tow_title {
        border-left: 2px solid #666666;
        padding-left: 10px;
        font-weight: 600;
        color: #a2a2a2;
        text-align: left;
        font-size: 18px;
    }

    .el-checkbox__label {
        font-size: 16px !important;
        line-height: 22px;
    }
    .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner {
        background-color: #0DBA9E;
        border-color: #0DBA9E;
    }
    .el-checkbox__input.is-focus .el-checkbox__inner {
        border-color: #0DBA9E;
    }
    .el-checkbox__input.is-checked+.el-checkbox__label {
        color: #0DBA9E;
    }
    .el-checkbox__label {
        padding-left: 6px;
        padding-top: 5px;
    }
    .el-checkbox__inner::after {
        height: 11px;
        left: 6.5px;
    }
    .el-checkbox__inner {
        border-radius: 5px;
        width: 19px;
        height: 19px;
    }

    .button_width_97 {
        width: 97px;
        border-radius: 4px;
    }
    .back_color {
        background:rgba(247,135,68,1);
    }
    .back_color:hover {
        background:rgba(247,135,68,1);
        color: #fff;
    }

</style>