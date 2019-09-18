import 'mocha';
import {expect} from 'chai';

import * as XtAlgorithm from '../../mod/xt.algorithm';

// 模块集
describe('xt.algorithm.array', () => {

    // 单个测试用例
    it('test sortBy', () => {
        let ary: any[] = [
            {a: 1, b: 2, c: 3},
            {a: 2, b: 3, c: 4},
            {a: 5, b: 1, c: 2},
        ]
        XtAlgorithm.sortBy(ary, ['+a', '-b']);
        expect(ary[0]).to.not.equal(1, 'covert failed');
    });

});

