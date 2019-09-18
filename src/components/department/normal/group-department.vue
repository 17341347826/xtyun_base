<template>
    <el-col class="right_table" style="width: 1166px;">
        <el-row>
            <el-col :span="2" style="float: right;">
                <el-tooltip v-show="addBtn" class="item" effect="dark" content="无权限" placement="top" style="float: right;">
                    <el-button class="pt_btn" size="mini">
                        <span class="add_span"><img src="../../../assets/icon/add.png" class="add_img">新增</span>
                    </el-button>
                </el-tooltip>
                <el-button v-show="!addBtn" id="xz" class="add_btn" style="float: right;" size="mini" @click="onAddVisible(0)">
                    <span @click="onAddVisible(0)" class="add_span"><img src="../../../assets/icon/add.png" class="add_img">新增</span>
                </el-button>
            </el-col>
        </el-row>
        <el-row>
            <el-table :data="groupList"
                      v-loading="loading"
                      element-loading-text="拼命加载中"
                      element-loading-spinner="el-icon-loading"
                      element-loading-background="rgba(0, 0, 0, 0.8)">
                <el-table-column header-align="center" label="序号" type="index" :index="ordinalAdd" sortable
                                 width="80px"></el-table-column>
                <el-table-column header-align="center" prop="group_name" label="小组名称"></el-table-column>
                <el-table-column header-align="center" prop="group_num" label="小组编号" width="165px"></el-table-column>
                <el-table-column header-align="center" prop="class_info.grade_info.grade_name" label="所属年级"></el-table-column>
                <el-table-column header-align="center" prop="class_info.class_name" label="所属班级"></el-table-column>
                <el-table-column header-align="center" prop="chargeman_name" label="组长姓名"></el-table-column>
                <el-table-column header-align="center" prop="member" label="小组成员"></el-table-column>
                <el-table-column header-align="center" prop="status" label="状态" width="80px">
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
                <el-table-column header-align="center" label="操作" width="80px">
                    <template slot-scope="scope">
                        <el-tooltip v-show="editBtn" class="item" effect="dark" content="无权限" placement="top">
                            <span class="img_span disabled_update" style="cursor: not-allowed"></span>
                        </el-tooltip>
                        <el-tooltip v-show="deleteBtn" class="item" effect="dark" content="无权限" placement="top">
                            <span class="img_span disabled_del" style="cursor: not-allowed"></span>
                        </el-tooltip>
                        <span v-show="!editBtn" :id="'bj'+ordinalAdd(0)" class="img_span update" @click="onAddVisible(0, scope.row)"></span>
                        <span v-show="!deleteBtn" :id="'sc'+ordinalAdd(0)" class="img_span del" @click="onDelete(scope.row.id)"></span>
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
                    <el-select v-model="gradeID" filterable placeholder="请选择所属年级" clearable value="">
                        <el-option
                            v-for="item in gradeList"
                            :key="item.id"
                            :label="item.grade_name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                    <span class="required">*</span>
                </el-row>
                <el-row>
                    <el-select v-model="classID" filterable placeholder="请选择所属班级" clearable value=""
                               :no-data-text="gradeID === '' ? '未选择年级' : '该学校年级下没有班级'">
                        <el-option
                            v-for="item in classList"
                            :key="item.id"
                            :label="item.class_name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                    <span class="required">*</span>
                </el-row>
                <el-row>
                    <el-input v-model="groupAdd.group_name" placeholder="小组名称" disabled style="width: 315px"></el-input>
                    <span class="required">*</span>
                </el-row>
                <el-row>
                    <el-input v-model="groupAdd.group_num" placeholder="小组编号" disabled style="width: 315px"></el-input>
                    <span class="required">*</span>
                </el-row>
                <el-row v-if="studentList.length > 0">
                    <el-select v-model="chargeMan" filterable placeholder="请选择组长" clearable value=""
                               :no-data-text="classID === '' ? '未选择班级' : '该班级下没有学生'">
                        <el-option
                            v-for="item in studentList"
                            :key="item.id"
                            :label="item.name_num"
                            :value="item.name_num">
                        </el-option>
                    </el-select>
                    <span class="required">*</span>
                </el-row>
                <el-row v-if="studentList.length > 0 && chargeMan">
                    <el-col :span="5" style="text-align: right">
                        小组成员
                    </el-col>
                    <el-col style="width: 315px;min-height: 200px;border: 1px solid #dddddd;border-radius: 4px;" :span="12">
                        <el-checkbox-group v-model="memberList" v-show="classStudentTest.length>0">
                            <el-col :span="12" style="text-align: left" v-for="item in this.classStudentTest">
                                <el-checkbox :label="item.name_num">{{(item.name_num).split('-')[0]}}</el-checkbox>
                            </el-col>
                        </el-checkbox-group>
                        <span v-show="!classStudentTest.length">已无可选成员</span>
                    </el-col>
                </el-row>
                <el-row v-if="classID && this.studentList.length === 0">
                    该班级学生均已分组
                </el-row>
                <!--<el-row v-if="!classID">
                    <el-row>
                        <el-select v-model="chargeMan" filterable placeholder="请选择组长" clearable value=""
                                   :no-data-text="classID === '' ? '未选择班级' : '该班级下没有学生'">
                            <el-option
                                v-for="item in studentList"
                                :key="item.id"
                                :label="item.name_num"
                                :value="item.name_num">
                            </el-option>
                        </el-select>
                        <span class="required">*</span>
                    </el-row>
                    <el-row>
                        <el-row style="width: 315px;min-height: 200px;border: 1px solid #dddddd;border-radius: 4px;margin: 0 auto">
                            <el-col>
                                小组成员
                            </el-col>
                            <el-checkbox-group v-model="memberList">
                                <el-col :span="12" style="text-align: left" v-for="item in this.classStudent">
                                    <el-checkbox :label="item.name_num"></el-checkbox>
                                </el-col>
                            </el-checkbox-group>
                        </el-row>
                    </el-row>
                </el-row>-->
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
    import {ChangeStatus, PageQuery, GroupAdd, StudentQuery, QueryAll} from "../department.def";
    import DepartmentCnt from "../department.cnt";
    import {AxiosResponse} from "axios";
    import {upperCaseZh} from "../../../common/mod/algorithm/xt.string";
    import {getBtnList} from "../../common/mod/base"




    @Component
    export default class School extends XtVue {
        // 分页查询
        private pageQuery: PageQuery = new PageQuery();
        private pageTotal: number = 0;
        private pageNum: number = 0;
        // 查询所有
        private queryAll: QueryAll = new QueryAll();
        // 新增弹框
        private addVisible: boolean = false;
        private addTitle: string | null = null;
        // 删除按钮弹框
        private delVisible: boolean = false;
        private delId: string | null = null;
        // 状态数据
        private changeStatus: ChangeStatus = new ChangeStatus();
        // 数据
        private groupList: any = [];
        private groupAdd: GroupAdd = new GroupAdd();
        private studentInfo: StudentQuery = new StudentQuery();
        private gradeList: any = [];
        private chargeMan: string | null = null;
        private studentList: any[] = [];
        private gradeID: string | null = null;
        private classList: any[] = [];
        private classID: string | null = null;
        private subType: any = [{value: '0', label: '不分文理'}, {value: '2', label: '理科'}, {value: '1', label: '文科'}];
        private teacherList: any[] = [];
        private schoolID: string | null = null;
        private userType: string | null = null;
        private memberList: any[] = [];
        private classStudent: any[] = [];
        private classStudentTest: any = [];
        private memberDel: string | null = null;
        private rowInfo: any = '';
        private haveGroupList: string[] = [];
        private rowStuCode: string | null = null;
        private rowChargeMan: string | null = null;
        private classAllList: any[] = [];
        // 按钮权限
        private addBtn: boolean = true; // 新增
        private editBtn: boolean = true; // 修改
        private deleteBtn: boolean = true; // 删除
        private startStopBtn: boolean = true; // 状态
        private unitID: string | null = null;
        private loading: boolean = false; // 加载层






        // 查询
        getInfo(): void {
            if (this.pageNum === 1) {
                this.pageQuery.page_num = 0;
                this.studentInfo.page_num = 0;
                // this.pageQuery.page_num = 0;
                // this.studentInfo.page_num = 0;
            } else if (this.pageNum > 1) {
                this.pageQuery.page_num = this.pageNum - 1;
                this.studentInfo.page_num = this.pageNum - 1;
            }
            this.loading = true;
            DepartmentCnt.cloud.list_page_all_group_info(this.pageQuery).then((response: AxiosResponse) => {
                this.loading = false;
                if (response.data.status === '200') {
                    this.pageTotal = response.data.data.totalElements;
                    for (let i = 0; i < response.data.data.content.length; i++) {
                        let str: string = response.data.data.content[i].member;
                        let item: string[] = str.split(',');
                        for (let j = 0; j < item.length; j++) {
                            if (j === 0 && j !== item.length - 1) {
                                response.data.data.content[i].member = item[j].split('-')[0] + ',';
                            } else if (j === 0 && j === item.length - 1) {
                                response.data.data.content[i].member = item[j].split('-')[0];
                            } else if (j !== item.length - 1) {
                                response.data.data.content[i].member += item[j].split('-')[0] + ',';
                            } else {
                                response.data.data.content[i].member += item[j].split('-')[0];
                            }
                        }
                    }
                    this.groupList = response.data.data.content;

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
            this.unitID = userInfo.fk_unit_id;
            this.pageQuery.fk_unit_id = userInfo.fk_unit_id;
            this.userType = userInfo.user_type;
            if (this.userType === '4') {
                let unit: any = window.sessionStorage.getItem("unit_info");
                unit = JSON.parse(unit);
                this.schoolID = unit.id;
            }
            this.queryAll.fk_unit_id = this.unitID;
            DepartmentCnt.cloud.list_all_grade_info(this.queryAll).then((response: AxiosResponse) => {
                if (response.data.status === '200') {
                    this.gradeList = response.data.data;
                    let s;
                    for (let i = 1; i < this.gradeList.length; i++) {
                        for (let j = i; j > 0; j--) {
                            if (this.gradeList[j].grade_name < this.gradeList[j - 1].grade_name) {
                                s=this.gradeList[j];
                                this.gradeList[j] = this.gradeList[j-1];
                                this.gradeList[j-1] = s ;
                            }
                        }
                    }
                } else {
                    this.any().$notify.error({title: '提示', message: response.data.message});
                }
            });
            let queryAllClass = {
                status: '1',
                teacher_info: {unit_info: {id: this.unitID}}
            };
            DepartmentCnt.cloud.list_all_class_info(queryAllClass).then((response: AxiosResponse) => {
                if (response.data.status === '200') {
                    this.classAllList = response.data.data;
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
        @Watch("addVisible")
        getUpdateInfo(): void {
            if (!this.addVisible)
                this.cleanInfo();
        }
        // 新增
        onAddVisible(state: number, row: any = ''): void {
            if (state === 0) { // 点击新增
                this.addVisible = true;
                this.cleanInfo();
                if (row) {
                    this.rowInfo = row;
                    this.addTitle = '修改';
                    this.groupAdd.id = row.id;
                    this.gradeID = row.class_info.grade_info.id;
                    this.rowStuCode = row.chargeman_student_code;
                    this.rowChargeMan = row.chargeman_name + '-' + row.chargeman_student_code;
                    this.groupAdd.group_name = row.group_name;
                    this.groupAdd.group_num = row.group_num;
                    this.chargeMan = row.chargeman_name + '-' + row.chargeman_student_code;
                } else {
                    this.groupAdd = new GroupAdd();
                    this.addTitle = '新增';
                }
            } else if (state === 1) { // 取消
                this.addVisible = false;
            } else if (state === 2) { // 确定
                if (this.gradeID && this.classID && this.groupAdd.group_num && this.chargeMan && this.memberList.length > 0) {
                    this.groupAdd.class_info = {id: this.classID};
                    this.groupAdd.chargeman_name = this.chargeMan.split('-')[0];
                    this.groupAdd.chargeman_student_code = this.chargeMan.split('-')[1];
                    this.groupAdd.member = this.memberList.join(',');
                    this.loading = true;
                    DepartmentCnt.cloud.save_or_modify_group_info(this.groupAdd).then((response: AxiosResponse) => {
                        this.loading = false;
                        if (response.data.status === '200') {
                            this.groupAdd = new GroupAdd();
                            this.gradeID = '';
                            this.classID = '';
                            this.chargeMan = '';
                            this.memberList = [];
                            this.addVisible = false;
                            this.getInfo();
                        } else {
                            this.any().$notify.error({title: '提示', message: response.data.message});
                        }

                    })
                } else {
                    this.any().$notify.error({title: '提示', message: "不能有空"});
                }
            }
        }
        @Watch("gradeID")
        getClassList(): void {
            this.classList = [];
            this.classID = '';
            this.studentList = [];
            this.classList = [];
            if (this.gradeID) {
                if (this.schoolID) {
                    console.log(this.classAllList)
                    for (let i = 0; i < this.classAllList.length; i++) {
                        if (this.classAllList[i].grade_info.id === this.gradeID && this.classAllList[i].teacher_info.unit_info.id === this.schoolID) {
                            this.classList.push(this.classAllList[i]);
                        }
                    }
                    if (this.addTitle === '修改' && this.classList.length > 0) {
                        this.classID = this.rowInfo.class_info.id;
                    }
                } else {
                    for (let i = 0; i < this.classAllList.length; i++) {
                        if (this.classAllList[i].grade_info.id === this.gradeID) {
                            this.classList.push(this.classAllList[i]);
                        }
                    }
                    if (this.addTitle === '修改' && this.classList.length > 0) {
                        this.classID = this.rowInfo.class_info.id;
                    }
                }
            }
        }
        @Watch("classID")
        getInfoByGrade(): void {
            this.studentList = [];
            this.chargeMan = '';
            this.studentList = [];
            this.classStudent = [];
            if (!this.studentInfo.student_name) {
                delete this.studentInfo.student_name;
            }
            if (this.classID) {
                this.studentInfo.class_info = {
                    id: this.classID,
                    teacher_info: {
                        unit_info: {
                            id: this.unitID
                        },
                    }
                };
                if (this.addTitle !== '修改') {
                    DepartmentCnt.cloud.get_class_info_by_id({id: this.classID}).then((response: AxiosResponse) => {
                        if (response.data.status === '200') {
                            this.groupAdd.group_num = '';
                            this.groupAdd.group_num += response.data.data.class_code;
                            DepartmentCnt.cloud.list_page_all_group_info(this.pageQuery).then((response: AxiosResponse) => {
                                if (response.data.status === '200') {
                                    if (response.data.data.content.length > 0) {
                                        for (let i = 0; i < response.data.data.content.length; i++) {
                                            if (response.data.data.content[i].class_info.id === this.classID) {
                                                this.groupAdd.group_name = '第' + upperCaseZh((i + 2).toString(), false) + '小组';
                                                this.groupAdd.group_num += '00' + (i + 2).toString();
                                            }
                                        }
                                    } else {
                                        this.groupAdd.group_name = '第一小组';
                                        if (this.groupAdd.group_num) {
                                            this.groupAdd.group_num += '001';
                                            // console.log(this.groupAdd.group_num)
                                        }
                                    }
                                } else {
                                    this.any().$notify.error({title: '提示', message: response.data.message});
                                }

                            })
                        } else {
                            this.any().$notify.error({title: '提示', message: response.data.message});
                        }

                    });
                }
                DepartmentCnt.cloud.list_page_all_group_info(this.pageQuery).then((response: AxiosResponse) => {
                    if (response.data.status === '200') {
                        this.pageTotal = response.data.data.totalElements;
                        for (let i = 0; i < response.data.data.content.length; i++) {
                            if (this.classID === response.data.data.content[i].class_info.id
                                && this.rowStuCode === '') {
                                this.haveGroupList = (response.data.data.content[i].member).split(',');
                                this.haveGroupList.push(response.data.data.content[i].chargeman_name + '-' + response.data.data.content[i].chargeman_student_code);
                            } else if (this.classID === response.data.data.content[i].class_info.id
                                && this.rowStuCode === response.data.data.content[i].chargeman_student_code) {
                                this.memberList = (response.data.data.content[i].member).split(',');
                            }
                        }
                        DepartmentCnt.cloud.list_page_all_student_info(this.studentInfo).then((response: AxiosResponse) => {
                            if (response.data.status === '200') {
                                if (this.classID ) {
                                    this.studentList = [];
                                    this.studentList = response.data.data.content;
                                    for (let i = 0; i < response.data.data.content.length; i++) {
                                        this.studentList[i].name_num = '';
                                        this.studentList[i].name_num = response.data.data.content[i].student_name + '-' + response.data.data.content[i].student_num;
                                        for (let j = 0; j < this.haveGroupList.length; j++) {
                                            if (this.haveGroupList[j] === response.data.data.content[i].student_name + '-' + response.data.data.content[i].student_num) {
                                                this.studentList.splice(i, 1);
                                                i--;
                                                break;
                                            }
                                        }
                                    }
                                    this.classStudent = this.studentList;
                                    if (this.addTitle === '修改') {
                                        this.chargeMan = this.rowChargeMan;
                                    }
                                }
                            } else {
                                this.any().$notify.error({title: '提示', message: response.data.message});
                            }

                        });
                    } else {
                        this.any().$notify.error({title: '提示', message: response.data.message});
                    }

                });

            }
        }

        @Watch("chargeMan")
        getMemberList(): void {
            console.log(this.chargeMan, this.classStudent);
            this.classStudentTest = [];
            if (this.chargeMan) {
                for (let i = 0; i < this.classStudent.length; i++) {
                    if (this.classStudent[i].name_num !== this.chargeMan) {
                        this.classStudentTest.push(this.classStudent[i]);
                    }
                }
            } else {
                this.classStudentTest = this.classStudent;
            }
            // if (this.chargeMan) {
            //     if (this.studentList.length === this.classStudent.length) {
            //         this.memberDel = this.chargeMan;
            //         for (let i = 0; i < this.classStudent.length; i++) {
            //             if (this.classStudent[i].name_num === this.chargeMan) {
            //                 this.classStudent.splice(i, 1);
            //             }
            //         }
            //     } else {
            //         this.classStudent.push({name_num: this.memberDel});
            //         this.memberDel = this.chargeMan;
            //         for (let i = 0; i < this.classStudent.length; i++) {
            //             if (this.classStudent[i].name_num === this.chargeMan) {
            //                 this.classStudent.splice(i, 1);
            //             }
            //         }
            //     }
            // }
            // this.classStudent.splice(1, 1);
            // console.log(this.studentList)
        }

        // 清空
        cleanInfo(): void {
            this.gradeID = '';
            this.classID = '';
            this.chargeMan = '';
            this.memberList = [];
            this.groupAdd = new GroupAdd();
            this.rowStuCode = '';
            this.studentList = [];
            this.classStudent = [];
            this.rowChargeMan = '';
            this.haveGroupList = [];
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
            DepartmentCnt.cloud.modify_group_info_status_by_id(this.changeStatus).then((response: AxiosResponse) => {
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
            DepartmentCnt.cloud.remove_group_info_by_id({id: this.delId}).then((response: AxiosResponse) => {
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
