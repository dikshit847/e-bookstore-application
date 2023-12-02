import  express  from "express";
import {isAdmin, requireSignIn} from '../middlewares/authMiddleware.js';
import { categoryController, createCategoryController, deletecategoryController, singleCategoryController, updateCategoryController } from "../controllers/CategoryController.js";

const router = express.Router()

router.post('/create-category', requireSignIn,isAdmin, createCategoryController)

// update category

router.put('/update-category/:id', requireSignIn, isAdmin, updateCategoryController)


// get all category
router.get('/get-category', categoryController)

// single category
router.get('/single-category/:slug', singleCategoryController)

// delete category
router.delete('/delete-category/:id', requireSignIn, isAdmin, deletecategoryController)

export default router;