import http from 'http'
import app from './app'

const server = http.createServer(app)
let currentApp = app

server.listen(8993, function() {
  console.log('API server connection established at http://localhost:8993')
})

if (module.hot) {
  module.hot.accept(['./app', './schema'], () => {
    server.removeListener('request', currentApp)
    server.on('request', app)
    currentApp = app
  })
}
