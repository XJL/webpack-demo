const path = require("path");

module.exports = {
    // 单入口、单出口
    entry: "./public/index.js",
    output:{
        path:path.resolve(__dirname,'build'),
        filename:'bundle.js'
    },

    // 多入口、单出口
    // entry: ["./public/index.js", './public/index2.js'],
    // output:{
    //     path:path.resolve(__dirname,'build'),
    //     filename:'bundle.js'
    // }

    // 多入口、多出口
    // entry: {
    //     page1:'./public/page1/index.js',
    //     page2:'./public/page2/index.js'
    // },
    // output: {
    //     path:path.resolve(__dirname,'build'),
    //     filename: '[name].js'
    // },

    // 本地开服服务器配置
    devServer: {
        contentBase: './build', // 服务器访问的目录，一般只想打包完的出口目录
        host: 'localhost', // 服务器的ip地址
        port: 8000, // 服务器端口
        open: true // 运行时自动打开页面
    },


    // 配置loader
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    }
};
