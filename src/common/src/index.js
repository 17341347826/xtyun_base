
import AddressSelector from '../packages/xt.address.selector/index.js';


const components = [
    AddressSelector
];

const install = function(Vue, opts = {}) {
    components.forEach(component => {
        Vue.component(component.name, component);
    });
};

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

module.exports = {
    version: '1.0.1',
    AddressSelector
};

module.exports.default = module.exports;
