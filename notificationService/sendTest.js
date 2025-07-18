require('dotenv').config();
const { Kafka } = require('kafkajs');

(async () => {
  const kafka = new Kafka({ clientId: 'test-producer', brokers: [process.env.KAFKA_BROKER] });
  const producer = kafka.producer();
  await producer.connect();

  await producer.send({
    topic: 'passport.created',
    messages: [{ value: JSON.stringify({ _id: 'TEST123', batteryModel: 'XYZ' }) }]
  });

  console.log(' Test event sent');
  await producer.disconnect();
})();
