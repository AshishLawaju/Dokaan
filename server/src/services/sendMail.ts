import nodemailer from "nodemailer";
import envConfig from "../config/config";

interface IData {
  to: string;
  subject: string;
  text: string;
}

const sendMail = async (data: IData) => {
  if (!data.to || !data.subject || !data.text) {
    throw new Error("Missing email data");
  }

  const transporter = nodemailer.createTransport({
    host: envConfig.host,
    port: 587,
    secure: false,
    auth: {
      user: envConfig.user,
      pass: envConfig.pass,
    },
  });

  const mailOptions = {
    from: `Dookan <${envConfig.user}>`,
    to: data.to,
    subject: data.subject,
    text: data.text,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
  }

 


};

export default sendMail;
