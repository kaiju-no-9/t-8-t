import express from "express";
import { User, WorkFlow, Nodes, execution } from "./db";
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
  nodes: z.array(z.object({
    type: z.string(),
    data: z.object({
      kind: z.enum(["action", "trigger"]),
      metadata: z.any(),
    }),
    id: z.string(),
    position: z.object({
      x: z.number(),
      y: z.number()
    })
  })),
  //edges..........................................
  edges: z.array(z.object({
    id: z.string(),
    source: z.string(),
    target: z.string()
  }))

})
const UpdateWorkflowSchema = z.object({
  //nodes..........................................
  nodes: z.array(z.object({
    type: z.string(),
    data: z.object({
      kind: z.enum(["action", "trigger"]),
      metadata: z.any(),
    }),
    id: z.string(),
    position: z.object({
      x: z.number(),
      y: z.number()
    })
  })),
  //edges..........................................
  edges: z.array(z.object({
    id: z.string(),
    source: z.string(),
    target: z.string()
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

  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET!);
  res.json({
    message: "Signin successful",
    userId: user._id,
    token
  });
});





app.post("/workflow", authMiddleware, async (req, res) => {
  const { success, data } = CreateWorkflowSchema.safeParse(req.body);
  if (!success) {
    return res.status(403).json({
      message: "Invalid ..input.."
    });

  }
  try {
    const workflow = await WorkFlow.create({
      userId: req.userId,
      nodes: data.nodes,
      edges: data.edges
    });
    res.json({
      message: "Workflow created successfully",
      workflow
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to create workflow"
    });
  }



});

app.put("/workflow/:workflowId", authMiddleware, async (req, res) => {
  const { success, data } = UpdateWorkflowSchema.safeParse(req.body);
  if (!success) {
    return res.status(403).json({
      message: "Invalid input"
    });

  }
  try {
    const workflow = await WorkFlow.findByIdAndUpdate(req.params.workflowId, data, { new: true });
    if (!workflow) {
      return res.status(404).json({
        message: "Workflow not found"
      });
    }

  } catch (err) {
    res.status(500).json({
      message: "Failed to update workflow"
    });
  }
});
// for workflow Id validation 
app.get("/workflow/:workflowId", authMiddleware, async (req, res) => {
  const workflow = WorkFlow.findById(req.params.workflowId);
  if (!workflow) {
    return res.status(404).json({
      message: "Workflow not found"
    });
  };
  res.json({
    message: "..Workflow found..",
    workflow
  });
});

// for execution 
app.get("/workflow/executions/:workflowId", authMiddleware, async (req, res) => {
  const executions = await execution.find({
    WorkFlow: req.params.workflowId
  });
  res.json({executions})

});

// nodes 
app.get("/nodes", (req, res) => {
  const nodes = Nodes.find();
  res.json({nodes})

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



