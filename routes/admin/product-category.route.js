const express = require('express')
const multer = require('multer')
const upload = multer()
const validate = require("../../validate/admin/product-category.validate")
const uploadCloud = require("../../middlewares/admin/uploadCloudMiddlewares")
const router = express.Router()

const controller = require("../../controllers/admin/product-category.controller")

router.get("/", controller.index)

router.get("/create", controller.create)

router.post("/create", upload.single("thumbnail"), uploadCloud.upload, validate.createPost,
    controller.createPost)

// router.get("/create", controller.create);

module.exports = router
