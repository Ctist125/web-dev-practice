// 프로젝트 내 파일
const validation = require("../util/validation");
const Auth = require("../models/auth.model");

function getSignIn(req, res) {
  if (res.locals.auth) {
    return res.redirect("/success");
  } else {
    req.session.destroy();

    return res.render("sign-in");
  }
}

async function signIn(req, res) {
  const inputData = {
    id: req.body.userId,
    passwd: req.body.userPasswd,
  };

  const auth = new Auth(inputData.id, inputData.passwd);

  const dataValue = await auth.signin();

  if (dataValue) {
    req.session.userId = dataValue.id;
    req.session.admin = dataValue.admin;
    return res.redirect("/success");
  } else {
    return res.redirect("/");
  }
}

function getSignUp(req, res) {
  const signupErrorSession = {
    idError: req.session.idError,
    passwdError: req.session.passwdError,
    passwdCheckError: req.session.passwdCheckError,
  };

  const userId = req.session.inputId;

  res.render("sign-up", {
    signupErrorSession: signupErrorSession,
    userId: userId,
  });
}

async function signUp(req, res) {
  // 입력 값
  const userInput = {
    id: req.body.newId,
    passwd: req.body.newPasswd,
    passwdCheck: req.body.passwdCheck,
  };

  // 빈 값 검사
  if (
    validation.noDataCheck(userInput.id) &&
    validation.noDataCheck(userInput.passwd) &&
    validation.noDataCheck(userInput.passwdCheck)
  ) {
    // 조건 검사
    if (validation.idCheck(userInput.id)) {
      req.session.idError = false;
    } else {
      req.session.idError = true;
    }

    if (validation.passwdCheck(userInput.passwd)) {
      req.session.passwdError = false;
    } else {
      req.session.passwdError = true;
    }

    if (validation.passwdCheckCheck(userInput.passwd, userInput.passwdCheck)) {
      req.session.passwdCheckError = false;
    } else {
      req.session.passwdCheckError = true;
    }
  } else {
    return res.status(400).render("errors/400");
  }

  if (
    req.session.idError ||
    req.session.passwdError ||
    req.session.passwdCheckError
  ) {
    req.session.inputId = userInput.id;

    console.log(req.session.inputId);

    return res.redirect("/sign-up");
  } else {
    req.session.destroy();

    const auth = new Auth(userInput.id, userInput.passwd);
    await auth.signup();

    return res.redirect("/");
  }
}

function getSuccess(req, res) {
  if (res.locals.auth) {
    return res.render("success");
  } else {
    return res.status(401).render("errors/401");
  }
}

function getAdminPage(req, res) {
  if (res.locals.admin) {
    return res.render("admin");
  } else {
    return res.status(403).render("errors/403");
  }
}

module.exports = {
  getSignIn: getSignIn,
  signIn: signIn,
  getSignUp: getSignUp,
  signUp: signUp,
  getSuccess: getSuccess,
  getAdminPage: getAdminPage,
};
