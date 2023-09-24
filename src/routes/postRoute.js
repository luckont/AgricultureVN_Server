const postController = require("../controllers/postController");
const commentController = require("../controllers/commentController");
const jwtMiddleware = require("../middlewares/jwtMiddleware")
const router = require("express").Router();

//create post
router.post("/", jwtMiddleware.verifyToken, postController.createPost);

//get post
router.get("/:id", jwtMiddleware.verifyToken, postController.getPost);

//get all post
router.get("/", jwtMiddleware.verifyToken, postController.getAllPost);

//update post
router.put("/:id", jwtMiddleware.verifyToken, postController.updatePost);

//delete post
router.delete("/:id", postController.deletePost);

//like post
router.put("/:id/like", jwtMiddleware.verifyToken, postController.likePost);

//unlike post
router.put("/:id/unlike", jwtMiddleware.verifyToken, postController.unlikePost);

//create comment
router.post("/:postId/comment", commentController.createComment);

module.exports = router;
