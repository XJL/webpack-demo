const path = require("path");

module.exports = {
    // 单入口、单出口
    // entry: "./public/index.js",
    // output:{
    //     path:path.resolve(__dirname,'build'),
    //     filename:'bundle.js'
    // }
    // 多入口、单出口
    // entry: ["./public/index.js", './public/index2.js'],
    // output:{
    //     path:path.resolve(__dirname,'build'),
    //     filename:'bundle.js'
    // }
    // 多入口、多出口
    entry: {
        page1:'./public/page1/index.js',
        page2:'./public/page2/index.js'
    },
    output: {
        path:path.resolve(__dirname,'build'),
        filename: '[name].js'
    }
}