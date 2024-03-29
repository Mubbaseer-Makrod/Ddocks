import express from "express"
import { createOrder, getAllOrders, getOrderStatus, updateStatus } from "../controllers/order.controller"
import { getOrderById } from "../middlewares/order.middleware"
import { isAdmin, verifyJwt } from "../middlewares/auth.middleware"
import { getUserById, pushOrderInPurchaseList } from "../middlewares/user.middleware"
import { updateStock } from "../middlewares/product.middleware"

const router = express.Router()

router.param("orderId", getOrderById)
router.param("userId", getUserById)

// create route
router.route("/order/create/:userId").post(verifyJwt, pushOrderInPurchaseList, updateStock,createOrder)

// get all route
router.route("/orders/all/:userId").get(verifyJwt, isAdmin,getAllOrders)


router.route("/order/status/:orderId").get(getOrderStatus)
router.route("/order/update/:orderId/:userId").put(verifyJwt, isAdmin,updateStatus)

export default router