import http from 'http'
import chalk from 'chalk'
import app from './app'

const server = http.createServer(app)
let currentApp = app

server.listen(8993, () => {
  console.log(
    chalk.cyan('\nServer connection established at http://localhost:8993\n'),
  )
})

if (module.hot) {
  module.hot.accept(['./app', './schema'], () => {
    server.removeListener('request', currentApp)
    server.on('request', app)
    currentApp = app
  })
}
