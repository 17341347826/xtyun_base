import Vue from 'vue';
var ICloud = /** @class */ (function () {
    function ICloud() {
        this.axios = Vue.axios;
        this.serverIp = '';
    }
    ICloud.prototype.set_server_ip = function (ip) {
        this.serverIp = ip;
        Vue.axios.interceptors.response.use(function (response) {
            if (response.data.status === 254) {
                for (var _i = 0, _a = Object.keys(response.data.message); _i < _a.length; _i++) {
                    var i = _a[_i];
                    if (typeof (response.data.message[i]) != 'string')
                        response.data.message[i] = response.data.message[i].join('\r\n');
                }
            }
            return response;
        }, function (error) {
            // 对响应错误做点什么
            return Promise.reject(error);
        });
        Vue.axios.interceptors.request.use(function (config) {
            config.headers['Token'] = window.sessionStorage.getItem('token');
            // Do something before request is sent
            return config;
        }, function (error) {
            // Do something with request error
            return Promise.reject(error);
        });
    };
    ICloud.prototype.get_server_ip = function () {
        return this.serverIp;
    };
    ICloud.prototype.api = function (subUrl) {
        return this.serverIp + '/api/' + subUrl;
    };
    ICloud.prototype.url = function (subUrl) {
        return this.serverIp + '/' + subUrl;
    };
    ICloud.prototype.post = function (api, pms) {
        return this.axios.post(api, pms).catch(function (error) {
            switch (error.response.status) {
                case 200:
                    return true;
                case 404:
                    Vue.prototype.$notify({ title: '内部错误', message: '接口不存在' });
                    return false;
                case 500:
                    Vue.prototype.$notify({ title: '内部错误', message: '服务异常' });
                    return false;
                default:
                    Vue.prototype.$notify({ title: '内部错误', message: '未知异常' });
                    return false;
            }
        });
    };
    return ICloud;
}());
export { ICloud };
//# sourceMappingURL=jc.cloud.js.map