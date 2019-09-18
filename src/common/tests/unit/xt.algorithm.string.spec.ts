import 'mocha';
import {expect} from 'chai';

import * as XtAlgorithm from '../../mod/xt.algorithm';

// 模块集
describe('xt.algorithm.string', () => {

    // 单个测试用例
    it('test time2Str', () => {
        const ret: string = XtAlgorithm.time2Str(new Date());
        expect(ret).to.not.equal('', 'covert failed');
    });

    it('test upperCaseZh', () => {
        let ret: string = XtAlgorithm.upperCaseZh('1234567890');
        expect(ret).to.equal('一二三四五六七八九零', 'covert failed');
        ret = XtAlgorithm.upperCaseZh('Aab134', true);
        expect(ret).to.equal('AAB壹叁肆', 'covert failed');
    });

    it('test encodeUnicode', () => {
        let ret: string = XtAlgorithm.encodeUnicode('0ab');
        expect(ret).to.equal('306162', 'covert failed');
    });
});

