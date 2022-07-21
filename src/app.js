const express=require("express")
const mongoose=require('mongoose')
const app=express()
const route=require('./routes/route')

app.use(express.json())

app.use('/',route)


let url="mongodb+srv://Deependra1999:Z1ZWVlMvcAFQsu2u@cluster0.4nkid.mongodb.net/Koinx";

mongoose.connect(url,{useNewUrlParser:true})
.then(()=>console.log("connected to database"))
.catch((err)=>console.log(err))


app.listen(3000,()=>{
    console.log('running on port 3000')
})

