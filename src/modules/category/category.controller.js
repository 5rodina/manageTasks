import Category from "../../../database/models/category.model.js"
import { catchError } from "../../middleware/catchError.js"
import { appError } from "../../utils/appError.js"

export const addCategory=catchError(async(req,res)=>{
    const result =await Category.create(req.body)
    res.json({message:'Added Successfully',result})
 })
 
 export const getCategory=catchError(async(req,res)=>{
    const result= await Category.find()
    res.json({message:"Success",result})
 }
 )
 export const getCategoryById=catchError(async(req,res,next)=>{
    const result =await Category.findById(req.params.id)
    if(!result) return next(new appError('category not found' ,401))
    res.json({message:'Success',result})
})
 
 export const updateCategory=catchError(async(req,res,next)=>{
    const result= await Category.findByIdAndUpdate(req.params.id,req.body,{ new: true })
    if(!result) return next(new appError('category not found' ,401))
    res.json({message:'Updated Successfully',result})
})
 
 export const deleteCategory=catchError(async(req,res,next)=>{
    const result= await Category.findByIdAndDelete(req.params.id)
    if(!result)  return next(new appError('category not found' ,401))
    res.json({message:'Deleted Successfully',result})
})

 