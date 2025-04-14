// 프로젝트 내 파일 선언
const valid = require("../util/validation");
const Auth = require("../models/auth.model");

function getLogin(req, res) {
  let flashData = req.session.flashData;
  req.session.flashData = null;

  if (!flashData) {
    flashData = {
      inputValue: {
        userId: "",
      },
      errorMessage: "",
    };
  }

  res.render("./login", { ...flashData });
}

async function login(req, res) {
  const userInput = { ...req.body }; // userName, userPw

  // 유효성 검사
  if (!valid.noEmpty(userInput.userName) || !valid.noEmpty(userInput.userPw)) {
    return res.status(400).render("./errors/400", { pageLink: "/" });
  }

  const auth = new Auth(userInput.userName, userInput.userPw);
  const loginResult = await auth.login();

  if (!loginResult) {
    req.session.flashData = {
      inputValue: {
        userId: userInput.userName,
      },
      errorMessage: "ID 또는 PW가 다릅니다.",
    };
    req.session.save();

    return res.redirect("/");
  }

  return res.send(
    `<script>alert("${userInput.userName}님 환영합니다."); location.href="/";</script>`
  );
}

function getSingUp(req, res) {
  let flashData = req.session.flashData;
  req.session.flashData = null;

  if (!flashData) {
    flashData = {
      inputValue: {
        userId: "",
      },
      errorMessage: "",
    };
  }

  return res.render("./sign-up", { ...flashData });
}

async function signUp(req, res) {
  const userInput = { ...req.body }; // newId, newPw, pwCheck

  // 유효성 체크
  if (!valid.noEmpty(userInput.newId) || !valid.noEmpty(userInput.newPw)) {
    return res.status(400).render("./errors/400", { pageLink: "/sign-up" });
  } else if (userInput.newPw !== userInput.pwCheck) {
    req.session.flashData = {
      inputValue: {
        userId: userInput.newId,
      },
      errorMessage: '"Password"와 "Password 확인"의 값이 일치하지 않습니다.',
    };
    req.session.save();

    return res.status(400).redirect("/sign-up");
  }

  // 회원가입 정보 저장
  const auth = new Auth(userInput.newId, userInput.newPw);
  await auth.signUp();

  return res.send(
    '<script>alert("회원가입 성공!"); location.href="/";</script>'
  );
}

function getFindPw(req, res) {
  let flashData = req.session.flashData;
  req.session.flashData = null;

  if (!flashData) {
    flashData = {
      errorMessage: "",
    };
  }

  res.render("./find-pw", { ...flashData });
}

async function findPw(req, res) {
  const inputId = req.body.userId;

  // 유효성 검사
  if (!valid.noEmpty(inputId)) {
    return res.status(400).render("./errors/400", { pageLink: "/find-pw" });
  }

  const auth = new Auth(inputId);
  const userPw = await auth.findById();

  if (!userPw) {
    req.session.flashData = {
      errorMessage: "알맞은 정보가 없습니다.",
    };
    req.session.save();

    return res.redirect("/find-pw");
  }

  return res.send(`<script>alert("비밀번호: ${userPw}"); location.href = "/";</script>`)
}

// exports
module.exports = {
  getLogin: getLogin,
  login: login,
  getSingUp: getSingUp,
  signUp: signUp,
  getFindPw: getFindPw,
  findPw: findPw,
};
