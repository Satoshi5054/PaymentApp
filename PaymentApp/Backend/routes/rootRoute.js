const express = require('express')
const userRouter = require("../routes/user")
const accountsRouter = require("../routes/account")

const rootRouter = express.Router()

rootRouter.use("/user",userRouter)
rootRouter.use("/account",accountsRouter)

module.exports = rootRouter;