// 외부 라이브러리 선언
const express = require("express");

// 프로젝트 내 파일 선언
const licenseController = require("../controller/license.controller");

// express
const router = express.Router();

router.get("/font-license", licenseController.getFontLicense);

// exports
module.exports = router;