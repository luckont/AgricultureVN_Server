const Product = require("../models/productModel")

const productController = {
    createProduct: async (req, res) => {
        try {
            const newProduct = new Product({...req.body, user: req.user});
            newProduct.save();
            return res.status(200).json({
                newProduct: {
                  ...newProduct._doc,
                    user: req.user,
                },
                msg: "Tạo sản phẩm mới thành công!",
            });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    getProducts: async (req, res) => {
        try {
            const products = await Product.find().sort("-createdAt").populate("user")
            return res.status(200).json({
                products,
                result: products.length,
                msg: "Lấy sản phẩm thành công!",
            })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    getProduct: async (req, res) => { 
        try {
            const product = await Product.findById(req.params.id).populate("user")
            return res.status(200).json({
                product,
                msg: "Lấy sản phẩm thành công!",
            })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }
}
module.exports = productController;