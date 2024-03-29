import {check, validationResult} from 'express-validator'
import { Category } from "../models/category.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';

/* help
middleware: getCategoryById
controller: 
1. createCategory
2. getCategory
3. getAllCategory
4. updateCategory
5. Remove Category
*/ 

const createCategory = asyncHandler(async (req, res) => {
    const error = validationResult(req.body)

    if(!error.isEmpty) {
        throw new ApiError(400, error)
    }

    const category = await Category.create(req.body)

    if(!category) {
        throw new ApiError(504, "DB response failed")
    }

    return res.status(200).json(
        new ApiResponse(200, category, "Category successfully created")
    )
})

const getCategory = asyncHandler(async (req, res) => {
    return res.status(200).json(
        new ApiResponse(200, req.category, "Success: Category Found")
    )
})

const getAllCategory = asyncHandler(async (req, res) => {

    const { page = 1, limit = 10 } = req.query

    const categories = await Category.find()
                            .limit( limit * 1)
                            .skip(( page - 1 ) * limit )
                            .exec(); 


    if(!categories) {
        throw new ApiError(404, "Failed: No Category Found")
    }

    return res.status(200).json(
        new ApiResponse(200, { categories, currentPage: page }, "Success: Category Found")
    )
})

const updateCategory = asyncHandler( async (req, res) => {
    const categoryId = req.category?._id
    
    const category = await Category.findByIdAndUpdate(categoryId, req.body, {new: true})

    return res.status(200).json(
        new ApiResponse(200, category, "Success: Update category")
    )
    
})

const deleteCategory = asyncHandler(async (req, res) => {
    const categoryId = req?.category?._id

    await Category.findByIdAndDelete(categoryId)

    return res.status(200).json(
        new ApiResponse(200, message="Success: Deleted successfully")
    )
})

export {createCategory, getCategory, getAllCategory, updateCategory, deleteCategory}