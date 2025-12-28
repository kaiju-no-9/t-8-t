import express from "express";
import   {User} from "./db" ;
import mongoose from "mongoose";   
import {z} from "zod"

mongoose.connect(process.env.MONGOSEURI!);


//// validation logic for zod for  various Schemas

const SignupSchema= z.object({
    username:z.string().min(5).max(10),
    password:z.string()
})


//////

const app =express()
app.use(express.json());



app.post("/signin",async(req,res)=>{
    const {success,data}= SignupSchema.safeParse(req.body)
    if (!success){
        res.status(403).json({
            message:"there is some error"
        })
        return
    }
    try{
        const user =  await User.create({
            username:data.username,
            password:data.password
        })
    }catch{
        res.status(411).json({
            message: " username alredy exists "
        })
    }
});

app.post("/signup",(req,res)=>{
    
});

app.put("/workflow",(req,res)=>{
    
});

app.get("/workflow/:workflowId",(req,res)=>{
    
});

app.get("/workflow/executions/:workflowId",(req,res)=>{


});
app.post("/credentials" , (req,res)=>{

})

app.get("/credentials", (req,res)=>{


})

app.get("/nodes" ,(req,res)=>{
    
})



app.listen(process.env.PORT || 3000)


