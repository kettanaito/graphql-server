import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as helmet from 'helmet';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import schema from './schema';
import formatError from './formatError';

const app = express();

app.use(helmet());

app.use('/', bodyParser.json(), graphqlExpress({
  schema,
  formatError
}));

if (process.env.NODE_ENV === 'development') {
  app.use('/graphiql', graphiqlExpress({
    endpointURL: '/'
  }));
}

app.listen(8993, function () {
  console.log('API server connection established at http://localhost:8993');
});
