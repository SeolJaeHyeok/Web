const express = require("express");
const BookSchema = require("../models/book");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("post");
});

router.get("/del", (req, res) => {
  res.render("delete");
});

// GET - DB에 저장된 데이터 보여주기
router.get("/bookinfo/:id", (req, res) => {
  const author = req.params.id;

  // DB에서 URL에 맞는 데이터를 찾아 보여주는 방법
  // 1번째 방법
  BookSchema.findOne({ author }, (err, result) => {
    if (result) {
      return res.json(result);
    }
    return res.send("등록된 작가가 없습니다.");
  });

  // 2번째 방법
  // BookSchema.findOne({ author })
  //   .then((result) => {
  //     res.json(result);
  //   })
  //   .catch((e) => {
  //     console.log(e);
  //   });
});

// Post - DB에 새로운 데이터 저장
router.post("/addbook", (req, res) => {
  let {
    body: { bookName, author, price, publish },
  } = req;

  price = price || 5000;

  let bookData = new BookSchema({ bookName, author, price, publish });
  bookData.save();

  res.redirect("/expost");
});

// DELETE - DB에 저장된 데이터 삭제
router.delete("/del/:id", (req, res) => {
  const bookname = req.params.id;

  BookSchema.findOneAndDelete({ bookname })
    .then((result) => {
      res.json({ redirect: "/expost" });
    })
    .catch((e) => {
      console.log(e);
    });
});

module.exports = router;
