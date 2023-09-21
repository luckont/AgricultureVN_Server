const Post = require("../models/postModel");

const postController = {
  // create post
  createPost: async (req, res) => {
    try {
      const { desc, img } = req.body;
      const newPost = new Post({desc, img, user: req.user.id}) 
      await newPost.save();
      return res.status(200).json({newPost, msg: "Tạo bài viết mới thành công !"});
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  // get all post
  getAllPost: async (req, res) => {
    try {
      const post = await Post.find({
        user: [req.user.id]
      }).populate("user", "-password");
      return res.status(200).json({
        msg: "Lấy bài viết thành công !",
        result: post.length,
        post
      });
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  // get post
  getPost: async (req, res) => {
    try {
      // const post = await Post.findById(req.params.id);
      const post = await Post.findById(req.params.id).populate("comments");
      return res.status(200).json(post);
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  // update post
  updatePost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (post.userId === req.body.userId) {
        await post.updateOne({ $set: req.body });
        return res.status(200).json("The post has been updated !");
      } else {
        return res.status(403).json("You can't update this post !");
      }
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  // delete post
  deletePost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (post.userId === req.body.userId) {
        // await post.deleteOne();
        return res.status(200).json("The post has been deleted !");
      } else {
        return res.status(403).json("You can't delete this post !");
      }
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  // like and dislike post
  likeAndDislikePost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (!post.like.includes(req.body.userId)) {
        await post.updateOne({ $push: { like: req.body.userId } });
        return res.status(200).json("You liked this post !");
      } else {
        await post.updateOne({ $pull: { like: req.body.userId } });
        return res.status(200).json("You have unliked this post !");
      }
    } catch (err) {
      return res.status(500).json(err);
    }
  },
};

module.exports = postController;
