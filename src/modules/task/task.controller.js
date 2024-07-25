import Category from "../../../database/models/category.model.js"
import Task from "../../../database/models/task.model.js"
import { catchError } from "../../middleware/catchError.js"
import { appError } from "../../utils/appError.js"


export const addTask=catchError(async(req,res)=>{
   const result =await Task.create(req.body)
   res.json({message:'Added Successfully',result})
})
 
 export const getTask=catchError(async(req,res)=>{
   const result= await Task.find()
   res.json({message:"Success",result})
}
)
 export const getTaskById=catchError(async(req,res,next)=>{
   const { id: userId } = req.decodedToken 
   const result =await Task.findById(req.params.id)
      if(!result)  return next(new appError('task not found' ,401))

      if(result.visibility!=='Private') res.json({message:"Success",result})
       else {
          if (result.creator.toString() === userId) {
            return res.json({ message: "Success", result });
          } else {
            return next(new appError("Sorry, you aren't the owner",401))
          }
        }
      })
  
 export const updateTask=catchError(async(req,res,next)=>{
   const result= await Task.findByIdAndUpdate(req.params.id,req.body,{ new: true })
   if(!result) return next(new appError('task not found' ,401))
   res.json({message:'Updated Successfully',result})
})
 
 export const deleteTask=catchError(async(req,res,next)=>{
   const result= await Task.findByIdAndDelete(req.params.id)
   if(!result)  return next(new appError('task not found' ,401))
      res.json({message:'Deleted Successfully',result})
})

 export const getTasksByLimit=catchError(async(req,res,next)=>{
   const limit=req.query.limit
   const page=req.query.page
   const skip = (page - 1) * limit
   const result= await Task.find().limit(limit).skip(skip)
   res.json({message:"Success",result})
})

 export const search=catchError(async(req,res,next)=>{
   if (req.query['category.name']) {
       const category = await Category.findOne({ name: req.query['category.name'] });
 
       if (category) {
         const result = await Task.find({ category: category._id }).populate('category');
         res.json({ message: "success", result });
       } else {
           return next(new appError('task not found' ,401))
       }
   }
   else if(req.query.visibility){
      const result= await Task.find({visibility:req.query.visibility}).populate('category')
      res.json({message:"success" ,result}) 
   }else {
      return next(new appError('No query parameters provided' ,400))
  }
  })