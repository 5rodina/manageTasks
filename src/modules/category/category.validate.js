import joi from 'joi'


export const categoryVal=joi.object({
    name:joi.string().min(3).max(20).required(), 
    user:joi.object().required()
    
})