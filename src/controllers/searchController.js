const User = require("../models/userModel");
const Post = require("../models/postModel");

const searchController = {
    search: async (req, res) => {
        try {
          const searchQuery = req.query.search;
    
          const regex = new RegExp(searchQuery, 'i');
    
          const users = await User.find({
            username: { $regex: regex },
          })
            .limit(5)
            .select("username profilePicture roles");
          const posts = await Post.find({
            desc: { $regex: regex }
          })
          .limit(5)
          return res.json({ users, posts });
        } catch (err) {
          return res.status(500).json(err);
        }
      },
}

module.exports = searchController;