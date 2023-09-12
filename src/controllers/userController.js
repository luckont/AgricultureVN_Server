const User = require("../models/userModel");
const bcrypt = require("bcrypt");

const userController = {
  // GET ALL USERS
  getAllUsers: async (req, res) => {
    try {
      const user = await User.find()
        .populate("subscribes followers")
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
        .populate("subscribes followers")
        .select("-password");
      return res.status(200).json({ user });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
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
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { subscribes: req.params.id } });
        return res.status(200).json("User had been followed !");
      } else {
        return res.status(403).json("You allready follow this user !");
      }
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  //unfollow user
  unfollowUser: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser.updateOne({ $pull: { subscribes: req.params.id } });
        return res.status(200).json("User had been unfollowed !");
      } else {
        return res.status(403).json("You allready unfollow this user !");
      }
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  //search user
  searchUser: async (req, res) => {
    try {
      const users = await User.find({
        username: { $regex: req.query.username },
      })
        .limit(5)
        .select("username profilePicture");
      return res.json({ users });
    } catch (err) {
      return res.status(500).json(err);
    }
  },
};

module.exports = userController;
