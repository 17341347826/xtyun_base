<template>

    <el-col :span="21" class="right_table">
        <el-row style="margin: 45px 0 25px;">
            <el-col :span="9">
                <el-select v-model="rankValue" clearable placeholder="请选择字段级别" value="" style="float:right">
                    <el-option
                        v-for="item in rank"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="6" v-show="rankValue === 2 || rankValue === 3">
                <el-select v-model="rankOneID" clearable placeholder="请选择对应的一级字段" value="">
                    <el-option
                        v-for="item in rankOne"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="8" v-show="rankValue === 3">
                <el-select v-model="rankTwoID" clearable placeholder="请选择对应的二级字段" value="" style="float:left;">
                    <el-option
                        v-for="item in rankTwo[0]"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                    </el-option>
                </el-select>
            </el-col>
        </el-row>


        <el-row>
            <el-col :span="9">
                <el-row style="float:right;">
                    <el-input placeholder="请输入字段名称" v-model="name" style="width: 217px;" clearable></el-input>
                </el-row>
            </el-col>
            <el-col :span="6" v-show="lv !== '2' && lv !== '3'" style="margin-left: 20px;">
                <el-input v-model="anotherName" style="width: 217px;float:left;" clearable
                          placeholder="例：STU_INFO_CONFIG"></el-input>
                <span class="required">*字段别名</span>
            </el-col>
            <el-col :span="6" v-show="lv === '3'" style="margin-left: 36px;">
                <el-input v-model="attrName" style="width: 217px;float:left;" clearable
                          placeholder="例：student_name"></el-input>
                <span class="required">*属性名称</span>
            </el-col>
        </el-row>


        <el-row style="margin: 15px 0">
            <el-button id="bc" @click="onSave()" class="save_btn" type="primary">保存</el-button>
        </el-row>

        <el-row v-show="lv === '1'">
            <el-table :data="rankOne" style="width: 65%;margin: 0 auto" :border="true">
                <el-table-column header-align="center" prop="name" label="名称"></el-table-column>
                <el-table-column header-align="center" prop="another_name" label="别称"></el-table-column>
                <el-table-column header-align="center" label="操作">
                    <template slot-scope="scope">
                        <!--<el-button type="primary" icon="el-icon-edit" circle id="xg1"-->
                                   <!--@click="onAlter(scope.row)"></el-button>-->
                        <!--<el-button type="danger" icon="el-icon-delete" circle @click="onDel(scope.row.id)" id="sc1"></el-button>-->
                        <span class="img_span update" @click="onAlter(scope.row)"
                              id="xg1"></span>
                        <span class="img_span del" @click="onDel(scope.row.id)"
                              id="sc1"></span>
                    </template>
                </el-table-column>
            </el-table>
        </el-row>
        <el-row v-show="lv === '2' && rankOneID">
            <el-table :data="rankTwo[0]" style="width: 65%;margin: 0 auto" :border="true">
                <el-table-column header-align="center" prop="name" label="字段名称"></el-table-column>
                <el-table-column header-align="center" label="操作">
                    <template slot-scope="scope">
                        <!--<el-button type="primary" icon="el-icon-edit" circle id="xg2"-->
                                   <!--@click="onAlter(scope.row.id, scope.row.fk_parent_id)"></el-button>-->
                        <!--<el-button type="danger" icon="el-icon-delete" circle @click="onDel(scope.row.id)" id="sc2"></el-button>-->
                        <span class="img_span update" @click="onAlter(scope.row)"
                              id="xg2"></span>
                        <span class="img_span del" @click="onDel(scope.row.id)"
                              id="sc2"></span>
                    </template>
                </el-table-column>
            </el-table>
        </el-row>
        <el-row v-show="lv === '3' && rankTwoID">
            <el-table :data="rankThree[0]" style="width: 65%;margin: 0 auto" :border="true">
                <el-table-column header-align="center" prop="name" label="字段名称"></el-table-column>
                <el-table-column header-align="center" prop="attr_name" label="属性名称"></el-table-column>
                <el-table-column header-align="center" label="操作">
                    <template slot-scope="scope">
                        <span class="img_span update" @click="onAlter(scope.row)"
                              id="xg3"></span>
                        <span class="img_span del" @click="onDel(scope.row.id)"
                              id="sc3"></span>
                    </template>
                </el-table-column>
            </el-table>
        </el-row>
        <el-dialog title="提示" :visible.sync="delVisible" width="30%" center>
            <el-row class="dialog_center">
                <span style="font-size: 18px;">是否删除</span>
            </el-row>
            <span slot="footer">
                        <el-button @click="delVisible = false" class="del_btn_cancel">取 消</el-button>
                        <el-button type="danger" @click="onDelConfirm()" class="del_btn_confirm">确 定</el-button>
                    </span>
        </el-dialog>
        <el-dialog title="修改" :visible.sync="alterDialogVisible" width="30%" center>
            <el-row>
                <span>字段名称:</span>
                <el-input v-model="nameAlter" style="width: 217px;" clearable></el-input>
                <span style="color:red;font-size: 10px;margin-left: 5px;">*</span>
            </el-row>
            <el-row v-show="lv === '1'" style="margin-top: 15px;">
                <span>字段别名:</span>
                <el-input v-model="anotherNameAlter" style="width: 217px;" clearable
                          placeholder="例：STU_INFO_CONFIG"></el-input>
            </el-row>
            <el-row v-show="lv === '3'" style="margin-top: 15px;">
                <span>字段属性:</span>
                <el-input v-model="attrNameAlter" style="width: 217px;" clearable
                          placeholder="例：STU_INFO_CONFIG"></el-input>
            </el-row>
            <span slot="footer" class="dialog-footer">
                <el-button @click="alterDialogVisible = false" id="qxxg" class="update_btn_cancel">取 消</el-button>
                <el-button type="primary" @click="onAlterConfirm()" id="qdxg" class="update_btn_confirm">确 定</el-button>
            </span>
        </el-dialog>

    </el-col>
