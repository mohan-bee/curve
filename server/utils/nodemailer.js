const nodemailer = require("nodemailer")

function sendOTP(to, OTP){

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "mohn08052006@gmail.com",
    pass: process.env.GOOGLE_APP_PASSWORD,
  },
});

(async () => {
    const info = await transporter.sendMail({
        from: "mohn08052006@gmail.com",
        to: to.toString(),
        subject: `OTP: ${OTP ? OTP : 0}`,
        text: `This is your OTP from Curve:: ${OTP ? OTP : 0}`
    })
})()
}


module.exports = sendOTP