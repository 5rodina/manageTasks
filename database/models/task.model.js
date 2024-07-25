import mongoose, { Schema } from "mongoose" 

const taskSchema=mongoose.Schema({
    title:{ 
        type: String, 
        required: true
    },
    type:{ 
        type: String, 
        enum: ['Text', 'List'], 
        required: true 
    },
    visibility:{ type: String,
        enum: ['Shared', 'Private'],
        required: true 
    },
    textTask:{
         type: String 
    },
    listTask: [{
         textBody: String 
    }], 
    category: {
         type: Schema.Types.ObjectId, 
         ref: 'Category', 
         required: true 
    },
    creator:{
        type: Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    }
  })

  const Task=mongoose.model('Task',taskSchema)

  export default Task