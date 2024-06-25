// 외부 라이브러리 선언
const express = require("express");

// 프로젝트 내부 파일
const basicController = require("../controller/basic.controller");

// express
const router = express.Router();

router.get("/", basicController.getList);

router.get("/writing", basicController.getWriting);

router.post("/new-post", basicController.posting);

router.get("/post/:id", basicController.getPost);

module.exports = router;