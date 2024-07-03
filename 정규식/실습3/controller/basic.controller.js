// 프로젝트 내 파일
const validation = require("../util/valid");
const Processing = require("../models/processing.model");

function getIndex(req, res) {
  res.render("index");
}

async function application(req, res) {
  // 공백 유효성 검사
  if (!validation.noWhiteSpace(req.body.inputText)) {
    console.log("값이 입력되지 않았습니다.");
    return res.redirect("/");
  }

  // 전화번호 유효성 검사
  const phoneNumber = validation.phoneNumberValidation(req.body.inputText);

  if (!phoneNumber) {
    console.log("값이 입력되지 않았습니다.");
    return res.redirect("/");
  }

  // 이메일 유효성 검사
  const email = validation.emailValidation(req.body.inputText);

  if (!email) {
    console.log("값이 입력되지 않았습니다.");
    return res.redirect("/");
  }

  // db에 저장
  const info = {
    phone: phoneNumber,
    email: email,
  };

  const processing = new Processing(info);

  const saveInfo = await processing.insertInfo();

  return res.redirect("/processing");
}

async function getProcessing(req, res) {
  // list 불러오기
  const processing = new Processing();

  const lists = await processing.allList();

  res.render("processing", { lists: lists });
}

function getFontLicense(req, res) {
  res.render("license");
}

module.exports = {
  getIndex: getIndex,
  application: application,
  getProcessing: getProcessing,
  getFontLicense: getFontLicense,
};
