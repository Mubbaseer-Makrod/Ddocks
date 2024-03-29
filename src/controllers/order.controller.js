import { Order } from "../models/order.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createOrder = asyncHandler(async (req, res) => {
    const orderData = req?.body

    const order = await Order.create({...orderData})

    if(!order) {
        throw new ApiError(404, "Order is not registered Order: createOrder")
    }

    return res.status(200).json(
        new ApiResponse(200, order, "Success: Order is created")
    )
})

const getAllOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find()
                        .populate("user","_id name")

    if(!orders) {
        throw new ApiError(404, "No order Found Order: getAllOrder")
    }

    return res.status(200).json(
        new ApiResponse(200, orders, "successfully fetched Order: getAllOrder")
    )
})

const getOrderStatus = asyncHandler(async (req, res) => {
    return res.status(200).json(
        new ApiResponse(200, req.order.status,  "Order status success Order: getOrderStatus")
    )
})

const updateStatus = asyncHandler(async (req, res) => {
    const status = req?.body?.status

    if(!status) {
        throw new ApiError(404, "Status not present in body")
    }
    const order = await Order.findByIdAndUpdate(
        {_id: req.order._id},
        {status}
    )

    if(!order) {
        throw new ApiError(404, "Something went wrong in updating order status Order: updateStatus")
    }

    return res.status(200).json(
        new ApiResponse(200, order, "Successfully updated the order status")
    )
})

export {createOrder, getAllOrders, getOrderStatus, updateStatus}