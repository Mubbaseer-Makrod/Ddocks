// 4: getOrderById --> Middleware

import { Order } from "../models/order.model";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";

const getOrderById = asyncHandler(async (req, res, next ) => {
    const orderId = req?.query

    const order = await Order.findById(orderId) 

    if(!order) {
        throw new ApiError(404, "Middleware: Order Id not Found Order: getOrderById")
    }

    req.order = order 

    next()
})

