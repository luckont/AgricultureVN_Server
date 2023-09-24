const Post = require("../models/postModel");

const postController = {
  // create post
  createPost: async (req, res) => {
    try {
      const { desc, img } = req.body;
      const newPost = new Post({ desc, img, user: req.user.id });
      await newPost.save();
      return res
        .status(200)
        .json({ newPost, msg: "Tạo bài viết mới thành công !" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  // get all post
  getAllPost: async (req, res) => {
    try {
      const post = await Post.find({
        user: [req.user.id],
      }).populate("user", "-password");
      return res.status(200).json({
        msg: "Lấy bài viết thành công !",
        result: post.length,
        post,
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
      const { desc, img } = req.body;
      const post = await Post.findOneAndUpdate(
        { _id: req.params.id },
        {
          desc,
          img,
        }
      ).populate("user like", "profilePicture username");
      return res.status(200).json({
        msg: "Cập nhật bài viết thành công !",
        newPost: {
          ...post._doc,
          desc,
          img,
        },
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
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
  likePost: async (req, res) => {
    try {
      const post = await Post.find({_id: req.params.id, like: req.user.id})
      if(post.length > 0) return res.status(403).json({msg: "Bạn đã thích bài viết nảy rồi 1"})
      await Post.findOneAndUpdate({_id: req.params.id},
        {
          $push: { like: req.user.id },
        },
        { new: true });

      res.json({ msg: "Bạn vừa thích bài viết này !" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  unlikePost: async (req, res) => {
    try {
      await Post.findOneAndUpdate({_id: req.params.id},
        {
          $pull: { like: req.user.id },
        },
        { new: true });

      res.json({ msg: "Bạn đã bỏ thích bài viết này !" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = postController;
