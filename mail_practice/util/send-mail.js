// 외부 라이브러리 선언
const nodemailer = require("nodemailer");

function sendMail(title, contents) {
  const account = {
    service: process.env.NODEMAILER_EMAIL_SERVICE,
    user: process.env.NODEMAILER_USER,
    pw: process.env.NODEMAILER_PW,
  };

  // 메일 서비스 생성
  const transporter = nodemailer.createTransport({
    service: account.service,
    auth: {
      user: account.user,
      pass: account.pw,
    },
  });

  // 메일 내용
  const mailContents = {
    from: account.user,
    to: "tief125@naver.com",
    subject: title,
    text: contents,
  };

  // 메일 전송
  transporter.sendMail(mailContents, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log("Send email: ", info);
    }
  });
}

module.exports = sendMail;
