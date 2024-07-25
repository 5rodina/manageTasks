import joi from 'joi'


export const taskVal=joi.object({
    type:joi.string().min(3).max(20).required(), 
    type: joi.string().valid('Text', 'List').required(),
    visibility: joi.string().valid('Shared', 'Private').required(),
    textTask: joi.when('type', {
        is: 'Text',
        then: joi.string().required(),
        otherwise: joi.forbidden()
      }),
    listTask: joi.when('type', {
        is: 'List',
        then: joi.array().items(
          joi.object({
            textBody: joi.string().required()
          })
        ).required(),
        otherwise: joi.forbidden()
      }),
    category:joi.object().required(),
    creator:joi.object().required()
    
})