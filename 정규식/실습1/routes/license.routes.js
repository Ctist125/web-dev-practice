// 외부 라이브러리 선언
const express = require("express");

// 프로젝트 내부 파일
const licenseController = require("../controller/license.controller");

// express.js
const router = express.Router();

router.get("/font-license", licenseController.getFontLicense);

module.exports = router;