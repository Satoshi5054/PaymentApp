const express = require("express")
const zod = require("zod");
const jwt = require("jsonwebtoken")
const {JWT_SECRET}= require("../config")
const {User,Account} = require("../db")
const authMiddleware = require("../middleware/authMiddlewware")

const userRouter = express.Router()

//Body of input of signIn
const signupBody = zod.object({
    username: zod.string(),
    password: zod.string(),
	firstname: zod.string(),
	lastname: zod.string()
})

//Body of input of signUp
const signinBody = zod.object({
    username: zod.string(),
    password: zod.string()
})

//Body of input of Update User
const updateBody = zod.object({
    firstname: zod.string().max(50).optional(),
	lastname: zod.string().max(50).optional(),
	password: zod.string().min(6).optional()
})

//SignIn Logic
userRouter.post("/signup",async (req,res)=>{
    const {success} = signupBody.safeParse(req.body)
    if(!success){
        return res.status(411).json({
            message: "1: Email already taken / Incorrect inputs"
        })
    }

    const existingUser = await User.findOne({
        username: req.body.username
    })
    if (existingUser) {
        return res.status(411).json({
            message: "2: Email already taken/Incorrect inputs"
        })
    }

    const user = await User.create({                                         //User Created
        username: req.body.username,
        password: req.body.password,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
    })
    const userId = user._id
    console.log(userId)
    await Account.create({                                                  //Account Created
        userId: userId,
        balance: 1 + Math.random()*10000
    })
    
    const token = jwt.sign({userId},JWT_SECRET)

    res.json({message:"user created succesfully",token: token})
})

//SignUp Logic
userRouter.post("/signin",async (req,res)=>{
    const {success} = signinBody.safeParse(req.body)
    if(!success){
        return res.status(411).json({
            message: "User does not exits/Incorrect Inputs"
        })
    }
    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password
    })

    if (user) {
        const token = jwt.sign({
            userId: user._id
        }, JWT_SECRET);
  
        res.json({
            token: token
        })
        return;
    }

    
    res.status(411).json({
        message: "Error while logging in"
    })
})

//Update User Information
userRouter.put("/",authMiddleware,async (req,res)=>{
    const { success } = updateBody.safeParse(req.body)
    if (!success) {
        res.status(411).json({
            message: "Error while updating information"
        })
    }

	await User.updateOne({ _id: req.userId }, req.body);
	
    res.json({
        message: "Updated successfully"
    })
})


//Filter Users
userRouter.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstname: {
                "$regex": filter
            }
        }, {
            lastname: {
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstname: user.firstname,
            lastname: user.lastname,
            _id: user._id
        }))
    })
})


module.exports = userRouter