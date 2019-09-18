<template>
    <el-col class="right_table" style="width: 1166px;">
        <el-row class="float_right">
            <el-tooltip v-show="addBtn" class="item" effect="dark" content="无权限" placement="top">
                <el-button class="pt_btn" size="mini">
                    <span class="add_span"><img src="../../../assets/icon/add.png" class="add_img">新增</span>
                </el-button>
            </el-tooltip>
            <el-button v-show="!addBtn" id="xz" class="add_btn" size="mini" @click="onAddVisible(0)">
                <span @click="onAddVisible(0)" class="add_span"><img src="../../../assets/icon/add.png" class="add_img">新增</span>
            </el-button>
        </el-row>
        <el-row>
            <template>
                <el-table :data="gradeList"   :default-sort="{prop: 'grade_name', order: 'descending'}"
                          v-loading="loading"
                          element-loading-text="拼命加载中"
                          element-loading-spinner="el-icon-loading"
                          element-loading-background="rgba(0, 0, 0, 0.8)">
                    <el-table-column header-align="center" label="序号" type="index" :index="ordinalAdd" sortable
                                     width="60px"></el-table-column>
                    <el-table-column header-align="center" prop="grade_name" label="年级名称"></el-table-column>
                    <el-table-column header-align="center" prop="grade_code" label="年级代码"></el-table-column>
                    <el-table-column header-align="center" prop="grade_another_name" label="年级别称"></el-table-column>
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
                    <el-table-column header-align="center" prop="place_on_file_flag" label="归档" width="75px">
                        <template slot-scope="scope">
                            <el-tooltip v-show="fileBtn" class="item" effect="dark" content="无权限" placement="right">
                                <span class="disabled img_span" style="cursor: not-allowed"></span>
                            </el-tooltip>
                            <el-row :id="'gd'+ordinalAdd(0)" v-show="!fileBtn">
                                <el-tooltip v-if="scope.row.place_on_file_flag === '1'" class="item" effect="dark" content="已归档"
                                            placement="top" :enterable="false">
                                    <span class="dis_file img_span"></span>
                                </el-tooltip>

                                <el-tooltip v-if="scope.row.place_on_file_flag !== '1' && Number(scope.row.grade_name.substring(1, 5)) + 1 < nowYear.substring(0, 4)"
                                            class="item" effect="dark" content="未归档" placement="top" :enterable="false">
                                    <span class="file img_span" @click="onPlace(scope.row)"></span>
                                </el-tooltip>

                                <el-tooltip v-if="scope.row.place_on_file_flag !== '1' && Number(scope.row.grade_name.substring(1, 5)) + 1 === Number(nowYear.substring(0, 4)) && nowMonth > 6"
                                            class="item" effect="dark" content="未归档" placement="top" :enterable="false">
                                    <span class="file img_span" @click="onPlace(scope.row)"></span>
                                </el-tooltip>

                                <el-tooltip v-if="scope.row.place_on_file_flag !== '1' && Number(scope.row.grade_name.substring(1, 5)) + 1 >  Number(nowYear.substring(0, 4))"
                                            class="item" effect="dark" content="学期尚未结束无法归档" placement="top" :enterable="false">
                                    <span class="dis_file img_span"></span>
                                </el-tooltip>

                                <el-tooltip v-if="scope.row.place_on_file_flag !== '1' && Number(scope.row.grade_name.substring(1, 5)) + 1 === Number(nowYear.substring(0, 4)) && nowMonth < 6"
                                            class="item" effect="dark" content="已停用" placement="top" :enterable="false">
                                    <span class="dis_file img_span"></span>
                                </el-tooltip>
                            </el-row>


                            <!--<el-popover v-show="!fileBtn" trigger="hover" placement="top">-->
                                <!--<p v-if="scope.row.place_on_file_flag === '1'">已归档</p>-->
                                <!--<p v-if="scope.row.place_on_file_flag !== '1' && Number(scope.row.grade_name.substring(1, 5)) + 1 <  Number(nowYear.substring(0, 4))">-->
                                    <!--未归档</p>-->
                                <!--<p v-if="scope.row.place_on_file_flag !== '1' && Number(scope.row.grade_name.substring(1, 5)) + 1 === Number(nowYear.substring(0, 4)) && nowMonth > 6">-->
                                    <!--未归档</p>-->
                                <!--<p v-if="scope.row.place_on_file_flag !== '1' && Number(scope.row.grade_name.substring(1, 5)) + 1 >  Number(nowYear.substring(0, 4))">-->
                                    <!--学期尚未结束无法归档</p>-->
                                <!--<p v-if="scope.row.place_on_file_flag !== '1' && Number(scope.row.grade_name.substring(1, 5)) + 1 === Number(nowYear.substring(0, 4)) && nowMonth < 6">-->
                                    <!--学期尚未结束无法归档</p>-->
                                <!--<div slot="reference" class="name-wrapper" :id="'gd'+ordinalAdd(0)">-->
                                    <!--<span class="file img_span" @click="onPlace(scope.row)"-->
                                          <!--v-if="scope.row.place_on_file_flag !== '1' && Number(scope.row.grade_name.substring(1, 5)) + 1 < nowYear.substring(0, 4)"></span>-->
                                    <!--<span class="file img_span" @click="onPlace(scope.row)"-->
                                          <!--v-if="scope.row.place_on_file_flag !== '1' && Number(scope.row.grade_name.substring(1, 5)) + 1 === Number(nowYear.substring(0, 4)) && nowMonth > 6"></span>-->
                                    <!--<span class="dis_file img_span" v-if="scope.row.place_on_file_flag === '1'"></span>-->
                                    <!--<span class="dis_file img_span"-->
                                          <!--v-if="scope.row.place_on_file_flag !== '1' && Number(scope.row.grade_name.substring(1, 5)) + 1 > nowYear.substring(0, 4)"></span>-->
                                    <!--<span class="dis_file img_span"-->
                                          <!--v-if="scope.row.place_on_file_flag !== '1' && Number(scope.row.grade_name.substring(1, 5)) + 1 === Number(nowYear.substring(0, 4)) && nowMonth < 6"></span>-->
                                <!--</div>-->
                            <!--</el-popover>-->
                        </template>
                    </el-table-column>
                    <el-table-column header-align="center" label="操作">
                        <template slot-scope="scope">
                            <el-row v-if="scope.row.place_on_file_flag !== '1'">
                                <el-tooltip v-show="editBtn" class="item" effect="dark" content="无权限" placement="top">
                                    <span v-show="editBtn" class="img_span disabled_update" style="cursor: not-allowed"></span>
                                </el-tooltip>
                                <el-tooltip v-show="deleteBtn" class="item" effect="dark" content="无权限" placement="top">
                                    <span class="img_span disabled_del" style="cursor: not-allowed"></span>
                                </el-tooltip>
                                <span v-show="!editBtn" :id="'bj'+ordinalAdd(0)" class="img_span update" @click="onAddVisible(0, scope.row)"></span>
                                <span v-show="!deleteBtn" :id="'sc'+ordinalAdd(0)" class="img_span del" @click="onDelete(scope.row.id)"></span>
                            </el-row>
                            <el-row  v-if="scope.row.place_on_file_flag === '1'">
                                <el-tooltip v-show="editBtn" class="item" effect="dark" content="无权限" placement="top">
                                    <span v-show="editBtn" class="img_span disabled_update" style="cursor: not-allowed"></span>
                                </el-tooltip>
                                <el-tooltip v-show="deleteBtn" class="item" effect="dark" content="无权限" placement="top">
                                    <span class="img_span disabled_del" style="cursor: not-allowed"></span>
                                </el-tooltip>
                                <span v-show="!editBtn" class="img_span disabled_update" style="cursor: not-allowed"></span>
                                <span v-show="!deleteBtn" class="img_span disabled_del" style="cursor: not-allowed"></span>
                            </el-row>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
        </el-row>
        <el-dialog
            :title="addTitle"
            :close-on-click-modal="false"
            :visible.sync="addVisible"
            width="30%"
            center>
            <el-row class="dialog_center">
                <el-row>
                    <el-tooltip class="item" effect="dark" content="学段" placement="right">
                        <el-select v-model="PhaseVal" placeholder="请选择学段" clearable value="">
                            <el-option
                                v-for="item in gradePhaseList"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-tooltip>
                </el-row>
                <el-row v-if="PhaseVal">
                    <el-tooltip class="item" effect="dark" content="年级名称" placement="right">
                        <el-select v-model="gradeAdd.grade_name" placeholder="请选择年级名称" clearable value="">
                            <el-option
                                v-for="item in gradeNameList"
                                :key="item.value"
                                :label="item.label"
                                :value="item.label">
                            </el-option>
                        </el-select>
                    </el-tooltip>
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
        <el-dialog
            title="是否归档"
            :visible.sync="placeVisible"
            width="30%"
            center>
            <el-row class="dialog_center">
                <span style="font-size: 18px;">归档之后将无法进行任何操作</span>
            </el-row>
            <span slot="footer">
                        <el-button @click="placeVisible = false" class="update_btn_cancel">取 消</el-button>
                        <el-button type="success" @click="onPlaceConfirm()" class="update_btn_confirm">确 定</el-button>
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
    import DepartmentCnt from "../department.cnt";
    import {Component, Watch, XtVue} from "../../../common/common";
    import {ChangePlace, ChangeStatus, GradeAdd, PageQuery,} from "../department.def";
    import {AxiosResponse} from "axios";
    import {getBtnList} from "../../common/mod/base"


    @Component
    export default class Grade extends XtVue {
        // 分页查询
        private pageQuery: PageQuery = new PageQuery();
        private pageTotal: number = 0;
        private pageNum: number = 0;
        // 表格数据
        private gradeList: any[] = [];
        // 新增弹框
        private addVisible: boolean = false;
        private addTitle: string | null = null;
        // 新增的数据
        private gradeAdd: GradeAdd = new GradeAdd();
        // 归档
        private changePlace: ChangePlace = new ChangePlace();
        // 归档提示框
        private placeVisible: boolean = false;
        // 状态
        private changeStatus: ChangeStatus = new ChangeStatus();
        // 删除按钮弹框
        private delVisible: boolean = false;
        private delId: string | null = null;
        // 新增名称列表
        private gradeNameList: any = [];
        private gradePhaseList: any = [{value: '小', label: '小学'}, {value: '初', label: '初中'}, {value: '高', label: '高中'}];
        private PhaseVal: string = '';
        private nowMonth: number = 0;
        private nowYear: string | null = null;
        // 按钮权限
        private addBtn: boolean = true; // 新增
        private fileBtn: boolean = true; // 归档
        private editBtn: boolean = true; // 修改
        private deleteBtn: boolean = true; // 删除
        private startStopBtn: boolean = true;
        private userType: string = '';
        private unitID: string = '';
        private loading: boolean = false;


        // 查询
        getInfo(): void {
            if (this.pageNum === 1) {
                this.pageQuery.page_num = 0;
            } else if (this.pageNum > 1) {
                this.pageQuery.page_num = this.pageNum - 1;
            }
            if (this.userType == '0') {
                this.pageQuery.fk_unit_id = this.unitID;
            } else {
                this.pageQuery.fk_unit_id = this.unitID;
            }
            delete this.pageQuery.status;
            this.loading = true;
            delete this.pageQuery.discipline_code;
            delete this.pageQuery.discipline_name;
            DepartmentCnt.cloud.list_page_all_grade_info(this.pageQuery).then((response: AxiosResponse) => {
                this.loading = false;
                if (response.data.status === '200') {
                    // console.log(this.pageQuery.page_size);
                    this.pageTotal = response.data.data.totalElements;
                    this.gradeList = response.data.data.content;
                } else {
                    this.any().$notify.error({title: '提示', message: response.data.message});
                }

            })
        }
        @Watch("pageNum")
        onFlipOver(): void {
            this. getInfo();
        }

        @Watch("PhaseVal")
        getTime(): void {
            this.gradeAdd.grade_name = '';
            let now = new Date();
            let year = now.getFullYear();
            this.nowYear = year.toString() + '级';
            let month: string | number = now.getMonth();
            month < 10 ? month = '0' + month : month;
            month = Number(month) + 1;
            this.nowMonth = month;
            this.gradeNameList = [];
            if (month < 7) { year = year - 1; }
            for (let i: number = 0; i < 7; i++) {
                let month: string | number = now.getMonth();
                month < 10 ? month = '0' + month : month;
                this.gradeNameList.push({value: i + 1, label: this.PhaseVal + (year - i) + '级'});
            }
            if (this.PhaseVal !== '小') { this.gradeNameList.splice(4, 4); }
            if (this.PhaseVal === '小') { this.gradeAdd.learn_section = '1' }
            else if (this.PhaseVal === '初') { this.gradeAdd.learn_section = '2' }
            else if (this.PhaseVal === '高') { this.gradeAdd.learn_section = '3' }
        }

        mounted() {
            let userInfo: any = window.sessionStorage.getItem("user_info");
            userInfo = JSON.parse(userInfo);
            this.userType = userInfo.user_type;
            this.unitID = userInfo.fk_unit_id;
            this.getTime();
            if (window.sessionStorage.getItem("val")) {
                let btnList: any = window.sessionStorage.getItem("val");
                btnList = JSON.parse(btnList).children;
                this.addBtn = getBtnList(btnList, 'add');
                this.editBtn = getBtnList(btnList, 'edit');
                this.deleteBtn = getBtnList(btnList, 'delete');
                this.fileBtn = getBtnList(btnList, 'file');
                this.startStopBtn = getBtnList(btnList, 'start_stop');
                console.log(this.addBtn,
                    this.editBtn,
                    this.deleteBtn,
                    this.fileBtn,
                    this.startStopBtn)
            }
        }


        // 新增
        onAddVisible(state: number, row: any = ''): void {
            if (state === 0) { // 点击新增
                if (row) {
                    this.gradeAdd.id = row.id;
                    this.gradeAdd.status = row.status;
                    this.PhaseVal = row.grade_name.substring(0,1);
                    this.gradeAdd.grade_name = row.grade_name;
                    this.addTitle = '修改';
                } else {
                    this.gradeAdd = new GradeAdd();
                    this.addTitle = '新增';
                }
                this.addVisible = true;
            } else if (state === 1) { // 取消
                this.addVisible = false;
            } else if (state === 2) { // 确定
                if (this.PhaseVal !== '' && this.gradeAdd.grade_name !== '') {
                    this.gradeAdd.fk_unit_id = this.unitID;
                    this.loading = true;
                    DepartmentCnt.cloud.save_or_modify_grade_in(this.gradeAdd).then((response: AxiosResponse) => {
                        this.loading = false;
                        if (response.data.status === '200') {
                            this.getInfo();
                            this.gradeAdd.grade_name = '';
                            this.PhaseVal = '';
                            this.addVisible = false;
                        } else {
                            this.any().$notify.error({title: '提示', message: response.data.message});
                        }
                    });
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
            DepartmentCnt.cloud.modify_grade_info_status_by_id(this.changeStatus).then((response: AxiosResponse) => {
                this.loading = false;
                if (response.data.status === '200') {
                    this.any().$notify.success({title: '提示',message: '状态更改成功'});
                } else {
                    this.any().$notify.error({title: '提示', message: response.data.message});
                }
            })
        }
        // 归档
        onPlace(row: any): void {
            this.changePlace.id = row.id;
            this.placeVisible = true;
        }

        onPlaceConfirm(): void { // 确认归档
            this.changePlace.place_on_file_flag = '1';
            this.loading = true;
            DepartmentCnt.cloud.modify_grade_info_place_on_file_flag_by_id(this.changePlace).then((response: AxiosResponse) => {
                this.loading = false;
                if (response.data.status === '200') {
                    this.getInfo();
                } else {
                    this.any().$notify.error({title: '提示', message: response.data.message});
                }
            });
            this.placeVisible = false;
        }


        // 删除
        onDelete(id: string): void {
            this.delId = id;
            this.delVisible = true;
        }
        onDelConfirm(): void { // 确认删除
            this.loading = true;
            DepartmentCnt.cloud.remove_grade_info_by_id({id: this.delId}).then((response: AxiosResponse) => {
                this.loading = false;
                if (response.data.status === '200') {
                    this.delVisible = false;
                    this.getInfo();
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

    .add_btn span {
        display: flex;
    }

    .add_btn img {
        margin-right: 8px;
    }

    .img_span {
        display: inline-block;
        height: 24px;
        width: 24px;
        cursor: pointer;
    }

    .dis_file {
        background: url("../../../assets/icon/guidang-n.png");
    }

    .disabled {
        background: url("../../../assets/icon/guidang-n.png");
    }
    .disabled_update {
        background: url("../../../assets/icon/bianji-n.png");
        margin-right: 8px;
    }
    .disabled_del {
        background: url("../../../assets/icon/shanchu-n.png");
    }
</style>
