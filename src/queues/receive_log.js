#!/usr/bin/env node

var amqp = require('amqplib/callback_api');

// var args = process.argv.slice(2);

// if (args.length == 0) {
//   console.log("Usage: receive_logs_topic.js <facility>.<severity>");
//   process.exit(1);
// }

amqp.connect('amqp://localhost:5672', function (error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function (error1, channel) {
    if (error1) {
      throw error1;
    }
    var exchange = 'test.topic';

    channel.assertExchange(exchange, 'topic', {
      durable: true

    });

    channel.assertQueue('test.topic', {
      exclusive: false,
      durable: true,
    }, function (error2, q) {
      if (error2) {
        throw error2;
      }
      console.log(' [*] Waiting for logs. To exit press CTRL+C');

      channel.bindQueue(q.queue, exchange, 'log.*');

      channel.consume(q.queue, function (msg) {
        console.log(" [x] %s:'%s'", msg.fields.routingKey, msg.content.toString());
        channel.ack(msg)
      }, {
        noAck: false,
      });
    });
  });
});