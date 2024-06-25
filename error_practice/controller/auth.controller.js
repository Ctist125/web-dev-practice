// 프로젝트 내부 파일
const validation = require("../util/validation");

function getLogin(req, res) {
  res.render("auth/login");
}

function getSignup(req, res) {
  let errorMessage = {
    idError: req.session.idError,
    passwdError: req.session.passwdError,
    passwdCheckError: req.session.passwdCheckError,
  };

  let inputData = {
    inputId: req.session.inputId,
    inputPasswd: req.session.inputPasswd,
    inputPasswdCheck: req.session.inputPasswdCheck,
    inputCheckBox: req.session.inputCheckBox,
  };

  res.render("auth/signup", {
    errorMessage: errorMessage,
    inputData: inputData,
  });
}

function signup(req, res) {
  const newData = {
    userId: req.body.newId,
    userPasswd: req.body.newPasswd,
    passwdCheck: req.body.passwdCheck,
  };

  if (validation.userIdValidation(newData.userId).result) {
    console.log("Good");
  } else {
    req.session.idError = validation.userIdValidation(newData.userId).errorText;
  }

  res.redirect("/auth/sign-up");
}

module.exports = {
  getLogin: getLogin,
  getSignup: getSignup,
  signup: signup,
};
