import { ObjectId } from "mongoose";
import { Category } from "../models/category.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";


const getCategoryId = asyncHandler(async (req, res, next) => {
    const name = req?.params?.category

    if(!name) {
        throw new ApiError(404, "Params not available")
    }

    const category = await Category.findOne({name })

    if(!category) {
        throw new ApiError(404, "Category Not Found")
    }

    req.category = category
    next()
})

export { getCategoryId }