/**
getProductById: take product_id, attach product data in req: req.product 
photo: take photo from req.product and send photo
updateStock: req has order, update the stock of each product present in order
*/

import { Product } from "../models/product.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


const getProductById = asyncHandler((req, res, next) => {
    const productId = req.body.productId

    const product = Product.findById(productId)

    if(!productId) {
        throw new ApiError(404, "No Product found Product: getProductById")
    }

    req.product = product

    next()
})

const photo = asyncHandler(async (req, res, next) => {
    const productPhoto = req?.product?.photo

    if(!productPhoto) {
        next()
    }

    return res.status(200).json(
        new ApiResponse(200, productPhoto, "succesfully fetched Product Photo: photo middleware")
    )
})

const updateStock = asyncHandler(async (req, res, next) => {
    const products = req?.body?.order?.products

    if(!products || products.length == 0) {
        throw new ApiError(404, "Order list is not Available Products: updateStock")
    }

    products.map( async (productData) => {
        return  {
            updateOne: {
                "filter": { _id: productData._id },
                "update": { $inc: { stock: -productData.count, sold: productData.count}},
            }
        }
    })

    Product.bulkWrite(products, {new: true, saveBeforeValidation: false})
    .then(products => next())
    .catch(error => new ApiError(404, `Error: ${error}, BulkProduct: updateStock`))
})

export { getProductById, photo, updateStock }