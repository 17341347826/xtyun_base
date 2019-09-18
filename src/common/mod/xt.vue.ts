import {Vue} from 'vue-property-decorator';

export class XtVue extends Vue {
    protected any(): any {
        return (this as any);
    }
}
