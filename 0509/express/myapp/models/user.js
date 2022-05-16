const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  userId: {
    type: String,
    required: true,
    unique: true, // Collection 안에서 유일, id 중복 x
  },
  job: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("users", UserSchema);
