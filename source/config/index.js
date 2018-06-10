// @flow
export const GRAPHQL_ENDPOINT = '/'

/* Request rate limit */
export const RATE_LIMIT = {
  WINDOW: 15 * 60 * 1000,
  MAX_REQUESTS: 100,
  DELAY: 0,
}
