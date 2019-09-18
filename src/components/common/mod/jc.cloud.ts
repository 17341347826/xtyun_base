import Vue from 'vue';
import {AxiosError, AxiosRequestConfig, AxiosResponse} from 'axios';


export abstract class ICloud {
    public axios: any = (Vue as any).axios;


    protected serverIp: string = '';

    public set_server_ip(ip: string): void {
        this.serverIp = ip;
        (Vue as any).axios.interceptors.response.use((response: AxiosResponse) => {
            if (response.data.status === 254) {
                for (const i of Object.keys(response.data.message)) {
                    if(typeof(response.data.message[i]) != 'string')
                        response.data.message[i] = response.data.message[i].join('\r\n');
                }
            }
            return response;
        }, (error: any) => {
            // 对响应错误做点什么
            return Promise.reject(error);
        });

        (Vue as any).axios.interceptors.request.use((config: AxiosRequestConfig) => {
            config.headers['Token'] = window.sessionStorage.getItem('token');
            // Do something before request is sent
            return config;
        }, (error: any) => {
            // Do something with request error
            return Promise.reject(error);
        });

    }

    public get_server_ip(): string {
        return this.serverIp;
    }

    public api(subUrl: string): string {
        return this.serverIp + '/api/' + subUrl;
    }

    public url(subUrl: string): string {
        return this.serverIp + '/' + subUrl;
    }

    public post(api: string, pms: any): any {
        return this.axios.post(api, pms).catch((error: any) => {
            switch (error.response.status) {
                case 200:
                    return true;
                case 404:
                    Vue.prototype.$notify({title: '内部错误', message: '接口不存在'});
                    return false;
                case 500:
                    Vue.prototype.$notify({title: '内部错误', message: '服务异常'});
                    return false;
                default:
                    Vue.prototype.$notify({title: '内部错误', message: '未知异常'});
                    return false;
            }
        });
    }

}
