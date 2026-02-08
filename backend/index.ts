import express from "express";
import { User } from "./db";
import mongoose from "mongoose";
import { z } from "zod"
import jwt, { type JwtPayload } from "jsonwebtoken";
import "dotenv/config";
import { authMiddleware } from "./middleware";


//// validation logic for zod for  various Schemas

const SignupSchema = z.object({
  username: z.string().min(5).max(100),
  password: z.string()
})

const CreateWorkflowSchema = z.object({
 //nodes..........................................
  nodes:z.array(z.object({
    types:z.string(),
    data :z.object({
      kind:z.enum(["action" , "trigger"]),
      metadat:z.any(),
    }), 
    id:z.string(),
    position:z.object({
      x:z.number(),
      y:z.number()
    })
  })),
  //edges..........................................
  edges:z.array(z.object({
    id:z.string(),
    source:z.string(),
    target:z.string()
  }))

})

const app = express()
app.use(express.json());



const SigninSchema = z.object({
  username: z.string(),
  password: z.string()
})


app.post("/signup", async (req, res) => {
  const { success, data } = SignupSchema.safeParse(req.body);

  if (!success) {
    return res.status(403).json({
      message: "Invalid input"
    });
  }

  const existingUser = await User.findOne({
    username: data.username
  });

  if (existingUser) {
    return res.status(400).json({
      message: "User already exists"
    });
  }

  try {
    const user = await User.create({
      username: data.username,
      password: data.password
    });
   

    res.json({
      message: "Signup successful",
      userId: user._id,
      
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error"
    });
  }
});


app.post("/signin", async (req, res) => {
  const { success, data } = SigninSchema.safeParse(req.body);

  if (!success) {
    return res.status(403).json({
      message: "Invalid input"
    });
  }

  const user = await User.findOne({
    username: data.username,
    password: data.password
  });

  if (!user) {
    return res.status(401).json({
      message: "Invalid username or password"
    });
  }

  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET!) ;
  res.json({
    message: "Signin successful",
    userId: user._id,
    token
  });
});





app.put("/workflow",authMiddleware, (req, res) => {
  const { success, data } = CreateWorkflowSchema.safeParse(req.body);
  const userId = req.userId;
});

app.get("/workflow",authMiddleware, (req, res) => {

});

app.get("/workflow/:workflowId",authMiddleware, (req, res) => {

});
app.get("/workflow/executions/:workflowId",authMiddleware, (req, res) => {


});
app.post("/credentials",authMiddleware, (req, res) => {

})

app.get("/credentials", (req, res) => {


})

app.get("/nodes", (req, res) => {

})



async function main() {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log("✅ MongoDB connected");

    app.listen(3000, () => {
      console.log("Server running on port 3000");
    });
  } catch (err) {
    console.error("MongoDB connection failed", err);
    process.exit(1);
  }
}

main();



