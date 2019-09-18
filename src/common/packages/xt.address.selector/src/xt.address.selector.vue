<template>
    <el-row>
        <el-row>
            <el-select
                v-model="sheng" :size="size" style="width: 315px"
                @change="choseProvince"
                clearable
                placeholder="省级地区" value="">
                <el-option
                    v-for="item in province"
                    :key="item.id"
                    :label="item.value"
                    :value="item.id" filterable>
                </el-option>
            </el-select>
        </el-row>

        <el-row>
            <el-select
                v-model="shi" :size="size" style="width: 315px"
                @change="choseCity"
                clearable
                placeholder="市级地区" filterable value="">
                <el-option
                    v-for="item in shi1"
                    :key="item.id"
                    :label="item.value"
                    :value="item.id">
                </el-option>
            </el-select>
        </el-row>

        <el-row>
            <el-select
                v-model="qu" style="width: 315px"
                @change="choseBlock"
                clearable
                placeholder="区级地区" filterable value="">
                <el-option
                    v-for="item in qu1"
                    :key="item.id"
                    :label="item.value"
                    :value="item.id">
                </el-option>
            </el-select>
        </el-row>
    </el-row>

</template>

<script>
    import map_rule from "./xt.address.selector.map";
    import {Watch} from "../../../common";

    export default {
        componentName: 'UpAddressSelector',
        name: 'UpAddressSelector',
        props: {
            districtName: Object,
            size: String
        },
        data() {
            return {
                mapJson: '../static/json/map.json',
                province: '',
                sheng: '',
                shi: '',
                shi1: [],
                qu: '',
                qu1: [],
                city: '',
                block: '',
                administrative: {
                    province_name: '',
                    province_code: '',
                    city_name: '',
                    city_code: '',
                    district_name: '',
                    district_code: ''
                },
                op: "",
                oc: "",
                od: "",
            }
        },
        watch: {
            districtName(val) {
                console.log(123)
                this.sheng = val.province_code;
                this.choseProvince(val.province_code);
                this.shi = val.city_code;
                this.choseCity(val.city_code);
                this.qu = val.district_code;
                this.choseBlock(val.district_code);
            }
        },
        methods: {
            // 加载china地点数据，三级
            getCityData: function () {
                this.province = [];
                this.city = [];
                this.block = [];
                // 省市区数据分类
                for (var item in map_rule) {
                    if (item.match(/0000$/)) {//省
                        this.province.push({id: item, value: map_rule[item], children: []})
                    } else if (item.match(/00$/)) {//市
                        this.city.push({id: item, value: map_rule[item], children: []})
                    } else {//区
                        this.block.push({id: item, value: map_rule[item]})
                    }
                }
                // 分类市级
                for (var index in this.province) {
                    for (var index1 in this.city) {
                        if (this.province[index].id.slice(0, 2) === this.city[index1].id.slice(0, 2)) {
                            this.province[index].children.push(this.city[index1])
                        }
                    }
                }
                // 分类区级
                for (var item1 in this.city) {
                    for (var item2 in this.block) {
                        if (this.block[item2].id.slice(0, 4) === this.city[item1].id.slice(0, 4)) {
                            this.city[item1].children.push(this.block[item2])
                        }
                    }
                }

            },
            // 选省
            choseProvince: function (e) {
                this.setInfo();
                this.shi = '';
                this.qu = '';
                this.oc = '';
                this.od = '';
                this.shi1 = [];
                this.qu1 = [];
                for (var index2 in this.province) {
                    if (e === this.province[index2].id) {
                        this.shi1 = this.province[index2].children;
                        this.administrative.province_name = this.province[index2].value;
                        this.administrative.province_code = this.province[index2].id;
                        // this.op = this.province[index2].value;
                    }
                }
                // this.$emit("addressChange", this.op, this.oc, this.od)
            },
            // 选市
            choseCity: function (e) {
                this.setInfo();
                this.oc = '';
                this.od = '';
                this.qu = '';
                this.qu1 = [];
                for (var index3 in this.city) {
                    if (e === this.city[index3].id) {
                        this.qu1 = this.city[index3].children;
                        // this.oc = this.city[index3].value;
                        this.administrative.city_name = this.city[index3].value;
                        this.administrative.city_code = this.city[index3].id;
                    }
                }
                // this.$emit("addressChange", this.op, this.oc, this.od)
            },
            // 选区
            choseBlock: function (e) {
                this.setInfo();
                this.od = '';
                this.E = e;
                for (var id in this.qu1) {
                    if (e === this.qu1[id].id) {
                        // this.od = this.qu1[id].value;
                        this.administrative.district_name = this.qu1[id].value;
                        this.administrative.district_code = this.qu1[id].id;
                    }
                }
                // console.log(this.E)
                // this.$emit("addressChange", this.op, this.oc, this.od)
            },
            setInfo: function () {
                this.$emit('setAdministrative', this.administrative);

            }
        },
        created: function () {
            this.getCityData()
        }
    }
</script>

<style scoped>
</style>
