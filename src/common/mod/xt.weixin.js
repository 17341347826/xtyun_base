import * as tslib_1 from "tslib";
import wx from 'weixin-js-sdk';
import { ICloud } from '@/common/mod/xt.cloud';
var XtWYTool = /** @class */ (function (_super) {
    tslib_1.__extends(XtWYTool, _super);
    function XtWYTool() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isDebug = false;
        _this.appId = 'wx53d0d2c2d4c1585f';
        _this.apiList = ['scanQRCode'];
        _this.signUrl = 'svc_exam_mana_py/get_wx_sign';
        return _this;
    }
    XtWYTool.prototype.setSignUrl = function (signUrl) {
        this.signUrl = signUrl;
    };
    XtWYTool.prototype.get_sign_url = function () {
        return this.signUrl;
    };
    XtWYTool.prototype.enableDebug = function (isEnabled) {
        this.isDebug = isEnabled;
    };
    XtWYTool.prototype.get_wx_sign = function () {
        return this.post(this.api(this.signUrl), {});
    };
    XtWYTool.prototype.call = function () {
        var self = this;
        return new Promise(function (resolve, reject) {
            self.get_wx_sign().then(function (response) {
                var params = {
                    debug: self.isDebug,
                    appId: response.data.data.appId,
                    timestamp: response.data.data.timestamp,
                    nonceStr: response.data.data.nonceStr,
                    signature: response.data.data.signature,
                    jsApiList: self.apiList,
                };
                wx.config(params);
                wx.ready(function (ret) {
                    resolve(wx);
                });
                wx.error(function (res) {
                    console.log('wx  err:', res);
                });
            });
        });
    };
    ;
    XtWYTool.prototype.scanQRCode = function () {
        var self = this;
        return new Promise(function (resolve, reject) {
            self.call().then(function (wx) {
                wx.scanQRCode({
                    desc: 'scanQRCode desc',
                    // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                    needResult: 1,
                    // 可以指定扫二维码还是一维码，默认二者都有
                    scanType: ['qrCode', 'barCode'],
                    // 当needResult 为 1 时，扫码返回的结果
                    success: function (res) {
                        if (res.resultStr.indexOf(',') > 0) {
                            resolve(res.resultStr.split(',')[1]);
                        }
                        else {
                            resolve(res.resultStr);
                        }
                    }
                });
            });
        });
    };
    return XtWYTool;
}(ICloud));
export default XtWYTool;
//# sourceMappingURL=xt.weixin.js.map