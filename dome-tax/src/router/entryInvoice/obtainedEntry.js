
export default [
  {
    path:'/entryInvoice/obtainedEntry',
    models:()=>[import('../../models/entryInvoice/obtainedEntry/list')],

    component:()=>import('../../routes/entryInvoice/obtainedEntry')
  },
  {
    path:'/entryInvoice/obtainedEntry/detail',
    models:()=>[import('../../models/entryInvoice/obtainedEntry/detail')],
    component:()=>import('../../routes/entryInvoice/obtainedEntry/detail')
  },

]

