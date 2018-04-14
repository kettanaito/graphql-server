# graphql-server

This repository is designed to be a good starting point for a modern GraphQL Node server.

Apart from using industry-leading tools, it contributes to clean and maintainable architecture, which ensures best practices on writing and organizing server code. It also has the most essential configurations to grant great performance and uncompromised security to a server.

## Features

### Development

* GraphiQL
* Live reloading of GraphQL schema using webpack HMR
* [Jest](https://facebook.github.io/jest/) as a testing framework

### Production

* Security essentials from [Helmet](https://github.com/helmetjs/helmet)
* Seamless interdependent queries
* Architecture ready for custom types, scalars, enums
* Data-fetching logic decoupled from resolvers

## Commands

| Command name     | Description                          |
| ---------------- | ------------------------------------ |
| `npm start`      | Launches development server.         |
| `npm test`       | Executes tests.                      |
| `npm run build`  | Performs production build.           |
| `npm run server` | Serves the current production build. |
