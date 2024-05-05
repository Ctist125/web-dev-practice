function dateValidation(dateValue, standardDate) {
  // 날짜 값 공백 확인
  if (dateValue && dateValue.trim().length !== 0) {
    // 유효성 검사를 위해 날짜 값을 년, 월, 일로 분배
    const dateSplit = dateValue.split("-");
    const year = +dateSplit[0];
    const month = +dateSplit[1];
    const day = +dateSplit[2];

    const standardYear = standardDate.getFullYear();

    // 날짜 유효성 검사
    if (
      year &&
      year >= standardYear - 150 &&
      year <= standardYear &&
      month &&
      month > 0 &&
      month < 13 &&
      day &&
      day > 0 &&
      day < 32
    ) {
      // 큰달과 작은달 구분
      const bigMonth = [1, 3, 5, 7, 8, 10, 12];
      const smallMonth = [4, 6, 9, 11];

      // 큰달 작은달에 따른 if 문
      if (month === 2 && day < 29) {
        return true;
      } else if (bigMonth.includes(month) && day < 32) {
        return true;
      } else if (smallMonth.includes(month) && day < 31) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  } else {
    return false;
  }
}

function whiteSpaceValidation(inputValue) {
  if (inputValue.length !== 0) {
    return true;
  } else {
    return false;
  }
}

function joinPasswdCheckValidation(passwd, passwdCheck) {
  if (passwd === passwdCheck) {
    return true;
  } else {
    return false;
  }
}

module.exports = {
  dateValidation: dateValidation,
  whiteSpaceValidation: whiteSpaceValidation,
  joinPasswdCheckValidation: joinPasswdCheckValidation,
};
