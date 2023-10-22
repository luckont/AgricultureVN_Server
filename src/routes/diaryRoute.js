const diaryController = require("../controllers/diaryController");
const jwtMiddleware = require("../middlewares/jwtMiddleware");

const router = require("express").Router();

router.post("/", jwtMiddleware.verifyToken, diaryController.createDiary)

router.get("/g/result", jwtMiddleware.verifyToken, diaryController.getDiary);

module.exports = router