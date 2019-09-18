<template>
    <div class="project_mana">

        <div class="btns">
            <el-button id="xz" class="add_btn" size="mini" @click="system_name='';main_index='';system_explain='';imageUrl='';system_icon='';addVisible=true;">
                <span class="add_span"><img src="../../assets/icon/add.png" class="add_img">新增</span>
            </el-button>
        </div>
        <el-table :data="projects" style="width: 100%">
            <el-table-column type="index" label="序号" align="center" width="100"> </el-table-column>

            <el-table-column prop="system_name" label="项目名称" align="center"> </el-table-column>
            <el-table-column prop="system_explain" label="项目说明" align="center"> </el-table-column>
            <el-table-column fixed="right" label="操作" align="center">
                <template slot-scope="scope">
                    <span class="update-btn operation-btn" title="修改" @click="onUpdate(scope.row)"></span>
                    <span class="delete-btn operation-btn" title="删除" @click="onDelete(scope.row.id)"></span>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog title="添加项目" :visible.sync="addVisible" width="30%" center
                   :close-on-click-modal="false">
            <el-row class="dialog_center">
                <el-row>
                    <el-tooltip class="item" effect="dark" content="项目名称" placement="right">
                        <el-input v-model="system_name" placeholder="请输入项目名称" style="width: 315px"
                                  maxlength="15"></el-input>
                    </el-tooltip>
                </el-row>
                <el-row>
                    <el-tooltip class="item" effect="dark" content="首页地址" placement="right">
                        <el-input v-model="main_index" placeholder="请输入首页地址" style="width: 315px"
                                  maxlength="32"></el-input>
                    </el-tooltip>
                </el-row>
                <el-row>
                    <el-tooltip class="item" effect="dark" content="项目说明" placement="right" style="width: 315px">
                        <el-input
                            type="textarea"
                            autosize
                            maxlength="100"
                            placeholder="请输入项目说明"
                            v-model="system_explain">
                        </el-input>
                    </el-tooltip>
                </el-row>
                <el-row>
                    项目图标
                    <el-upload
                        v-loading="loading"
                        element-loading-text="正在上传"
                        element-loading-spinner="el-icon-loading"
                        element-loading-background="rgba(0, 0, 0, 0.8)"
                        class="upload-demo"
                        ref="upload"
                        accept=".jpg,.png"
                        action="/api/file/uploader"
                        :headers="{Token: token}"
                        :show-file-list="false"
                        :on-error="uploadErr"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon" style="border: 1px solid"></i>
                    </el-upload>
                </el-row>
            </el-row>
            <div v-show="addMsg !== ''">{{addMsg}}</div>
            <span slot="footer">
                <el-button class="update_btn_cancel" @click="addVisible=false">取 消</el-button>
                <el-button class="update_btn_confirm" type="primary" @click="addSubmit">确 定</el-button>
            </span>
        </el-dialog>
        <!--修改-->
        <el-dialog
            title="修改"
            :close-on-click-modal="false"
            :visible.sync="updateVisible"
            width="30%"
            center>
            <el-row class="dialog_center">
                <el-row>
                    <el-tooltip class="item" effect="dark" content="项目名称" placement="right">
                        <el-input v-model="system_name" placeholder="请输入项目名称" style="width: 315px"
                                  maxlength="15"></el-input>
                    </el-tooltip>
                </el-row>
                <el-row>
                    <el-tooltip class="item" effect="dark" content="首页地址" placement="right">
                        <el-input v-model="main_index" placeholder="请输入首页地址" style="width: 315px"
                                  maxlength="64"></el-input>
                    </el-tooltip>
                </el-row>
                <el-row>
                    <el-tooltip class="item" effect="dark" content="项目说明" placement="right" style="width: 315px">
                        <el-input
                            type="textarea"
                            autosize
                            maxlength="100"
                            placeholder="请输入项目说明"
                            v-model="system_explain">
                        </el-input>
                    </el-tooltip>
                </el-row>
                <el-row>
                    项目图标
                    <el-upload
                        v-loading="loading"
                        element-loading-text="拼命加载中"
                        element-loading-spinner="el-icon-loading"
                        element-loading-background="rgba(0, 0, 0, 0.8)"
                        class="upload-demo"
                        ref="upload"
                        accept=".jpg,.png"
                        action="/api/file/uploader"
                        :headers="{Token: token}"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon" style="border: 1px solid"></i>
                    </el-upload>
                </el-row>
            </el-row>
            <span slot="footer">
                        <el-button @click="updateVisible = false" class="del_btn_cancel">取 消</el-button>
                        <el-button type="danger" @click="updateProject()" class="del_btn_confirm">确 定</el-button>
                    </span>
        </el-dialog>
        <!--删除-->
        <el-dialog
            title="提示"
            :visible.sync="delVisible"
            width="30%"
            center>
            <el-row class="dialog_center">
                <span style="font-size: 18px;">是否删除</span>
            </el-row>
            <span slot="footer">
                        <el-button @click="delVisible = false" class="del_btn_cancel">取 消</el-button>
                        <el-button type="danger" @click="delProject()" class="del_btn_confirm">确 定</el-button>
                    </span>
        </el-dialog>
    </div>
</template>

