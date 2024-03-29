import express from "express"
import { createProduct, deleteProduct, getAllProduct, getAllUniqueCategory, getProduct, updateProduct } from "../controllers/product.controller"
import { photo } from "../middlewares/product.middleware"
import { isAdmin, verifyJwt } from "../middlewares/auth.middleware"

const router = express.Router()


// create route
router.route("/product/create").post(verifyJwt, isAdmin, createProduct)

// update Route
router.route("/product/:productId/:userId", ).put(verifyJwt, isAdmin, updateProduct)

//delete Route
router.route("/product/:productId/:userId").delete(verifyJwt, isAdmin, deleteProduct)

// get route
router.route("/product/:productId").get(getProduct)
router.route("/product/photo/:productId").get(photo)

//listing route
router.route("/products").get(getAllProduct)
router.route("/products/categories").get(getAllUniqueCategory)

export default router