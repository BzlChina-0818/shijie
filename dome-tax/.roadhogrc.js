const path = require('path')
const { version } = require('./package.json')

const proxyTable = {}
require('fs').readdirSync(require('path').join(__dirname + '/proxy')).forEach(function(file) {
  let obj = require('./proxy/'+file)
  Object.assign(proxyTable,  obj)
})

const svgSpriteDirs = [
  path.resolve(__dirname, 'src/svg/'),
  require.resolve('antd').replace(/index\.js$/, '')
]

export default {
  entry: 'src/index.js',
  svgSpriteLoaderDirs: svgSpriteDirs,
  theme: "./theme.config.js",
  publicPath: `/${version}/`,
  outputPath: `./dist/${version}`,
  // 接口代理示例
  proxy: proxyTable,
  env: {
    development: {
      extraBabelPlugins: [
        "dva-hmr",
        "transform-runtime",
        [
          "import", {
          "libraryName": "antd",
          "style": true
        }
        ]
      ],
    },
    production: {
      extraBabelPlugins: [
        "transform-runtime",
        [
          "import", {
          "libraryName": "antd",
          "style": true
        }
        ]
      ]
    }
  },
  dllPlugin: {
    exclude: ["babel-runtime", "roadhog", "cross-env"],
    include: ["dva/router", "dva/saga", "dva/fetch"]
  }
}
