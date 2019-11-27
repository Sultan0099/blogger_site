const nodemailer = require("nodemailer");
const mailgunTransport = require("nodemailer-mailgun-transport");

const { mailgunOptions } = require("../config/keys");
// Configure transport options
const transport = mailgunTransport(mailgunOptions);
// EmailService
class EmailService {
  constructor() {
    this.emailClient = nodemailer.createTransport(transport);
  }
  sendText(to, subject, text, html) {
    return new Promise((resolve, reject) => {
      this.emailClient.sendMail(
        {
          from: "Blogger App <info@bloggersite.com>",
          to,
          subject,
          text,
          html
        },
        (err, info) => {
          if (err) {
            reject(err);
          } else {
            resolve(info);
          }
        }
      );
    });
  }
}
module.exports = new EmailService();
