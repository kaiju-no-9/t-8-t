
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
        type:Number,
        required:true
    },
    y:{
        type:Number,
        required:true
    },
    },{
        _id:false 
    })
// schema for delcaring NodeMetadeata like type nodes used 
    const NodeDataSchema= new Schema({
        kind:{type:String, 
            enum:["action","trigger"] } ,
        metadata:Schema.Types.Mixed
    },{
        _id:false
    })


const  WorkflowNodeSchema= new Schema({
    id:{
        type:String,
        required:true
    },

    position:PostionSchema,
    Credencials:Schema.Types.Mixed,
    
    nodeId:{
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
    nodes:[WorkflowNodeSchema],
    edges :[EdgesSchema],
})
const CredentialsTypeSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true,
        enum:["string", "number"]
    },
    required:{
        type:Boolean,
        required:true
    },
})
// here  adding node Schema and its prop  ...  
const NodesSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    type:{
        type:String,
        enum:["action" , "trigger"],
        required:true
    },
    credentialsTypes:[CredentialsTypeSchema]
})

const ExecutionID= new Schema({
    WorkFlow:{
        type:mongoose.Types.ObjectId,
        required:true,
        ref:"WorkFlow"
    },
    status:{
        type:String,
        enum :["Success" , "Pending", "Failure"]

    },
    startTime:{
        type:Date, 
        default:Date.now()

    },
    endTime:{
        type:Date
    }

})
export const  User = mongoose.model("User" , UserSchema)
export const WorkFlow = mongoose.model("Workflow" , WorkFlowSchema)
export const Nodes =  mongoose.model("Nodes" , NodesSchema )
export  const execution =  mongoose.model("execution" , ExecutionID)
