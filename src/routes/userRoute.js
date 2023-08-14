const userController = require("../controllers/userController");
const router = require("express").Router();

//get all user
router.get("/", userController.getAllUsers);

//get user
router.get("/:id", userController.getUser);

//delete user
router.delete("/:id", userController.deleteUser);

//update user
router.put("/:id", userController.updateUserById);

module.exports = router;
