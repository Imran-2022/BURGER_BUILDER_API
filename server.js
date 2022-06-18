// connect mongodb
// run server

const dotenv=require('dotenv')

dotenv.config()

const app=require('./app')
const mongoose=require('mongoose')

const DB=process.env.MONGODB_SERVER.replace('<PASSWORD>',process.env.DB_PASSWORD)

mongoose.connect(DB)
.then(()=>{
    console.log("connected to mongoDB")
})
.catch(err=>console.log(err))

const port = process.env.PORT||3001;

app.listen(port,()=>{
    console.log(`Listening on port ${port}`)
})
