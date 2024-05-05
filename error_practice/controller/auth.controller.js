// 프로젝트 내부 파일
const validation = require("../util/validation");

function getLogin(req, res) {
  res.render("login");
}

function getJoin(req, res) {
  res.render("join");
}

function join(req, res) {
  // 입력값 불러오기
  const newUserDate = {
    id: req.body.joinId.trim(),
    passwd: req.body.joinPasswd.trim(),
    passwdCheck: req.body.passwdCheck.trim(),
  };

  if (
    !validation.whiteSpaceValidation(newUserDate.id) ||
    !validation.whiteSpaceValidation(newUserDate.passwd) ||
    !validation.whiteSpaceValidation(newUserDate.passwdCheck)
  ) {
    return res.status(400).render("errors/400");
  }

  if (!validation.joinPasswdCheckValidation(newUserDate.passwd, newUserDate.passwdCheck)) {
    return res.status(400).render("errors/400");
  }

  console.log(newUserDate.id, newUserDate.passwd, newUserDate.passwdCheck);

  res.redirect("/login");
}

module.exports = { getLogin: getLogin, getJoin: getJoin, join: join };
