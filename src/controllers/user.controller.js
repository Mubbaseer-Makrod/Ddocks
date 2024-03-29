import { Order } from "../models/order.model";
import { User } from "../models/user.model";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";

const getUser = asyncHandler( async (req, res) => {
    return res.status(200).json(
        new ApiResponse(200, req.user, "success: User fetched")
    )
}) 

const updateUser = asyncHandler( async (req, res) => {
    const userId = req.user?._id

    const user = await User.findByIdAndUpdate(userId, req.body, {new: true}).select(
        "-password -refreshToken"
    )

    if(!user) {
        throw new ApiError(404, "Update Failed")
    }

    return res.status(200).json(
        new ApiResponse(200, user, "User Updated Succesfully")
    )

})

const userPurchaseList = asyncHandler( async(req, res) => {
    const user = req?.user?._id

    const order = Order.find({user})

    if(!order) {
        throw new ApiError(404, "UserPurchaseList: Database response error")
    }

    return res.status(200),json(
        new ApiResponse(200, order, "Order list is empty")
    )
})