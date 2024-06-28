function authCheck(req, res, next) {
  const userId = req.session.userId;

  if (userId) {
    res.locals.userId = userId;
    res.locals.auth = true;
    res.locals.admin = req.session.admin;
  }

  next();
}

module.exports = authCheck;
