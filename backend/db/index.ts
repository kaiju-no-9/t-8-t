
import mongoose,{Schema} from "mongoose";


const  UserSchema = new Schema ({
    username:{
        name:String,
        required:true
    },
    password:{
        name:String ,
        required:true
    }
})

// the for data related to edges 
const EdgesSchema =new Schema({
    id:{
        type:String,
        required:true
    },
    source:{
        type:String,
        required:true
    },
    target:{
        type:String,
        required:true
    }
},
{
    _id:false
})

// for  intial the postion  of blocks comming from pront end 
const PostionSchema  = new Schema({
    x:{
        type:String,
        required:true
    },
    y:{
        type:String,
        required:true
    },
    },{
        _id:false 
    })
// schema for delcaring NodeMetadeata like type nodes used 
    const NodeDataSchema= new Schema({
        kind:{type:String, 
            enum:["Action","Trigger"] } ,
        metadata:Schema.Types.Mixed
    },{
        _id:false
    })


const  NodeSchema = new Schema({
    id:{
        type:String,
        required:true
    },

    position:PostionSchema,
    Credencials:Schema.Types.Mixed,
    
    type:{
        type: mongoose.Types.ObjectId,
        ref:"Nodes"
    },
    data:NodeDataSchema
})

// so here the bottom userId referse to what is above 
const WorkFlowSchema= new Schema ({
    userId:{
        type:mongoose.Types.ObjectId,
        required:true ,
        ref:"User "
    },
    nodes:[NodeSchema],
    edges :[EdgesSchema],
})

export const  User= mongoose.model("User" , UserSchema)
export const WorkFlow = mongoose.model("Workflow" , WorkFlowSchema)

