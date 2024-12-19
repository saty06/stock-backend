import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import Alert from '../../models/alert/alert';
dotenv.config();

const sendEmail = async (userEmail: string, ticker: string, profitLoss: number, percentageChange: number, user_id:number) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, 
      pass: process.env.EMAIL_PASS, 
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER, // Sender address
    to: userEmail, // Recipient's email address
    subject: `Stock Alert: Profit/Loss Update for ${ticker}`, // Subject line
    text: `Hello,\n\nThe profit/loss for stock ${ticker} is ${profitLoss} USD (${percentageChange}%).\n\nBest regards,\nYour Stock Portfolio App`,
  };

  try {
    await transporter.sendMail(mailOptions);
    await Alert.create({
      alert_type:'portfolio',
      profitLoss:profitLoss,
      email_send:true,
      ticker:ticker,
      user_id:user_id,
      percentageChange:percentageChange

    })
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};
export default sendEmail;