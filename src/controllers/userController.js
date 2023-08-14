const User = require("../models/userModel");
const bcrypt = require("bcrypt");

const userController = {
  // GET ALL USERS
  getAllUsers: async (req, res) => {
    try {
      const user = await User.find();
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // GET USER
  getUser: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // DELETE USER
  deleteUser: async (req, res) => {
    try {
      //finbyidanddelete
      const user = await User.findById(req.params.id);
      res.status(200).json("Delete user successfully!");
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //UPDATE USER BY ID
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
        return res.status(404).json("No user");
      }
      return res.status(200).json(`Successfully updated user ${req.body.username}`);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // UPDATE USER BY ID
  //   updateUserById: async function ({ params, body }) {
  //     console.log({ body });
  //     let updatedUser;
  //     if (!ObjectId.isValid(params._id)) return next();
  //     try {
  //       updatedUser = await User.findOneAndUpdate(
  //         { _id: ObjectId(params._id) },
  //         { $set: { ...body } },
  //         { new: true }
  //       );
  //       res.sendStatus(201);
  //     } catch (e) {
  //       res.send("error");
  //     }
  //   },
};
module.exports = userController;
