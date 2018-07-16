const Mock=require('mockjs')
const config=require('../utils/config')
const { apiPrefix } = config 

const NOTFOUND = {
    message: 'Not Found',
    documentation_url: 'http://localhost:8000/process',
}

const processDatas=Mock.mock({
    'data|50':[
        {
            id:'@id',
            name:'@name',
            'key|1-50':1,
            'version|10-60':1,
            resourceName:'@last',
            diagramResourceName(){
                return Mock.Random.image('100x100', Mock.Random.color(), '#757575', 'png', Mock.mock('@word(5)'))
            } 
        }
    ]
}).data
module.exports = {
    [`GET ${apiPrefix}/process`] (req, res) {
        const { query } = req
        let { pageSize, page, ...other } = query
        pageSize = pageSize || 10
        page = page || 1
    
        let newData = processDatas
    
        res.status(200).json({
          data: newData.slice((page - 1) * pageSize, page * pageSize),
          total: newData.length,
        })
      },
}