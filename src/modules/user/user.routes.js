import { Router } from "express";
import { signin, signup } from "./user.controller.js";
import { signinVal, signupVal } from "./user.validate.js";
import { validate } from "../../middleware/validate.js";

const userRouter= Router()

userRouter.post('/signup',validate(signupVal),signup)
userRouter.post('/signin',validate(signinVal),signin)

export default userRouter