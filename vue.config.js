module.exports = {
    devServer:{
        proxy: {
            // '':{
            //     target: 'http://192.168.0.127:8100',
            //     ws:true,
            //     changeOrigin:true
            // },
            // 'xtyun_base':{
            //     target: 'http://192.168.0.52:8100',
            //     ws:true,
            //     changeOrigin:true,
            // },

            '/api/file':{
                target: 'http://192.168.0.210:28080',
                ws:true,
                changeOrigin:true
            },
            '/api':{
                // target: 'http://base.xtyun.net',
                target: 'http://192.168.0.213:7000',
                ws:true,
                changeOrigin:true
            },
            '/api/svc_exam_mana_py':{
                target: 'http://127.0.0.1:8097',
                ws:true,
                changeOrigin:true
            },
            // '/api':{
            //     target: 'http://118.24.104.118',
            //     ws:true,
            //     changeOrigin:true,
            // }
        },
    },
    "transpileDependencies":[
        'app'
    ],
    baseUrl :"./",

};
