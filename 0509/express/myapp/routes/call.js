const express = require("express");
const { nextTick } = require("process");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.send("This is a Test Page");
  next(); // 현재 미들웨어의 기능을 마치고 다음 미들웨어로 연결
});

router.get("/member", (req, res) => {
  res.send("Call By Member");
});

router.get("/member/:id", (req, res) => {
  const memberId = req.params.id;
  res.send(`Call By Member's Id = ${memberId}`);
});

module.exports = router;
