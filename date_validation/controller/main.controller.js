function getMain(req, res) {
  res.render("index");
}

function dateValidation(req, res) {
  const birthday = req.body.dateValue;

  if (birthday.trim().length !== 0) {
    const birthdaySplit = birthday.split("-");
    const year = +birthdaySplit[0];
    const month = +birthdaySplit[1];
    const day = +birthdaySplit[2];

    if (year && month && day) {
      res.render("success", { birthday: birthdaySplit });
    } else {
      return res.render("error/400");
    }
  } else {
    return res.render("error/400");
  }
}

module.exports = {
  getMain: getMain,
  dateValidation: dateValidation,
};
