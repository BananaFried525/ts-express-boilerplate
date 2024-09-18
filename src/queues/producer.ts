import amqp, { Connection } from 'amqplib/callback_api'

let connection: Connection

export const connectMQ = async () => {
  try {
    console.log('Connecting to RabbitMQ...')
    amqp.connect('amqp://localhost:5672', (err, conn) => {
      if (err) {
        console.log(err)
        throw err
      }
      connection = conn
      console.log('Connected!')
    })
  } catch (error) {
    console.log(error)
  }
}

const TOPIC_NAME = 'test.topic'
export const sendMessage = (message: string) => {
  try {
    console.log('Creating channel...')
    connection.createChannel((err, channel) => {
      console.log('Channel created!')
      if (err) {
        console.log(err)
        throw err
      }
  
      channel.assertExchange(TOPIC_NAME, 'topic', { durable: true })
      channel.publish(TOPIC_NAME, 'test', Buffer.from(message))
      console.log(`[x] Sent ${message}`)
    })
  } catch (error) {
    console.log(error)
  } finally {
    // connection.close()
  }
}