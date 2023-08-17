//打包优化
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['js', 'css']
//去除console.log（）
const TerserPlugin = require('terser-webpack-plugin');


module.exports = {

  productionSourceMap: false,
  publicPath: './',
  devServer: {
    proxy: {
      '/platform': {
        // target:'http://10.8.0.249:8010',
        //  target:'http://10.8.0.12:3002',
        // target: 'http://10.8.0.120:8010',
        // target:'http://10.8.0.101:8080',
        // target:'http://10.8.0.249:8082',   //ces
        // target:'http://10.8.0.101:8080/',   // zx
        // target: 'http://10.8.0.101:8080',
        // target:'http://172.19.19.50:8082',
        // target:'http://172.19.19.41:8010', //cs
        // target:'http://10.8.0.13:3002',
        // target:'http://10.8.0.8:8888',
        // target:'http://10.8.0.4:8888',
        // target:'http://10.8.0.6:3002',
        // target:'http://10.8.0.101:8080',   //子息
        // target:'https://10.8.0.105:8443/',   //jx
        // target:'http://172.26.1.15:8080',
        // target:'https://10.0.8.6:8443',   // fw  admin   123123
        // target:'https://10.8.0.105:8443', 
        // target:'http://10.8.0.5:8080',   //zx   admin   123446
        // target: 'http://10.8.0.5:8080',
        target: 'http://192.168.20.41:8802',
        ws: true,
        changeOrigin: true,
        secure: false, // 如果是https接口，需要配置这个参数
        // secure: true, // 如果是https接口，需要配置这个参数  https:false
        pathRewrite: { '^': '' },
        // pathRewrite: {'^/platform':''}
      }
    },

    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    hotOnly: false,
    disableHostCheck: true,
  },
  lintOnSave: true,
  css: {
    loaderOptions: {

      postcss: {
        plugins: [
          require('postcss-px2rem')({
            remUnit: 192
          })
        ]
      }
    },
  },
  //打包优化
  configureWebpack: {
    plugins: [// 配置compression-webpack-plugin压缩

      new CompressionWebpackPlugin({
        algorithm: 'gzip',

        test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),

        threshold: 10240,

        minRatio: 0.8

      })

    ],

    optimization: {
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            compress: {
              warnings: false,
              drop_console: true,
              drop_debugger: true,
              pure_funcs: ["console.log"]
            }
          }
        })
      ],
    }
  },


}

// 打包压缩
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
//     .BundleAnalyzerPlugin;
//     module.exports = {
//         configureWebpack: {
//             plugins: [new BundleAnalyzerPlugin()]
//         }
//    };



// vue.config.js

