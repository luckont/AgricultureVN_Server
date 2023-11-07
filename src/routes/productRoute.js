const router = require("express").Router();
const jwtMiddleware = require("../middlewares/jwtMiddleware");
const productController = require("../controllers/productController");

router.post("/", jwtMiddleware.verifyToken, productController.createProduct);

router.get("/", jwtMiddleware.verifyToken,productController.getProducts);

router.get("/:id", jwtMiddleware.verifyToken, productController.getProduct);

module.exports = router
