// 외부 라이브러리
const express = require("express");

// 프로젝트 내부 파일
const mainController = require("../controller/main.controller");

// express.js
const router = express.Router();

router.get("/", mainController.getMain);

router.get("/font-license", mainController.getFontLicense);

module.exports = router;