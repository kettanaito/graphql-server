// @flow
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'
import bodyParser from 'body-parser'
import RateLimit from 'express-rate-limit'
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express'
import { makeExecutableSchema } from 'graphql-tools'
import { GRAPHQL_ENDPOINT, RATE_LIMIT } from './config'
import schema from './schema'
import formatError from './formatError'

const app = express()

app.use(cors())
app.use(helmet())

if (__PROD__) {
  app.use(
    new RateLimit({
      windowMs: RATE_LIMIT.WINDOW,
      max: RATE_LIMIT.MAX_REQUESTS,
      delayMs: RATE_LIMIT.DELAY,
    }),
  )
  app.use(compression())
}

if (__DEV__) {
  app.use(
    '/graphiql',
    graphiqlExpress({
      endpointURL: GRAPHQL_ENDPOINT,
    }),
  )
}

app.use(
  GRAPHQL_ENDPOINT,
  bodyParser.json(),
  graphqlExpress(() => ({
    schema: makeExecutableSchema(schema),
    context: schema.context,
    formatError,
  })),
)

export default app
