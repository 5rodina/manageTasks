import { Router } from "express"
import { addTask, deleteTask, getTask, getTaskById, getTasksByLimit, search, updateTask } from "./task.controller.js"
import { verifyToken } from "../../middleware/verifytoken.js"
import { taskval} from './task.validate.js'
import { validate } from "../../middleware/validate.js"


const taskRouter=Router()

taskRouter.use(verifyToken)

taskRouter.get('/limit',getTasksByLimit)
taskRouter.get('/search',search)
taskRouter.route('/',validate(taskval)).get(getTask).post(addTask)
taskRouter.route('/:id',validate(taskval)).get(getTaskById).put(updateTask).delete(deleteTask)

export default taskRouter