</template>

<script lang="ts">

    import {Component, Watch, XtVue} from "../../common/common";
    import FieldAddCnt from "./field-add.cnt"
    import {AxiosResponse} from "axios";
    import {AddBasicInfo, DeleteId} from "./field-add.def";

    @Component
    export default class FieldAdd extends XtVue {
        private rank: any = [{value: 1, label: '一级字段'}, {value: 2, label: '二级字段'}, {value: 3, label: '三级字段'}];
        private rankOne: any[] = [];
        private rankTwo: any[] = [];
        private rankThree: any = [];
        private rankValue: string = '';
        private rankTwoID: any = '';
        private rankOneID: any = '';
        private addBasicInfo: AddBasicInfo = new AddBasicInfo();
        private anotherName: string | null = null; // 别名
        private anotherNameAlter: string | null = null;
        private name: string | null = null; // 名称
        private nameAlter: string | null = null;
        private attrName: string | null = null; // 属性名称
        private attrNameAlter: string | null = null;
        private lv: string = ''; // 等级
        private del: DeleteId = new DeleteId(); // 删除id
        private alterDialogVisible: boolean = false; // 修改弹框
        private delVisible: boolean = false;


        queryInfo(): void {
            FieldAddCnt.cloud.list_tree_basic_info_attr().then((response: AxiosResponse) => {
                this.rankOne = response.data.data;
                this.rankTowList();
                this.rankThreeList();
            });
        }


        mounted() {
            this.queryInfo();
        }


        onSave(): void {
            if (!this.lv || !this.name) {
                this.any().$notify.error({title: '提示', message: "必填项不能有空"});
                return;
            }
            if (this.lv === '1' && !this.anotherName) {
                this.any().$notify.error({title: '提示', message: "必填项不能有空"});
                return;
            }
            if (this.lv === '2') {
                if (this.rankOneID) {
                    this.addBasicInfo.fk_parent_id = this.rankOneID;
                } else {
                    this.any().$notify.error({title: '提示', message: "必填项不能有空"});
                    return;
                }
            }
            if (this.lv === '3') {
                if (!this.attrName || !this.rankOneID || !this.rankTwoID) {
                    this.any().$notify.error({title: '提示', message: "必填项不能有空"});
                    return;
                } else {
                    this.addBasicInfo.fk_parent_id = this.rankTwoID;
                    this.addBasicInfo.attr_name = this.attrName;
                    this.addBasicInfo.map_list.push({attr_name: this.attrName, name: this.name});
                }
            }
            this.addBasicInfo.another_name = this.anotherName;
            this.addBasicInfo.name = this.name;
            this.addBasicInfo.rank = this.lv;
            if (this.lv === '3') {
            }
            FieldAddCnt.cloud.add_basic_info(this.addBasicInfo).then((response: AxiosResponse) => {
                if (response.data.status == 200) {
                    this.name = '';
                    this.attrName = '';
                    this.anotherName = '';
                    this.any().$notify.success({title: '提示', message: "保存成功"});
                    this.updateInfo();
                    this.addBasicInfo = new AddBasicInfo();
                    if (this.lv === '1') {
                        this.$emit('getAdminList', {change: 1});
                    }
                }
            });

        }
        // 删除
        onDel(id: string): void {
            this.del.id = id;
            this.delVisible = true;
        }
        onDelConfirm(): void {
            this.delVisible = false;
            FieldAddCnt.cloud.remove_basic_info(this.del).then((response: AxiosResponse) => {
                if (response.data.status == 200) {
                    this.del.id = '';
                    this.updateInfo();
                    this.any().$notify.success({title: '提示', message: "删除成功"});
                    if (this.lv === '2') {
                        this.rankTowList();
                    }
                    if (this.lv === '1') {
                        this.$emit('getAdminList', {change: 1});
                    }
                }
            });
        }

        onAlter(row: any): void {
            console.log(row);
            this.nameAlter = '';
            this.alterDialogVisible = true;
            this.addBasicInfo.id = row.id;
            this.nameAlter = row.name;
            this.anotherNameAlter = row.another_name;
            this.attrNameAlter = row.attr_name;
            this.addBasicInfo.fk_parent_id = row.fk_parent_id;
        }

        onAlterConfirm(): void {
            if (this.nameAlter) {
                this.addBasicInfo.rank = '';
                if (this.lv === '1' && this.anotherNameAlter) {
                    this.addBasicInfo.another_name = this.anotherNameAlter;
                } else if (this.lv === '1' && !this.anotherNameAlter) {
                    this.any().$notify.warning({title: '提示', message: "不能为空"});
                    return;
                }
                if (this.lv === '3' && this.attrNameAlter) {
                    this.addBasicInfo.attr_name = this.attrNameAlter;
                } else if (this.lv === '3' && !this.attrNameAlter) {
                    this.any().$notify.warning({title: '提示', message: "不能为空"});
                    return;
                }
                this.addBasicInfo.name = this.nameAlter;
                FieldAddCnt.cloud.add_basic_info(this.addBasicInfo).then((response: AxiosResponse) => {
                    if (response.data.status == '200') {
                        this.addBasicInfo = new AddBasicInfo();
                        this.updateInfo();
                        if (this.lv === '1') {
                            this.$emit('getAdminList', {change: 1});
                        }
                    }
                });
                this.alterDialogVisible = false;
            } else {
                this.any().$notify.warning({title: '提示', message: "不能为空"});
            }
        }


        @Watch("rankValue")
        empty(): void {
            this.lv = this.rankValue.toString();
            this.name = '';
            this.attrName = '';
            this.anotherName = '';
            this.rankOneID = '';
            this.rankTwoID = '';
        }


        @Watch("rankOneID")
        rankTowList(): void {
            this.rankTwo = [];
            this.rankTwoID = '';
            if (this.rankOneID !== '') {
                for (let i = 0; i < this.rankOne.length; i++) {
                    if (this.rankOne[i].id === this.rankOneID) {
                        this.rankTwo.push(this.rankOne[i].childrens);
                    }
                }
            }
        }

        @Watch("rankTwoID")
        rankThreeList(): void {
            this.rankThree = [];
            if (this.rankTwoID !== '') {
                for (let i = 0; i < this.rankTwo[0].length; i++) {
                    if (this.rankTwoID === this.rankTwo[0][i].id) {
                        this.rankThree.push(this.rankTwo[0][i].childrens);
                    }
                }
            }

        }


        // 封装的删除添加自动更新
        updateInfo(): void {
            FieldAddCnt.cloud.list_tree_basic_info_attr().then((response: AxiosResponse) => {
                this.rankOne = response.data.data;
                this.rankTwo = [];
                if (this.rankOneID !== '') {
                    for (let i = 0; i < this.rankOne.length; i++) {
                        if (this.rankOne[i].id === this.rankOneID) {
                            this.rankTwo.push(this.rankOne[i].childrens);
                        }
                    }
                }
                this.rankThreeList();
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
    .el-col-12 span {
        float: right;
        line-height: 40px;
    }

    .save_btn{
        width:97px;
        height:29px;
        line-height: 5px;
        background:rgba(13,186,158,1);
        border-radius:4px;
    }
    .save_btn:hover{
        width:97px;
        height:29px;
        background:rgba(13,186,158,1);
        border-radius:4px;
    }
    .el-col-12 {
        text-align: left;
        margin: 15px 0;
    }
    .el-table td {
        padding: 0 !important;
    }
    .required {
        color: red;
        float: left !important;
        font-size: 10px;
        margin-left: 5px;
        line-height: 40px;
    }
    .img_span {
        display: inline-block;
        height: 24px;
        width: 24px;
        cursor: pointer;
    }
</style>
