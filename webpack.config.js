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
                use: ['style-loader', 'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                require('autoprefixer')
                                    // ({
                                    //     browsers: [// 这样写比较旧了 会导致一些错误 请用browserslist在package.json或者.browserslistrc file中定义这些内容
                                    //         'ie >= 8',
                                    //         'Firefox >= 20',
                                    //         'Safari >= 5',
                                    //         'Android >= 4',
                                    //         'ios >= 6',
                                    //         'last 4 version'
                                    //     ]
                                    // })
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            },
            {
                test: /\.(png|jpg|gif|jpeg)/,
                // use: 'file-loader',
                use: [{
                    // [hash]、 [path], [ext]、 [name]配合使用
                    loader: 'file-loader',
                    options: {
                        name: 'baidu.[ext]', // 生成文件名字
                        // context: '../', // 上下文 默认是webpack.config.js的当前路径
                        // publicPath: 'https://www.abc.com/img/', // 发布后访问的文件的目录
                        outputPath: './img' // 在指定的output输出目录，会在build文件夹下生成相对应的目录，然后里面存放文件
                    }
                }]
            }
        ]
    }
};
