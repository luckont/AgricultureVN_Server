const authController = require("../controllers/authController");

const router = require("express").Router();

//resgister user
router.post("/register", authController.registerUser);

//login user
router.post("/login", authController.loginUser);

//refresh token
router.post("/refresh", authController.requestRefreshtoken);

module.exports = router;
