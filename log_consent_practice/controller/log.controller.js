// 프로젝트 내 파일
const logForm = require("../util/log-form");

function getLogConsent(req, res) {
  if (req.session.logConsent) {
    const date = new Date();
    const userIp = "USER: " + req.ip;
    console.log(logForm(date.toISOString(), userIp, "로그 수집 동의 후, 재 접속 시도"));

    return res.status(400).render("400");
  }

  res.render("log-consent");
}

function logConsent(req, res) {
  const agreement = req.body.logConsent;

  // 유효성 검사
  if (agreement !== "on") {
    const date = new Date();
    console.log(logForm(date.toISOString(), "SERVER", "로그 수집 동의 전, 유효성 우회 시도 발생"));

    return res.status(400).render("400");
  }

  req.session.logConsent = true;

  const date = new Date();
  const userIp = "USER: " + req.ip;
  console.log(logForm(date.toISOString(), userIp, "로그 수집 동의"));

  res.redirect("/");
}

module.exports = {
  getLogConsent: getLogConsent,
  logConsent: logConsent,
};
