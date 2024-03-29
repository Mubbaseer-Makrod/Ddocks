import express from "express"

// import middleware
import { getUserById } from "../middlewares/user.middleware"

// import controllers
import { getUser, updateUser, userPurchaseList } from "../controllers/user.controller"
import { verifyJwt } from "../middlewares/auth.middleware"


const router = express.Router()

router.param("userId", getUserById)

// update route
router.route("/user/update").post(verifyJwt, updateUser)

// get route
router.route("/user/:userId").get(verifyJwt,getUser)

router.route("/order/user/:userId").get(verifyJwt, userPurchaseList)

export default router