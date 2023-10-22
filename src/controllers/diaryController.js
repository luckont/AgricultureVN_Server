const Diary = require("../models/diaryModel")

const diaryController = {
    createDiary: async (req, res) => {
        try {
            const { recipients, text, media } = req.body
            if (!recipients || (!text.trim() && media.length === 0)) return;

            const newDiary = new Diary({ recipients, text, media, user: req.user });
            await newDiary.save();

            return res.status(200).json({
                newDiary,
                msg: "Tạo nhật ký mới thành công !",
            });

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    getDiary: async (req, res) => {
        try {
            const diary = await Diary.find({user: req.user._id}).populate("recipients user")
            return res.status(200).json({diary})

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }
}

module.exports = diaryController