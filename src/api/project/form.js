import { postRequest, getRequest } from '../baseRequest'

// 创建表单
export const createFormRequest = data => postRequest('/user/form/create', data)

// 查询表单分页
export const pageFormRequest = params => getRequest('/user/form/page', params)

// 停止收集表单
export const stopFormRequest = data => postRequest('/user/form/stop', data)

// 删除表单
export const deleteFormRequest = data => postRequest('/user/form/delete', data)
