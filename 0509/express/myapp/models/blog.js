const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");
const Schema = mongoose.Schema;

autoIncrement.initialize(mongoose);

const BlogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
    },
    no: Number,
  },
  { timestamps: true }
);

BlogSchema.plugin(autoIncrement.plugin, {
  model: "blog",
  field: "no",
  increment: 1,
});

module.exports = mongoose.model("blog", BlogSchema);
