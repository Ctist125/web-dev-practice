function authCheck(req, res, next) {
  if (req.session.auth) {
    res.locals.auth = true;
  }

  next();
}

module.exports = authCheck;
