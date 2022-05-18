var express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");
const session = require("express-session");
const parseurl = require("parseurl");
const { body, validationResult } = require("express-validator");
const UserSchema = require("../models/newuser");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.render("blog/auth");
});

router.post(
  "/signup",
  body("email").isEmail().withMessage("Email not allowed."),
  body("password")
    .isLength({ min: 5 })
    .withMessage("The password must be at least 5 characters long. "),
  async (req, res) => {
    const errors = validationResult(req);
    const { email, password } = req.body;

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    // 이메일 중복 체크
    const findResult = await UserSchema.findOne({ email });

    /*
    넘어온 이메일이 존재하는지 체크
    존재한다면 중복 체크
    없다면 신규 가입
    */
    if (!findResult) {
      // 중복된 이메일이 없는 경우

      const salt = bcrypt.genSaltSync(10); // 복호화를 할 때 기준이 되는 메세지의 길이가 존재, 여기서는 10글자로 설정
      const bcryptPW = bcrypt.hashSync(password, salt);

      UserSchema.create({
        email,
        password: bcryptPW,
      }).then((result) => {
        res.status(200);
        res.redirect("/users/login");
      });
    } else {
      // 중복된 이메일이 있는 경우
      res.status(401).json({ msg: "이미 가입된 계정입니다." });
    }
  }
);

router.post(
  "/login",
  body("email").isEmail().withMessage("Email not allowed."),
  body("password")
    .isLength({ min: 5 })
    .withMessage("The password must be at least 5 characters long. "),
  async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    // 1. 가입을 한 유저인지?
    const userData = await UserSchema.findOne({ email });

    // 유저가 없는 경우
    if (!userData) {
      return res.status(401).json({ msg: "가입되지 않은 계정입니다." });
    } else {
      // 유저가 있는 경우 비밀번호 매칭
      const isPasswordMatch = bcrypt.compareSync(password, userData.password);
      if (isPasswordMatch) {
        return res.status(200).json({ msg: "OK" });
      } else {
        return res.status(401).json({ msg: "비밀번호가 일치하지 않습니다." });
      }
    }
  }
);

router.get("/login", (req, res) => {
  res.render("blog/login");
});

/*
쿠키와 세션
쿠키 - 사용자의 브라우저에 저장되는 데이터 모음 -> JWT token -> 정보 저장의 분산 -> 비용 절감 -> 보안 이슈에서 훨씬 자유로움
세션 - 서버에 저장되는 데이터 모음 -> 보안 상의 문제로 보통은 세션에 많은 정보를 저장
*/
// Cookie
router.get("/cookie", (req, res) => {
  // "key-변수-이름"  "value-여러분 저장하고 싶은 값"
  res.cookie("drink", "water");
  res.send("set cookies");
});

// Session - users.js에서만 사용 가능하게끔 설정
router.use(
  session({
    secret: "12345",
    resave: false,
    saveUninitialized: true,
  })
);

router.use(function (req, res, next) {
  if (!req.session.views) {
    req.session.views = {};
  }

  // get the url pathname
  var pathname = parseurl(req).pathname;

  // count the views
  req.session.views[pathname] = (req.session.views[pathname] || 0) + 1;

  next();
});

router.get("/foo", function (req, res, next) {
  res.send("you viewed this page " + req.session.views["/foo"] + " times");
});

module.exports = router;
