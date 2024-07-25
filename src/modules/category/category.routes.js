import { Router } from "express"
import { addCategory, deleteCategory, getCategory, getCategoryById, updateCategory } from "./category.controller.js"
import { verifyToken } from "../../middleware/verifytoken.js"
import { categoryVal } from "./category.validate.js"
import { validate } from "../../middleware/validate.js"

const categoryRouter=Router()

categoryRouter.use(verifyToken)
categoryRouter.route('/',validate(categoryVal)).get(getCategory).post(addCategory)
categoryRouter.route('/:id',validate(categoryVal)).get(getCategoryById).put(updateCategory).delete(deleteCategory)

export default categoryRouter