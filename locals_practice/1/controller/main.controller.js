function getMain(req, res) {
  res.render("index");
}

function getFontLicense(req, res) {
  res.render("font-license");
}

module.exports = {
  getMain: getMain,
  getFontLicense: getFontLicense,
};
