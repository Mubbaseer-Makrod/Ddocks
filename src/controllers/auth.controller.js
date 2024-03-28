import { User } from '../models/user.model.js'
import {check, validationResult} from 'express-validator'
import { ApiResponse } from '../utils/ApiResponse.js'
import { ApiError } from '../utils/ApiError.js'
import { asyncHandler } from '../utils/asyncHandler.js'


const registerUser = asyncHandler( async (req, res) => {
    const { email, password, name, lastname } = req.body
    const errors = validationResult(req)

    console.log("error is: ", errors)

    if(!errors.isEmpty()) {
        // console.log(new ApiError(422, "Registration Failed",errors))
        throw new ApiError(422, errors)
    }

    // checking if email is unique or not
    const existedUser = await User.findOne({email})

    if(existedUser) {
        throw new ApiError(400, "SignUp Failed: User already exist, Please User another email")
    }

    const user = await User.create({...req.body}) 

    // Fetch user from DB and create refreshToken and AccessToken
    const createdUser = await User.findOne({email})

    if(!createdUser) {
        throw new ApiError(400, "Failed to create user in the DB")
    }

    return res.status(200).json(
        new ApiResponse(200, createdUser, "User Successfully created")
    )
}
)

const loginUser = asyncHandler( async (req, res) => {
    const {email, password} = req.body

    const error = validationResult(req)

    if(!error.isEmpty()) {
        throw new ApiError(422,error)
    }

    const existedUser = await User.findOne({email})

    if(!existedUser) {
        throw new ApiError(402, "Credentails is not correct")
    }

    const isPasswordCorrect = await existedUser.isPasswordCorrect(password)

    const user = await User.findOne({email})
    
    if(!isPasswordCorrect) {
        throw new ApiError(402, user,"Password is not correct")
    }

    // generate accesstoken and responce token here
    const accessToken = await user.generateAccessToken()
    const refreshToken = await user.generateRefreshToken()

    user.refreshToken = refreshToken
    await user.save({ validateBeforeSave: false })

    return res.status(200)
    .cookie('accessToken', accessToken)
    .cookie('refreshToken', refreshToken)
    .json(
        new ApiResponse(200, user,"Login Success")
    )
})

const logoutUser = asyncHandler( async (req, res) => {
    return res
        .clearCookie("accessToken")
        .clearCookie("refreshToken")
        .json(
            new ApiResponse(200, "User Succesfully logout")
        )
})

export {registerUser, loginUser, logoutUser}