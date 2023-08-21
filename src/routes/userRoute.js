const router = require("express").Router();
const userController = require("../controllers/userController");
const fileUploader = require("../middlewares/cloudinaryMiddleware");
// const jwtMiddleware = require("../middlewares/jwtMiddleware");

//get all user
router.get("/", userController.getAllUsers);

//get user
router.get("/:id", userController.getUser);

//delete user
router.delete("/:id", userController.deleteUser);

//update user
router.put(
  "/:id",
  fileUploader.single("profilePicture"),
  userController.updateUserById
);

//follow user
router.put("/:id/follow", userController.followUser);

//unfollow user
router.put("/:id/unfollow", userController.unfollowUser);

module.exports = router;
