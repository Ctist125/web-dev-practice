// 프로젝트 내부 파일
const Auth = require("../models/auth.model");

function getLogin(req, res) {
  if (req.cookies.auth.id) {
    return res.render("success", { userId: req.cookies.auth.id });
  }

  res.render("login");
}

async function login(req, res) {
  const inputUserData = {
    id: req.body.userId,
    passwd: req.body.userPasswd,
  };

  const user = new Auth(inputUserData.id);
  const userData = await user.loginFindId();

  if (
    inputUserData.id === userData.id &&
    inputUserData.passwd === userData.passwd
  ) {
    res.cookie("auth", { id: userData.id, passwd: userData.passwd });
    return res.render("success", { userId: inputUserData.id });
  } else {
    console.log("로그인 실패");
    return res.redirect("/");
  }
}

function getSignup(req, res) {
  res.render("signup");
}

async function signup(req, res) {
  const userInput = {
    id: req.body.newId,
    passwd: req.body.newPasswd,
    passwdCheck: req.body.passwdCheck,
  };

  if (userInput.passwd === userInput.passwdCheck) {
    const user = new Auth(userInput.id, userInput.passwd);

    await user.signup();
  } else {
    console.log("가입 실패");
  }

  res.redirect("/");
}

module.exports = {
  getLogin: getLogin,
  login: login,
  getSignup: getSignup,
  signup: signup,
};
