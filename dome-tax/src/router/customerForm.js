import { PATH } from "utils"

const path = PATH.CUSTOMER_FORM
export default [
  {
    path:path+'/dataSource',
    models:()=>[import('../models/customerForm/dataSource/list')],
    component:()=>import('../routes/customerForm/dataSource/')
  },
  {
    path:path+'/dataSource/create',
    models:()=>[import('../models/customerForm/dataSource/create')],
    component:()=>import('../routes/customerForm/dataSource/create')
  },
  {
    path:path+'/dataSource/update',
    models:()=>[import('../models/customerForm/dataSource/create')],
    component:()=>import('../routes/customerForm/dataSource/create')
  },
  {
    path:path+'/dataSource/detail',
    models:()=>[import('../models/customerForm/dataSource/create')],
    component:()=>import('../routes/customerForm/dataSource/create')
  },
  {

    path:path+'/parameter',
    models:()=>[import('../models/customerForm/parameter/list')],
    component:()=>import('../routes/customerForm/parameter/')
  },
  {
    path:path+'/parameter/create',
    models:()=>[import('../models/customerForm/parameter/create')],
    component:()=>import('../routes/customerForm/parameter/create')
  },
  {
    path:path+'/parameter/update',
    models:()=>[import('../models/customerForm/parameter/create')],
    component:()=>import('../routes/customerForm/parameter/create')
  },
  {
    path:path+'/parameter/detail',
    models:()=>[import('../models/customerForm/parameter/create')],
    component:()=>import('../routes/customerForm/parameter/create')
  },

  {
    path:path+'/action',
    models:()=>[import('../models/customerForm/action/list')],
    component:()=>import('../routes/customerForm/action/')
  },
  {
    path:path+'/action/create',
    models:()=>[import('../models/customerForm/action/create')],
    component:()=>import('../routes/customerForm/action/create')
  },
  {
    path:path+'/action/update',
    models:()=>[import('../models/customerForm/action/create')],
    component:()=>import('../routes/customerForm/action/create')
  },
  {
    path: path + '/action/detail',
    models: () => [import('../models/customerForm/action/create')],
    component: () => import('../routes/customerForm/action/create')
  },
  {
    path:path+'/outputFormat',
    models:()=>[import('../models/customerForm/outputFormat/list')],
    component:()=>import('../routes/customerForm/outputFormat/')
  },
  {
    path:path+'/outputFormat/create',
    models:()=>[import('../models/customerForm/outputFormat/create')],
    component:()=>import('../routes/customerForm/outputFormat/create')
  },
  {
    path:path+'/outputFormat/update',
    models:()=>[import('../models/customerForm/outputFormat/create')],
    component:()=>import('../routes/customerForm/outputFormat/create')
  },
  {
    path:path+'/outputFormat/detail',
    models:()=>[import('../models/customerForm/outputFormat/create')],
    component:()=>import('../routes/customerForm/outputFormat/create')

  },
  {
    path:path + '/outJournal',
    models:()=>[import('../models/customerForm/journal/table')],
    component:()=>import('../routes/customerForm/journal/'),
  },
  {
    path:path +'/journalLog/:id',
    models:()=>[import('../models/customerForm/journal/details')],
    component:()=>import('../routes/customerForm/journal/detail'),
  },
]
