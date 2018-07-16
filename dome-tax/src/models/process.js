import modelExtend from 'dva-model-extend'
import { query } from 'services/process'
import { pageModel } from 'models/common'
import queryString from 'query-string'

export default modelExtend(pageModel, {
    namespace:'process',
    subscriptions:{
        setup({dispatch,history}){
            history.listen((location)=>{
                if(location.pathname==='/process'){
                    let page={number: 1, size: 10}
                    const newPage=queryString.parse(location.search)
                    if(newPage.page){
                        page.number=Number(newPage.page)
                        page.size=Number(newPage.pageSize)
                    }
                    console.log(page)
                    dispatch({
                        type:'query',
                        payload:{
                            //condition:{},
                            page:page

                        }
                    })
                }
            })
        }
    },
    effects:{
        *query({payload={}},{call,put}){
            const data = yield call(query, payload)
            if(data.success){
                console.log(payload)
                yield put({
                    type:'querySuccess',
                    payload:{
                        list: data.page.content,
                        pagination: {
                        current: Number(payload.page.number) || 1,
                        pageSize: Number(payload.page.size) || 10,
                        total: data.page.totalElements,
                        },
                    }
                })
            }else{
                throw data
            }
        }
    }
})