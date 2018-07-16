const { config } = require('./common')

const { apiPrefix } = config
let database = [
  {
    id: '1',
    icon: 'dashboard',
    name: 'Dashboard',
    route: '/dashboard',
  }
  // {
  //   id: '10',
  //   bpid: '1',
  //   name: '值集',
  //   icon: 'user',
  //   route: '/valueCollection',
  // },
  ,{
     id:"99",
     bpid: '1',
     name:"Flows",
     icon:"star",
     route:"/flow"
  },
  {
    id: '98',
    mpid: '-1',
    bpid: '2',
    name: 'Flow Detail',
    route: '/flow/:id',
  },
  {
    id: '9',
    bpid: '1',
    name: '发票代码',
    icon: 'star',
    route: '/invoiceCode'},
  {
    id: '91',
    mpid: '-1',
    bpid: '9',
    name: 'create',
    route: '/invoiceCode/create',
  },
  {
    id: '92',
    mpid: '-1',
    bpid: '9',
    name: 'detail',
    route: '/invoiceCode/detail',
  },
  {
    id: '93',
    mpid: '-1',
    bpid: '9',
    name: 'update',
    route: '/invoiceCode/update',
  },
  {
    id: '94',
    bpid: '1',
    name: '打印池终端信息维护',
    icon: 'printer',
    route: '/printingTerminal',
  },
  {
    id: '942',
    bpid: '94',
    mpid:'-1',
    name: 'create',
    route: '/printingTerminal/create',
  },
  {
    id: '943',
    mpid: '-1',
    bpid: '94',
    name: 'Detail',
    route: '/printingTerminal/:id',
  },
  {
    id: '7',
    bpid: '1',
    name: '打印池信息维护',
    icon: 'printer',
    route: '/printingPool',
  },{
    id: '71',
    bpid: '7',
    mpid:'-1',
    name: 'create',
    route: '/printingPool/create',
  },
  {
    id: '72',
    mpid: '-1',
    bpid: '7',
    name: 'Detail',
    route: '/printingPool/:id',
  },
  {
    id: '14',
    bpid: '1',
    name: '开票服务器维护',
    icon: 'scan',
    route: '/ticketServer',
  },{
    id: '141',
    mpid:'-1',
    bpid: '14',
    name: 'create',
    route: '/ticketServer/create',
  },
  {
    id: '141',
    mpid:'-1',
    bpid: '14',
    name: 'update',
    route: '/ticketServer/update',
  },
  {
    id: '142',
    mpid: '-1',
    bpid: '14',
    name: 'detail',
    route: '/ticketServer/detail',
  },
  {
    id: '13',
    bpid: '1',
    name: '专票请领入库',
    icon: 'printer',
    route: '/stock',
  },
  {
    id: '131',
    mpid: '-1',
    bpid: '13',
    name: '登记库存信息新增',
    icon: 'printer',
    route: '/stock/create',
  },
  {
    id: '131',
    mpid: '-1',
    bpid: '13',
    name: '登记库存信息编辑',
    icon: 'printer',
    route: '/stock/update',
  },
  {
    id: '132',
    mpid: '-1',
    bpid: '13',
    name: '登记库存信息详情',
    icon: 'printer',
    route: '/stock/detail',
  },
  {
    id: '15',
    bpid: '1',
    name: '商品信息维护',
    icon: 'printer',
    route: '/commodity',
  },
  {
    id: '151',
    mpid: '-1',
    bpid: '15',
    name: '商品信息新增',
    icon: 'printer',
    route: '/commodity/create',
  },
  {
    id: '152',
    mpid: '-1',
    bpid: '15',
    name: '商品信息编辑',
    icon: 'printer',
    route: '/commodity/update',
  },
  {
    id: '153',
    mpid: '-1',
    bpid: '15',
    name: '商品信息详情',
    icon: 'printer',
    route: '/commodity/detail',
  },
  {
    id: '16',
    bpid: '1',
    name: '输出日志',
    icon: 'copy',
    route: '/scriptLog',
  }, 
  {
    id: '161',
    mpid: '-1',
    bpid: '16',
    name: 'detail',
    route: '/scriptLog/detail',
  },
  {
    id: '17',
    bpid: '1',
    name: '功能定义',
    icon: 'printer',
    route: '/action',
  },
  {
    id: '171',
    mpid: '-1',
    bpid: '17',
    name: '功能定义新增',
    icon: 'printer',
    route: '/action/create',
  },
  {
    id: '172',
    mpid: '-1',
    bpid: '17',
    name: '功能定义修改',
    icon: 'printer',
    route: '/action/update',
  },
  {
    id: '173',
    mpid: '-1',
    bpid: '17',
    name: '功能定义详情',
    icon: 'printer',
    route: '/action/detail',
  },

]

module.exports = {
  [`GET ${apiPrefix}/menus`] (req, res) {
    res.status(200).json(database)
  },
}