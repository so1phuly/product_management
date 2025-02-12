//[GET] /admins/product

const Product = require("../../models/product.model")
const filterStatusHelpers = require("../../helpers/filterStatus")
const searchProduct = require("../../helpers/search")
module.exports.products = async (req, res) =>{
    //Đoạn bộ lọc
    const filterStatus = filterStatusHelpers(req.query);
    let find = {
        deleted: false
    }
    //Tìm kiếm sản phẩm
    const objectSearch = searchProduct(req.query)
    if(objectSearch.regex){
        find.title = objectSearch.regex
    }
    const products = await Product.find(find)
    res.render("admin/pages/products/index",{
        pageTitle: "Trang san pham",
        products: products,
        filterStatus: filterStatus,
        keyword: objectSearch.keyword
    })
}