import { connect } from 'amqplib'
import { Connection } from 'amqplib/callback_api'

let connection: Connection

export const connectMQ = async () => {
  try {
    console.log('Connecting to RabbitMQ...')
    const _connection = await connect('amqp://localhost:5672')
    connection = _connection
    console.log('Connected!')
  } catch (error) {
    console.log(error)
  }
}

const topicName = 'test.topic'
export const createProducer = (connection: Connection) => {
  return (message: string) => {
    connection.createChannel((err, channel) => {
      if (err) {
        throw err
      }

      channel.assertExchange(topicName, 'topic', { durable: true })
      channel.publish(topicName, 'test', Buffer.from(message))
    })
  }
}