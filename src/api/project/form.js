import { postRequest, getRequest } from '../baseRequest'

// 创建表单
export const createFormRequest = data => postRequest('/user/form/create', data)

// 查询表单分页
export const pageFormRequest = params => getRequest('/user/form/page', params)

// 停止收集表单
export const stopFormRequest = data => postRequest('/user/form/stop', data)

// 删除表单
export const deleteFormRequest = data => postRequest('/user/form/delete', data)

// 查询回收站表单
export const listRecycleFormRequest = data => getRequest('/user/form/recycle/page', data)

// 恢复表单
export const restoreRecycleFormRequest = data => postRequest('/user/form/recycle/restore', data)

// 彻底删除表单
export const deleteRecycleFormRequest = data => postRequest('/user/form/recycle/delete', data)
