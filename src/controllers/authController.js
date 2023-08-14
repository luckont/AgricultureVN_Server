const bcrypt = require("bcrypt");
const User = require("../models/userModel");

const authController = {
  //register
  registerUser: async (req, res) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(req.body.password, salt);

      const newUser = await new User({
        username: req.body.username,
        phoneNumber: req.body.phoneNumber,
        password: hashed,
      });

      const user = await newUser.save();
      return res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //login
  loginUser: async (req, res) => {
    try {
      const user = await User.findOne({ phoneNumber: req.body.phoneNumber });
      if (!user) {
        return res.status(404).json("Wrong phone number !");
      }
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!validPassword) {
        return res.status(404).json("Wrong password !");
      }
      if (user && validPassword) {
        res.status(200).json(user);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = authController;
