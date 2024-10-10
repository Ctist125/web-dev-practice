function logForm(date, mainAgent, text) {
  const logDate = "[" + date + "]";
  const logMainAgent = "[" + mainAgent + "]";

  const log = logDate + " " + logMainAgent + " " + text;

  return log;
}

module.exports = logForm;
