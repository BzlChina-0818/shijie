const qs = require('qs')
const Mock = require('mockjs')
const config = require('../utils/config')

const { apiPrefix } = config

let commodityListData = Mock.mock({
  'data|80-100': [
    {
      "commodityId": '@id',
      "compNname": /\w{5,10}/,
      "commodityName": /\w{5,10}/,
      "commodityCode": '@natural',
      "taxItemName": '@natural',
      "rate|100-2000": 1,
      "startUseOfTime": '@date',
      "endUseOfTime": '@date',
      "isOpen": true,
      "isOpenName|1": ['是','否'],
    },
  ],
})

let standardCommodityListData = Mock.mock({
  'data|80-100': [
    {
      "PId": '@id',
      "commodityCode": /\w{5,10}/,
      "commodity": /\w{5,10}/,
    },
  ],
})

let taxItemListData = Mock.mock({
  'data|80-100': [
    {
      "PId": '@id',
      "itemName": /\w{5,10}/,
      "itemNo": /\w{5,10}/,
    },
  ],
})


let database = commodityListData.data
let database1 = standardCommodityListData.data
let database2 = taxItemListData.data

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

const NOTFOUND = {
  message: 'Not Found',
  documentation_url: 'http://localhost:8000/request',
}

module.exports = {

  [`POST ${apiPrefix}/utax/oinv/commodity/list`] (req, res) {
    const { body } = req
    let { pageSize, page, ...other } = body
    pageSize = page.size || 10
    page = page.number || 1

    let newData = database
    for (let key in other) {
      if ({}.hasOwnProperty.call(other, key)) {
        newData = newData.filter((item) => {
          if ({}.hasOwnProperty.call(item, key)) {
            if (key === 'address') {
              return other[key].every(iitem => item[key].indexOf(iitem) > -1)
            } else if (key === 'createTime') {
              const start = new Date(other[key][0]).getTime()
              const end = new Date(other[key][1]).getTime()
              const now = new Date(item[key]).getTime()

              if (start && end) {
                return now >= start && now <= end
              }
              return true
            }
            return String(item[key]).trim().indexOf(decodeURI(other[key]).trim()) > -1
          }
          return true
        })
      }
    }

    res.status(200).json({
      code:100,
      message:"",
      data:{
        content: newData.slice((page - 1) * pageSize, page * pageSize),
        page:{
          "totalElements":newData.length
        },
      }

    })
  },

  [`GET ${apiPrefix}/commodity/:id`] (req, res) {
    const { id } = req.params
    const data = queryArray(database, id, 'id')
    if (data) {
      res.status(200).json(data)
    } else {
      res.status(404).json(NOTFOUND)
    }
  },

  [`POST ${apiPrefix}/utax/oinv/standard-commodity/list`] (req, res) {
    const { body } = req
    let { pageSize, page, ...other } = body
    pageSize = page.size || 10
    page = page.number || 1

    let newData = database1

    res.status(200).json({
      code:100,
      message:"",
      data:{
        content: newData.slice((page - 1) * pageSize, page * pageSize),
        page:{
          "totalElements":newData.length
        },
      }

    })
  },
  [`POST ${apiPrefix}/utax/oinv/tax-item/list`] (req, res) {
    const { body } = req
    let { pageSize, page } = body
    pageSize = page.size || 10
    page = page.number || 1

    let newData = database2

    res.status(200).json({
      code:100,
      message:"",
      data:{
        content: newData.slice((page - 1) * pageSize, page * pageSize),
        page:{
          "totalElements":newData.length
        },
      }

    })
  },


}
