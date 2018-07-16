/**
 * Created by Administrator on 2018/5/11 0011.
 */
const HOST = "http://39.106.187.236:8099"
module.exports = {
    "/api/v1/utax/oinv/print-pool/*": {
      "target": `${HOST}`,
      "changeOrigin": true,
      "pathRewrite": { "^/api/v1" : "" }
    },
    "/api/v1/utax/output-def/*": {
      //"target": 'http://192.168.0.104:8099',
      "target": `${HOST}`,
      "changeOrigin": true,
      "pathRewrite": { "^/api/v1" : "" }
    },
    "/api/v1/process/model/new/*": {
      "target": 'http://192.9.201.117:8091/',
      "changeOrigin": true,
      "pathRewrite": { "^/api/v1" : "" }
    },
    //登记发票细信息
    "/api/v1/utax/iinv/invoice/*": {
      "target": `${HOST}`,
      "changeOrigin": true,
      "pathRewrite": { "^/api/v1" : "" }
    },
    //获取销货单位
    "/api/v1/utax/partner/list": {
      "target": `${HOST}`,
      "changeOrigin": true,
      "pathRewrite": { "^/api/v1" : "" }
    },
    //删除发票行
    "/api/v1/utax/iinv/invoice-line-detail/delete/*": {
      "target": `${HOST}`,
      "changeOrigin": true,
      "pathRewrite": { "^/api/v1" : "" }
    },
    //纳税人主体
    "/api/v1/utax/taxpayer/list": {
      "target": `${HOST}`,
      "changeOrigin": true,
      "pathRewrite": { "^/api/v1" : "" }
    },
    //增值税专票详情
    "/api/v1/utax/iinv/line/*": {
      "target": `${HOST}`,
      "changeOrigin": true,
      "pathRewrite": { "^/api/v1" : "" }
    },
    //进项专票发票详情
    "/api/v1/utax/iinv/invoice-line/*": {
      "target": `${HOST}`,
      "changeOrigin": true,
      "pathRewrite": { "^/api/v1" : "" }
    },
    //获取字典接口
    "/api/v1/utax/dict/get-dict/*": {
      "target": `${HOST}`,
      "changeOrigin": true,
      "pathRewrite": { "^/api/v1" : "" }
    },
    //获取已登记发票
    "/api/v1/utax/iinv/auto-save/query": {
      "target": `${HOST}`,
      "changeOrigin": true,
      "pathRewrite": { "^/api/v1" : "" }
    },

    //发票认证池查询列表
    "/api/v1/utax/accept-invoice/auth/list": {
      "target": `${HOST}`,
      "changeOrigin": true,
      "pathRewrite": { "^/api/v1" : "" }
    },
    //普票查验
    "/api/v1/utax/iinv/line/inspection/*": {
      "target": `${HOST}`,
      "changeOrigin": true,
      "pathRewrite": { "^/api/v1" : "" }
    },
  }
