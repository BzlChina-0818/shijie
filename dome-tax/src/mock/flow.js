const qs = require('qs')
const Mock=require('mockjs')
const config=require('../utils/config')
const { apiPrefix } = config
const NOTFOUND = {
  message: 'Not Found',
  //documentation_url: 'http://localhost:8000/flow',
}

const noProxy = true
const queryArray = (array, key, keyAlias = 'key') => {
  if (!(array instanceof Array)) {
    return null
  }
  let data

  for (let item of array) {
    if (item[keyAlias] === key) {
      data = item
      break
    }
  }

  if (data) {
    return data
  }
  return null
}

let FlowData=Mock.mock({
  'data|80-100': [
    {
      id: '@id',
      name: '@name',
      'key|1-50': 1,
      createTime: '@datetime',
      lastUpdateTime:'@datetime',
      deploymentId:'@id',
    },
  ],
}).data

//let database = FlowData;
module.exports={
  [`GET ${apiPrefix}/flow`] (req, res) {
    const cookie = req.headers.cookie || ''
    const cookies = qs.parse(cookie.replace(/\s/g, ''), { delimiter: ';' })
    const response = {}
    const flow = {}
    if (!cookies.token) {
      res.status(200).send({ message: 'Not Login' })
      return
    }
    const token = JSON.parse(cookies.token)
    if (token) {
      response.success = token.deadline > new Date().getTime()
    }
    if (response.success) {
      const flowItem = adminUsers.filter(_ => _.id === token.id)
      if (flowItem.length > 0) {
        flow.permissions = flowItem[0].permissions
        flow.username = flowItem[0].username
        flow.id = flowItem[0].id
      }
    }
    response.flow = flow
    res.json(response)
  },
  [`POST ${apiPrefix}/flows`](req,res){
    const { query } = req
    let { pageSize, page, ...other } = query
    pageSize = pageSize || 10
    page = page || 1

    let newData = FlowData

    res.status(200).json({
      data: newData.slice((page - 1) * pageSize, page * pageSize),
      total: newData.length,
    })
  },
  [`DELETE ${apiPrefix}/flows`] (req, res) {
    const { ids } = req.body
    FlowData = FlowData.filter(item => !ids.some(_ => _ === item.id))
    res.status(204).end()
  },
  [`POST ${apiPrefix}/flow`] (req, res) {
    const newData = req.body
    newData.createTime = Mock.mock('@now')
    newData.avatar = newData.avatar || Mock.Random.image('100x100', Mock.Random.color(), '#757575', 'png', newData.nickName.substr(0, 1))
    newData.id = Mock.mock('@id')

    FlowData.unshift(newData)

    res.status(200).end()
  },

  [`GET ${apiPrefix}/user/:id`] (req, res) {
    const { id } = req.params
    const data = queryArray(FlowData, id, 'id')
    if (data) {
      res.status(200).json(data)
    } else {
      res.status(404).json(NOTFOUND)
    }
  },

  [`DELETE ${apiPrefix}/flow/:id`] (req, res) {
    console.log(req.params)
    const { id } = req.params
    const data = queryArray(FlowData, id, 'id')
    if (data) {
      FlowData = FlowData.filter(item => item.id !== id)
      res.status(204).end()
    } else {
      res.status(404).json(NOTFOUND)
    }
  },
}

//export default  {"/*": "http://10.116.3.31:8090/"}
