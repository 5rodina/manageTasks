process.on('uncaughtException',()=>{
    console.log('error in code')
})

import express from 'express'
import './database/dbCon.js'
import userRouter from './src/modules/user/user.routes.js'
import categoryRouter from './src/modules/category/category.routes.js'
import taskRouter from './src/modules/task/task.routes.js'
import { appError } from './src/utils/appError.js'
import { globalError } from './src/middleware/globalError.js'
const app = express()
const port = 3000

app.use(express.json())



app.use('/user',userRouter)
app.use('/category',categoryRouter)
app.use('/task',taskRouter)

app.use('*',(req,res,next)=>{
  next(new appError(`route not found ${req.originalUrl}`,404))
})

app.use(globalError)

process.on('unhandeledRejection',(err)=>{
   console.log('error',err)
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))