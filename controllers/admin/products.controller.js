const Product = require("../../models/product.model")
const systemConfig = require("../../config/system")
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
    //sort
    let sort = {}
    if(req.query.sortKey && req.query.sortValue){
        sort[req.query.sortKey] = req.query.sortValue
    }else {
        sort.position = "desc"
    }
    //end sort

    const products = await Product.find(find)
        .sort(sort)
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
    req.flash("success", "Cập nhật trạng thái thành công")
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
            req.flash("success", `Cập nhật trạng thái ${ids.length} sản phẩm thành công.`)
            break;
        case "inactive":
            await Product.updateMany({ _id: { $in: ids } }, { status: "inactive" })
            req.flash("success", `Cập nhật trạng thái ${ids.length} sản phẩm thành công.`)
            break;
        case "delete-all":
            await Product.updateMany({ _id: { $in: ids } },
                {
                    deleted: true,
                    deletedAt: new Date()
                })
                req.flash("success", `Đã xóa ${ids.length} sản phẩm.`)
            break;
        case "change-position":
            for (const item of ids) {
                let [id, position] = item.split("-")
                position = parseInt(position)
                await Product.updateOne({ _id: id }, { position: position })
            }
            req.flash("success", `Đã đổi vị trí ${ids.length} sản phẩm.`)
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
//[GET] /admins/products
module.exports.create = async (req, res) => {
    res.render("admin/pages/products/create", {
        pageTitle: "Thêm sản phẩm"
    })
}

module.exports.createPost = async (req, res) => {
    req.body.price = parseInt(req.body.price)
    req.body.discountPercentage = parseInt(req.body.discountPercentage)
    req.body.stock = parseInt(req.body.stock)

    if(req.body.position == ""){
        const countProduct = await Product.countDocuments()
        req.body.position = countProduct + 1
    }else {
        req.body.position = parseInt(req.body.position)
    }
    // if(req.file){
    //     req.body.thumbnail = `/uploads/${req.file.filename}`
    // }
    const product = new Product(req.body)
    await product.save()
    // console.log(req.body)
    res.redirect(`${systemConfig.prefixAdmin}/products`)
}

//[GET] /admins/products/edit/:id
module.exports.edit = async (req, res) => {
    try {
        let find = {
            deleted: false,
            _id: req.params.id
        }
        const product = await Product.findOne(find)
        res.render("admin/pages/products/edit", {
            pageTitle: "Chỉnh sửa sản phẩm",
            product: product
        })
    } catch (error) {
        res.redirect(`${systemConfig.prefixAdmin}/products`)   
    }
}

//[PATCH] /admins/products/edit/:id
module.exports.editPatch = async (req, res) => {
    req.body.price = parseInt(req.body.price)
    req.body.discountPercentage = parseInt(req.body.discountPercentage)
    req.body.stock = parseInt(req.body.stock)

    // if(req.file){
    //     req.body.thumbnail = `/uploads/${req.file.filename}`
    // }
    const id = req.params.id
    try {
        await Product.updateOne({ _id: id}, req.body)
        req.flash("success", "Cập nhật thành công")
    } catch (error) {
        req.flash("error", "Cập nhật thất bại")
    }

    res.redirect("back")
}

//[GET] /admins/products/detail/:id
module.exports.detail = async (req, res) => {
    try {
        let find = {
            deleted: false,
            _id: req.params.id
        }
        const product = await Product.findOne(find)
        res.render("admin/pages/products/detail", {
            pageTitle: "Chi tiết sản phẩm",
            product: product
        })
    } catch (error) {
        res.redirect(`${systemConfig.prefixAdmin}/products`)   
    }
}