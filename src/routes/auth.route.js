import express from "express";
import { checkSchema } from "express-validator";
const router = express.Router()


//Middleware import 
import { isAdmin, verifyJwt } from "../middlewares/auth.middleware.js";


// controller import 
import { registerUser, loginUser, logoutUser } from "../controllers/auth.controller.js";


// Validator import 
import { signUpValidator } from "../validators/auth.validator.js";

router.route("/signUp").post(checkSchema(signUpValidator), registerUser)
router.route("/loginUser").post(loginUser)
router.route("/logoutUser").post(verifyJwt, logoutUser)

export default router