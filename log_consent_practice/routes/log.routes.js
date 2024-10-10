// 외부 라이브러리 선언
const express = require("express");

// 프로젝트 내 파일
const logController = require("../controller/log.controller");

// express.js
const router = express.Router();

router.get("/log-consent", logController.getLogConsent);

router.post("/log-consent", logController.logConsent);

module.exports = router;