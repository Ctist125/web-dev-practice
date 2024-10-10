// 프로젝트 내 파일
const logForm = require("../util/log-form");

function errorHandler(error, req, res, next) {
  const date = new Date();
  const url = req.originalUrl;
  console.log(
    logForm(date.toISOString(), "SERVER", "서버에 문제가 발생했습니다.: " + url)
  );
  console.log(error);

  if (error.code === 404) {
    return res.status(404).render("404");
  }

  return res.status(500).render("500");
}

module.exports = errorHandler;
