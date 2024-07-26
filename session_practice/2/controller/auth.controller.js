// 프로젝트 내 파일
const validation = require("../util/validation");
const Auth = require("../models/auth.models");

function getSignup(req, res) {
  if (req.session.auth) {
    return res.render("errors/400");
  }

  let flashData = req.session.flashData;

  req.session.flashData = null;

  if (!flashData) {
    flashData = {
      id: null,
      pw: null,
      pwChekc: null,
    };
  }

  res.render("auth/sign-up", { flashData: flashData });
}

async function signup(req, res) {
  userInput = {
    id: req.body.userId,
    pw: req.body.userPw,
    pwCheck: req.body.pwCheck,
  };

  // 유효성 검사
  // 공란
  if (!validation.noEmpty(userInput.id) || !validation.noEmpty(userInput.pw)) {
    return res.render("errors/400");
  }

  // 공백 제외
  if (
    !validation.noWhiteSpace(userInput.id) ||
    !validation.noWhiteSpace(userInput.pw)
  ) {
    req.session.flashData = {
      errorComment: "공백을 제외해 주십시오.",
      ...userInput,
    };

    req.session.save();

    return res.redirect("/sign-up");
  }

  // 비밀번호 확인
  if (userInput.pw === userInput.pwCheck) {
    // 저장
    const auth = new Auth(userInput.id, userInput.pw);

    await auth.signup();

    return res.redirect("/");
  } else {
    req.session.flashData = {
      errorComment: "Password와 Password 확인의 값이 다릅니다.",
      ...userInput,
    };

    req.session.save();

    return res.redirect("/sign-up");
  }
}

function getSignin(req, res) {
  if (req.session.auth) {
    return res.render("errors/400");
  }
  
  let flashData = req.session.flashData;
  req.session.flashData = null;

  if (!flashData) {
    flashData = {
      id: null,
      pw: null,
    };
  }

  res.render("auth/sign-in", { flashData: flashData });
}

async function signin(req, res) {
  const userInput = {
    id: req.body.userId,
    pw: req.body.userPw,
  };

  const auth = new Auth(userInput.id, userInput.pw);

  const userInfo = await auth.signin();

  if (!userInfo) {
    req.session.flashData = {
      errorComment: "로그인 실패!",
      ...userInput,
    };

    return res.redirect("/sign-in");
  } else {
    const pwMatch = await auth.pwCompare(userInfo.pw);
    if (!pwMatch) {
      req.session.flashData = {
        errorComment: "로그인 실패!",
        ...userInput,
      };

      return res.redirect("/sign-in");
    }
  }

  req.session.auth = true;

  req.session.save();
  res.redirect("/");
}

function logout(req, res) {
  req.session.auth = null;

  res.redirect("/");
}

module.exports = {
  getSignup: getSignup,
  signup: signup,
  getSignin: getSignin,
  signin: signin,
  logout: logout,
};
