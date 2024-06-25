function isEmpty(value) {
  return !value || value.trim() == "";
}

function isIdValid(userId) {
  // 변수 선언
  const validationText = /^[a-z0-9]+$/;

  return validationText.test(userId);
}

function userIdValidation(userId) {
  // 변수 선언
  let result = false;
  let errorText;

  // 공백 체크
  if (isEmpty(userId)) {
    errorText = "값을 입력해 주십시오.";
  } else {
    if (userId.length >= 5 && userId.length <= 15) {
      if (isIdValid(userId)) {
        result = true;
        errorText = "적절한 ID입니다."
      } else {
        errorText = "영문자(소문자)와 숫자 만을 포함해 주십시오.";
      }
    } else {
      errorText = "길이에 맞게 입력해 주십시오.";
    }
  }

  return {
    result: result,
    errorText: errorText,
  };
}

module.exports = {
  userIdValidation: userIdValidation,
};
