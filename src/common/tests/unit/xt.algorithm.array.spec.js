import 'mocha';
import { expect } from 'chai';
import * as XtAlgorithm from '../../mod/xt.algorithm';
// 模块集
describe('xt.algorithm.memory', function () {
    // 单个测试用例
    it('test deepCopy', function () {
        var a = { a: 1 };
        var b = {};
        var c = XtAlgorithm.deepCopy(b, a);
        a['a'] = 3;
        expect(c.a).to.not.equal(a.a, 'deep copy failed');
    });
});
//# sourceMappingURL=xt.algorithm.array.spec.js.map