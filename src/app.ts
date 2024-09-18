import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import { config } from 'dotenv'
import cookieParser from 'cookie-parser'
import * as userController from './controllers/user'
import {connectMQ, sendMessage} from './queues/producer'

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

app.get('/test',userController.getUser)

app.get('/send', (req,res) => {
  sendMessage('test')
  return res.json({message: 'ok'})
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
}) 