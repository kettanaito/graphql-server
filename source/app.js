// @flow
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'
import RateLimit from 'express-rate-limit'
import { ApolloServer } from 'apollo-server-express'
import { makeExecutableSchema } from 'graphql-tools'
import { GRAPHQL_ENDPOINT, RATE_LIMIT } from './config'
import schema from './schema'
import formatError from './formatError'

const app = express()
app.use(cors(), helmet())

if (process.env.NODE_ENV === 'production') {
  app.use(
    new RateLimit({
      windowMs: RATE_LIMIT.WINDOW,
      max: RATE_LIMIT.MAX_REQUESTS,
      delayMs: RATE_LIMIT.DELAY,
    }),
  )
  app.use(compression())
}

const apolloServer = new ApolloServer({
  schema: makeExecutableSchema(schema),
  context: schema.context,
  formatError,
  playground: {
    settings: {
      'editor.theme': 'light',
      'editor.fontSize': 16,
    },
  },
})

apolloServer.applyMiddleware({
  app,
  path: GRAPHQL_ENDPOINT,
})

export default app
