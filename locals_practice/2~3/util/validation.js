function whiteSpaceValidation(value) {
  if (!value) {
    return false;
  }

  if (value.trim().length === 0) {
    return false;
  }

  return true;
}

function joinValidation(userData) {
  if (
    userData.id.length > 5 &&
    userData.id.length <= 20 &&
    userData.passwd.length > 7 &&
    userData.passwd.length <= 20 &&
    userData.passwdCheck > 7 &&
    userData.passwdCheck <= 20 &&
    userData.agree === "on"
  ) {
    return true;
  } else {
    return false;
  }
}

module.exports = {
  whiteSpaceValidation: whiteSpaceValidation,
  joinValidation: joinValidation,
};
