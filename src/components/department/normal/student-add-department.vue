<template>
    <el-col class="right_table" style="width: 1166px;">
        <el-row>
            <h1>{{titleType}}</h1>
        </el-row>
        <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick()">
            <el-tab-pane label="基本信息" name="1">
                <el-row class="span_red">
                    <el-row>
                        <el-col :span="11"  class="text_right">
                            姓名<span>*</span>
                            <el-input v-model="studentAdd.student_name" placeholder="请输入" clearable style="width: 315px"
                                      maxlength="15"></el-input>
                        </el-col>
                        <el-col :span="9" class="text_left">
                            身份证号<span>*</span>
                            <el-input v-model="studentAdd.id_number" placeholder="请输入" clearable style="width: 315px"
                                      maxlength="18" oninput="value=value.replace(/[^xX\d]/g,'')" @change="changeByIdNumber()"></el-input>
                        </el-col>
                        <el-col :span="3" v-show="idNumber">
                            <span style="text-align: left;display: inline-block;line-height: 40px;width: 100%;">位数有误</span>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="11"  class="text_right">
                            性别<span>*</span>
                            <el-select v-model="studentAdd.sex" placeholder="请选择" clearable style="width: 315px" value="">
                                <el-option v-for="item in sexList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="9" class="text_left">
                            曾用名<span>*</span>
                            <el-input v-model="studentAdd.name_used_before" placeholder="请输入(没有填无)" clearable style="width: 315px"
                                      maxlength="15"></el-input>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-tooltip class="item" effect="dark" content="通过身份证自动获取" placement="right">
                            <el-col :span="11"  class="text_right">
                                出生日期<span>*</span>
                                <el-date-picker v-model="studentAdd.date_of_birth" style="width: 315px" type="date" placeholder="选择日期" disabled></el-date-picker>
                            </el-col>
                        </el-tooltip>
                        <el-col :span="9" class="text_left">
                            民族<span>*</span>
                            <el-select style="width: 315px;" v-model="studentAdd.nation" filterable clearable allow-create default-first-option placeholder="请输入所属民族" value="">
                                <el-option v-for="item in nationList" :key="item" :label="item" :value="item"></el-option>
                            </el-select>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="11"  class="text_right">
                            政治面貌<span>*</span>
                            <el-select v-model="studentAdd.politic" placeholder="请选择" clearable style="width: 315px" value="">
                                <el-option v-for="item in politicList" :key="item" :label="item" :value="item"></el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="9" class="text_left">
                            健康状况<span>*</span>
                            <el-select v-model="studentAdd.health_condition" placeholder="请选择" clearable style="width: 315px" value="">
                                <el-option v-for="item in healthConditionList" :key="item" :label="item" :value="item"></el-option>
                            </el-select>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="11"  class="text_right">
                            住宿情况<span>*</span>
                            <el-select v-model="studentAdd.accommodation_situation" placeholder="请选择" clearable style="width: 315px" value="">
                                <el-option v-for="item in accommodationSituationList" :key="item" :label="item" :value="item"></el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="9" class="text_left">
                            留守情况<span>*</span>
                            <el-select v-model="studentAdd.rear_children_flag" placeholder="请选择" clearable style="width: 315px" value="">
                                <el-option v-for="item in whetherList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="11" class="text_right">
                            独生子女<span>*</span>
                            <el-select v-model="studentAdd.only_child_flag" placeholder="请选择" clearable style="width: 315px" value="">
                                <el-option v-for="item in whetherList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-col>

                        <el-col :span="9" class="text_left">
                            应届生<span>*</span>
                            <el-select v-model="studentAdd.fresh_former_type" placeholder="请选择" clearable style="width: 315px" value="">
                                <el-option v-for="item in freshFormerTypeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="11"  class="text_right">
                            单亲家庭<span>*</span>
                            <el-select v-model="studentAdd.parent_family_flag" placeholder="请选择" clearable style="width: 315px" value="">
                                <el-option v-for="item in whetherList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="9"  class="text_left">
                            艺体生<span>*</span>
                            <el-select v-model="studentAdd.art_physica_flag" placeholder="请选择" clearable style="width: 315px" value="">
                                <el-option v-for="item in whetherList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-col>
                    </el-row>
                </el-row>
            </el-tab-pane>
            <el-tab-pane label="学籍信息" name="2">
                <el-row class="span_red">
                    <el-row>
                        <el-col :span="12">
                            <el-row>
                                <el-col class="text_right" style="padding-right: 75px;">
                                    所属学校<span>*</span>
                                    <el-select style="width: 315px;" v-model="schoolStuID" filterable clearable allow-create
                                               default-first-option placeholder="请输入所属学校" value="">
                                        <el-option v-for="item in schoolStuList"
                                                   :key="item.id"
                                                   :label="item.unit_name"
                                                   :value="item.id">
                                        </el-option>
                                    </el-select>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col class="text_right" style="padding-right: 75px;">
                                    所属年级<span>*</span>
                                    <el-select v-model="gradeStuID" placeholder="请选择" clearable style="width: 315px" value=""
                                               :no-data-text="this.schoolStuID === '' ? '未选择学校' : '该学校下没有年级'">
                                        <el-option v-for="item in gradeStuList"
                                                   :key="item.id"
                                                   :label="item.grade_name"
                                                   :value="item.id">
                                        </el-option>
                                    </el-select>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col class="text_right" style="padding-right: 75px;">
                                    所属班级<span>*</span>
                                    <el-select v-model="classID"
                                               placeholder="请选择" clearable style="width: 315px" value=""
                                               :no-data-text="this.gradeStuID === '' ? '未选择年级' : '学校该年级下没有班级'">
                                        <el-option v-show="loadingClass" v-loading="loadingClass" key="" label="" value="">
                                        </el-option>
                                        <el-option v-show="!loadingClass" v-for="item in classStuList"
                                                   :key="item.id"
                                                   :label="item.class_name"
                                                   :value="item.id">
                                        </el-option>
                                    </el-select>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col class="text_right" style="padding-right: 75px;">
                                    学籍号<span>*</span>
                                    <el-input v-model="studentAdd.student_num" placeholder="请输入大写字母或数字" clearable style="width: 315px"
                                              maxlength="20" oninput="value=value.replace(/^\d*([A-Z]{0,1}(?:|\d\d{0,18})?).*$/g, '$1');"></el-input>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col class="text_right" style="padding-right: 75px;">
                                    科类<span>*</span>
                                    <el-select v-model="studentAdd.literary_scientific_type" placeholder="请选择" clearable style="width: 315px" value="" disabled>
                                        <el-option v-for="item in subjectTypeStuList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                    </el-select>
                                </el-col>
                            </el-row>
                        </el-col>

                        <el-col :span="12">
                            <el-col>
                                <el-upload
                                    v-loading="loadingUpdate"
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
                                    <img v-if="imageUrl" :src="imageUrl" class="avatar" style="width: 140px;height: 196px;">
                                    <span v-else class="avatar-uploader-icon" style="display: inline-block;border: 1px solid">证件照</span>
                                </el-upload>
                                <!--<el-upload class="avatar-uploader"-->
                                <!--action="https://jsonplaceholder.typicode.com/posts/"-->
                                <!--:on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">-->
                                <!--<img v-if="imageUrl" :src="imageUrl" class="avatar">-->
                                <!--<span v-else class="avatar-uploader-icon">证件照</span>-->
                                <!--</el-upload>-->
                            </el-col>
                        </el-col>
                    </el-row>
                </el-row>
            </el-tab-pane>
            <el-tab-pane label="家庭信息" name="3">
                <el-collapse v-model="activeNames">
                    <el-collapse-item title="成员1(必填)" name="1">
                        <el-row class="span_red">
                            <el-row>
                                <el-col :span="11"  class="text_right">
                                    姓名<span>*</span>
                                    <el-input v-model="studentAdd.member_name_1" placeholder="请输入" clearable style="width: 315px"
                                              maxlength="15"></el-input>
                                </el-col>
                                <el-col :span="9" class="text_left">
                                    关系<span>*</span>
                                    <el-select style="width: 315px;" v-model="studentAdd.member_relationship_1" filterable clearable allow-create
                                               default-first-option placeholder="请选择或输入" value="">
                                        <el-option v-for="item in relationList" :key="item" :label="item" :value="item"></el-option>
                                    </el-select>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="11"  class="text_right">
                                    政治面貌<span>*</span>
                                    <el-select v-model="studentAdd.member_political_1" placeholder="请选择" clearable style="width: 315px" value="">
                                        <el-option v-for="item in politicList" :key="item" :label="item" :value="item"></el-option>
                                    </el-select>
                                </el-col>
                                <el-col :span="9" class="text_left">
                                    文化程度<span>*</span>
                                    <el-select v-model="studentAdd.member_culture_1" placeholder="请选择" clearable style="width: 315px" value="">
                                        <el-option v-for="item in educationList" :key="item" :label="item" :value="item"></el-option>
                                    </el-select>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="11" class="text_right">
                                    工作单位<span>*</span>
                                    <el-input v-model="studentAdd.member_work_unit_1" placeholder="请输入" clearable style="width: 315px"
                                              maxlength="64"></el-input>
                                </el-col>
                                <el-col :span="9" class="text_left">
                                    联系电话<span>*</span>
                                    <el-input v-model="studentAdd.member_contact_num_1" placeholder="请输入" clearable style="width: 315px" maxlength="11"
                                              oninput="value=value.replace(/[^\d]/g,'')"></el-input>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="21" class="contact_num">
                                    联系地址
                                    <el-input v-model="studentAdd.member_contact_address_1" placeholder="请输入" clearable style="width: 788px"
                                              maxlength="64"></el-input>
                                </el-col>
                            </el-row>
                        </el-row>
                    </el-collapse-item>
                    <el-collapse-item title="成员2" name="2">
                        <el-row>
                            <el-row>
                                <el-col :span="11"  class="text_right">
                                    姓名
                                    <el-input v-model="studentAdd.member_name_2" placeholder="请输入" clearable style="width: 315px"
                                              maxlength="15"></el-input>
                                </el-col>
                                <el-col :span="9" class="text_left">
                                    关系
                                    <el-select style="width: 315px;" v-model="studentAdd.member_relationship_2" filterable clearable allow-create
                                               default-first-option placeholder="请选择或输入" value="">
                                        <el-option v-for="item in relationList" :key="item" :label="item" :value="item"></el-option>
                                    </el-select>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="11"  class="text_right">
                                    政治面貌
                                    <el-select v-model="studentAdd.member_political_2" placeholder="请选择" clearable style="width: 315px" value="">
                                        <el-option v-for="item in politicList" :key="item" :label="item" :value="item"></el-option>
                                    </el-select>
                                </el-col>
                                <el-col :span="9" class="text_left">
                                    文化程度
                                    <el-select v-model="studentAdd.member_culture_2" placeholder="请选择" clearable style="width: 315px" value="">
                                        <el-option v-for="item in educationList" :key="item" :label="item" :value="item"></el-option>
                                    </el-select>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="11" class="text_right">
                                    工作单位
                                    <el-input v-model="studentAdd.member_work_unit_2" placeholder="请输入" clearable style="width: 315px"
                                              maxlength="64"></el-input>
                                </el-col>
                                <el-col :span="9" class="text_left">
                                    联系电话
                                    <el-input v-model="studentAdd.member_contact_num_2" placeholder="请输入" clearable style="width: 315px" maxlength="11"
                                              oninput="value=value.replace(/[^\d]/g,'')"></el-input>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="21" class="contact_num">
                                    联系地址
                                    <el-input v-model="studentAdd.member_contact_address_2" placeholder="请输入" clearable style="width: 768px"
                                              maxlength="64"></el-input>
                                </el-col>
                            </el-row>
                        </el-row>
                    </el-collapse-item>
                    <el-collapse-item title="成员3" name="3">
                        <el-row>
                            <el-row>
                                <el-col :span="11"  class="text_right">
                                    姓名
                                    <el-input v-model="studentAdd.member_name_3" placeholder="请输入" clearable style="width: 315px"
                                              maxlength="15"></el-input>
                                </el-col>
                                <el-col :span="9" class="text_left">
                                    关系
                                    <el-select style="width: 315px;" v-model="studentAdd.member_relationship_3" filterable clearable allow-create
                                               default-first-option placeholder="请选择或输入" value="">
                                        <el-option v-for="item in relationList" :key="item" :label="item" :value="item"></el-option>
                                    </el-select>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="11"  class="text_right">
                                    政治面貌
                                    <el-select v-model="studentAdd.member_political_3" placeholder="请选择" clearable style="width: 315px" value="">
                                        <el-option v-for="item in politicList" :key="item" :label="item" :value="item"></el-option>
                                    </el-select>
                                </el-col>
                                <el-col :span="9" class="text_left">
                                    文化程度
                                    <el-select v-model="studentAdd.member_culture_3" placeholder="请选择" clearable style="width: 315px" value="">
                                        <el-option v-for="item in educationList" :key="item" :label="item" :value="item"></el-option>
                                    </el-select>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="11" class="text_right">
                                    工作单位
                                    <el-input v-model="studentAdd.member_work_unit_3" placeholder="请输入" clearable style="width: 315px"
                                              maxlength="64"></el-input>
                                </el-col>
                                <el-col :span="9" class="text_left">
                                    联系电话
                                    <el-input v-model="studentAdd.member_contact_num_3" placeholder="请输入" clearable style="width: 315px" maxlength="11"
                                              oninput="value=value.replace(/[^\d]/g,'')"></el-input>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="21" class="contact_num">
                                    联系地址
                                    <el-input v-model="studentAdd.member_contact_address_3" placeholder="请输入" clearable style="width: 768px"
                                              maxlength="64"></el-input>
                                </el-col>
                            </el-row>
                        </el-row>
                    </el-collapse-item>
                    <el-collapse-item title="成员4" name="4">
                        <el-row>
                            <el-row>
                                <el-col :span="11"  class="text_right">
                                    姓名
                                    <el-input v-model="studentAdd.member_name_4" placeholder="请输入" clearable style="width: 315px"
                                              maxlength="15"></el-input>
                                </el-col>
                                <el-col :span="9" class="text_left">
                                    关系
                                    <el-select style="width: 315px;" v-model="studentAdd.member_relationship_4" filterable clearable allow-create
                                               default-first-option placeholder="请选择或输入" value="">
                                        <el-option v-for="item in relationList" :key="item" :label="item" :value="item"></el-option>
                                    </el-select>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="11"  class="text_right">
                                    政治面貌
                                    <el-select v-model="studentAdd.member_political_4" placeholder="请选择" clearable style="width: 315px" value="">
                                        <el-option v-for="item in politicList" :key="item" :label="item" :value="item"></el-option>
                                    </el-select>
                                </el-col>
                                <el-col :span="9" class="text_left">
                                    文化程度
                                    <el-select v-model="studentAdd.member_culture_4" placeholder="请选择" clearable style="width: 315px" value="">
                                        <el-option v-for="item in educationList" :key="item" :label="item" :value="item"></el-option>
                                    </el-select>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="11" class="text_right">
                                    工作单位
                                    <el-input v-model="studentAdd.member_work_unit_4" placeholder="请输入" clearable style="width: 315px"
                                              maxlength="64"></el-input>
                                </el-col>
                                <el-col :span="9" class="text_left">
                                    联系电话
                                    <el-input v-model="studentAdd.member_contact_num_4" placeholder="请输入" clearable style="width: 315px" maxlength="11"
                                              oninput="value=value.replace(/[^\d]/g,'')"></el-input>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="21" class="contact_num">
                                    联系地址
                                    <el-input v-model="studentAdd.member_contact_address_4" placeholder="请输入" clearable style="width: 768px"
                                              maxlength="64"></el-input>
                                </el-col>
                            </el-row>
                        </el-row>
                    </el-collapse-item>
                </el-collapse>
            </el-tab-pane>
            <el-tab-pane label="托管情况" name="4">
                <el-row>
                    <el-row>
                        <el-col :span="11"  class="text_right">
                            托管人姓名
                            <el-input v-model="studentAdd.supervisor_name" placeholder="请输入" clearable style="width: 315px"
                                      maxlength="15"></el-input>
                        </el-col>
                        <el-col :span="9" class="text_left">
                            年龄
                            <el-input v-model="studentAdd.supervisor_age" placeholder="请输入" clearable style="width: 315px"
                                      maxlength="3" oninput="value=value.replace(/[^\d]/g,'')"></el-input>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="11"  class="text_right">
                            健康状况
                            <el-input v-model="studentAdd.supervisor_health_condition" placeholder="请输入" clearable style="width: 315px"
                                      maxlength="30"></el-input>
                        </el-col>
                        <el-col :span="9" class="text_left">
                            联系电话
                            <el-input v-model="studentAdd.supervisor_contact_num" placeholder="请输入(没有填无)" clearable style="width: 315px"
                                      maxlength="11"  oninput="value=value.replace(/[^\d]/g,'')"></el-input>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="21" class="contact_num">
                            详细地址
                            <el-input v-model="studentAdd.supervisor_contact_address" placeholder="请输入" clearable style="width: 788px"
                                      maxlength="64"></el-input>
                        </el-col>
                    </el-row>
                </el-row>
            </el-tab-pane>
        </el-tabs>
        <el-steps :active="active" align-center>
            <el-step title="基本信息" description="(必填)"></el-step>
            <el-step title="学籍信息" description="(必填)"></el-step>
            <el-step title="家庭信息" description="(必填)"></el-step>
            <el-step title="托管情况" description="(非托管则无需填写)"></el-step>
        </el-steps>
        <el-button @click="onCancel()">取 消</el-button>
        <el-button style="margin-top: 12px;" @click="next">{{btnName}}</el-button>
    </el-col>
