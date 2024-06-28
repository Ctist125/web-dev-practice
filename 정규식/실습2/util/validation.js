function noDataCheck(value) {
  if (value.trim()) {
    return true;
  } else {
    return false;
  }
}

function idCheck(value) {
  // 필수 포함 문자 체크
  if (!value.match(/[\s]/) && value.match(/[a-z]/) && value.match(/[0-9]/)) {
    // 글자 수 체크
    if (value.length >= 5 && value.length <= 15) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

function passwdCheck(value) {
  // 필수 포함 문자 체크
  if (
    !value.match(/[\s]/) &&
    value.match(/[A-Z]/) &&
    value.match(/[a-z]/) &&
    value.match(/[0-9]/) &&
    value.match(/[~!@#$%^&*()-_+={[}:;"',.?]/)
  ) {
    // 글자 수 체크
    if (value.length >= 8 && value.length <= 20) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

function passwdCheckCheck(passwd, passwdCheck) {
  if (passwd === passwdCheck) {
    return true;
  } else {
    return false;
  }
}

module.exports = {
  noDataCheck: noDataCheck,
  idCheck: idCheck,
  passwdCheck: passwdCheck,
  passwdCheckCheck: passwdCheckCheck,
};
