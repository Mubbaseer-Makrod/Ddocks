import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";


const verifyJwt = asyncHandler(async (req, res, next) => {
    const token = req.cookies?.accessToken || req.header?.authorization

    if(!token) {
        throw new ApiError(401, "Token unavailable")
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

    const user = await User.findById(decodedToken?._id).select(
        "-password -refreshToken"
    )

    if(!user) {
        throw new ApiError(401, "Invalid Access Token")
    }

    req.user = user
    next()
})

const isAdmin = asyncHandler(async (req, res, next) => {
    if(req.user.role === 0) {
        throw new ApiError(401, "User is not Admin")
    }
})

export {verifyJwt, isAdmin}