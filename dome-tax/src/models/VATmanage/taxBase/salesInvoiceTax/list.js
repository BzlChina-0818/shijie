import modelExtend from 'dva-model-extend'
import queryString from 'query-string'
import {config, unix2Locale} from 'utils'
import {pageModel} from '../../../common'
import {query, update, exportInvoiceLine, exportProductInf} from 'services/VATmanage/taxBase/salesInvoiceTax'
import { queryTaxpayerBody,querySalesUnit,getDict } from 'services/baseAPI'

import {PATH} from "utils"
import downloadjs from "downloadjs";

const path = PATH.VAT_TAXBASE
/**
 * @description（增值税管理>增值税税基管理>销项发票税基）
 * @author linxiaonan
 * @backEnd chenhao

 */
export default modelExtend(pageModel, {

  namespace: 'salesInvoiceTax',

  state: {
    modalVisible:"",
    currentCoaTypeInput:"",

    header: [],
  },
  subscriptions: {
    setup({dispatch, history}) {
      history.listen((location) => {
        if (location.pathname === path + '/salesInvoiceTax') {
          const {taxPayer,...other} = queryString.parse(location.search)
          console.log(other);

          let payload = {
            period: "",
            oinvoiceCode: "",
            oinvoiceNum: "",
            purchaseTaxPayer: "",
            salesTaxPayerNo: "",
            claimStatus: "",
            ispayment: "",
            "sort": {
              "direction": "ASC",
              "property": ""
            },
            ...other,
          }
          dispatch({
            type: 'query',
            payload,
          }).then(data => {
            dispatch({
              type: 'updateState',
              payload: {
                header: data.header
              }
            })
          })
        }
      })
    },
  },

  effects: {
    * query({payload = {}}, {call, put}) {
      const respData = yield call(query, payload)
      if (respData.success) {
        let data = respData.data
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.content,
            pagination: data.pagination,
          },
        })
        return respData.data
      } else {
        throw respData
      }
    },
    * exportInvoiceLine({payload}, {call, put}) {
      console.log(payload);
      const data = yield call(exportInvoiceLine, {...payload})
      const fileName = `发票行.xlsx`
      downloadjs(data, fileName, "application/octet-stream");
    },
    * exportProductInf({payload}, {call, put}) {

      const data = yield call(exportProductInf, {...payload})
      const fileName = `商品信息.xlsx`
      downloadjs(data, fileName, "application/octet-stream");
    },
  },
  reducers: {},

})
