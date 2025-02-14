const Product = require("../../models/product.model")
const filterStatusHelpers = require("../../helpers/filterStatus")
const searchProduct = require("../../helpers/search")
const paginationHelper = require("../../helpers/paginantions")
//[GET] /admins/products
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
//[GET] /admins/products/change-status/:status/:id
module.exports.changeStatus = async (req, res) =>{
    const statusChange = req.params.status
    const id = req.params.id
    // console.log(statusChange)
    // console.log(id)
    await Product.updateOne({ _id: id }, { status: statusChange })

    // res.send(`${statusChange} - ${id}`)
    // res.redirect('/admin/products') hàm này quay trở lại 1 trang mặc định
    res.redirect("back")
}