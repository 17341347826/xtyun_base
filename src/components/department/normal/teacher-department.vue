<template>
    <el-col class="right_table" style="width: 1166px;">
        <el-row>
            <el-col :span="6" style="float:left;">
                <el-tooltip v-show="batchImportBtn" class="item" effect="dark" content="无权限" placement="top">
                    <el-button class="pt_btn" size="mini" style="float:left;">批量导入</el-button>
                </el-tooltip>
                <el-button v-show="!batchImportBtn" class="add_btn" size="mini" type="primary" style="float:left;"
                           @click="importVisible = true">批量导入</el-button>

                <el-tooltip v-show="batchDeleteBtn" class="item" effect="dark" content="无权限" placement="top">
                    <el-button class="pt_btn" size="mini" style="margin-left: 15px;float:left;">批量删除</el-button>
                </el-tooltip>
                <el-button v-show="!batchDeleteBtn" class="add_btn" size="mini" type="primary" style="margin-left: 15px;float:left;" @click="onBatchDelete()">批量删除</el-button>
            </el-col>
            <el-col :span="2" style="float: right;">
                <el-tooltip v-show="addBtn" class="item" effect="dark" content="无权限" placement="top" style="float: right;">
                    <el-button class="pt_btn" size="mini">
                        <span class="add_span"><img src="../../../assets/icon/add.png" class="add_img">新增</span>
                    </el-button>
                </el-tooltip>
                <el-button v-show="!addBtn" id="xz" class="add_btn" size="mini" style="float: right;" @click="onAddVisible(0)">
                    <span @click="onAddVisible(0)" class="add_span"><img src="../../../assets/icon/add.png" class="add_img">新增</span>
                </el-button>
            </el-col>
        </el-row>
        <el-row style="margin-bottom: 15px;text-align: left;">
            <el-select v-model="teacherTitle" filterable clearable placeholder="教师职称" value="" style="width: 200px;margin-right: 15px;">
                <el-option label="正高级教师" value="1"></el-option>
                <el-option label="高级教师" value="2"></el-option>
                <el-option label="一级教师" value="3"></el-option>
                <el-option label="二级教师" value="4"></el-option>
                <el-option label="三级教师" value="5"></el-option>
            </el-select>
            <el-select v-show="Number(userRank) < 4" v-model="teacherSchool" filterable clearable placeholder="所属学校" value="" style="width: 200px;margin-right: 15px;">
                <el-option
                    v-for="item in schoolList"
                    :key="item.id"
                    :label="item.unit_name"
                    :value="item.id">
                </el-option>
            </el-select>
            <el-tooltip class="item" effect="dark" content="请输入姓名或编号" placement="top">
                <el-input v-model="searchByInfo" clearable placeholder="搜索" style="width: 200px" @change="queryInfo()"></el-input>
            </el-tooltip>
        </el-row>
        <el-row>
            <el-table :data="teacherList" @selection-change="handleSelectionChange"
                      v-loading="loading"
                      element-loading-text="拼命加载中"
                      element-loading-spinner="el-icon-loading"
                      element-loading-background="rgba(0, 0, 0, 0.8)" >
                <el-table-column header-align="center" type="selection" width="55"></el-table-column>
                <el-table-column header-align="center" label="序号" type="index" :index="ordinalAdd" sortable
                                 width="100px"></el-table-column>
                <el-table-column header-align="center" prop="teacher_name" label="教师姓名"></el-table-column>
                <el-table-column header-align="center" prop="teacher_num" label="教师编号"></el-table-column>
                <el-table-column header-align="center" prop="teacher_title" label="职称">
                    <template slot-scope="scope">
                        <span v-if="scope.row.teacher_title === '1'">正高级教师</span>
                        <span v-if="scope.row.teacher_title === '2'">高级教师</span>
                        <span v-if="scope.row.teacher_title === '3'">一级教师</span>
                        <span v-if="scope.row.teacher_title === '4'">二级教师</span>
                        <span v-if="scope.row.teacher_title === '5'">三级教师</span>
                    </template>
                </el-table-column>
                <el-table-column header-align="center" prop="unit_info.unit_name" label="所属学校"></el-table-column>
                <el-table-column header-align="center" prop="teacher_position" label="职务"></el-table-column>
                <el-table-column header-align="center" prop="contact_num" label="联系电话"></el-table-column>
                <el-table-column header-align="center" label="操作">
                   <template slot-scope="scope">
                       <el-row>
                           <el-tooltip v-show="editBtn" class="item" effect="dark" content="无权限" placement="top">
                               <span class="img_span disabled_update" style="cursor: not-allowed"></span>
                           </el-tooltip>
                           <el-tooltip v-show="deleteBtn" class="item" effect="dark" content="无权限" placement="top">
                               <span class="img_span disabled_del" style="cursor: not-allowed"></span>
                           </el-tooltip>
                           <span v-show="!editBtn" :id="'bj'+ordinalAdd(0)" class="img_span update" @click="onAddVisible(0, scope.row)"></span>
                           <span v-show="!deleteBtn" :id="'sc'+ordinalAdd(0)" class="img_span del" @click="onDelete(scope.row.id)"></span>
                       </el-row>
                   </template>
                </el-table-column>
            </el-table>
        </el-row>
        <el-dialog
            :title="addTitle"
            :close-on-click-modal="false"
            :visible.sync="addVisible"
            width="30%"
            center>
            <el-row class="dialog_center">
                <el-row>
                    <el-tooltip class="item" effect="dark" content="所属学校" placement="right">
                        <el-select v-model="schoolID" filterable placeholder="请选择所属学校" value="">
                            <el-option
                                v-for="item in schoolList"
                                :key="item.id"
                                :label="item.unit_name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-tooltip>
                    <span class="required">*</span>
                </el-row>
                <el-row>
                    <el-tooltip class="item" effect="dark" content="教师名称" placement="right">
                        <el-input v-model="teacherAdd.teacher_name" placeholder="教师名称" clearable
                                  maxlength="15" style="width: 315px"></el-input>
                    </el-tooltip>
                    <span class="required">*</span>
                </el-row>
                <el-row>
                    <el-tooltip class="item" effect="dark" content="教师编号" placement="right">
                        <el-input v-model="teacherAdd.teacher_num" placeholder="教师编号: 6-18位" maxlength="18" minlength="6"
                                  clearable style="width: 315px" oninput="value=value.replace(/[^a-zA-Z\d]/g,'')"></el-input>
                    </el-tooltip>
                    <span class="required">*</span>
                </el-row>
                <el-row>
                    <el-tooltip class="item" effect="dark" content="职称" placement="right">
                        <el-select v-model="teacherAdd.teacher_title" filterable placeholder="请选择职称" value="">
                            <el-option
                                v-for="item in teacherTitleList"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-tooltip>
                    <span style="color: transparent;">*</span>
                </el-row>
                <el-row>
                    <el-tooltip class="item" effect="dark" content="职务" placement="right">
                        <el-input v-model="teacherAdd.teacher_position" placeholder="职务" clearable style="width: 315px"
                                  maxlength="10"></el-input>
                    </el-tooltip>
                    <span style="color: transparent;">*</span>
                </el-row>
                <el-row>
                    <el-tooltip class="item" effect="dark" content="联系电话" placement="right">
                        <el-input v-model="teacherAdd.contact_num" placeholder="联系电话" oninput="value=value.replace(/[^\d]/g,'')"
                                  clearable style="width: 315px" maxlength="11"></el-input>
                    </el-tooltip>
                    <span class="required">*</span>
                </el-row>
            </el-row>
            <span slot="footer">
                <el-button @click="onAddVisible(1)" class="update_btn_cancel">取 消</el-button>
                <el-button type="primary" @click="onAddVisible(2)" class="update_btn_confirm">确 定</el-button>
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
                        <el-button type="danger" @click="onDelConfirm()" class="del_btn_confirm">确 定</el-button>
                    </span>
        </el-dialog>
        <!--批量删除-->
        <el-dialog
            title="提示"
            :visible.sync="batchDelVisible"
            width="30%"
            center>
            <el-row class="dialog_center">
                <span style="font-size: 18px;">是否删除</span>
            </el-row>
            <span slot="footer">
                        <el-button @click="batchDelVisible = false" class="del_btn_cancel">取 消</el-button>
                        <el-button type="danger" @click="onBatchDelConfirm()" class="del_btn_confirm">确 定</el-button>
                    </span>
        </el-dialog>
        <!--导入-->
        <el-dialog
            :visible.sync="importVisible"
            width="30%"
            center>
            <el-row class="dialog_center">
                <el-col>
                    <span style="font-size: 18px;">导入</span>
                </el-col>
            </el-row>
            <el-row style="text-align: center;">
                <el-row style="margin-top: 15px;">
                    <el-upload
                        class="upload-demo"
                        ref="upload"
                        accept=".xls,.xlsx"
                        action="/api/teacher/check_batch_import_teacher_excel"
                        :headers="{Token: token}"
                        :on-success="successUpload"
                        :on-error="errorUpload"
                        :file-list="fileList"
                        :auto-upload="false">
                        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                        <el-button style="margin-left: 10px;" size="small" type="success" @click="onUploading">导入</el-button>
                    </el-upload>
                </el-row>
                <el-row style="margin-bottom: 15px;">
                    <a href="./teacher_templet.xlsx">下载模板</a>
                </el-row>
                <el-row>
                    <el-button @click="importVisible = false" class="del_btn_cancel" style="margin: 0">取 消</el-button>
                </el-row>
            </el-row>
        </el-dialog>
        <!--进度-->
        <el-dialog title="上传进度" :visible.sync="progressDialog" width="30%" center>
            <el-progress :text-inside="true" :stroke-width="18" :percentage="Number(percentUpload.toFixed(2))" status="success"></el-progress>

        </el-dialog>
        <el-pagination
            background
            layout="prev, pager, next"
            :current-page.sync="pageNum"
            :page-size="pageQuery.page_size"
            :total="pageTotal"
            v-show="pageTotal / pageQuery.page_size > 1">>
        </el-pagination>
    </el-col>
