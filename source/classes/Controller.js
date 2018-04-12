import axios from 'axios'
import DataLoader from 'dataloader'
import { normalize } from 'normalizr'
import urlUtils from 'url'

export default class Controller {
  defaultParams = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  static urlUtils = urlUtils

  constructor(options) {
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

  fetch(options) {
    return this.axios(options)
      .then(response => {
        return response.data
      })
      .catch(error => {
        throw new Error(error)
      })
  }

  request({
    method = 'GET',
    url: pathname,
    query,
    transformResponse,
    ...args
  }) {
    const url = urlUtils.format({ pathname, query })

    const reqParams = {
      method,
      url,
      transformResponse: [].concat(
        axios.defaults.transformResponse,
        transformResponse
      ),
      ...this.defaultParams,
      ...args
    }

    if (method === 'GET') {
      return this.loader.load(reqParams)
    }

    return this.fetch(reqParams)
  }

  normalize(response, schema) {
    return normalize(response, schema)
  }
}
