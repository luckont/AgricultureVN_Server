const postController = require("../controllers/postController");

const router = require("express").Router();

//create post
router.post("/", postController.createPost);

//get post
router.get("/:id", postController.getPost)

//update post
router.put("/:id", postController.updatePost);

//delete post
router.delete("/:id", postController.deletePost)

//liek and dislike post
router.put("/:id/like", postController.likeAndDislikePost)

module.exports = router;
