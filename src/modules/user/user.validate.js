import joi from 'joi'


export const signupVal=joi.object({
    name:joi.string().min(3).max(20).required(), 
    email:joi.string().email().required(),
    password:joi.string().pattern(/^[A-Z][A-Za-z0-9]{8,40}$/).required
})

export const signinVal=joi.object({
    email:joi.string().email().required(),
    password:joi.string().pattern(/^[A-Z][A-Za-z0-9]{8,40}$/).required
})

