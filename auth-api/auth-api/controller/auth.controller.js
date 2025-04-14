// 프로젝트 내 파일 선언
const valid = require("../util/validation");
const Auth = require("../models/auth.model");

async function login(req, res) {
  const userInput = { ...req.body }; // userId, userPw

  // 유효성 검사
  if (!valid.noEmpty(userInput.userId) || !valid.noEmpty(userInput.userPw)) {
    return res.status(400).json();
  }

  // 사용자 확인
  const auth = new Auth(userInput.userId, userInput.userPw);
  const loginResult = await auth.login();

  if (loginResult) {
    return res.json({ loginResult: true, userId: loginResult });
  } else {
    return res.json({
      loginResult: false,
      errorMessage: '"ID" 또는 "PW"가 같지 않습니다.',
    });
  }
}

async function signUp(req, res) {
  const userInput = { ...req.body }; // newId, newPw, pwCheck

  // 유효성 검사
  if (!valid.noEmpty(userInput.newId) || !valid.noEmpty(userInput.newPw)) {
    return res.status(400).json();
  } else if (userInput.newPw !== userInput.pwCheck) {
    return res.json({
      errorMessage: '"Password"와 "Password 확인"의 값이 다릅니다.',
    });
  }

  // user 정보 저장
  const auth = new Auth(userInput.newId, userInput.newPw);
  await auth.signUp();

  return res.json({ message: "회원가입 성공" });
}

async function findPw(req, res) {
  const userInput = req.body.inputId;

  // 유효성 검사
  if (!valid.noEmpty(userInput)) {
    return res.status(400).json();
  }

  // PW 찾기
  const auth = new Auth(userInput);
  const userInfo = await auth.findPw();

  if (userInfo) {
    return res.json({ status: true, userPw: userInfo.userPw });
  } else {
    return res.json({ status: false, errorMessage: "알맞은 정보가 없습니다." });
  }
}

// exports
module.exports = {
  login: login,
  signUp: signUp,
  findPw: findPw,
};
