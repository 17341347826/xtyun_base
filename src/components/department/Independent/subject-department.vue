<template>
    <el-col class="right_table" style="width: 1166px;">
        <el-row class="float_right">
            <el-tooltip v-show="addBtn" class="item" effect="dark" content="无权限" placement="top">
                <el-button class="pt_btn" size="mini" @click="onAddVisible(0)">
                    <span class="add_span"><img src="../../../assets/icon/add.png" class="add_img">新增</span>
                </el-button>
            </el-tooltip>
            <el-button v-show="!addBtn" id="xz" class="add_btn" size="mini" @click="onAddVisible(0)">
                <span class="add_span"><img src="../../../assets/icon/add.png" class="add_img">新增</span>
            </el-button>
        </el-row>
        <el-row>
            <template>
                <el-table :data="subjectList"
                          v-loading="loading"
                          element-loading-text="拼命加载中"
                          element-loading-spinner="el-icon-loading"
                          element-loading-background="rgba(0, 0, 0, 0.8)">
                    <el-table-column header-align="center" label="序号" type="index" :index="ordinalAdd" sortable
                                     width="60px"></el-table-column>
                    <el-table-column header-align="center" prop="subject_name" label="学科名称"></el-table-column>
                    <el-table-column header-align="center" prop="subject_code" label="学科代码"></el-table-column>
                    <el-table-column header-align="center" prop="full_score" label="满分值"></el-table-column>
                    <el-table-column header-align="center" prop="discipline_info.discipline_name" label="所属学科"></el-table-column>

                    <el-table-column header-align="center" prop="status" label="状态" width="60px">
                        <template slot-scope="scope">
                            <el-tooltip v-show="startStopBtn" class="item" effect="dark" content="无权限" placement="top">
                                <img src="../../../assets/icon/close.png" style="vertical-align: middle;cursor:pointer">
                            </el-tooltip>
                            <el-row v-show="!startStopBtn" :id="'zt'+ordinalAdd(0)">
                                <el-tooltip v-if="scope.row.status === '1'" class="item" effect="dark" content="已启用"
                                            placement="top" :enterable="false">
                                    <img src="../../../assets/icon/open.png"
                                         @click="onChangeStatus(scope.row)" style="vertical-align: middle;cursor:pointer">
                                </el-tooltip>
                                <el-tooltip v-if="scope.row.status === '0'" class="item" effect="dark" content="已停用"
                                            placement="top" :enterable="false">
                                    <img src="../../../assets/icon/close.png"
                                         @click="onChangeStatus(scope.row)" style="vertical-align: middle;cursor:pointer">
                                </el-tooltip>
                            </el-row>
                        </template>
                    </el-table-column>
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
            </template>
        </el-row>
        <!--新增 / 修改-->
        <el-dialog
            :title="addTitle"
            :close-on-click-modal="false"
            :visible.sync="addVisible"
            width="30%"
            center>
            <el-row class="dialog_center">
                <el-row>
                    <el-tooltip class="item" effect="dark" content="学科名称" placement="right">
                        <el-input v-model="subjectAddList.subject_name" placeholder="学科名称" clearable style="width: 315px"
                                  maxlength="10"></el-input>
                    </el-tooltip>
                    <span class="required">*</span>
                </el-row>
                <el-row>
                    <el-tooltip class="item" effect="dark" content="学科代码" placement="right">
                        <el-input v-model="subjectAddList.subject_code" placeholder="学科代码" clearable style="width: 315px"
                                  maxlength="10"></el-input>
                    </el-tooltip>
                    <span class="required">*</span>
                </el-row>
                <el-row>
                    <span style="width: 25px;">满分值: </span>
                    <el-input-number v-model="subjectAddList.full_score" :precision="2" :step="5" :min="0"
                                     style="width: 265px"></el-input-number>
                    <span class="required">*</span>
                </el-row>
                <el-row>
                    <el-tooltip class="item" effect="dark" content="所属学科" placement="right">
                        <el-select style="width: 315px;" v-model="disciplineID" filterable clearable default-first-option
                                   placeholder="请输入所属学科" value="">
                            <el-option v-for="item in options"
                                       :key="item.id"
                                       :label="item.discipline_name"
                                       :value="item.id"></el-option>
                        </el-select>
                    </el-tooltip>
                    <span class="required">*</span>
                </el-row>
                <el-row>
                    <el-tooltip class="item" effect="dark" content="学科类型" placement="right">
                        <el-select v-model="subjectAddList.subject_type" clearable placeholder="请选择学科类型" style="width: 315px" value="">
                            <el-option v-for="item in subjectTypeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-tooltip>
                    <span class="required">*</span>
                </el-row>
                <el-row>
                    <el-tooltip class="item" effect="dark" content="学科排序" placement="right">
                        <el-input v-model="subjectAddList.sort_number" placeholder="学科排序" clearable style="width: 315px"
                                  maxlength="4"></el-input>
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

    import {Component, Watch, XtVue} from "../../../common/common";
    import {ChangeStatus, PageQuery, SubjectAddList, SubjectList,} from "../department.def";
    import DepartmentCnt from "../department.cnt";
    import {AxiosResponse} from "axios";
    import {getBtnList} from "../../common/mod/base"

    @Component
    export default class Subject extends XtVue {
        // 分页查询
        private pageQuery: PageQuery = new PageQuery();
        private pageTotal: number = 0;
        private pageNum: number = 0;
        // 表格数据
        private subjectList: SubjectList[] = [];
        // 新增弹框
        private addVisible: boolean = false;
        // 新增的数据
        private subjectAddList: SubjectAddList = new SubjectAddList();
        private addTitle: string | null = null;
        // 删除按钮弹框
        private delVisible: boolean = false;
        private delId: string | null = null;
        // 状态
        private changeStatus: ChangeStatus = new ChangeStatus();
        private options: any = [];
        private subjectTypeList: any = [{value: '0', label: '不分文理'}, {value: '1', label: '文科'}, {value: '2', label: '理科'}];
        // 按钮权限
        private addBtn: boolean = true; // 新增
        private editBtn: boolean = true; // 修改
        private deleteBtn: boolean = true; // 删除
        private startStopBtn: boolean = true;
        private userType: string | null = null;
        private unitID: string | null = null;
        private disciplineID: string | null = null;
        private loading: boolean = false; // 加载层



        // 查询
        getInfo(): void {
            if (this.pageNum === 1) {
                this.pageQuery.page_num = 0;
            } else if (this.pageNum > 1) {
                this.pageQuery.page_num = this.pageNum - 1;
            }
            this.pageQuery.fk_unit_id = this.unitID;
            delete this.pageQuery.status;
            this.loading = true;
            DepartmentCnt.cloud.list_page_all_subject_info(this.pageQuery).then((response: AxiosResponse) => {
                // console.log(response.data.data.content);
                this.loading = false;
                if (response.data.status === '200') {
                    this.pageTotal = response.data.data.totalElements;
                    this.subjectList = response.data.data.content;
                } else {
                    this.any().$notify.error({title: '提示', message: response.data.message});
                }
            })
        }
        @Watch("pageNum")
        onFlipOver(): void {
            this. getInfo();
        }

        mounted() {
            let userInfo: any = window.sessionStorage.getItem("user_info");
            userInfo = JSON.parse(userInfo);
            this.userType = userInfo.user_type;
            this.unitID = userInfo.fk_unit_id;

            let queryAllDiscipline = {
                status: '1',
                fk_unit_id: this.unitID
            };
            DepartmentCnt.cloud.list_all_discipline_info(queryAllDiscipline).then((response: AxiosResponse) => {
                // console.log(response.data.data.content);
                if (response.data.status === '200') {
                    this.options = response.data.data;
                } else {
                    this.any().$notify.error({title: '提示', message: response.data.message});
                }
            });


            if (window.sessionStorage.getItem("val")) {
                let btnList: any = window.sessionStorage.getItem("val");
                btnList = JSON.parse(btnList).children;
                this.addBtn = getBtnList(btnList, 'add');
                this.editBtn = getBtnList(btnList, 'edit');
                this.deleteBtn = getBtnList(btnList, 'delete');
                this.startStopBtn = getBtnList(btnList, 'start_stop');
            }
        }



        // 新增
        onAddVisible(state: number, row: any = ''): void {
            if (state === 0) { // 点击新增
                if (row) {
                    this.subjectAddList.id = row.id;
                    this.addTitle = '修改';
                    this.subjectAddList.subject_name = row.subject_name;
                    this.subjectAddList.subject_code = row.subject_code;
                    if (row.discipline_info) { this.disciplineID = row.discipline_info.id; }
                    this.subjectAddList.full_score = row.full_score;
                    this.subjectAddList.status = row.status;
                    this.subjectAddList.subject_type = row.subject_type;
                    this.subjectAddList.sort_number = row.sort_number;
                } else {
                    this.addTitle = '新增';
                    this.subjectAddList = new SubjectAddList();
                    this.disciplineID = null
                }
                this.addVisible = true;
            } else if (state === 1) { // 取消
                this.addVisible = false;
            } else if (state === 2) { // 确定
                if (this.subjectAddList.subject_name && this.subjectAddList.subject_type && this.disciplineID) {
                    this.subjectAddList.fk_unit_id = this.unitID;
                    this.subjectAddList.discipline_info = {id: this.disciplineID};
                    this.loading = true;
                    DepartmentCnt.cloud.save_or_modify_subject_info(this.subjectAddList).then((response: AxiosResponse) => {
                        this.loading = false;
                        if (response.data.status === '200') {
                            this.getInfo();
                            this.subjectAddList = new SubjectAddList();
                            this.addVisible = false;
                        } else {
                            this.any().$notify.error({title: '提示', message: response.data.message});
                        }
                    })
                } else {
                    this.any().$notify.error({title: '提示', message: "必填项不能有空"});
                }
            }
        }


        // 状态
        onChangeStatus(obj: any): void {
            this.changeStatus.id = obj.id;
            if (obj.status === '1') {
                obj.status = '0';
            } else if (obj.status === '0') {
                obj.status = '1';
            }
            this.changeStatus.status = obj.status;
            this.loading = true;
            DepartmentCnt.cloud.modify_subject_info_status_by_id(this.changeStatus).then((response: AxiosResponse) => {
                this.loading = false;
                if (response.data.status === '200') {
                    this.getInfo();
                } else {
                    this.any().$notify.error({title: '提示', message: response.data.message});
                }
            })
        }

        // 点击修改


        // 删除
        onDelete(id: string): void {
            this.delId = id;
            this.delVisible = true;
        }
        onDelConfirm(): void { // 确认删除
            this.loading = true;
            DepartmentCnt.cloud.remove_subject_info_by_id(this.delId).then((response: AxiosResponse) => {
                this.loading = false;
                if (response.data.status === '200') {
                    this.getInfo();
                    this.delVisible = false;
                } else {
                    this.any().$notify.error({title: '提示', message: response.data.message});
                }
            })
        }

        // 表单序号
        ordinalAdd(index: number): number {
           return index + 1;
        }

    }
</script>

<style scoped lang="scss">
    @import "../department.scss";

    .float_right {
        float: right;
        z-index: 2;
    }

    .img_span {
        display: inline-block;
        height: 24px;
        width: 24px;
        cursor: pointer;
    }

    .color_black .el-input__inner {
        color: #000 !important;
    }
    .el-select .el-input.is-focus .el-input__inner {
        cursor: text !important;
    }
</style>
