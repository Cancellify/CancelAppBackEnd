const nodemailer: any = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.USER,
      pass: process.env.PASSWORD,
    },
  });

  const mailOptions = {
    // send mail with defined transport object
      from: {name: "Cancellify",
      address: process.env.USER,
    }, // sender address
      to : ["hi"] , // list of receivers
      subject: "Event Invitation", // Subject line
      text: ``, // plain text body
      html: "<b>Do you want to come?</b>", // html body
  }
  


  const sendMail = async (transporter: any, mailOptions: any) => {
    try{
        await transporter.sendMail(mailOptions)
        console.log("Email sent")
    } catch(error){
        console.log(error);
    }
  }

  export { sendMail, transporter, mailOptions }