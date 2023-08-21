const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      require: true,
    },
    desc: {
      type: String,
      maxlength: 50,
    },
    img: {
      type: Array,
      default: [],
    },
    like: {
      type: Array,
      default: [],
    },
    comments: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
    }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
