const express = require('express');
const mongoose = require("mongoose")
const {Account} = require("../db")
const authMiddleware = require("../middleware/authMiddlewware")

const accountsRouter = express.Router();

//To get balance
accountsRouter.get("/balance",authMiddleware,async (req,res)=>{
    const account = await Account.findOne({userId: req.userId})

    res.json({
        balance: account.balance
    })
})

accountsRouter.post("/transfer",authMiddleware,async(req,res)=>{
    const session = await mongoose.startSession()
    session.startTransaction()

    const {ammount,to} = req.body                                                             //Fetching the accounts
    const account = await Account.findOne({userId: req.userId}).session(session)
    if(!account || account.balance < ammount){                                                     
        await session.abortTransaction()
        return res.status(400).json({message: "Insufficient Balance"})
    }

    const toAccount = await Account.findOne({useId: req.to}).session(session)
    if(!toAccount){
        await session.abortTransaction()
        return res.status(400).json({message:"Account not found"})
    }

    await Account.updateOne({userId:req.userId},{$inc: {balance: -ammount}}).session(session)     //Perform Transaction
    await Account.updateOne({userId:to},{$inc: {balance: ammount}}).session(session)

    await session.commitTransaction()       
    console.log("Done")                                                    //Commit Transaction
    res.json({message: "Transfer Successfull"})
})

module.exports = accountsRouter