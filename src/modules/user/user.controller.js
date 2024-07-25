
import jwt from 'jsonwebtoken'
import User from "../../../database/models/user.model.js"
import bcrypt from 'bcrypt'
import { catchError } from '../../middleware/catchError.js'
import { appError } from '../../utils/appError.js'

export const signup=catchError( async (req,res,next)=>{
    const {name,email,password,role}=req.body
    const user=await User.findOne({email})
    if(user) return next(new appError('email already exists' ,401)) 
    const hashed=await bcrypt.hash(password,5)
    const result= await User.create({name,email,password:hashed,role})
    res.json({message:'signed up successfully',result})
})

export const signin=catchError(async(req,res,next)=>{
    const {email,password}=req.body

    const user=await User.findOne({email})
    if (!user) {
        return next(new appError('Invalid email or password' ,401))
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
        return next(new appError('Invalid email or password' ,401))
    }
    jwt.sign({id:user._id,name:user.name,role:user.role},
        'rodina',(err,token)=>{
            res.status(200).json({ message: 'Signed in successfully', token});
        }
    )
})