// 프로젝트 내 파일
const Contents = require("../models/text.models");

async function getIndex(req, res) {
  // 저장된 자료 확인
  const contents = new Contents();
  let result = await contents.findAll();

  if (!result[0]) {
    result = "";
  }

  result = result[0];

  res.render("index", { result: result });
}

async function inputText(req, res) {
  // 입력받아온 값 저장을 위한 구문
  const text = req.body.inputText;

  // 저장된 자료 확인을 위한 구문
  const contents = new Contents(text);
  let result = await contents.findAll();

  if (!result[0]) {
    await contents.encryptionText();
  }

  await contents.reEncryptionText(result[0]._id);

  res.redirect("/");
}

function getFontLicense(req, res) {
  res.render("font-license");
}

module.exports = {
  getIndex: getIndex,
  inputText: inputText,
  getFontLicense: getFontLicense,
};
