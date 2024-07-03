// 외부 라이브러리
const express = require("express");

// 프로젝트 내 파일
const basicController = require("../controller/basic.controller");

// express
const router = express.Router();

router.get("/", basicController.getIndex);

router.post("/input-data", basicController.application);

router.get("/processing", basicController.getProcessing);

router.get("/font-license", basicController.getFontLicense);

module.exports = router;