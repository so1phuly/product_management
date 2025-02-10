//[GET] /admins/product

const Product = require("../../models/product.model")
module.exports.products = async (req, res) =>{
    const products = await Product.find({
        deleted: false
    })
    console.log(products)
    res.render("admin/pages/products/index",{
        pageTitle: "Trang san pham",
        products: products
    })
}