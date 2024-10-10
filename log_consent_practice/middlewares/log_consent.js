function logConsent(req, res, next) {
  if (!req.session.logConsent) {
    return res.redirect("/log-consent");
  }

  next();
}

module.exports = logConsent;
