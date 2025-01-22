// 외부 라이브러리 선언
const express = require("express");

// 프로젝트 내 파일
const basicController = require("../controller/basic.controller");

// express
const router = express.Router();

router.get("/", basicController.getIndex);

router.post("/textInput", basicController.inputText);

router.get("/font-license", basicController.getFontLicense);

module.exports = router;