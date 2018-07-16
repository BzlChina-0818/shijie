module.exports = {
  //发票代码信息
  "/api/v1/utax/issue-invoice/oinv-code/*": {
    "target": "http://39.106.187.236:8099/",
    "changeOrigin": true,
    "pathRewrite": {"^/api/v1": ""}
  },
  //请求省列表
  "/api/v1/utax/cfg-zone/province-list": {
    "target": "http://39.106.187.236:8099/",
    "changeOrigin": true,
    "pathRewrite": {"^/api/v1": ""}
  },
  //请求市列表
  "/api/v1/utax/cfg-zone/city-list": {
    "target": "http://39.106.187.236:8099/",
    "changeOrigin": true,
    "pathRewrite": {"^/api/v1": ""}
  },
  /*列表检索条件获取*/
  "/api/v1/utax/dict/get-dict": {
    "target": "http://39.106.187.236:8099/",
    "changeOrigin": true,
    "pathRewrite": {"^/api/v1": ""}
  },


  //动态参数列表
  "/api/v1/utax/report-param/*": {
    "target": "http://39.106.187.236:8099/",
    "changeOrigin": true,
    "pathRewrite": {"^/api/v1": ""}
  },
//功能定义
  "/api/v1/utax/function/*": {
    "target": "http://39.106.187.236:8099/",
    "changeOrigin": true,
    "pathRewrite": {"^/api/v1": ""}
  },

  //请求bizTable模态框
  "/api/v1/utax/cfg-table/*": {
    "target": "http://39.106.187.236:8099/",
    "changeOrigin": true,
    "pathRewrite": {"^/api/v1": ""}
  },

  // "/api/v1/process/model/new":{
  //   "target": "http://192.168.0.117:8091/",
  //   "changeOrigin": true,
  //   "pathRewrite": { "^/api/v1" : "" }
  // },

  //进项税，日志
  "/api/v1/utax/checklog/*": {
    "target": "http://39.106.187.236:8099/",   //测试环境
    //  "target": `http://192.168.0.104:8099`,
    "changeOrigin": true,
    "pathRewrite": {"^/api/v1": ""}
  },
  //已获取发票管理
  "/api/v1/utax/iinv/imp-invoice/*": {
    "target": "http://39.106.187.236:8099/",
    "changeOrigin": true,
    "pathRewrite": {"^/api/v1": ""}
  },
//红字发票
  "/api/v1/utax/iinv-return/*": {
    "target": "http://39.106.187.236:8099/",
    "changeOrigin": true,
    "pathRewrite": {"^/api/v1": ""}
  },
//增值税销项/进项基础表
  "/api/v1/vat/issue-basic*": {
    "target": "http://39.106.187.236:8099/",
    "changeOrigin": true,
    "pathRewrite": {"^/api/v1": ""}
  },

  //销项发票税基
  "/api/v1/utax/oinv-wait-print-inv/*": {
    "target": "http://39.106.187.236:8099/",    //测试环境
    //"target": "http://192.168.0.135:8099/",
    "changeOrigin": true,
    "pathRewrite": {"^/api/v1": ""}
  },
  //增值税纳税信息汇总
  "/api/v1/utax/vat/info-sum/*": {
    "target": "http://39.106.187.236:8099/",
    "changeOrigin": true,
    "pathRewrite": {"^/api/v1": ""}
  },
  //税金申报
  "/api/v1/taxfee/delaration*": {
    "target": "http://39.106.187.236:8099/",
    "changeOrigin": true,
    "pathRewrite": {"^/api/v1": ""}
  },
}



