/*
1. createProduct
2. getProduct
3. updateProduct
4. deleteProduct
5. getAllProducts
6. getAllUniqueCategory
*/

import { Product } from "../models/product.model";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";

const createProduct = asyncHandler(async( req, res ) => {
    const productData = req.body

    const product = await Product.create(product)

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
        new ApiResponse(200, updateProduct, "Updation Success Product: updateProduct")
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