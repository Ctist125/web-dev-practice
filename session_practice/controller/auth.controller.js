// 프로젝트 내부 파일
const Auth = require("../models/auth.model");

function getLogin(req, res) {
  if (res.locals.isAuth) {
    return res.render("Success");
  } else {
    res.render("login");
  }
}

async function login(req, res) {
  const userInfo = {
    id: req.body.userId,
    passwd: req.body.userPasswd,
  };

  const auth = new Auth(userInfo.id, userInfo.passwd);
  const foundUser = await auth.login();

  if (userInfo.passwd === foundUser.passwd) {
    req.session.userId = foundUser._id;
    return res.render("success");
  } else {
    console.log("login 실패");
    return res.redirect("/");
  }
}

function getSignup(req, res) {
  res.render("signup");
}

async function signup(req, res) {
  const userInfo = {
    id: req.body.newId,
    passwd: req.body.newPasswd,
    passwdCheck: req.body.passwdCheck,
  };

  if (userInfo.passwd === userInfo.passwdCheck) {
    const auth = new Auth(userInfo.id, userInfo.passwd);
    await auth.signup();

    return res.redirect("/login");
  } else {
    return res.render("errors/400");
  }
}

function logout(req, res) {
  req.session.destroy();
  res.redirect("/");
}

module.exports = {
  getLogin: getLogin,
  login: login,
  getSignup: getSignup,
  signup: signup,
  logout: logout,
};
