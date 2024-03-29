import { Product } from "../models/product.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createProduct = asyncHandler(async( req, res ) => {
    const productData = req.body

    const product = await Product.create(productData)

    if(product.lenght == 0) {
        throw new ApiError(404, "Product creation failed Product: createProduct")
    }

    return res.status(200).json(
        new ApiResponse(200, product, "Product create success")
    )
})

const updateProduct = asyncHandler(async (req, res) => {
    const productData = req?.product

    const updatedProduct = await Product.findByIdAndUpdate(productData._id,
        {
            ...req.body
        },
        { new: true, saveBeforeValidation: false })

    if(!updateProduct) {
        throw new ApiError(404, "Updation Failed Product: updateProduct")
    }

    return res.status(200).json(
        new ApiResponse(200, updatedProduct, "Updation Success Product: updateProduct")
    )
})

const deleteProduct = asyncHandler( async (req, res) => {
    const productId = req?.product?._id

    const product = await Product.findByIdAndDelete({_id: productId})

    if(product.lenght == 0) {
        throw new ApiError(404, "deletion error: Product: deleteProduct")
    }

    return res.status(200).json(
        new ApiResponse(200, message="Product delete Success")
    )
})

const getProduct = asyncHandler(async (req,res) => {
    return res.status(200).json(
        new ApiResponse(200, req?.product, "Success product detail fetched")
    )
})

const getAllProduct = asyncHandler(async (req,res) => {
    const { page = 1, limit = 10 } = req.query

    const products = await Product.find()
                            .sort({ createdAt: 'desc' })
                            .populate("category")
                            .skip((page - 1) * limit)

    if(products.length == 0) {
        throw new ApiError(404, "No Product Available")
    }

    return res.status(200).json(
        new ApiResponse(200, {products, page}, "Success: Products fetchs Product: getAllProduct")
    )
})

const getAllUniqueCategory = asyncHandler(async (req,res) => {
    const uniqueCategory = await Product.distinct("category")

    if(uniqueCategory.length == 0) {
        throw new ApiError(404, "No Unique Category Found Product: getAllUniqueCategory")
    }

    return res.status(200).json(
        new ApiResponse(200, uniqueCategory, "Successfully fetched all the unique category")
    )
})

export { createProduct, updateProduct, deleteProduct, getProduct, getAllProduct, getAllUniqueCategory }