function getMain(req, res) {
  let visitorCnt;

  if (req.cookies.visitorCnt) {
    // 쿠키가 있는 경우
    visitorCnt = parseInt(req.cookies.visitorCnt, 10) + 1;
  } else {
    // 쿠키가 없는 경우
    visitorCnt = 1;
  }

  res.cookie("visitorCnt", visitorCnt);
  res.render("index", { visitorCnt: visitorCnt });
}

function getFontLicense(req, res) {
  res.render("font-license");
}

module.exports = {
  getMain: getMain,
  getFontLicense: getFontLicense,
};
