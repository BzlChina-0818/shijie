/**
 * Created by Administrator on 2018/5/22 0011.
 */

module.exports = {
  "/api/v1/utax/runlog": {
    "target": "http://192.168.0.104:8099/",
    "changeOrigin": true,
    "pathRewrite": { "^/api/v1": "" }
  },
  "/api/v1/utax/process/taskuser/query": {
    "target": "http://39.106.187.236:8099/",
    "changeOrigin": true,
    "pathRewrite": { "^/api/v1": "" }
  },
  "/api/v1/utax/iinv/import": {
    "target": "http://39.106.187.236:8099/",
    "changeOrigin": true,
    "pathRewrite": { "^/api/v1": "" }
  },
  "/api/v1/utax/iinv/line": {
    "target": "http://39.106.187.236:8099/",
    "changeOrigin": true,
    "pathRewrite": { "^/api/v1": "" }
  },
  "/api/v1/utax/iinv/pool": {
    "target": "http://39.106.187.236:8099/",
    "changeOrigin": true,
    "pathRewrite": { "^/api/v1": "" }
  },
  "/api/v1/utax/taxfee": {
    "target": "http://39.106.187.236:8099/",
    "changeOrigin": true,
    "pathRewrite": { "^/api/v1": "" }
  },
  "/api/v1/utax/txbs-stamp": {
    "target": "http://39.106.187.236:8099/",
    "changeOrigin": true,
    "pathRewrite": { "^/api/v1": "" }
  },
  "/api/v1/utax/index/define": {
    "target": "http://39.106.187.236:8099/",
    "changeOrigin": true,
    "pathRewrite": { "^/api/v1": "" }
  },
}
