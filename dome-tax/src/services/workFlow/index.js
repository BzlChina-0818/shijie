import {request,config} from 'utils'
const {workFLow}=config.processAPI


export function taskuser(params) {
  return request({
    url:  `${workFLow}/taskuser/query`,
    method: 'post',
    data: params
  })
}
 
export function submit(params) {
  return request({
    url:  `${workFLow}/submit`,
    method: 'post',
    data: params
  })
}


