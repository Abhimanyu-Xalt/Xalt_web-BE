const nodemailer = require('nodemailer');
const mailGun = require('nodemailer-mailgun-transport');

const auth = {
    auth: {
        api_key: 'your-mailgun-api-key',
        domain: 'your-mailgun-domain'
    }
};

const transporter = nodemailer.createTransport(mailGun(auth));

const sendMail = (name, email, subject, text, cb) => {
    const mailOptions = {
        from: 'your-email@example.com',
        to: email,
        subject: subject,
        text: text
    };
    transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
            cb(err, null);
        } else {
            cb(null, data);
        }
    });
};

module.exports = sendMail;