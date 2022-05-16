const BookSchema = require("../models/book");

const getBookInfo = (req, res) => {
  const author = req.params.id;
  // DB에서 URL에 맞는 데이터를 찾아 보여주는 방법
  // 1번째 방법
  // BookSchema.findOne({ author }, (err, result) => {
  //   if (result) {
  //     return res.json(result);
  //   }
  //   return res.send("등록된 작가가 없습니다.");
  // });

  BookSchema.findOne({ author })
    .then((result) => {
      res.json(result);
    })
    .catch((e) => {
      console.log(e);
    });
};

const addBook = (req, res) => {
  let {
    body: { bookName, author, price, publish },
  } = req;

  price = price || 5000;

  let bookData = new BookSchema({ bookName, author, price, publish });
  bookData.save();

  res.redirect("/expost");
};

const deleteBook = (req, res) => {
  const bookname = req.params.id;

  BookSchema.findOneAndDelete({ bookname })
    .then((result) => {
      res.json({ redirect: "/expost" });
    })
    .catch((e) => {
      console.log(e);
    });
};

const getAllBook = async (req, res) => {
  const result = await BookSchema.find({}).exec();
  return res.status(200).json(result);
};

module.exports = {
  getBookInfo,
  addBook,
  deleteBook,
  getAllBook,
};
