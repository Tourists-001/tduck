import request from './index'

// post
export function postRequest(url, parameter) {
  return request({
    url,
    method: 'post',
    data: parameter
  })
}

// get

export function getRequest(url, params) {
  return request({
    url,
    method: 'get',
    params
  })
}
