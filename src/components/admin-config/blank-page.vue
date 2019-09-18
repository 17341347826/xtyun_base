<template>
    
</template>

<script lang="ts">

    import {Component, XtRouter, XtVue} from "../../common/common";

    @Component
    export default class AdminConfig extends XtVue {
        private indexInfo: string | number = '';


        mounted() {
            if (this.$route.params.indexInfo || this.$route.params.indexInfo == '0') {
                this.indexInfo = this.$route.params.indexInfo;
            } else if (!this.$route.params.indexInfo) {
                window.history.go(-1);
            }
            if (this.indexInfo >= 0) {
                XtRouter.skipNamed("ConfigInfo", {indexInfo: this.indexInfo});
            }
            // switch (this.indexInfo) {
            //     case 0:
            //         XtRouter.skipNamed("ConfigInfo", {indexInfo: this.indexInfo});
            //         break;
            //     case 1:
            //         XtRouter.skipNamed("ConfigInfo", {indexInfo: this.indexInfo});
            //         break;
            //     case 2:
            //         XtRouter.skipNamed("ConfigInfo", {indexInfo: this.indexInfo});
            //         break;
            //     case 3:
            //         XtRouter.skipNamed("ConfigInfo", {indexInfo: this.indexInfo});
            //         break;
            //     case 4:
            //         XtRouter.skipNamed("ConfigInfo", {indexInfo: this.indexInfo});
            //         break;
            //     case 5:
            //         XtRouter.skipNamed("ConfigInfo", {indexInfo: this.indexInfo});
            //         break;
            //     case 6:
            //         XtRouter.skipNamed("ConfigInfo", {indexInfo: this.indexInfo});
            //         break;
            //     case 7:
            //         XtRouter.skipNamed("ConfigInfo", {indexInfo: this.indexInfo});
            //         break;
            //     case 8:
            //         XtRouter.skipNamed("ConfigInfo", {indexInfo: this.indexInfo});
            //         break;
            //     case 9:
            //         XtRouter.skipNamed("ConfigInfo", {indexInfo: this.indexInfo});
            //         break;
            //     case 10:
            //         XtRouter.skipNamed("ConfigInfo", {indexInfo: this.indexInfo});
            //         break;
            //     case 11:
            //         XtRouter.skipNamed("ConfigInfo", {indexInfo: this.indexInfo});
            //         break;
            //     case 12:
            //         XtRouter.skipNamed("ConfigInfo", {indexInfo: this.indexInfo});
            //         break;
            // }
        }

    }
</script>

<style scoped>

</style>