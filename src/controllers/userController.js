const User = require("../models/userModel");
const bcrypt = require("bcrypt");

const userController = {
  // GET ALL USERS
  getAllUsers: async (req, res) => {
    try {
      const user = await User.find()
        .populate("subscribes followers", "-password")
        .select("-password");
      return res.status(200).json(user);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  // GET USER
  getUser: async (req, res) => {
    try {
      const user = await User.findById(req.params.id)
        .populate("subscribes followers", "-password")
        .select("-password");
      return res.status(200).json({ user });
    } catch (err) {
      return res.status(500).json({ msg: "sai" });
    }
  },

  // DELETE USER
  deleteUser: async (req, res) => {
    try {
      //finbyidanddelete
      const user = await User.findById(req.params.id);
      return res.status(200).json("Delete user successfully !");
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  // UPDATE USER BY ID
  updateUserById: async (req, res) => {
    try {
      let updateData = req.body;
      if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(req.body.password, salt);
        updateData = { ...updateData, password: hashed };
      }

      const user = await User.findOneAndUpdate(
        { _id: req.params.id },
        { $set: updateData }
      );

      if (!user) {
        return res.status(404).json("No user !");
      }

      return res.status(200).json({ msg: "Cập nhật thông tin thành công !" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  //follow user
  followUser: async (req, res) => {
    try {
      const user = await User.find({
        _id: req.params.id,
        followers: req.user.id,
      });

      if (user.length > 0)
        return res
          .status(500)
          .json({ msg: "Bạn đã theo dõi người dùng này !" });

      await User.findOneAndUpdate(
        { _id: req.params.id },
        {
          $push: { followers: req.user.id },
        },
        { new: true }
      );

      await User.findByIdAndUpdate(
        { _id: req.user.id },
        {
          $push: { subscribes: req.params.id },
        },
        { new: true }
      );

      res.json({ msg: "Bạn đã bắt đầu theo dõi người này !" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  //unfollow user
  unfollowUser: async (req, res) => {
    try {
      await User.findOneAndUpdate(
        { _id: req.params.id },
        {
          $pull: { followers: req.user.id },
        },
        { new: true }
      );

      await User.findByIdAndUpdate(
        { _id: req.user.id },
        {
          $pull: { subscribes: req.params.id },
        },
        { new: true }
      );

      res.json({ msg: "Bạn đã bỏ theo dõi người này !" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  //search user
  searchUser: async (req, res) => {
    try {
      const users = await User.find({
        username: { $regex: req.query.username },
      })
        .limit(10)
        .select("username profilePicture");
      return res.json({ users });
    } catch (err) {
      return res.status(500).json(err);
    }
  },
};

module.exports = userController;
