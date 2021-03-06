const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
    // 单入口、单出口
    entry: "./public/index.js",
    output:{
        path:path.resolve(__dirname,'build'),
        filename:'bundle[hash].js'
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
        open: true, // 运行时自动打开页面,
        hotOnly: true
    },


    // 配置loader
    module: {
        rules: [
            // {
            //     test: /\.css$/,
            //     use: ['style-loader', 'css-loader',
            //         {
            //             loader: 'postcss-loader',
            //             options: {
            //                 plugins: [
            //                     require('autoprefixer')
            //                         // ({
            //                         //     browsers: [// 这样写比较旧了 会导致一些错误 请用browserslist在package.json或者.browserslistrc file中定义这些内容
            //                         //         'ie >= 8',
            //                         //         'Firefox >= 20',
            //                         //         'Safari >= 5',
            //                         //         'Android >= 4',
            //                         //         'ios >= 6',
            //                         //         'last 4 version'
            //                         //     ]
            //                         // })
            //                 ]
            //             }
            //         }
            //     ]
            // },
            {
                test: /\.css$/,
                // use: ['style-loader', 'css-loader'],
                use: [
                    // MiniCSSExtractPlugin.loader,
                    'style-loader',
                    "css-loader",
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                require('autoprefixer')
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
                test: /\.(png|jpg|gif|jpeg)$/,
                // use: 'file-loader',
                use: [{
                    // [hash]、 [path], [ext]、 [name]配合使用
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]', // 生成文件名字
                        // context: '../', // 上下文 默认是webpack.config.js的当前路径
                        // publicPath: 'https://www.abc.com/img/', // 发布后访问的文件的目录
                        outputPath: './img/' // 在指定的output输出目录，会在build文件夹下生成相对应的目录，然后里面存放文件
                    }
                }]
            },
            {
                test: /\.(html|htm)$/,
                use: [{
                    loader: 'html-loader',
                    options: {
                        attrs: ['img:src']
                    }
                }]
            },
        ]
    },
    plugins: [
        new CleanWebpackPlugin(), // 每次清除编译文件
        new HtmlWebpackPlugin({
            template: "./public/index.html",
            filename: "index.html",
            minify: {
                minimize: true, // 压缩
                removeAttributeQuotes: true, // 去除引号
                removeComments: true, // 去除注释
                // collapseWhitespace: true, // 去除空格 包括换行空格
                minifyCSS: true, // 压缩html里的css
                minifyJS: true, // 压缩html里的js
                removeEmptyElements: true // 移除空元素
            },
            hash: true // 在引用的bundle文件后添加hash值，用以防止缓存。
        }),
        new MiniCSSExtractPlugin({
            filename: './css/index.css' // 打包后输出文件名
        }),
        new OptimizeCSSAssetsPlugin({
            assetNameRegExp: /\.css$/, // 需要处理文件的正则
            cssProcessor: require('cssnano'), // 使用这个处理器来进行优化压缩
            cssProcessorOptions: { // 传给处理器的配置参数 默认是{}
                preset: ['default', {discardComments: {removeAll: true}}] // 表示清全部注释
            },
            canPrint: true // 是否可以在console打印信息
        })
    ]
};
