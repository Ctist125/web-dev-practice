async function login(req, res) {
  const inputUserData = {
    id: req.body.userId,
    passwd: req.body.userPasswd,
  };

  const user = new Auth(inputUserData.id);
  const userData = await user.loginFindId();

  if (
    inputUserData.id === userData.id &&
    inputUserData.passwd === userData.passwd
  ) {
    res.cookie("auth", { id: userData.id, passwd: userData.passwd });
    return res.render("success", { userId: inputUserData.id });
  } else {
    console.log("로그인 실패");
    return res.redirect("/");
  }
}
