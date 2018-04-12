import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'
import bodyParser from 'body-parser'
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express'
import { makeExecutableSchema } from 'graphql-tools'
import schema from './schema'
import formatError from './formatError'

const GRAPHQL_ENDPOINT = '/'

const app = express()
app.use(cors())
app.use(helmet())

if (process.env.NODE_ENV === 'production') {
  app.use(compression())
}

if (process.env.NODE_ENV === 'development') {
  app.use(
    '/graphiql',
    graphiqlExpress({
      endpointURL: GRAPHQL_ENDPOINT
    })
  )
}

app.use(
  GRAPHQL_ENDPOINT,
  bodyParser.json(),
  graphqlExpress(req => {
    return {
      schema: makeExecutableSchema(schema),
      context: schema.context,
      formatError
    }
  })
)

export default app
