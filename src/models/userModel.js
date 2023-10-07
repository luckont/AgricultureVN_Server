const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      unique: true,
      maxlength: 20,
    },
    phoneNumber: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
      minlength: 6,
    },
    profilePicture: {
      type: String,
      default:
        "https://res.cloudinary.com/duw0njssy/image/upload/v1695198799/image_default_AgricultureVN/logo_only_s3ioxv.png",
    },
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    subscribes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    saved: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    desc: {
      type: String,
      maxlength: 50,
    },
    admin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
