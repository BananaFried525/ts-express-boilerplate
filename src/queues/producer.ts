import amqp, { Channel, Connection } from 'amqplib/callback_api'
import * as Types from 'type/queues/producer'

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
    process.exit(1)
  }
}

export const sendMessage = ({ topicName, key, message }: Types.SendMessageParams) => {
  connection.createChannel((err, channel) => {
    if (err) {
      console.log(err)
      throw err
    }

    channel.assertExchange(topicName, 'topic', {
      durable: true
    })
    channel.publish(topicName, key, Buffer.from(message), { persistent: true })
    console.log(`[x] Sent ${message}`)
  })
}
