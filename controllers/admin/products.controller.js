const Product = require("../../models/product.model")
const filterStatusHelpers = require("../../helpers/filterStatus")
const searchProduct = require("../../helpers/search")
const paginationHelper = require("../../helpers/paginantions")
const { query } = require("express")
//[GET] /admins/products
module.exports.products = async (req, res) => {
    //Đoạn bộ lọc
    const filterStatus = filterStatusHelpers(req.query);
    let find = {
        deleted: false
    }
    if (req.query.status) {
        find.status = req.query.status
    }
    //Tìm kiếm sản phẩm
    const objectSearch = searchProduct(req.query)
    if (objectSearch.regex) {
        find.title = objectSearch.regex
    }
    //Phân trang

    const countProduct = await Product.countDocuments(find)
    // console.log(countProduct)
    let objectPagination = paginationHelper(
        {
            limitedItem: 4,
            currentPage: 1
        },
        req.query,
        countProduct
    )
    //end Phân trang
    const products = await Product.find(find)
        .sort({position: "desc"})
        .limit(objectPagination.limitedItem)
        .skip(objectPagination.skip)
    res.render("admin/pages/products/index", {
        pageTitle: "Trang san pham",
        products: products,
        filterStatus: filterStatus,
        keyword: objectSearch.keyword,
        pagination: objectPagination
    })
}
//[Patch] /admins/products/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
    const statusChange = req.params.status
    const id = req.params.id
    // console.log(statusChange)
    // console.log(id)
    await Product.updateOne({ _id: id }, { status: statusChange })

    // res.send(`${statusChange} - ${id}`)
    // res.redirect('/admin/products') hàm này quay trở lại 1 trang mặc định
    res.redirect(req.get("Referrer") || "/admin/products");
}

//[Patch] /admins/products/change-multi
module.exports.changeMulti = async (req, res) => {
    const type = req.body.type
    const ids = req.body.ids.split(", ")
    switch (type) {
        case "active":
            await Product.updateMany({ _id: { $in: ids } }, { status: "active" })
            break;
        case "inactive":
            await Product.updateMany({ _id: { $in: ids } }, { status: "inactive" })
            break;
        case "delete-all":
            await Product.updateMany({ _id: { $in: ids } },
                {
                    deleted: true,
                    deletedAt: new Date()
                })
            break;
        case "change-position":
            for (const item of ids) {
                let [id, position] = item.split("-")
                position = parseInt(position)
                await Product.updateOne({ _id: id }, { position: position })
            }
            break;
        default:
            break;
    }

    res.redirect(req.get("Referrer") || "/admin/products");
}

//[Delte] /admins/products/delete/:id
module.exports.deleteItem = async (req, res) => {
    const id = req.params.id
    // await Product.deleteOne({ _id: id}); xóa vĩnh viễn sản phẩm
    await Product.updateOne({ _id: id }, {
        deleted: true,
        deletedAt: new Date()
    })
    res.redirect(req.get("Referrer") || "/admin/products");
}
