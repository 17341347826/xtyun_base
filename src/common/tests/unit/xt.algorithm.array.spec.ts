import 'mocha';
import {expect} from 'chai';

import * as XtAlgorithm from '../../mod/xt.algorithm';

// 模块集
describe('xt.algorithm.memory', () => {

    // 单个测试用例
    it('test deepCopy', () => {
        let a: any = {a: 1};
        let b: any = {};
        let c: any = XtAlgorithm.deepCopy(b, a);
        a['a'] = 3;
        expect(c.a).to.not.equal(a.a, 'deep copy failed');
    });

});

