let cnt = 0;

function visitorCount(req, res, next) {
  cnt++;
  res.locals.cnt = cnt;

  next();
}

module.exports = visitorCount;
