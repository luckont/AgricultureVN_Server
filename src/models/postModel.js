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
    // comment: {
    //     type: Array,
    //     default:[],
    //     content: String,
    //     createAt: {type: Date, default: Date.now()},
    //     createdBy: {type: ObjectId, ref: "User"}
    // }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
