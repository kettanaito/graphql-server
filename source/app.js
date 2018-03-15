import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import schema from './schema';
import formatError from './formatError';

const GRAPHQL_ENDPOINT = '/';

const app = express();
app.use(helmet());

if (process.env.NODE_ENV === 'development') {
  app.use('/graphiql', graphiqlExpress({
    endpointURL: GRAPHQL_ENDPOINT
  }));
}

app.use(GRAPHQL_ENDPOINT, bodyParser.json(), graphqlExpress({
  schema,
  formatError
}));

export default app;
