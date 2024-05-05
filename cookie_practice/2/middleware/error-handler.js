function notFound(req, res) {
  res.status(404).render("errors/404");
}

function errorHandler(error, req, res, next) {
  console.log(error);
  
  if (error.code === 404) {
    return res.status(404).render("errors/404");
  }

  res.status(500).render("errors/500");
}

module.exports = {
  notFound: notFound,
  errorHandler: errorHandler,
};
