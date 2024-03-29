import express from "express";
import { checkSchema } from "express-validator";

//import Validation Schema 
import { categoryValidator } from "../validators/category.validator.js";

//import Middleware
import { isAdmin, verifyJwt } from "../middlewares/auth.middleware.js";
import { getUserById } from "../middlewares/user.middleware.js";
import { getCategoryId } from "../middlewares/category.middleware.js";

// import controllers
import { createCategory, getCategory, getAllCategory, updateCategory, deleteCategory } from "../controllers/category.controller.js";


const router = express.Router()

router.param("category", getCategoryId);
router.param("userId", getUserById)

// create Route
router.route("/category/create").post(verifyJwt, isAdmin ,checkSchema(categoryValidator),createCategory)

// update Route
router.route("/category/:categoryId/:userId").put(verifyJwt, isAdmin, updateCategory)

// delete Route
router.route("/category/delete/:category").delete(verifyJwt, isAdmin, deleteCategory)

// get Route
router.route("/category").get( getCategory)
router.route("/categories").get(getAllCategory)


export default router