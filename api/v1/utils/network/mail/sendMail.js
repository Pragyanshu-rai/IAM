const nodemailer = require("nodemailer");

const email_id = process.env.SYSTEM_EMAIL;
const IN_DEV = parseInt(process.env.IN_DEV);
const email_host = process.env.SYSTEM_EMAIL_HOST;
const email_port = process.env.SYSTEM_EMAIL_PORT;
const email_passkey = process.env.SYSTEM_EMAIL_PASSKEY;

const transporter = nodemailer.createTransport({
  host: email_host,
  port: email_port,
  secure: false,
  auth: {
    user: email_id,
    pass: email_passkey
  }
});

/**
 * This function can be used to send email to the recipient.
 * @param {*} to 
 * @param {*} subject 
 * @param {*} body 
 * @param {*} from 
 * @param {*} html 
 * @param {*} isHTML? 
 */
module.exports = async (to, subject, body, from, html, isHTML=false) => {
  let mailConfig = isHTML 
  ? {
    from: `"${from}" <${email_id}>`,
    to: to,
    subject: subject,
    text: body,
    html: html
  }
  : {
    from: `"${from}" <${email_id}>`,
    to: to,
    subject: subject,
    text: body
  };
  const info = await transporter.sendMail(mailConfig);

  if (IN_DEV) {
    console.info("Message Sent: %s", info);
  }
  return info;
};