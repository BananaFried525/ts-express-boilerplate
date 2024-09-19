import appModulePath from 'app-module-path'
import { config } from 'dotenv'
import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import 'source-map-support/register'

config()
appModulePath.addPath(__dirname)
appModulePath.addPath(`${__dirname}/dist`)

import * as userController from 'controllers/user'
import { connectMQ, sendMessage } from 'queues/producer'

connectMQ()

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(helmet())
app.use(cors())
app.use(cookieParser())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/test', userController.getUser)

app.get('/send', (req, res) => {
  sendMessage({ topicName: "test.topic", key: "log.info", message: "test" })
  return res.json({ message: 'ok' })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
}) 