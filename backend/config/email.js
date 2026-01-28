const nodemailer = require("nodemailer");

// create a transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GOOGLE_MAIL,
    pass: process.env.GOOGLE_APP_PASSWORD,
  },
});

const sendMessageViaMail = async (email, subject_text, message) => {
  const mailOptions = {
    from: process.env.GOOGLE_MAIL,
    to: email,
    subject: subject_text,
    text: message,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(info.messageId);
  } catch (error) {
    console.log(error);
  }
};

module.exports = sendMessageViaMail;
