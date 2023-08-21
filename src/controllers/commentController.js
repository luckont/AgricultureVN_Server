const Comment = require("../models/commentModel");
const Post = require("../models/postModel");

const commentController = {
  createComment: async (req, res) => {
    try {
      const postId = req.params.postId;
      const { userId, content } = req.body;
      const newComment = new Comment({ postId, userId, content });
      await newComment.save();

      const post = await Post.findById(postId);
      post.comments.push(newComment);
      await post.save();

      return res.status(200).json(newComment);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
};

module.exports = commentController;
