const nodeMailer = require('nodemailer')

const adminEmail = "minhkhang.datn.forgotpass@gmail.com"
const password = "Minhkhang131016"

const mailHost = 'smtp.gmail.com'
const mailPort = 587

const sendMail = (to, subject, htmlContent) => {
    const transporter = nodeMailer.createTransport({
      host: mailHost,
      port: mailPort,
      secure: false,
      auth: {
        user: adminEmail,
        pass: password
      }
    })
    const options = {
      from: adminEmail,
      to: to, 
      subject:subject,
      html: htmlContent
    }

    return transporter.sendMail(options)
  }

  module.exports = {sendMail:sendMail}