
export default [
    {
      path:'/VAT',
      models:()=>[import('models/invoiceDetailModels/VAT')],
      component:()=>import('routes/invoiceDetailTemplates/VAT')
    }
]