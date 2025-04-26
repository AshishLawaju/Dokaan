import nodemailer from "nodemailer";
import envConfig from "../config/config";

interface IData {
  to: string;
  subject: string;
  text: string;
}

const sendMail = async (data: IData) => {
  const transporter = nodemailer.createTransport({
    host: envConfig.host,
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
      user: envConfig.user,
      pass: envConfig.pass,
    },
  });

  const mailOption = {
    from: "Dookan <ashishlawaju143@gmail.com>",
    to: data.to,
    subject: data.subject,
    text: data.text,
  };

  try {
    await transporter.sendMail(mailOption);
  } catch (error) {
    console.log(error);
  }
};

export default sendMail;
