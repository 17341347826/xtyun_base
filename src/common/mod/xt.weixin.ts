import wx from 'weixin-js-sdk';
import {ICloud} from '@/common/mod/xt.cloud';
import {AxiosResponse} from 'axios';


export default class XtWYTool extends ICloud {
    private isDebug: boolean = false;
    private appId: string = 'wx53d0d2c2d4c1585f';
    private apiList: string[] = ['scanQRCode'];
    private signUrl: string = 'svc_exam_mana_py/get_wx_sign';

    public setSignUrl(signUrl: string): void {
        this.signUrl = signUrl;
    }

    public get_sign_url(): string {
        return this.signUrl;
    }

    public enableDebug(isEnabled: boolean): void {
        this.isDebug = isEnabled;
    }

    public get_wx_sign(): any {
        return this.post(this.api(this.signUrl), {});
    }


    public call(): any {
        const self: any = this;

        return new Promise(function (resolve, reject) {
            self.get_wx_sign().then((response: AxiosResponse) => {
                let params = {
                    debug: self.isDebug,
                    appId:response.data.data.appId,
                    timestamp:response.data.data.timestamp,
                    nonceStr:response.data.data.nonceStr,
                    signature: response.data.data.signature,
                    jsApiList: self.apiList,
                };

                wx.config(params);

                wx.ready((ret) => {
                    resolve(wx);
                });

                wx.error(function (res) {
                    console.log('wx  err:', res);
                });

            });
        });
    };

    public scanQRCode(): any {
        const self = this;
        return new Promise(function (resolve, reject) {
            self.call().then((wx:any)=>{
                wx.scanQRCode({
                    desc: 'scanQRCode desc',
                    // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                    needResult: 1,
                    // 可以指定扫二维码还是一维码，默认二者都有
                    scanType: ['qrCode', 'barCode'],
                    // 当needResult 为 1 时，扫码返回的结果
                    success: (res: any) => {
                        if(res.resultStr.indexOf(',') > 0){
                            resolve(res.resultStr.split(',')[1]);
                        }else{
                            resolve(res.resultStr);
                        }



                    }});
            });
        });
    }
}
