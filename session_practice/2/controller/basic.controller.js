function getIndex(req, res) {
  res.render("index");
}

function getFontLicense(req, res) {
  res.render("font-license");
}

module.exports = {
  getIndex: getIndex,
  getFontLicense: getFontLicense,
};
