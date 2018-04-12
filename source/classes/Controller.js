// @flow
import { AxiosInstance, AxiosRequestConfig } from 'axios'

import axios from 'axios'
import DataLoader from 'dataloader'
import { normalize } from 'normalizr'
import urlUtils from 'url'

type TRequestConfig = {
  method?: string,
  pathname: string
}

const defaultReqParams = {
  headers: {
    'Content-Type': 'application/json'
  }
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
    this.loader = new DataLoader(reqParamsCollection => {
      return Promise.all(reqParamsCollection.map(this.fetch.bind(this)))
    })

    return this
  }

  fetch(options: AxiosRequestConfig) {
    return this.axios(options)
      .then(response => {
        return response.data
      })
      .catch(error => {
        throw new Error(error)
      })
  }

  request(options: AxiosRequestConfig) {
    const {
      method,
      url: pathname,
      query,
      transformResponse,
      ...restOptions
    } = options

    const url = urlUtils.format({ pathname, query })

    const reqParams = {
      method,
      url,
      transformResponse: [].concat(
        axios.defaults.transformResponse,
        transformResponse
      ),
      ...defaultReqParams,
      ...restOptions
    }

    if (method === 'GET') {
      return this.loader.load(reqParams)
    }

    return this.fetch(reqParams)
  }

  normalize(response: any, schema: any) {
    return normalize(response, schema)
  }
}