<script lang="ts">
    import {XtVue, Component, XtRouter} from "../../common/common";
    import menuCnt from "./menu.cnt";
    import {AxiosResponse} from 'axios';
    import {ProjectParam, Project} from "./menu.def";

    @Component
    export default class ProjectManage extends XtVue {
        public projects: Project[] = [];
        public system_name: string | null = null;
        private id_check: string | null = null;
        public main_index: string | null = null;//首页地址
        public system_explain: string | null = null;// 项目说明
        private imageUrl: string | null = null; // 项目图标
        private system_icon: string | null = null; // 项目图标
        public addMsg: string | null = null;//新增提示信息
        public addVisible: boolean = false;
        // 删除按钮弹框
        private delVisible: boolean = false;
        private updateVisible: boolean = false;
        private loading: boolean = false;
        private delId: string | null = null;
        private token: string | null = null;
        private api: string = location.origin+"/api/";









        uploadErr() {
            this.any().$notify.error({title: '提示', message: '上传失败'});
            this.loading = false;
        }
        handleAvatarSuccess(res, file) {
            this.loading = false;
            this.imageUrl = URL.createObjectURL(file.raw);
            this.system_icon = "file/get?img=" + res.data.guid;
        }
        beforeAvatarUpload(file) {
            this.loading = true;
            const isSize = new Promise(function(resolve, reject) {
                let img = new Image();
                img.onload = function() {
                    let valid = img.width == img.height;
                    valid ? resolve() : reject();
                };
                img.src = URL.createObjectURL(file);
            }).then(() => {
                return file;
            }, () => {
                this.any().$notify.error({title: '提示', message: '上传图片长宽不一致'});
                this.loading = false;
                return Promise.reject();
            });

            const isLt2M = file.size / 1024 / 1024 < 1;
            if (!isLt2M) {
                this.any().$notify.error({title: '提示', message: '上传图片大小不能超过 1MB!'});
                this.loading = false;
            }
            return isLt2M && isSize;
        }



















        public mounted(): void {
            window.console.log('jkl;');
            this.token = sessionStorage.getItem("token");
            this.queryList();
        }

        public queryList(): void {
            this.projects = [];
            let param = new ProjectParam();
            menuCnt.cloud.getProjects(param).then((res: AxiosResponse) => {
                if (res && res.data && res.data.status === '200' && res.data.data.list) {
                    this.projects = res.data.data.list;
                }
            })
        }

        // 修改
        onUpdate(row): void {
            this.updateVisible = true;
            this.system_name = row.system_name;
            this.main_index = row.main_index;
            this.system_explain = row.system_explain;
            this.system_icon = row.system_icon;
            if (row.system_icon) this.imageUrl = this.api + row.system_icon;
            if (!row.system_icon) this.imageUrl = '';
            this.id_check = row.id;
        }
        // 确认修改
        updateProject(): void {
            let updateInfo = {
                id: this.id_check,
                main_index: this.main_index,
                system_explain: this.system_explain,
                system_icon: this.system_icon,
                system_name: this.system_name
            };
            menuCnt.cloud.update(updateInfo).then((res: AxiosResponse) => {
                if (res && res.data && res.data.status === '200') {
                    this.queryList();
                    this.updateVisible = false;
                } else {
                    this.any().$notify.error({title: '提示', message: res.data.message});
                }
            })
        }
        // 删除
        onDelete(id: string): void {
            this.delId = id;
            this.delVisible = true;
        }
        delProject(): void { // 确认删除
            menuCnt.cloud.delProject(this.delId).then((res: AxiosResponse) => {
                if (res && res.data && res.data.status === '200') {
                    this.queryList();
                    this.delVisible = false;
                } else {
                    this.any().$notify.error({title: '提示', message: res.data.message});
                }
            })
        }


        public addSubmit(): void {
            if(this.system_name == ''){ this.addMsg = '请输入项目名称'; return }
            if(this.main_index == ''){ this.addMsg = '请输入首页地址'; return }
            this.addVisible = false;
            menuCnt.cloud.addProject(this.system_name, this.main_index, this.system_explain, this.system_icon,).then((res: AxiosResponse) => {
                if (res && res.data) {
                    if (res.data.status === '200') {
                        this.queryList();
                        return;
                    }
                    this.any().$notify({title: '提示', message: res.data.message});
                }
            })
        }
    }
</script>

<style lang="scss" scoped>
    @import "./menu.scss";

    .project_mana {
        padding: 14px;
        min-height: 650px;

        width: 1188px;
        margin-top: 10px;
        margin-left: 137px;
        background-color: #FFFFFF;
        .btns {
            text-align: right;
            padding: 0 14px;
            .el-button {
                background-color: #15C1A3;
                border: none;
                &:hover {
                    background-color: #28E1C0;
                }
                &:active {
                    background-color: #09937B;
                }
                i {
                    display: inline-block;
                    width: 18px;
                    height: 18px;
                    margin-right: 8px;
                    vertical-align: middle;
                    background: url("../../assets/image/icon/add.png") no-repeat center / 100% 100%;
                }
            }
        }
        .data_list {
            padding-top: 14px;
            > .el-row {
                height: 36px;
                line-height: 36px;
                border: 1px solid #e6e6e6;
                border-bottom: none;
                &:last-child {
                    border-bottom: 1px solid #e6e6e6;
                }
            }
        }
        .operation-btn{
            display: inline-block;
            width: 24px;
            height: 24px;
            margin-right: 15px;
        }
        .delete-btn {
            background-image: url("../../assets/privilege/delete-config.png");
        }
        .delete-btn:hover {
            background-image: url("../../assets/privilege/delete-hover.png");
        }
        .update-btn {
            background-image: url("../../assets/privilege/update-config.png");
        }
        .update-btn:hover {
            background-image: url("../../assets/privilege/update-hover.png");
        }
    }

    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>
