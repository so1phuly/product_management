//[GET] /admins/product

const Product = require("../../models/product.model")
const filterStatusHelpers = require("../../helpers/filterStatus")
const searchProduct = require("../../helpers/search")
const paginationHelper = require("../../helpers/paginantions")

module.exports.products = async (req, res) =>{
    //Đoạn bộ lọc
    const filterStatus = filterStatusHelpers(req.query);
    let find = {
        deleted: false
    }
    if(req.query.status){
        find.status = req.query.status
    }
    //Tìm kiếm sản phẩm
    const objectSearch = searchProduct(req.query)
    if(objectSearch.regex){
        find.title = objectSearch.regex
    }
    //Phân trang
    const countProduct = await Product.countDocuments()
    let objectPagination = paginationHelper(
        {
        limitedItem: 4,
        currentPage: 1
        },
        req.query,
        countProduct
    )
    console.log(objectPagination.skip)  
    //end Phân trang
    const products = await Product.find(find).limit(objectPagination.limitedItem).skip(objectPagination.skip)
    res.render("admin/pages/products/index",{
        pageTitle: "Trang san pham",
        products: products,
        filterStatus: filterStatus,
        keyword: objectSearch.keyword,
        pagination: objectPagination
    })
}