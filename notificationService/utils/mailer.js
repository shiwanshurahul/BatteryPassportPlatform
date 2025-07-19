require('dotenv').config();
const nodemailer = require('nodemailer');  //real-time email users

// Configure a gmail transporter 
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user: process.env.EMAIL_USER,
        pass: process.env.APP_PASSWORD,  //16 digit password, generated on gmail
    },
});

// Verifying conection established
transporter.verify((err, success) => {
  if (err) 
    console.error(' Connection Error:', err);
  else 
    console.log('Ready to Send Messages');
});

const sendMail = async (to, subject, text) => {
  const info = await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject,
    text
  });
  console.log('📧 Email sent: %s', info.messageId);
};

module.exports = sendMail;
