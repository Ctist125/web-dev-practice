// 외부 라이브러리
const express = require("express");

// 프로젝트 내부 파일
const basicController = require("../controller/basic.controller");

// express.js
const router = express.Router();

router.get("/", basicController.getIndex);

module.exports = router;