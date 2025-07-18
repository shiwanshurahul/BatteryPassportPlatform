require('dotenv').config(); 
const { Kafka } = require('kafkajs');

//1.producer, 2.consumer, 3.service
const kafka = new Kafka({
  clientId: 'passport-service',
  brokers: [process.env.KAFKA_BROKER], 
  connectionTimeout: 5000,
  retry: { retries: 5, initialRetryTime: 300 }
});

const producer = kafka.producer();  //created producer

const sendKafkaEvent = async (topic, data) => {
  await producer.connect();
  await producer.send({
    topic,
    messages: [{ value: JSON.stringify(data) }]
  });
  await producer.disconnect();
};

module.exports = { sendKafkaEvent };
