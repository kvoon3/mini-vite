import { createServer } from 'node:http'
import connect from 'connect'
import { WebSocketServer } from 'ws'
import { indexHtmlMiddleware } from './middlewares/indexHtml'

const PORT = 5177
const WS_PORT = 5178

const app = connect()

app.use(indexHtmlMiddleware)

const httpServer = createServer(app)

httpServer.on('connect', () => {
  console.log('connected')
})

httpServer.on('listening', () => {
  console.log(`[vite] server start at http://localhost:${PORT}`)
})

httpServer.listen(PORT, 'localhost')

const wss = new WebSocketServer({ port: WS_PORT })
wss.on('connection', () => {
  console.log('connection')
})
