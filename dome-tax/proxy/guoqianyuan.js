/**
 * Created by Administrator on 2018/5/11 0011.
 */
const HOST = "http://39.106.187.236:8099"
module.exports = {
  "/api/v1/weather": {
    "target": "https://api.seniverse.com/",
    "changeOrigin": true,
    "pathRewrite": { "^/api/v1/weather": "/v3/weather" }
  },
/*  "/api/v1/process/models": {
    "target": `${HOST}`,
    "changeOrigin": true,
    "pathRewrite": { "^/api/v1" : "" }
  },*/

  "/api/v1/utax/process": {
   // "target": `http://192.168.0.174:8099`,
    "target": `${HOST}`,
    "changeOrigin": true,
    "pathRewrite": { "^/api/v1" : "" }
  },
  "/api/v1/process/actdefs": {
    "target": `${HOST}`,
    "changeOrigin": true,
    "pathRewrite": { "^/api/v1" : "" }
  },
  "/api/v1/utax/oinv/commodity/*": {
    "target": `${HOST}`,
    "changeOrigin": true,
    "pathRewrite": { "^/api/v1" : "" }
  },
  "/api/v1/utax/oinv/standard-commodity/*": {
    "target": `${HOST}`,
    "changeOrigin": true,
    "pathRewrite": { "^/api/v1" : "" }
  },
  "/api/v1/utax/data-source/*": {
    "target": `${HOST}`,
   // "target": `http://192.168.0.104:8099`,
    "changeOrigin": true,
    "pathRewrite": { "^/api/v1" : "" }
  },
  "/api/v1/utax/dynamic/*": {
    "target": `${HOST}`,
    "changeOrigin": true,
    "pathRewrite": { "^/api/v1" : "" }
  },
  "/api/v1/utax/vat/*": {
    "target": `${HOST}`,
    "changeOrigin": true,
    "pathRewrite": { "^/api/v1" : "" }
  },
  "/api/v1/utax/sys/*": {
    "target": `${HOST}`,
    "changeOrigin": true,
    "pathRewrite": { "^/api/v1" : "" }
  },
  "/api/v1/utax/biz-prov/*": {
    "target": `${HOST}`,
    "changeOrigin": true,
    "pathRewrite": { "^/api/v1" : "" }
  },
  "/api/v1/utax/biz-tax/*": {
    "target": `${HOST}`,
    "changeOrigin": true,
    "pathRewrite": { "^/api/v1" : "" }
  },
  "/api/v1/utax/biz-coa/*": {
    "target": `${HOST}`,
    "changeOrigin": true,
    "pathRewrite": { "^/api/v1" : "" }
  },
  "/api/v1/utax/report/*": {
    "target": `${HOST}`,
    "changeOrigin": true,
    "pathRewrite": { "^/api/v1" : "" }
  },
}
