const Post = require("../models/postModel");

const postController = {
  // create post
  createPost: async (req, res) => {
    try {
      const updatePost = req.body;
      // const files = req.files;
      // if (files) {
      //   postData.img = files.map((file) => file.path);
      // }
      const newPost = await new Post(updatePost);
      const post = await newPost.save();
      return res.status(200).json(post);
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  // get all post
  getAllPost: async (req, res) => {
    try {
      const post = await Post.find();
      return res.status(200).json(post);
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
