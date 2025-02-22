const systemConfig = require("../../config/system")
const record = require("../../models/product-category.model")
const ProductCategory = require("../../models/product-category.model")
const { products } = require("./products.controller")
//[GET] /admin/products-category
module.exports.index= async (req, res) => {
    res.render("admin/pages/products-category/index", {
        pageTitle: "Danh mục sản phẩm"
    })
}

//[GET] /admin/products-category/create
module.exports.create= async (req, res) => {
    let find = {
        deleted: false
    }
    const record = await ProductCategory.find(find)
    res.render("admin/pages/products-category/create", {
        pageTitle: "Tạo danh mục sản phẩm",
        record: record
    })
    console.log(record)
}

//[POST] /admin/products-category/create
module.exports.createPost= async (req, res) => {
    if(req.body.position == ""){
        const count = await ProductCategory.countDocuments()
        req.body.position = count + 1
    }else {
        req.body.position = parseInt(req.body.position)
    }
    const record = new ProductCategory(req.body)
    await record.save()
    // console.log(req.body)
    res.redirect(`${systemConfig.prefixAdmin}/products-category`)
}