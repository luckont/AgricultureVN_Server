const postController = require("../controllers/postController");
const jwtMiddleware = require("../middlewares/jwtMiddleware")
const router = require("express").Router();

//create post
router.post("/", jwtMiddleware.verifyToken, postController.createPost);

//get user post
router.get("/user_posts/:id", jwtMiddleware.verifyToken, postController.getUserPost);

//get all post
router.get("/", jwtMiddleware.verifyToken, postController.getAllPost);

//get post
router.get("/:id", jwtMiddleware.verifyToken, postController.getPost);

//update post
router.put("/:id", jwtMiddleware.verifyToken, postController.updatePost);

//delete post
router.delete("/:id", jwtMiddleware.verifyToken, postController.deletePost);

//like post
router.put("/:id/like", jwtMiddleware.verifyToken, postController.likePost);

//unlike post
router.put("/:id/unlike", jwtMiddleware.verifyToken, postController.unlikePost);

module.exports = router;
