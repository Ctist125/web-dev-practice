function notFoundHandler(req, res) {
  res.render("errors/404");
}

function handleErrors(error, req, res, next) {
  console.log(error);

  if (error.code === 404) {
    return res.status(404).render("errors/404");
  } else {
    res.status(500).render("errors/500");
  }
}

module.exports = {
  notFoundHandler: notFoundHandler,
  handleErrors: handleErrors,
};
