// 외장 라이브러리
const express = require("express");

// 프로젝트 내부 파일
const mainController = require("../controller/main.controller");

// express js
const router = express.Router();

// 페이지
router.get("/", mainController.getMain);

router.post("/birthday", mainController.submitBirthday);

module.exports = router;
