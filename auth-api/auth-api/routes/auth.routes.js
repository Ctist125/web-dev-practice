// 외부 라이브러리 선언
const express = require("express");

// 프로젝트 내 파일 선언
const authController = require("../controller/auth.controller");

// express
const router = express.Router();

// router
router.post("/login", authController.login);

router.post("/sign-up", authController.signUp);

router.post("/find-pw", authController.findPw);

// exports
module.exports = router;