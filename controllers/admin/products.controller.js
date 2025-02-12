//[GET] /admins/product

const Product = require("../../models/product.model")
const filterStatusHelpers = require("../../helpers/filterStatus")
module.exports.products = async (req, res) =>{
    //Đoạn bộ lọc
    const filterStatus = filterStatusHelpers(req.query);
    let find = {
        deleted: false
    }
    //Tìm kiếm sản phẩm
    let keyword = ""
    if(req.query.keyword){
        keyword = req.query.keyword
        const regex = new RegExp(keyword, "i")
        find.title = regex
    }
    const products = await Product.find(find)
    res.render("admin/pages/products/index",{
        pageTitle: "Trang san pham",
        products: products,
        filterStatus: filterStatus,
        keyword: keyword
    })
}