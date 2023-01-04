/* eslint-disable no-alert */
import CryptoJS from 'crypto-js'
import constants from './constants'
import _ from 'lodash'

export default class sign {
  /**
   * json参数升序
   * @param jsonObj 发送参数
   */

  static sortAsc(jsonObj) {
    const arr = []
    let num = 0
    for (const i in jsonObj) {
      arr[num] = i
      num++
    }
    const sortArr = arr.sort()
    const sortObj = {}
    for (const i in sortArr) {
      sortObj[sortArr[i]] = jsonObj[sortArr[i]]
    }
    return sortObj
  }

  /**
   * @param url 请求的url,应该包含请求参数(url的?后面的参数)
   * @param requestParams 请求参数(POST的JSON参数)
   * @returns {string} 获取签名
   */
  static getSign(url, request) {
    let requestParams = {}
    if (request.params) {
      // get 请求所有参数转成string类型 用于签名计算
      requestParams = JSON.parse(JSON.stringify(request.params, function(key, value) {
        if (key) {
          if (value === undefined || value === null) {
            return undefined
          }
          if (value instanceof Object) {
            return JSON.stringify(value)
          }
          return '' + value
        }
        return value
      }))
    }
    const dataParams = request.data ? request.data : {}
    const urlParams = this.parseQueryString(url)
    let jsonObj = _.merge(urlParams, requestParams)
    jsonObj = _.merge(jsonObj, dataParams)
    const requestBody = this.sortAsc(jsonObj)
    return CryptoJS.MD5(constants.signSecret + JSON.stringify(requestBody)).toString().toLowerCase()
  }

  /**
   * @param url 请求的url
   * @returns {{}} 将url中请求参数组装成json对象(url的?后面的参数)
   */
  static parseQueryString(url) {
    const urlReg = /^[^?]+\?([\w\W]+)$/
    const paramReg = /([^&=]+)=([\w\W]*?)(&|$|#)/g
    const urlArray = urlReg.exec(url)
    const result = {}
    if (urlArray && urlArray[1]) {
      const paramString = urlArray[1]; let paramResult
      while ((paramResult = paramReg.exec(paramString)) != null) {
        result[paramResult[1]] = '' + paramResult[2]
      }
    }
    return result
  }

  /**
   * @returns {*} 将两个对象合并成一个
   */
  static mergeObject(objectOne, objectTwo) {
    if (Object.keys(objectTwo).length > 0) {
      for (const key in objectTwo) {
        // eslint-disable-next-line no-prototype-builtins
        if (objectTwo.hasOwnProperty(key) === true) {
          objectOne[key] = '' + objectTwo[key]
        }
      }
    }
    return objectOne
  }

  static urlEncode(param, key, encode) {
    if (param == null) return ''
    let paramStr = ''
    const t = typeof (param)
    if (t === 'string' || t === 'number' || t === 'boolean') {
      paramStr += '&' + key + '=' + ((encode == null || encode) ? encodeURIComponent(param) : param)
    } else {
      for (const i in param) {
        const k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i)
        paramStr += this.urlEncode(param[i], k, encode)
      }
    }
    return paramStr
  }
}
