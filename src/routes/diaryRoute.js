const diaryController = require("../controllers/diaryController");
const jwtMiddleware = require("../middlewares/jwtMiddleware");

const router = require("express").Router();

router.get("/:id", jwtMiddleware.verifyToken, diaryController.getDiaryById)

router.get("/", jwtMiddleware.verifyToken, diaryController.getDiaries)

router.get("/g/:id", jwtMiddleware.verifyToken, diaryController.getDiary);

router.post("/", jwtMiddleware.verifyToken, diaryController.createDiary)

router.put("/:id", jwtMiddleware.verifyToken, diaryController.updateDiary)

router.delete("/:id", jwtMiddleware.verifyToken, diaryController.deleteDiary);


module.exports = router