# graphql-server
This repository is a good starting point for a real-world GraphQL server.

## Why?
There are multiple ways you can setup a server. How to know if the approach is efficient? Right, put it into production. The purpose of this repository is to provide a flexible production-proven architecture, which can serve as a stable basis for your GraphQL server.

## Features
### Development
* GraphiQL
* Live reloading of GraphQL schema using webpack HMR

### Production
* Security essentials by `helmet`
* Seamless inter-types queries
* Decoupled resolver-controller logic
* Architecture ready for custom types, scalars, enums

## Commands
### Launch webpack in development mode
```bash
npm start
```

### Run the server
```bash
npm run server
```
> The build must precede this command in order to have something to establish.


### Build
```bash
npm run build
```