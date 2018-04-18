// @flow
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'
import bodyParser from 'body-parser'
import RateLimit from 'express-rate-limit'
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express'
import { makeExecutableSchema } from 'graphql-tools'
import { GRAPHQL_ENDPOINT } from './config'
import schema from './schema'
import formatError from './formatError'

const app = express()
app.use(cors())
app.use(helmet())

if (process.env.NODE_ENV === 'production') {
  const reqLimit = new RateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    delayMs: 0
  })

  app.use(reqLimit)
  app.use(compression())
}

if (process.env.NODE_ENV === 'development') {
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
