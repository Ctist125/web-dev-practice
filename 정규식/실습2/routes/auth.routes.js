// 외부 라이브러리
const express = require("express");

// 프로젝트 내 파일
const authController = require("../controller/auth.controller");

// express
const router = express.Router();

router.get("/", authController.getSignIn);

router.post("/sign-in", authController.signIn);

router.get("/sign-up", authController.getSignUp);

router.post("/sign-up", authController.signUp);

router.get("/success", authController.getSuccess);

router.get("/admin-page", authController.getAdminPage);

module.exports = router;