</template>

<script lang="ts">

    import {Component, Watch, XtRouter, XtVue} from "../../../common/common";
    import {PageQuery, TeacherAdd} from "../department.def";
    import DepartmentCnt from "../department.cnt";
    import {AxiosResponse} from "axios";
    import {getBtnList} from "../../common/mod/base"



    @Component
    export default class School extends XtVue {
        // 分页查询
        private pageQuery: PageQuery = new PageQuery();
        private pageTotal: number = 0;
        private pageNum: number = 0;
        // 新增弹框
        private addVisible: boolean = false;
        private addTitle: string | null = null;
        // 进度条弹框
        private progressDialog: boolean = false;
        // 进度的百分比
        private percentUpload: number = 0;
        // 删除按钮弹框
        private delVisible: boolean = false;
        private batchDelVisible: boolean = false;
        private delId: string | null = null;
        // 数据
        private teacherList: any = [];
        private teacherAdd: TeacherAdd = new TeacherAdd();
        private teacherTitleList: any = [{value: '1', label: '正高级教师'}, {value: '2', label: '高级教师'},
            {value: '3', label: '一级教师'}, {value: '4', label: '二级教师'}, {value: '5', label: '三级教师'}];
        private schoolList: any = [];
        private schoolID: string | null = null;
        private multipleSelection: string | null = null;
        private fileList: any[] = [];
        private token: any = '';
        // 按钮权限
        private addBtn: boolean = true; // 新增
        private editBtn: boolean = true; // 修改
        private deleteBtn: boolean = true; // 删除
        private batchImportBtn: boolean = true; // 批量导入
        private importVisible: boolean = false; // 导入弹框
        private batchDeleteBtn: boolean = true; // 批量删除
        private unitID: string = '';
        private userRank: string = '';
        private queryList: any = {};
        private teacherTitle: string | null = null;
        private teacherSchool: string | null = null;
        private theirSchoolID: string = '';
        // private allTeacherList: any = [];
        private searchByInfo: string = '';
        private loading: boolean = false; // 加载层




        handleSelectionChange(val): void {
            this.multipleSelection = '';
            for (let i = 0; i < val.length; i++) {
                if (i === val.length - 1) {
                    this.multipleSelection += val[i].id;
                } else {
                    this.multipleSelection += val[i].id + ','
                }
            }
        }
        // 查询
        @Watch("teacherTitle")
        @Watch("teacherSchool")
        queryInfo(): void {
            if (this.teacherTitle === '') {
                this.teacherTitle = null;
                return;
            }
            if (!this.teacherSchool) {
                this.theirSchoolID = this.unitID;
            } else {
                this.theirSchoolID = this.teacherSchool;
            }
            this.pageNum = 1;
            this.getInfo();
        }
        getInfo(): void {
            let getTeacherList: object = {
                page_num: this.pageNum,
                page_size: 15,
                unit_info: { id: this.theirSchoolID }
            };
            if (this.pageNum === 1) {
                this.pageQuery.page_num = 0;
                getTeacherList = {
                    page_num: this.pageQuery.page_num = 0,
                    page_size: 15,
                    unit_info: { id: this.theirSchoolID },
                    teacher_title: this.teacherTitle,
                    search_info: this.searchByInfo,
                };
            } else if (this.pageNum > 1) {
                this.pageQuery.page_num = this.pageNum - 1;
                getTeacherList = {
                    page_num: this.pageQuery.page_num = this.pageNum - 1,
                    page_size: 15,
                    unit_info: { id: this.theirSchoolID },
                    teacher_title: this.teacherTitle,
                    search_info: this.searchByInfo,
                };
            }
            this.loading = true;
            DepartmentCnt.cloud.list_page_all_teacher_info(getTeacherList).then((response: AxiosResponse) => {
                this.loading = false;
                if (response.data.status === '200') {
                    // console.log(response.data.data.content);
                    this.pageTotal = response.data.data.totalElements;
                    this.teacherList = response.data.data.content;
                } else {
                    this.any().$notify.error({title: '提示', message: response.data.message});
                }
            });

        }
        @Watch("pageNum")
        onFlipOver(): void {
            this. getInfo();
        }
        mounted() {
            let userInfo: any = window.sessionStorage.getItem("user_info");
            userInfo = JSON.parse(userInfo);
            this.unitID = userInfo.fk_unit_id;
            this.theirSchoolID  = this.unitID;
            this.userRank = userInfo.role_info.role_rank;
            this.token = window.sessionStorage.getItem("token");
            this.queryList.id = this.unitID;
            this.queryList.unit_level = '4';
            DepartmentCnt.cloud.list_all_school_list(this.queryList).then((response: AxiosResponse) =>{
                for (let i = 0; i < response.data.data.length; i++) {
                    if (this.userRank == '4') {
                        if (response.data.data[i].unit_level === '4' && response.data.data[i].id === this.unitID) {
                            this.schoolList.push(response.data.data[i]);
                        }
                    } else {
                        if (response.data.data[i].unit_level === '4') {
                            this.schoolList.push(response.data.data[i]);
                        }
                    }
                }
            });

            // let queryAllTeacher: object = {
            //     unit_info: { id: this.unitID },
            // };
            // DepartmentCnt.cloud.list_all_teacher_info(queryAllTeacher).then((response: AxiosResponse) => {
            //     if (response.data.status === '200') {
            //         // console.log(response.data.data.content);
            //         this.allTeacherList = response.data.data;
            //     } else {
            //         this.any().$notify.error({title: '提示', message: response.data.message});
            //     }
            // });
            if (window.sessionStorage.getItem("val")) {
                let btnList: any = window.sessionStorage.getItem("val");
                btnList = JSON.parse(btnList).children;
                this.addBtn = getBtnList(btnList, 'add');
                this.editBtn = getBtnList(btnList, 'edit');
                this.deleteBtn = getBtnList(btnList, 'delete');
                this.batchImportBtn = getBtnList(btnList, 'batch_import');
                this.batchDeleteBtn = getBtnList(btnList, 'batch_delete');
            }
        }

        // 新增
        onAddVisible(state: number, row: any = ''): void {
            if (state === 0) { // 点击新增
                this.cleanInfo();
                if (row) {
                    this.addTitle = '修改';
                    this.teacherAdd.id = row.id;
                    this.schoolID = row.unit_info.id;
                    this.teacherAdd.teacher_name = row.teacher_name;
                    this.teacherAdd.teacher_num = row.teacher_num;
                    this.teacherAdd.teacher_title = row.teacher_title;
                    this.teacherAdd.teacher_position = row.teacher_position;
                    this.teacherAdd.contact_num = row.contact_num;
                } else {
                    this.teacherAdd = new TeacherAdd();
                    this.addTitle = '新增';
                }
                this.addVisible = true;
            }  else if (state === 1) { // 取消
                this.teacherAdd = new TeacherAdd();
                this.addVisible = false;
            } else if (state === 2) { // 确定
                // console.log(this.teacherAdd);
                if (this.schoolID && this.teacherAdd.teacher_name && this.teacherAdd.teacher_num && this.teacherAdd.contact_num) {
                    if (this.teacherAdd.teacher_num.length < 6) {
                        this.any().$notify.error({title: '提示', message: '教师编号位数有误, 应为6至18位'});
                        return;
                    }
                    this.teacherAdd.unit_info = {id: this.schoolID};
                    if (this.teacherAdd.teacher_num.length > 5 && this.teacherAdd.teacher_num.length < 19) {
                        this.loading = true;
                        DepartmentCnt.cloud.save_or_modify_teacher_info(this.teacherAdd).then((response: AxiosResponse) => {
                            this.loading = false;
                            if (response.data.status === '200') {
                                this.getInfo();
                                this.cleanInfo();
                                this.addVisible = false;
                            } else {
                                this.any().$notify.error({title: '提示', message: response.data.message});
                            }

                        })
                    } else {
                        this.any().$notify.error({title: '提示', message: '教师编号为六到十八位纯数字!'});
                    }
                } else {
                    this.any().$notify.error({title: '提示', message: "必填项不能有空"});
                }

            }
        }

        // 清空
        cleanInfo (): void {
            this.teacherAdd = new TeacherAdd();
            this.schoolID = '';
        }


        // 删除
        onDelete(id: string): void {
            this.delId = id;
            this.delVisible = true;
        }
        onDelConfirm(): void { // 确认删除
            // console.log(this.delId)
            this.loading = true;
            DepartmentCnt.cloud.remove_teacher_info_by_id({id: this.delId}).then((response: AxiosResponse) => {
                this.loading = false;
                if (response.data.status === '200') {
                    this.delVisible = false;
                    this.getInfo();
                } else {
                    this.any().$notify.error({title: '提示', message: response.data.message});
                }

            })
        }

        // 批量删除
        onBatchDelete(): void {
            if (this.multipleSelection) {
                this.batchDelVisible = true;
            } else {
                this.any().$notify.error({title: '提示', message: "未勾选信息"});
            }
        }
        onBatchDelConfirm(): void {
            this.loading = true;
            DepartmentCnt.cloud.batch_remove_teacher_info({ids: this.multipleSelection}).then((response: AxiosResponse) => {
                this.loading = false;
                if (response.data.status === '200') {
                    this.batchDelVisible = false;
                    this.any().$notify.success({title: '提示',message: '删除成功'});
                    this.getInfo();
                } else {
                    this.any().$notify.error({title: '提示', message: response.data.message});
                }

            })
        }



        // 导入检测
        onUploading(): void {
            if (this.any().$refs.upload.uploadFiles.length) {
                this.any().$refs.upload.submit();
            } else {
                this.any().$notify.error({title: '提示', message: "请先选择文件"});
            }
        }
        // 导入检测成功
        successUpload(response, file, fileList): void {
            console.log(response, file, fileList);
            if (response.status === '200') {
                DepartmentCnt.cloud.batch_import_teacher_info(response.data.key).then((res: AxiosResponse) => {
                    if (res.data.status === '200') {
                        this.getProgress();
                    } else {
                        this.any().$notify.error({title: '提示', message: "导入失败"});
                        return;
                    }
                })
            } else {
                let item = response.data;
                for (let i = 0; i < item.length; i++) {
                    if (item[i].error_msg) {
                        this.any().$notify.error({title: '提示', message: item[i].error_msg + '来自第' + item[i].row_no + '行'});
                        return;
                    }
                }
                this.any().$notify.error({title: '提示', message: response.message});
            }
        }
        // 导入检测失败
        errorUpload(err, file, fileList): void { console.log(file, fileList); this.any().$notify.error({title: '提示', message: err}); }

        // 进度
        getProgress(): void {
            DepartmentCnt.cloud.get_proccess({api_name: '/teacher/batch_import_teacher_info'}).then((response: AxiosResponse) => {
                if (response.data.data.error_msg) {
                    this.progressDialog = false;
                    return;
                }
                if (response.data.status != 200) {
                    this.progressDialog = false;
                    return;
                }else {
                    this.progressDialog = true;
                    this.percentUpload = response.data.data.current_num / response.data.data.tota_num * 100;
                    if (response.data.data.tota_num === response.data.data.current_num) {
                        this.any().$notify.success({title: '提示', message: "导入成功"});
                        this.any().$refs.upload.clearFiles();
                        this.progressDialog = false;
                        this.importVisible = false;
                        this.getInfo();
                    } else {
                        let self: any = this;
                        setTimeout(function () {
                            self.getProgress()
                        }, 2000);
                    }
                }
            });
        }

        // 表单序号
        ordinalAdd(index: number): number {
            return index + 1;
        }
    }
</script>

<style scoped lang="scss">
    @import "../department.scss";



    .img_span {
        display: inline-block;
        height: 24px;
        width: 24px;
        cursor: pointer;
    }

    .color_black .el-input__inner {
        color: #000 !important;
    }
</style>
