import { Channel } from 'amqplib/callback_api'

export type SendMessageParams = {
  topicName: string
  key: string
  message: string
}