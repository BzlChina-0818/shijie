const qs = require('qs')
const Mock = require('mockjs')
const config = require('../utils/config')
const { apiPrefix } = config
let invoiceData = Mock.mock({
  'data|80-100': [
    {
      oinvoiceCode: '@id',
      'oinvoiceType|1': [
        '增值税专用发票',
        '增值税普通发票',
        '非增值税发票',
        '海关进口增值税专用缴款书',
        '农产品收购发票或者销售发票',
        '代扣代缴税收通用缴款书',
        '运输费用结算单据',
        '增值税电子发票',
      ],
      typeName: '@name',
      'amtLimit|1': [
        '万元版',
        '十万元版',
        '百万元版',
        '千万元版',
        '亿元版'
      ],
      invoiceLocation: '@county(true)',

    },
  ],
})
let database = invoiceData.data
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
  if(data){
    return data
  }
  return null
}
const NOTFOUND = {
  message: 'Not Found',
  documentation_url: 'http://localhost:8000/invoiceCode',
}
module.exports={


  [`POST ${apiPrefix}/invoiceCode`] (req, res) {
    const { query } = req
    let { pageSize, page, ...other } = query
    pageSize = pageSize || 10
    page = page || 1

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
      data: newData.slice((page - 1) * pageSize, page * pageSize),
      total: newData.length,
    })
  },
  [`DELETE ${apiPrefix}/invoiceCodes`] (req, res) {
    const { ids } = req.body
    database = database.filter(item => !ids.some(_ => _ === item.id))
    res.status(204).end()
  },
/*  [`POST ${apiPrefix}/invoiceCode`] (req, res) {
    const newData = req.body
    newData.createTime = Mock.mock('@now')
    newData.avatar = newData.avatar || Mock.Random.image('100x100', Mock.Random.color(), '#757575', 'png', newData.nickName.substr(0, 1))
    newData.id = Mock.mock('@id')

    database.unshift(newData)

    res.status(200).end()
  },*/

  [`POST ${apiPrefix}/invoiceCode/create`] (req, res) {
    console.log(req)
    const newData = req.body
    newData.createTime = Mock.mock('@now')
    newData.avatar = newData.avatar || Mock.Random.image('100x100', Mock.Random.color(), '#757575', 'png', newData.nickName.substr(0, 1))
    newData.id = Mock.mock('@id')

    database.unshift(
      newData)

    res.status(200).end()
  },
  [`GET ${apiPrefix}/invoiceCode/:id`] (req, res) {
    const { id } = req.params
    const data = queryArray(database, id, 'id')
    if (data) {
      res.status(200).json(data)
    } else {
      res.status(404).json(NOTFOUND)
    }
  },

  [`DELETE ${apiPrefix}/invoiceCode/:id`] (req, res) {
    const { id } = req.params
    const data = queryArray(database, id, 'id')
    if (data) {
      database = database.filter(item => item.id !== id)
      res.status(204).end()
    } else {
      res.status(404).json(NOTFOUND)
    }
  },
  [`PATCH ${apiPrefix}/invoiceCode/:id`] (req, res) {
    const { id } = req.params
    const editItem = req.body
    let isExist = false

    database = database.map((item) => {
      if (item.id === id) {
        isExist = true
        return Object.assign({}, item, editItem)
      }
      return item
    })

    if (isExist) {
      res.status(201).end()
    } else {
      res.status(404).json(NOTFOUND)
    }
  },
}
