const router = require("express").Router();
const reportController = require("../controllers/reportController");
const jwtMiddleware = require("../middlewares/jwtMiddleware");


router.post("/", jwtMiddleware.verifyToken, reportController.createReport)

router.get("/", jwtMiddleware.verifyToken, reportController.getReport)

module.exports = router