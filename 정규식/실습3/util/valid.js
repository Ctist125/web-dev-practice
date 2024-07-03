function noWhiteSpace(value) {
  if (!value.trim()) {
    return false;
  } else {
    return true;
  }
}

function phoneNumberValidation(value) {
  const phoneValid = value.match(/010-[0-9]{4}-[0-9]{4}/g);

  if (phoneValid) {
    return phoneValid;
  } else {
    return false;
  }
}

function emailValidation(value) {
  const emailValid = value.match(/\w+@\w+[.]\w+/g);

  if (emailValid) {
    return emailValid;
  } else {
    return false;
  }
}

module.exports = {
  noWhiteSpace: noWhiteSpace,
  phoneNumberValidation: phoneNumberValidation,
  emailValidation: emailValidation,
};
