import * as nodemailer from 'nodemailer';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const dotenv = require('dotenv');

dotenv.config();

const transporter: nodemailer.Transporter = nodemailer.createTransport({
  service: 'Gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'jonathan3060@gmail.com',
    pass: process.env.GMAIL_PASSWORD,
  },
});

export const sendEmail = async (mailOptions, cb) => {
  try {
    const details = await transporter.sendMail(mailOptions);
    cb(details);
  } catch (err) {
    console.log(err);
  }
};
