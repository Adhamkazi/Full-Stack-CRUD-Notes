const express = require("express");
const { UserModel } = require("../model/User.model")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

const userRouter = express.Router()


userRouter.get("/", async (req, res) => {
    try {
        const users = await UserModel.find();
        res.send(users)
    } catch (err) {
        res.send("unabel to get data")
    }
})

userRouter.post("/register", async (req, res) => {
    const { name, email, pass } = req.body;
    try {
        bcrypt.hash(pass, 5, async (err, hash) => {
            if (err) {
                res.send(err.message);
            } else {
                const user = new UserModel({ name, email, pass: hash });
                await user.save();
                res.send({ "msg": "New user has been Reqistered" });
            }
        })
    } catch (e) {
        res.send({ "msg": "Something went worng", "ERROR": e.message })
    }
})
userRouter.post("/login", async (req, res) => {
    const { email, pass } = (req.body);
    try {
        const user = await UserModel.find({ email });
        if (user.length > 0) {
            bcrypt.compare(pass, user[0].pass, (err, result) => {
                if (result) {
                    let token = jwt.sign({ userID: user[0]._id }, "masai")
                    res.send({ "MSG": "Logged In", "token": token })
                } else {
                    res.send({ "msg": "worng credentials" })
                }
            });

        } else {
            res.send({ "msg": "worng credentials" })
        }
    } catch (e) {
        res.send({ msg: "Something went worng", })
    }
})
module.exports = {
    userRouter
}