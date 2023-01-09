import { getRequest, postRequest } from '../baseRequest'

// 获取模板分类
export const getFormTemplateTypeListRequest = params => getRequest('/form/template/type/list', params)

// 获取模板
export const getFormTemplatePageRequest = params => getRequest('/form/template/page', params)

// 删除模板
export const deleteFormTemplateRequest = data => postRequest('/form/template/delete', data)
