// 프로젝트 내부 파일 불러오기
const validation = require("../util/validation");

function getMain(req, res) {
  // 기준 날짜 값
  const standardDate = new Date();

  // 날짜 값 나누기
  const standardYear = standardDate.getFullYear();
  const standardMonth = ("0" + (standardDate.getMonth() + 1)).slice(-2);
  const standardDay = ("0" + standardDate.getDate()).slice(-2);

  // 최소 값
  const minYear = standardYear - 150;

  res.render("index", {
    standardYear: standardYear,
    standardMonth: standardMonth,
    standardDay: standardDay,
    minYear: minYear,
  });
}

function submitBirthday(req, res) {
  // index page에서 날짜 값 불러오기
  const birthday = req.body.birthday;

  // 받아온 날짜 나누기
  const birthdaySplit = birthday.split("-");
  const year = +birthdaySplit[0];
  const month = +birthdaySplit[1];
  const day = +birthdaySplit[2];

  // 날짜 범위 지정을 위해 현재 날짜 불러오기
  const standardDate = new Date();

  // 현재 날짜와의 비교를 위해 기준값 단위 나누기
  const standardYear = standardDate.getFullYear();
  const standardMonth = standardDate.getMonth() + 1;
  const standardDay = standardDate.getDate();

  // 기본 날짜 유효성 검사 실행
  const dateValidationResult = validation.dateValidation(
    birthday,
    standardDate
  );

  if (!dateValidationResult) {
    return res.status(400).render("errors/400");
  }

  // 현재 날짜보다 큰 값  구분
  if (year === standardYear && month > standardMonth) {
    return res.status(400).render("errors/400");
  } else if (
    year === standardYear &&
    month === standardMonth &&
    day > standardDay
  ) {
    return res.status(400).render("errors/400");
  } else {
    res.render("success");
  }
}

module.exports = {
  getMain: getMain,
  submitBirthday: submitBirthday,
};
