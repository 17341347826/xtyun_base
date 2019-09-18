<template>
    <el-col class="right_table" style="width: 1166px;">
            <el-row class="float_right">
                <el-tooltip v-show="addBtn" class="item" effect="dark" content="无权限" placement="top">
                    <el-button class="pt_btn" size="mini">
                        <span class="add_span"><img src="../../../assets/icon/add.png" class="add_img">新增</span>
                    </el-button>
                </el-tooltip>
                <el-button v-show="!addBtn" id="xz" class="add_btn" size="mini" @click="onAddVisible(0)">
                    <span class="add_span"><img src="../../../assets/icon/add.png" class="add_img">新增</span>
                </el-button>
            </el-row>
            <el-row>
                <el-table :data="semesterList"   :default-sort="{prop: 'start_date', order: 'descending'}"
                          v-loading="loading"
                          element-loading-text="拼命加载中"
                          element-loading-spinner="el-icon-loading"
                          element-loading-background="rgba(0, 0, 0, 0.8)">
                    <el-table-column header-align="center" label="序号" type="index" :index="ordinalAdd" sortable
                                     width="60px"></el-table-column>
                    <el-table-column header-align="center" prop="semester_name" label="学期名称"></el-table-column>
                    <el-table-column header-align="center" prop="academic_year" label="所属学年"></el-table-column>
                    <el-table-column header-align="center" prop="semester_index" label="学期属性">
                        <template slot-scope="scope">
                            <span>{{scope.row.semester_index === '1' ? '第一学期/秋季学期' : '第二学期/春季学期'}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column header-align="center" prop="start_date" label="学期开始时间"></el-table-column>
                    <el-table-column header-align="center" prop="end_date" label="学期结束时间"></el-table-column>
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
                    <el-table-column header-align="center" prop="place_on_file_flag" label="归档" width="80px">
                        <template slot-scope="scope">
                            <el-tooltip v-show="fileBtn" class="item" effect="dark" content="无权限" placement="top">
                                <span class="disabled img_span" style="cursor: not-allowed"></span>
                            </el-tooltip>




                            <el-row v-show="!fileBtn" :id="'gd'+ordinalAdd(0)">
                                <el-tooltip v-if="scope.row.place_on_file_flag === '1'" class="item" effect="dark"
                                            content="已归档" placement="top" :enterable="false">
                                    <span class="disabled img_span" style="cursor: not-allowed"></span>
                                </el-tooltip>

                                <el-tooltip v-if="scope.row.place_on_file_flag === '0' && scope.row.end_date < newTime"
                                            class="item" effect="dark" content="未归档" placement="top" :enterable="false">
                                    <span :id="'gd'+ordinalAdd(0)" class="file img_span" @click="onPlace(scope.row)"></span>
                                </el-tooltip>

                                <el-tooltip v-if="scope.row.place_on_file_flag === '0' && scope.row.end_date >= newTime"
                                            class="item" effect="dark" content="学期尚未结束无法归档" placement="top" :enterable="false">
                                    <span class="disabled img_span" style="cursor: not-allowed"></span>
                                </el-tooltip>
                            </el-row>

                            <!--<el-popover v-show="!fileBtn" trigger="hover" placement="right">-->
                                <!--<p v-if="scope.row.place_on_file_flag === '1'">已归档</p>-->
                                <!--<p v-if="scope.row.place_on_file_flag === '0' && scope.row.end_date < newTime">未归档</p>-->
                                <!--<p v-if="scope.row.place_on_file_flag === '0' && scope.row.end_date >= newTime">-->
                                    <!--学期尚未结束无法归档</p>-->
                                <!--<div slot="reference" class="name-wrapper operation">-->
                                    <!--<span class="disabled img_span"-->
                                          <!--v-if="scope.row.place_on_file_flag === '0' && scope.row.end_date >= newTime"-->
                                          <!--style="cursor: not-allowed"></span>-->
                                    <!--<span :id="'gd'+ordinalAdd(0)" class="file img_span"-->
                                          <!--v-if="scope.row.place_on_file_flag === '0' && scope.row.end_date < newTime"-->
                                          <!--@click="onPlace(scope.row)"></span>-->
                                    <!--<span class="disabled img_span" v-if="scope.row.place_on_file_flag === '1'"-->
                                          <!--style="cursor: not-allowed"></span>-->
                                <!--</div>-->
                            <!--</el-popover>-->
                        </template>
                    </el-table-column>
                    <el-table-column header-align="center" label="操作">
                        <template slot-scope="scope">
                            <el-row v-if="scope.row.place_on_file_flag === '1'" class="operation">

                                <el-tooltip v-show="editBtn" class="item" effect="dark" content="无权限" placement="top">
                                    <span class="img_span disabled_update" style="cursor: not-allowed"></span>
                                </el-tooltip>
                                <el-tooltip v-show="deleteBtn" class="item" effect="dark" content="无权限" placement="top">
                                    <span class="img_span disabled_del" style="cursor: not-allowed"></span>
                                </el-tooltip>

                                <span v-show="!editBtn" class="img_span disabled_update" style="cursor: not-allowed"></span>
                                <span v-show="!deleteBtn" class="img_span disabled_del" style="cursor: not-allowed"></span>
                            </el-row>
                            <el-row v-if="scope.row.place_on_file_flag !== '1'" class="operation">

                                <el-tooltip v-show="editBtn" class="item" effect="dark" content="无权限" placement="top">
                                    <span class="img_span disabled_update" style="cursor: not-allowed"></span>
                                </el-tooltip>
                                <el-tooltip v-show="deleteBtn" class="item" effect="dark" content="无权限" placement="top">
                                    <span class="img_span disabled_del" style="cursor: not-allowed"></span>
                                </el-tooltip>

                                <span v-show="!editBtn" :id="'bj'+ordinalAdd(0)" class="img_span update" @click="onUpdateChange(scope.row, 0)"></span>
                                <span v-show="!deleteBtn" :id="'sc'+ordinalAdd(0)" class="img_span del" @click="onDelete(scope.row.id)"></span>
                            </el-row>


                        </template>
                    </el-table-column>
                </el-table>
            </el-row>
            <!--新增-->
            <el-dialog
                title="新增"
                :close-on-click-modal="false"
                :visible.sync="addVisible"
                width="30%"
                center>
                <el-row class="dialog_center">
                    <el-row>
                        <el-select v-model="semesterAddList.academic_year" placeholder="请选择所属学年" clearable value="">
                            <el-option
                                v-for="item in yearList"
                                :key="item"
                                :label="item"
                                :value="item">
                            </el-option>
                        </el-select>
                        <span class="required">*</span>
                    </el-row>
                    <el-row>
                        <el-select v-model="semesterNumVal" placeholder="请选择学期属性" clearable value="">
                            <el-option
                                v-for="item in semesterNum"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                        <span class="required">*</span>
                    </el-row>
                    <el-row>
                        <el-input v-model="semesterAddList.semester_name" placeholder="请输入学期名称" value="" clearable
                                  style="width: 315px" maxlength="20"></el-input>
                        <span class="required">*</span>
                    </el-row>
                    <el-row>
                        <!--<el-input v-model="semesterAddList.start_date" placeholder="请输入开始日期, 例: xxxx-xx-xx" clearable style="width: 315px"></el-input>-->
                        <el-date-picker
                            style="width: 315px;"
                            v-model="semesterAddList.start_date"
                            type="date"
                            placeholder="请输入开始日期"
                            format="yyyy 年 MM 月 dd 日"
                            value-format="yyyy-MM-dd">
                        </el-date-picker>
                        <span class="required">*</span>
                    </el-row>
                    <el-row>
                        <!--<el-input v-model="endTime" placeholder="请输入结束日期, 例: xxxx-xx-xx" clearable style="width: 315px"></el-input>-->
                        <el-date-picker
                            style="width: 315px;"
                            v-model="semesterAddList.end_date"
                            type="date"
                            placeholder="请输入结束日期"
                            format="yyyy 年 MM 月 dd 日"
                            value-format="yyyy-MM-dd">
                        </el-date-picker>
                        <span class="required">*</span>
                    </el-row>
                </el-row>
                <span slot="footer">
                        <el-button @click="onAddVisible(1)" class="update_btn_cancel">取 消</el-button>
                        <el-button type="primary" @click="onAddVisible(2)" class="update_btn_confirm">确 定</el-button>
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
                        <el-select v-model="semesterAddList.academic_year" placeholder="请选择所属学年" clearable value="">
                            <el-option
                                v-for="item in yearList"
                                :key="item"
                                :label="item"
                                :value="item">
                            </el-option>
                        </el-select>
                        <span class="required">*</span>
                    </el-row>
                    <el-row>
                        <el-select v-model="semesterNumVal" placeholder="请选择学期属性" clearable value="">
                            <el-option
                                v-for="item in semesterNum"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                        <span class="required">*</span>
                    </el-row>
                    <el-row>
                        <el-input v-model="semesterAddList.semester_name" placeholder="请输入学期名称" value="" clearable
                                  style="width: 315px" maxlength="20"></el-input>
                        <span class="required">*</span>
                    </el-row>
                    <el-row>
                        <!--<el-input v-model="semesterAddList.start_date" placeholder="请输入开始日期, 例: xxxx-xx-xx" clearable style="width: 315px"></el-input>-->
                        <el-date-picker
                            style="width: 315px;"
                            v-model="semesterAddList.start_date"
                            type="date"
                            placeholder="请输入开始日期"
                            format="yyyy 年 MM 月 dd 日"
                            value-format="yyyy-MM-dd">
                        </el-date-picker>
                        <span class="required">*</span>
                    </el-row>
                    <el-row>
                        <!--<el-input v-model="endTime" placeholder="请输入结束日期, 例: xxxx-xx-xx" clearable style="width: 315px"></el-input>-->
                        <el-date-picker
                            style="width: 315px;"
                            v-model="semesterAddList.end_date"
                            type="date"
                            placeholder="请输入结束日期"
                            format="yyyy 年 MM 月 dd 日"
                            value-format="yyyy-MM-dd">
                        </el-date-picker>
                        <span class="required">*</span>
                    </el-row>
                </el-row>
                <span slot="footer">
                        <el-button @click="onUpdateChange('', 1)" class="update_btn_cancel">取 消</el-button>
                        <el-button type="primary" @click="onUpdateChange('', 2)" class="update_btn_confirm">确 定</el-button>
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
                <el-button @click="onPlaceConfirm()" class="update_btn_confirm">确 定</el-button>
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
    import {SemesterList, SemesterAddList, ChangeStatus, ChangePlace, PageQuery} from "../department.def";
    import DepartmentCnt from "../department.cnt";
    import {AxiosResponse} from "axios";
    import {getBtnList} from "../../common/mod/base"

    @Component
    export default class Semester extends XtVue {
        // 分页查询
        private pageQuery: PageQuery = new PageQuery();
        private pageTotal: number = 0;
        private pageNum: number = 0;
        // 表格数据
        private semesterList: SemesterList[] = [];
        private yearList: any = [];
        // 新增弹框
        private addVisible: boolean = false;
        // 选择的学期序号
        private semesterNumVal: number | string | null = null;
        // 传输的新增数据
        private semesterAddList: SemesterAddList = new SemesterAddList();
        // 删除按钮弹框
        private delVisible: boolean = false;
        private delId: string | null = null;
        // 修改按钮弹框
        private updateVisible: boolean = false;
        // 归档提示框
        private placeVisible: boolean = false;
        // 状态
        private changeStatus: ChangeStatus = new ChangeStatus();
        // 当前时间
        private newTime: string | null = null;
        // 归档
        private changePlace: ChangePlace = new ChangePlace();
        private semesterNum: any = [{value: '1', label: '第一学期(秋季)'}, {value: '2', label: '第二学期(春季)'}];
        // 按钮权限
        private addBtn: boolean = true; // 新增
        private fileBtn: boolean = true; // 归档
        private editBtn: boolean = true; // 修改
        private deleteBtn: boolean = true; // 删除
        private startStopBtn: boolean = true; // 状态
        private userType: string | null = null;
        private unitID: string | null = null;
        private loading: boolean = false; // 加载层


        getInfo() {
            if (this.pageNum === 1) {
                this.pageQuery.page_num = 0;
            } else if (this.pageNum > 1) {
                this.pageQuery.page_num = this.pageNum - 1;
            }
            if (this.userType ===  '0') {
                this.pageQuery.fk_unit_id = this.unitID;
            } else {
                this.pageQuery.fk_unit_id = this.unitID;
            }
            delete this.pageQuery.status;
            this.loading = true;
            DepartmentCnt.cloud.list_page_all_semester_info(this.pageQuery).then((response: AxiosResponse) => {
                this.loading = false;
                if (response.data.status === '200') {
                    this.semesterList = response.data.data.content;
                    this.pageTotal = response.data.data.totalElements;
                    // console.log(response.data.data.totalElements);
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
            if (window.sessionStorage.getItem("val")) {
                let btnList: any = window.sessionStorage.getItem("val");
                btnList = JSON.parse(btnList).children;
                this.addBtn = getBtnList(btnList, 'add');
                this.editBtn = getBtnList(btnList, 'edit');
                this.deleteBtn = getBtnList(btnList, 'delete');
                this.fileBtn = getBtnList(btnList, 'file');
                this.startStopBtn = getBtnList(btnList, 'start_stop');
            }



            let now = new Date();
            let year = now.getFullYear();
            let month: string | number = now.getMonth();
            let date: string | number = now.getDate();
            month = Number(month) + 1;
            month < 10 ? month = '0' + month : month;
            date < 10 ? date = '0' + date : date;
            this.newTime = year + '-' + month + '-' + date;
            this.yearList.push(year + '-' + (year + 1));
            this.yearList.push((year - 1) + '-' + year);
            for (let i: number = 1; i < 5; i++) {
                this.yearList.push((year - (i + 1)) + '-' + (year - i));
            }
            // console.log(this.newTime)
        }


        @Watch("semesterAddList.academic_year")
        @Watch("semesterNumVal")
        semesterName(): void {
            if (this.semesterAddList.academic_year) {
                this.semesterAddList.semester_name = '';
                this.semesterAddList.semester_name += this.semesterAddList.academic_year + '年';
                if (this.semesterNumVal === '1') {
                    // this.semesterAddList.semester_name += '（秋季）学期';
                    this.semesterAddList.semester_name += '上期';
                } else if (this.semesterNumVal === '2') {
                    // this.semesterAddList.semester_name += '（春季）学期';
                    this.semesterAddList.semester_name += '下期';
                }
            }
        }

        // 新增
        onAddVisible(state: number): void {
            if (state === 0) { // 点击新增
                this.addVisible = true;
                this.semesterNumVal = '';
                this.semesterAddList = new SemesterAddList();
            } else if (state === 1) { // 取消
                this.addVisible = false;
            } else if (state === 2) { // 确定
                if (this.semesterAddList.academic_year && this.semesterAddList.end_date && this.semesterAddList.start_date && this.semesterAddList.semester_name && this.semesterNumVal) {
                    this.semesterAddList.id = '';
                    this.semesterAddList.fk_unit_id = this.unitID;
                    this.loading = true;
                    DepartmentCnt.cloud.save_or_modify_semester_info(this.semesterAddList).then((response: AxiosResponse) => {
                        this.loading = false;
                        if (response.data.status === '200') {
                            this.addVisible = false;
                            this.getInfo();
                            this.semesterAddList = new SemesterAddList();
                        } else {
                            this.any().$notify.error({title: '提示', message: response.data.message});
                        }
                    })
                } else {
                    this.any().$notify.error({title: '提示', message: "必填项不能有空"});
                }

            }
        }
        // 修改
        onUpdateChange(row: any, state: number): void {
            if (state === 0) {
                this.updateVisible = true;
                this.semesterAddList.id = row.id;
                this.semesterAddList.status = row.status;
                this.semesterAddList.academic_year = row.academic_year;
                this.semesterAddList.end_date = row.end_date;
                this.semesterAddList.start_date = row.start_date;
                this.semesterAddList.semester_name = row.semester_name;
                this.semesterNumVal = row.semester_index;
                this.semesterAddList.place_on_file_flag = row.place_on_file_flag;
                this.semesterAddList.status = row.status;
                this.semesterAddList.fk_unit_id = row.fk_unit_id;
            } else if (state === 1) { // 取消
                this.updateVisible = false;
            } else if (state === 2) { // 确定
                if (this.semesterAddList.academic_year && this.semesterAddList.end_date && this.semesterAddList.start_date && this.semesterAddList.semester_name && this.semesterNumVal) {
                    this.loading = true;
                    DepartmentCnt.cloud.save_or_modify_semester_info(this.semesterAddList).then((response: AxiosResponse) => {
                        this.loading = false;
                        if (response.data.status === '200') {
                            this.getInfo();
                            this.semesterAddList = new SemesterAddList();
                            this.updateVisible = false;
                        } else {
                            this.any().$notify.error({title: '提示', message: response.data.message});
                        }
                    })
                } else {
                    this.any().$notify.error({title: '提示', message: "必填项不能有空"});
                }
            }
        }

        @Watch("updateVisible")
        @Watch("addVisible")
        clean(): void {
            if (!this.updateVisible) {
                this.semesterAddList = new SemesterAddList();
            }
        }

        // 删除
        onDelete(id: string): void {
            this.delId = id;
            this.delVisible = true;
        }
        onDelConfirm(): void { // 确认删除
            this.loading = true;
            DepartmentCnt.cloud.remove_semester_info_by_id({id: this.delId}).then((response: AxiosResponse) => {
                this.loading = false;
                if (response.data.status === '200') {
                    this.delVisible = false;
                    this.getInfo();
                } else {
                    this.any().$notify.error({title: '提示', message: response.data.message});
                }
            })
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
            DepartmentCnt.cloud.modify_semester_info_status_by_id(this.changeStatus).then((response: AxiosResponse) => {
                this.loading = false;
                if (response.data.status === '200') {
                    this.getInfo();
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

        onPlaceConfirm(): void {
            this.changePlace.place_on_file_flag = '1';
            this.loading = true;
            DepartmentCnt.cloud.modify_semester_info_place_on_file_flag_by_id(this.changePlace).then((response: AxiosResponse) => {
                this.loading = false;
                if (response.data.status === '200') {
                    this.getInfo();
                } else {
                    this.any().$notify.error({title: '提示', message: response.data.message});
                }
            });
            this.placeVisible = false;
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

    .disabled {
        background: url("../../../assets/icon/guidang-n.png");
    }

</style>
