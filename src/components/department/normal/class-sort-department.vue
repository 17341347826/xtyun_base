<template>
    <el-col class="right_table" style="width: 1166px;">
        <el-row>
            <el-col :span="6" style="float:left;">
                <el-button class="add_btn" size="mini" style="float:left;" type="primary" @click="onIntoClass()">班级信息</el-button>
                <!--<el-button class="add_btn" size="mini" style="float:left;" type="primary">班级类别</el-button>-->
            </el-col>
            <el-col :span="2" style="float: right;">
                <el-button id="xz" class="add_btn" style="float: right;" size="mini" @click="onAddVisible(0)">
                    <span @click="onAddVisible(0)" class="add_span"><img src="../../../assets/icon/add.png" class="add_img">新增</span>
                </el-button>
            </el-col>
        </el-row>
        <el-row>
            <el-table :data="classSortList"
                      v-loading="loading"
                      element-loading-text="拼命加载中"
                      element-loading-spinner="el-icon-loading"
                      element-loading-background="rgba(0, 0, 0, 0.8)" >
                <el-table-column header-align="center" label="序号" type="index" :index="ordinalAdd" sortable
                                 width="100px"></el-table-column>
                <el-table-column header-align="center" prop="category_name" label="类别名称"></el-table-column>
                <el-table-column header-align="center" prop="category_code" label="类别代码"></el-table-column>
                <el-table-column header-align="center" prop="status" label="状态">
                    <template slot-scope="scope">
                        <el-popover trigger="hover" placement="right">
                            <p v-if="scope.row.status === '1'">已启用</p>
                            <p v-if="scope.row.status === '0'">已停用</p>
                            <div slot="reference" class="name-wrapper" :id="'zt'+ordinalAdd(0)">
                                <img src="../../../assets/icon/open.png" v-if="scope.row.status === '1'"
                                     @click="onChangeStatus(scope.row)" style="vertical-align: middle;cursor:pointer">
                                <img src="../../../assets/icon/close.png" v-if="scope.row.status === '0'"
                                     @click="onChangeStatus(scope.row)" style="vertical-align: middle;cursor:pointer">
                            </div>
                        </el-popover>
                    </template>
                </el-table-column>
                <el-table-column header-align="center" label="操作">
                    <template slot-scope="scope">
                        <el-row>
                            <span :id="'bj'+ordinalAdd(0)" class="img_span update" @click="onAddVisible(0, scope.row)"></span>
                            <span :id="'sc'+ordinalAdd(0)" class="img_span del" @click="onDelete(scope.row.id)"></span>
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
                    <el-input v-model="classSortAdd.category_name" placeholder="类别名称" clearable style="width: 315px"
                              maxlength="10"></el-input>
                    <span class="required">*</span>
                </el-row>
                <el-row>
                    <el-input v-model="classSortAdd.category_code" placeholder="类别代码" clearable style="width: 315px"
                              maxlength="10"></el-input>
                    <span class="required">*</span>
                </el-row>
            </el-row>
            <span slot="footer">
                        <el-button @click="onAddVisible(1)" class="update_btn_cancel">取 消</el-button>
                        <el-button type="primary" @click="onAddVisible(2)" class="update_btn_confirm">确 定</el-button>
                    </span>
        </el-dialog>
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

    import {Component, Watch, XtRouter, XtVue} from "../../../common/common";
    import {ChangeStatus, PageQuery, ClassSortAdd, ClassSortList} from "../department.def";
    import DepartmentCnt from "../department.cnt";
    import {AxiosResponse} from "axios";



    @Component
    export default class School extends XtVue {
        // 分页查询
        private pageQuery: PageQuery = new PageQuery();
        private pageTotal: number = 0;
        private pageNum: number = 0;
        // 新增弹框
        private addVisible: boolean = false;
        private addTitle: string | null = null;
        // 删除按钮弹框
        private delVisible: boolean = false;
        private delId: string | null = null;
        // 状态数据
        private changeStatus: ChangeStatus = new ChangeStatus();
        // 数据
        private classSortList: ClassSortList[] = [];
        private classSortAdd: ClassSortAdd = new ClassSortAdd();
        private unitID: string | null = null;
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
            DepartmentCnt.cloud.list_page_all_class_category_info(this.pageQuery).then((response: AxiosResponse) => {
                this.loading = false;
                if (response.data.status === '200') {
                    this.pageTotal = response.data.data.totalElements;
                    this.classSortList = response.data.data.content;
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
            let userInfo: any = sessionStorage.getItem('user_info');
            userInfo = JSON.parse(userInfo);
            this.unitID = userInfo.fk_unit_id;
        }

        // 新增
        onAddVisible(state: number, row: any = ''): void {
            if (state === 0) { // 点击新增
                this.classSortAdd = new ClassSortAdd();
                if (row) {
                    this.addTitle = '修改';
                    this.classSortAdd.id = row.id;
                    this.classSortAdd.category_name = row.category_name;
                    this.classSortAdd.category_code = row.category_code;
                } else {
                    this.classSortAdd.id = '';
                    this.addTitle = '新增';
                }
                this.addVisible = true;
            }  else if (state === 1) { // 取消
                this.classSortAdd = new ClassSortAdd();
                this.addVisible = false;
            } else if (state === 2) { // 确定
                if (this.classSortAdd.category_name !== '' && this.classSortAdd.category_code !== '') {
                    this.loading = true;
                    this.classSortAdd.fk_unit_id = this.unitID;
                    DepartmentCnt.cloud.save_or_modify_class_category_info(this.classSortAdd).then((response: AxiosResponse) => {
                        this.loading = false;
                        if (response.data.status === '200') {
                            this.getInfo();
                            this.classSortAdd = new ClassSortAdd();
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
            DepartmentCnt.cloud.modify_class_category_info_status_by_id(this.changeStatus).then((response: AxiosResponse) => {
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
            DepartmentCnt.cloud.remove_class_category_info_by_id({id: this.delId}).then((response: AxiosResponse) => {
                this.loading = false;
                if (response.data.status === '200') {
                    this.delVisible = false;
                    this.getInfo();
                } else {
                    this.any().$notify.error({title: '提示', message: response.data.message});
                }

            })
        }

        onIntoClass(): void {
            XtRouter.skipNamed("DepartmentClass");
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
