// util
const validation = require("../util/validation");

function getLogin(req, res) {
  res.render("login");
}

function getJoin(req, res) {
  res.render("join");
}

function join(req, res) {
  const userData = {
    id: req.body.joinId,
    passwd: req.body.joinPasswd,
    passwdCheck: req.body.joinPasswdCheck,
    agree: req.body.agree,
  };

  for (const dataList in userData) {
    const whiteSpaceValidationResult = validation.whiteSpaceValidation(userData[dataList]);

    if (!whiteSpaceValidationResult) {
      return res.status(400).render("errors/400");
    }
  }

  const joinValidationResult = validation.joinValidation(userData);

  if (!joinValidationResult) {
    return res.status(400).render("errors/400");
  }

  res.redirect("/");
}

module.exports = {
  getLogin: getLogin,
  getJoin: getJoin,
  join: join,
};
