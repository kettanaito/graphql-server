// @flow
import type { AxiosInstance, AxiosRequestConfig } from 'axios'
import axios from 'axios'
import DataLoader from 'dataloader'
import { normalize } from 'normalizr'
import urlUtils from 'url'

const defaultReqConfig = {
  method: 'GET',
}

const defaultReqParams = {
  headers: {
    'Content-Type': 'application/json',
  },
}

export default class Controller {
  axios: AxiosInstance
  loader: DataLoader<any, any>

  static urlUtils = urlUtils

  constructor(options: AxiosRequestConfig) {
    this.axios = axios.create(options)

    /**
     * Create an instance of DataLoader to batch the controller-specific requests.
     * https://github.com/facebook/dataloader
     */
    this.loader = new DataLoader((reqOptionsList) => {
      return Promise.all(reqOptionsList.map(this.fetch.bind(this)))
    })

    return this
  }

  fetch(options: AxiosRequestConfig) {
    return this.axios(options)
      .then((response) => {
        return response.data
      })
      .catch((error) => {
        throw new Error(error)
      })
  }

  request(options: AxiosRequestConfig) {
    const endOptions = Object.assign({}, defaultReqConfig, options)

    const {
      method,
      url: pathname,
      query,
      transformResponse,
      ...restOptions
    } = endOptions

    const url = urlUtils.format({ pathname, query })
    const concatenatedTransformers = axios.defaults.transformResponse
      .concat(transformResponse)
      .filter(Boolean)

    const reqParams = {
      method,
      url,
      transformResponse: concatenatedTransformers,
      ...defaultReqParams,
      ...restOptions,
    }

    if (method === 'GET') {
      return this.loader.load(reqParams)
    }

    return this.fetch(reqParams)
  }

  normalize(data: any, schema: any) {
    return normalize(data, schema)
  }
}
