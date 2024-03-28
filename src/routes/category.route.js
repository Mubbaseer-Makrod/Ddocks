import express from "express";
import { checkSchema } from "express-validator";
const router = express.Router()

//import Validation Schema 
import { categoryValidator } from "../validators/category.validator.js";

//import Middleware
import { getCategoryId } from "../middlewares/category.middleware.js";

// import controllers
import { createCategory, getCategory, getAllCategory, updateCategory, deleteCategory } from "../controllers/category.controller.js";


router.param("category", getCategoryId);


router.route("/createCategory").post(checkSchema(categoryValidator),createCategory)
router.route("/getCategory/:category").get( getCategory)
router.route("/getAllCategory").get(getAllCategory)
router.route("/updateCategory/:category").put( updateCategory)
router.route("/deleteCategory/:category").delete(deleteCategory)

export default router