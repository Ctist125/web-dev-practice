// 프로젝트 내 파일
const sendMailUtil = require("../util/send-mail");

function getIndex(req, res) {
  res.render("index");
}

function sendMail(req, res) {
  const mailContents = {
    title: req.body.title,
    contents: req.body.contents,
  };

  try {
    sendMailUtil(mailContents.title, mailContents.contents);
    res.render("success");
  } catch {
    res.render("failure");
  }
}

function getFontLicense(req, res) {
  res.render("font-license");
}

module.exports = {
  getIndex: getIndex,
  sendMail: sendMail,
  getFontLicense: getFontLicense,
};
