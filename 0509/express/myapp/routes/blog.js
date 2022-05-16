const express = require("express");
const router = express.Router();
const BlogSchema = require("../models/blog");

router.get("/", async (req, res) => {
  const posts = await BlogSchema.find({}).exec();
  res.render("blog/blog", { content: posts });
});

router.get("/write", (req, res) => {
  res.render("blog/write");
});

router.post("/write", (req, res, next) => {
  const title = req.body.title;
  const content = req.body.content;

  const post = new BlogSchema({
    title,
    content,
  });

  post
    .save()
    .then((result) => {
      console.log(result);
      res.redirect("/blog");
    })
    .catch((e) => {
      console.log(e);
      next(e);
    });
});

module.exports = router;