</template>

<script lang="ts">

    import {Component, Watch, XtRouter, XtVue} from "../../../common/common";
    import {QueryAll, StudentAdd} from "../department.def";
    import DepartmentCnt from "../department.cnt";
    import {AxiosResponse} from "axios";



    @Component
    export default class StudentADD extends XtVue {
        // 查询所有
        private queryAllGrade: QueryAll = new QueryAll();

        private studentAdd: StudentAdd = new StudentAdd();
        private titleType: string = ''; // 标题
        private sexList: any = []; // 性别
        private nationList: any = [];  // 民族
        private politicList: any = []; // 政治面貌
        private healthConditionList: any = []; // 健康程度
        private accommodationSituationList: any = []; // 住宿情况
        private whetherList: any = []; // 是or否
        private freshFormerTypeList: any = []; // 应往届
        private subjectTypeStuList: any = []; // 科类
        private schoolStuList: any = []; // 所属学校
        private gradeStuList: any = []; // 所属年级
        private classStuList: any = []; // 所属班级
        private relationList: any = []; // 关系
        private educationList: any = []; // 学历
        private imageUrl: any = ''; // 照片
        private activeNames: any = []; // 家庭信息展开栏
        private active: number = 0; // 步骤
        private btnName: string = '下一步';
        private activeName: string = '1';
        private schoolStuID: string | null = null;
        private schoolTimeStuID: string | null = null; // 临时接收
        private gradeTimeID: string | null = null; // 临时接收
        private gradeStuID: string | null = null;
        private classTimeID: string | null = null; // 临时接收
        private classID:string | null = null;
        private unitID: string | null = null;
        private queryList: any = {};
        private allClassList: any = []; // 所有班级
        private idNumber: boolean = false;
        private loadingClass: boolean = false; // 班级信息记载module
        private loadingUpdate: boolean = false; // 证件照加载module
        private studentImg: string | null = null;
        private token: string | null = null;
        private api: string = location.origin+"/api/";




        getStudentInfo(): void {
            let obj: any = this.any().$route.params.row;
            this.studentAdd.id = obj.id;
            DepartmentCnt.cloud.get_student_info_by_id({id: this.studentAdd.id}).then((response: AxiosResponse) => {
                if (response.data.status === '200') {
                    this.studentAdd = response.data.data;
                    if (this.schoolStuList.length > 0) {
                        this.gradeTimeID = response.data.data.class_info.grade_info.id;
                        this.classTimeID = response.data.data.class_info.id;
                        this.schoolTimeStuID = response.data.data.class_info.teacher_info.unit_info.id;
                        this.schoolStuID = response.data.data.class_info.teacher_info.unit_info.id;
                        if (response.data.data.photo_address) this.imageUrl = this.api + response.data.data.photo_address;
                    }
                } else {
                    this.any().$notify.error({title: '提示', message: response.data.message});
                }

            })
        }
        mounted() {
            let user: any = window.sessionStorage.getItem("user_info");
            this.token = window.sessionStorage.getItem("token");
            user = JSON.parse(user);
            this.unitID = user.fk_unit_id;
            let obj: any = this.any().$route.params.row;
            if (obj) { this.classID = obj.class_info.id; this.titleType = '修改学生' }
            else { this.titleType = '新增学生' }

            this.queryList.id = this.unitID;
            this.queryList.unit_level = '4';
            DepartmentCnt.cloud.list_all_school_list(this.queryList).then((response: AxiosResponse) => { // 学校
                if (response.data.status === '200') {
                    for (let i = 0; i < response.data.data.length; i++) {
                        this.schoolStuList.push(response.data.data[i]);
                    }
                    if (obj) {
                        this.getStudentInfo();
                    } else {
                        this.studentAdd = new StudentAdd();
                    }

                } else {
                    this.any().$notify.error({title: '提示', message: response.data.message});
                }
            });
            this.getGradeInfo();



            this.sexList = [{value: '1', label: '男'}, {value: '2', label: '女'}];
            this.nationList = ['汉族','蒙古族','回族','藏族','维吾尔族','苗族','彝族','壮族','布依族','朝鲜族','满族',
                '侗族','瑶族','白族','土家族','哈尼族','哈萨克族','傣族','黎族','僳僳族','佤族','畲族','高山族','拉祜族',
                '水族','东乡族','纳西族','景颇族','柯尔克孜族','土族','达斡尔族','仫佬族','羌族','布朗族','撒拉族','毛南族',
                '仡佬族','锡伯族','阿昌族','普米族','塔吉克族','怒族','乌孜别克族','俄罗斯族','鄂温克族','德昂族','保安族',
                '裕固族','京族','塔塔尔族','独龙族','鄂伦春族','赫哲族','门巴族','珞巴族','基诺族'];
            this.politicList = ['中共党员', '中共预备党员', '民革党员', '民盟盟员', '群众'];
            this.healthConditionList = ['健康或良好', '一般或较弱', '有慢性疾病', '有生理缺陷', '残疾'];
            this.subjectTypeStuList = [{value: '0', label: '不分文理'}, {value: '1', label: '文科班'}, {value: '2', label: '理科班'}];
            this.accommodationSituationList = ['住宿', '走读'];
            this.whetherList = [{value: '0', label: '否'}, {value: '1', label: '是'}];
            this.freshFormerTypeList = [{value: '0', label: '否'}, {value: '1', label: '是'}];
            this.relationList = ['父亲', '母亲', '其他'];
            this.educationList = ['研究生','大学本科', '大专', '高中（中专）', '初中, 小学'];
            this.activeNames = ['1'];


        }
        // 查询年级信息
        getGradeInfo(): void {
            this.queryAllGrade.fk_unit_id = this.unitID;
            DepartmentCnt.cloud.list_all_grade_info(this.queryAllGrade).then((response: AxiosResponse) => { // 年级
                if (response.data.status === '200') {
                    this.gradeStuList = response.data.data;
                } else {
                    this.any().$notify.error({title: '提示', message: response.data.message});
                }
            });
        }
        // 查询班级信息
        getClassInfoList(): void {
            let queryAllClass = {
                status: '1',
                teacher_info: {unit_info: {id: this.schoolStuID}}
            };
            this.loadingClass = true;
            DepartmentCnt.cloud.list_all_class_info(queryAllClass).then((response: AxiosResponse) => { // 班级
                this.loadingClass = false;
                if (response.data.status === '200') {
                    this.allClassList = response.data.data;
                    this.classStuList = response.data.data;
                } else {
                    this.any().$notify.error({title: '提示', message: response.data.message});
                }
            });
        }


        @Watch("schoolStuID")
        getGradeStuList(): void {
            let obj: any = this.any().$route.params.row;
            this.gradeStuID = '';
            if (this.schoolStuID) { this.getClassInfoList(); }
            if (this.schoolTimeStuID === this.schoolStuID && obj) {
                this.gradeStuID = obj.class_info.grade_info.id;
                this.classID = obj.class_info.id;
            }
        }

        @Watch("gradeStuID")
        getClassStuList(): void {
            let obj: any = this.any().$route.params.row;
            this.classID = '';
            if (this.gradeTimeID === this.gradeStuID && obj) {
                this.classID = obj.class_info.id;
            }
        }

        @Watch("classID")
        getClassInfo(): void {
            if (this.classID) {
                for (let i = 0; i < this.classStuList.length; i++) {
                    if (this.classStuList[i].id === this.classID) {
                        this.studentAdd.literary_scientific_type = this.classStuList[i].literary_scientific_type;
                    }
                }
            }
            this.studentAdd.class_info = {id: this.classID};
        }

        changeByIdNumber(): void {
            if (this.studentAdd.id_number && this.studentAdd.id_number.length != 18) {
                this.idNumber = true;
                return;
            }
            this.idNumber = false;
        }


        // 取消
        onCancel(): void {
            XtRouter.skipNamed("DepartmentStudent");
        }
        handleClick(tab, event): void {
            this.active = Number(this.activeName) - 1;
            if (this.activeName !== '4') {
                this.btnName = '下一步';
            } else {
                this.btnName = '保存';
            }
        }

        consoleErr(e): void {
            this.any().$notify.error({title: '提示', message: e + '不能为空'});
        }

        uploadErr() {
            this.any().$notify.error({title: '提示', message: '上传失败'});
            this.loadingUpdate = false;
        }
        handleAvatarSuccess(res, file) {
            this.loadingUpdate = false;
            this.imageUrl = URL.createObjectURL(file.raw);
            this.studentImg = "file/get?img=" + res.data.guid;
        }
        beforeAvatarUpload(file) {
            this.loadingUpdate = true;
            const isJPG = file.type === 'image/jpeg';
            const isPNG = file.type === 'image/png';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG && !isPNG) { this.any().$notify.error({title: '提示', message: '上传图片必须是JPG/PNG 格式!'}); }
            if (!isLt2M) { this.any().$notify.error({title: '提示', message: '上传头像图片大小不能超过 2MB!'}); }
            return (isJPG || isPNG) && isLt2M;
        }

        next(): void { // 下一步
            this.btnName = '下一步';
            if (this.activeName === '1') {
                if (!this.studentAdd.student_name) { this.consoleErr('姓名'); return; }
                if (!this.studentAdd.id_number) { this.consoleErr('身份证号'); return; }
                if (this.studentAdd.id_number.length != 18) {this.any().$notify.error({title: '提示', message: '身份证号位数有误'});return; }
                if (!this.studentAdd.sex) { this.consoleErr('性别'); return; }
                if (!this.studentAdd.name_used_before) { this.consoleErr('曾用名'); return; }
                if (!this.studentAdd.date_of_birth) { this.consoleErr('出生日期'); return; }
                if (!this.studentAdd.nation) { this.consoleErr('民族'); return; }
                if (!this.studentAdd.politic) { this.consoleErr('政治面貌'); return; }
                if (!this.studentAdd.health_condition) { this.consoleErr('健康状况'); return; }
                if (!this.studentAdd.accommodation_situation) { this.consoleErr('住宿情况'); return; }
                if (!this.studentAdd.rear_children_flag) { this.consoleErr('留守情况'); return; }
                if (!this.studentAdd.only_child_flag) { this.consoleErr('独生子女'); return; }
                if (!this.studentAdd.fresh_former_type) { this.consoleErr('应往届'); return; }
                if (!this.studentAdd.parent_family_flag) { this.consoleErr('单亲家庭'); return; }
                if (!this.studentAdd.art_physica_flag) { this.consoleErr('艺体生'); return; }
            } else if (this.activeName === '2') {
                if (!this.studentAdd.student_num) { this.consoleErr('学籍号'); return; }
                if (!this.schoolStuID) { this.consoleErr('学校'); return; }
                if (!this.gradeStuID) { this.consoleErr('年级'); return; }
                if (!this.classID) { this.consoleErr('班级'); return; }
                if (!this.studentAdd.literary_scientific_type) { this.consoleErr('科类'); return; }
            } else if (this.activeName === '3') {
                if (!this.studentAdd.member_name_1) { this.consoleErr('成员1姓名'); return; }
                if (!this.studentAdd.member_relationship_1) { this.consoleErr('成员1关系'); return; }
                if (!this.studentAdd.member_political_1) { this.consoleErr('成员1政治面貌'); return; }
                if (!this.studentAdd.member_culture_1) { this.consoleErr('成员1文化程度'); return; }
                if (!this.studentAdd.member_work_unit_1) { this.consoleErr('成员1工作单位'); return; }
                if (!this.studentAdd.member_contact_num_1) { this.consoleErr('成员1联系电话'); return; }
            }
            this.activeName = (Number(this.activeName) + 1).toString();
            if (this.active++ < 2) {
            } else if (this.active > 1 && this.active < 4) {
                this.btnName = '保存';
            } else if (this.active > 3) {
                if (this.studentAdd.id_number && this.studentAdd.id_number.length != 18) { this.consoleErr('身份证号位数有误'); return; }
                this.btnName = '保存';
                this.onConfirm();
            }


        }
        // 确定
        onConfirm(): void {
            if (this.studentImg) this.studentAdd.photo_address = this.studentImg;
            DepartmentCnt.cloud.save_or_modify_student_info(this.studentAdd).then((response: AxiosResponse) => {
                if (response.data.status === '200') {
                    XtRouter.skipNamed("DepartmentStudent");
                } else {
                    this.any().$notify.error({title: '提示', message: response.data.message});
                    XtRouter.skipNamed("DepartmentStudent");
                }

            });
        }
        @Watch("studentAdd.id_number")
        getBirth(): void {
            if (this.studentAdd.id_number && this.studentAdd.id_number.length === 18) {
                let year: string = this.studentAdd.id_number.substring(6, 10);
                let month: string = this.studentAdd.id_number.substring(10, 12);
                let day: string | null = this.studentAdd.id_number.substring(12, 14);
                let birth: string = year + '-' + month + '-' + day;
                this.studentAdd.date_of_birth = birth;
            } else {
                this.studentAdd.date_of_birth = '';
            }
        }


    }
</script>

<style  lang="scss">
    .span_red span {
        color: red;
    }
    .text_right {
        text-align: right;
        margin-right: 45px;
        margin-bottom: 15px;
        font-size: 16px;
    }
    .text_left {
        text-align: right;
        margin-bottom: 15px;
        font-size: 16px;
    }
    .contact_num {
        text-align: right;
        font-size: 16px;
    }
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: absolute;
        top: 35px;
        right: 175px;
        width: 140px;
        z-index: 10000;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 14px;
        color: #8c939d;
        width: 140px;
        height: 196px;
        line-height: 196px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
    .el-input.is-disabled .el-input__inner {
        color: black;
    }
</style>
