import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


/* pushOrderInPurchaseList: Push the purchase order into the user  purchase 
1: fetch order data from the req
1: Save this data into database
*/

const pushOrderInPurchaseList = asyncHandler(async (req, res, next) => {
    const purchases = req?.body?.order?.products

    if(!purchases || purchases.lenght == 0) {
        return ApiError(400, "pushOrderInPurchaseList: No purchases to push into user:purchases")
    }

    const user = User.findOneAndUpdate(
        {_id: req?.user?._id }, 
        { $push: {purchases} }, 
        { 
            new: true, 
            validateBeforeSave: false 
        }
    )

    if(!user) {
        return new ApiError(404, "Unable to save purchase list: pushOrderInPurchaseList")
    }

    next()

})

const getUserById = asyncHandler(async (req, res) => {
    const userId = req.params

    const user = await User.findById(categoryId)

    if(!user) {
        throw new ApiError(404, "No Category Found")
    }

    return res.status(200).json(
        new ApiResponse(200, user, "Successfully fetched the category")
    )
})

export {getUserById, pushOrderInPurchaseList}