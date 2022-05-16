const express = require("express");
const router = express.Router();
const controller = require("../controller/post");

router.get("/", (req, res) => {
  res.render("post");
});

router.get("/del", (req, res) => {
  res.render("delete");
});

router.get("/users", (req, res) => {
  res.render("user");
});

// GET - DB에 저장된 데이터 보여주기
router.get("/bookinfo/:id", controller.getBookInfo);

// Post - DB에 새로운 데이터 저장
router.post("/addbook", controller.addBook);

// DELETE - DB에 저장된 데이터 삭제
router.delete("/del/:id", controller.deleteBook);

// GET - Book Info에 있는 모든 정보 가져오기
router.get("/getlist", controller.getAllBook);

module.exports = router;
