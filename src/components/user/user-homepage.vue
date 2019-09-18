<template>
    <el-col class="right_table" style="width: 1166px;">
        <el-row>
            <h2>角色管理</h2>
        </el-row>
        <el-row class="user_info">
            <el-col :span="12">
                <p>当前账号： {{userInfo.user_account}}</p>
                <p>当前身份：
                    <el-select v-model="userID" placeholder="角色身份切换" value="">
                        <el-option
                            v-for="item in roleList"
                            :key="item.id"
                            :label="item.role_name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </p>
            </el-col>
        </el-row>
    </el-col>
</template>

<script lang="ts">
    import {Component, Watch, XtVue} from "../../common/common";
    import {SaveUser, UserLogin} from "./user.def";
    import UserCnt from './user.cnt';
    import {AxiosResponse} from 'axios';

    @Component
    export default class HomePage extends XtVue {
        private userInfo: any = '';
        private userID: string | null = null;
        private userType: string | null = null;
        private userUnitID: string | null = null;
        private roleList: any = [];
        private updateRole: SaveUser = new SaveUser();
        private showPrompt: boolean = false;



        mounted() {
            this.showPrompt = false;
            this.userInfo = window.sessionStorage.getItem("user_info");

            this.userInfo = JSON.parse(this.userInfo);
            this.userType = this.userInfo.user_type;
            this.userUnitID = this.userInfo.fk_unit_id;
            this.roleList = this.arrDistinct(this.userInfo.role_info_list);
            this.userID = this.userInfo.role_info.id;
            if (this.userType !== '0') {
                // UserCnt.cloud.get_unit_info_by_id({id: this.userUnitID}).then((res: AxiosResponse) => {
                //     window.sessionStorage.setItem("unit_info", JSON.stringify(res.data.data));
                // })
                UserCnt.cloud.list_all_unit_info(this.userUnitID).then((res: AxiosResponse) => {
                    for (let i = 0; i < res.data.data.length; i++) {
                        if (res.data.data[i].id === this.userUnitID) {
                            window.sessionStorage.setItem("unit_info", JSON.stringify(res.data.data[i]));
                        }
                    }
                })
            }
        }

        arrDistinct(array): any {
            var result: any = [];
            var obj: any = {};
            for (var i = 0; i < array.length; i++) {
                if (!obj[array[i].id]) {
                    result.push(array[i]);
                    obj[array[i].id] = true;
                }
            }
            return result;
        }

        @Watch("userID")
        switchover(): void {
            this.$emit("getMenu", this.userID);
            for (let i = 0; i < this.userInfo.role_info_list.length; i++) {
                if (this.userInfo.role_info_list[i].id === this.userID) {
                    this.userInfo.role_info = this.userInfo.role_info_list[i];
                    window.sessionStorage.removeItem('user_info');
                    window.sessionStorage.setItem("user_info", JSON.stringify(this.userInfo));
                }
            }

            this.updateRole.id = this.userInfo.id;
            this.updateRole.role_info = {
                id : this.userInfo.role_info.id
            };
            UserCnt.cloud.save_or_modify_user_info(this.updateRole).then((res: AxiosResponse) => {
                if (res.data.status === '200') {
                    if (this.showPrompt) {
                        this.any().$notify.success({title: '提示',message: res.data.message})
                    }
                    this.showPrompt = true;
                } else {
                    this.any().$notify.error({title: '提示',message: res.data.message})
                }
            });
        }
    }
</script>

<style scoped>

    .right_table { /* 右侧表格排版 */
        padding: 10px 25px;
        margin-top: 10px;
        background-color: #fff;
    }
    .user_info {
        margin-left: 175px;
    }
    .user_info p {
        text-align: left;
    }
</style>