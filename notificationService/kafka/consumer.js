require('dotenv').config();
const { Kafka } = require('kafkajs');
const sendMail = require('../utils/mailer');

const kafka = new Kafka({ 
   clientId: 'notif-service',
   brokers: [process.env.KAFKA_BROKER] 
  });
const consumer = kafka.consumer({ groupId: 'notification-group' });

const runconsumer = async () => {
  await consumer.connect();
  
  await consumer.subscribe({ topic: 'passport.created', fromBeginning: false });
  await consumer.subscribe({ topic: 'passport.updated', fromBeginning: false });
  await consumer.subscribe({ topic: 'passport.deleted', fromBeginning: false });
  console.log('Subscribed to topics');


  await consumer.run({
    eachMessage: async ({ topic, message }) => {
      const event = JSON.parse(message.value.toString());
      console.log(`Received event ${topic} for passport ID ${event._id}`);

      // Custom email logic per event
      let subject = `Passport ${topic.split('.')[1]}`;
      let text = `Battery passport ${event._id} has been ${topic.split('.')[1]}.`;

      await sendMail(
        process.env.NOTIFY_TO_EMAIL, // e.g. admin or user
        subject,
        `${text}\n\nDetails:\n${JSON.stringify(event, null, 2)}`
      );
    },
  });
};


module.exports = runconsumer;
