const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const RefreshToken = require("../models/refreshTokenModel");
const jwt = require("jsonwebtoken");

const authController = {
  //generate access token
  generateAccessToken: (user) => {
    return jwt.sign(
      {
        id: user.id,
        admin: user.admin,
      },
      process.env.JWT_ACCESS_KEY,
      { expiresIn: "30s" }
    );
  },

  //generate refesh token
  generateRefreshToken: (user) => {
    return jwt.sign(
      {
        id: user.id,
        admin: user.admin,
      },
      process.env.JWT_REFRESH_KEY,
      { expiresIn: "365d" }
    );
  },

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
      return res.status(500).json(err);
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
        const accessToken = authController.generateAccessToken(user);
        const refreshToken = authController.generateRefreshToken(user);

        const refreshTk = await RefreshToken.findOne({ userId: user.id });
        if (!refreshTk) {
          const newRefreshToken = await new RefreshToken({
            token: refreshToken,
            userId: user.id,
          });
          await newRefreshToken.save();
          console.log("them refreshtoken vao database thanh cong !");
        } else {
          await RefreshToken.findOneAndUpdate({ token: refreshToken });
          console.log("refrestoken da ton tai");
        }
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: false,
          path: "/",
          sameSite: "strict",
        });
        const { password, ...others } = user._doc;
        return res.status(200).json({ ...others, accessToken, refreshToken });
      }
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  logoutUser: async (req, res) => {
    res.clearCookie("refreshToken");
    return res.status(200).json("Logged out !");
  },

  requestRefreshtoken: async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(401).json("You are not authenticated !");
    }
    const isRefreshToken = await RefreshToken.findOne({ token: refreshToken });
    if (!isRefreshToken) {
      return res.status(403).json("RefreshToken is not valid");
    }

    jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, async (err, user) => {
      if (err) {
        return res.status(401).json("Token is not verify !");
      }
      const newAccessToken = authController.generateAccessToken(user);
      const newRefreshToken = authController.generateRefreshToken(user);
      console.log(newRefreshToken)
      await RefreshToken.findOneAndUpdate({ token: newRefreshToken });
      res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: false, //deploy update "true"
        path: "/",
        sameSite: "strict",
      });
      return res.status(200).json({ acccessToken: newAccessToken });
    });
  },
};

module.exports = authController;
