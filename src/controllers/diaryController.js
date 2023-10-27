const Diary = require("../models/diaryModel");

const diaryController = {
  createDiary: async (req, res) => {
    try {
      const { recipients, text, media } = req.body;
      if (!recipients || (!text.trim() && media.length === 0)) return;

      const newDiary = new Diary({ recipients, text, media, user: req.user._id });
      await newDiary.save();

      return res.status(200).json({
        newDiary: {
          ...newDiary._doc,
          user: req.user
        },
        msg: "Tạo nhật ký mới thành công !",
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getDiary: async (req, res) => {
    try {
      const diary = await Diary.find({ user: req.params.id })
        .populate("recipients user")
        .sort("-createdAt");
      return res.status(200).json({ diary });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getDiaryById: async (req, res) => {
    try {
      const diary = await Diary.findById(req.params.id).populate("recipients user");
      return res.status(200).json({ diary });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateDiary: async (req, res) => {
    try {
      const { text, media, recipients } = req.body;
      const diary = await Diary.findOneAndUpdate(
        { _id: req.params.id },
        {
          text,
          media,
          recipients,
        }
      ).populate("recipients user")
      return res.status(200).json({
        msg: "Cập nhật nhật ký thành công !",
        newDiary: {
          ...diary._doc,
          text, media, recipients
        }
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteDiary: async (req, res) => {
    try {
      await Diary.findOneAndDelete({ _id: req.params.id })
      return res.status(200).json({ msg: "Xóa nhật ký thành công!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });

    }
  }
};

module.exports = diaryController;
