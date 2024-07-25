import mongoose from 'mongoose'

mongoose.connect('mongodb://localhost:27017/task')
        .then(()=>console.log('Database connected successfully...'))
        .catch((err)=>console.log(err))

