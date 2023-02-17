const express = require("express");
const { connection } = require("./db");
const { userRouter } = require("./routes/User.routes");
const { noteRouter } = require("./routes/Note.route")
const { authentication } = require("./middlewares/auth.middleware")
// const dotenv = require('dotenv')
require('dotenv').config()
const cors = require("cors")
const app = express();


app.use(express.json());
app.use(cors())

app.get("/", (req, res) => {
    res.send("HomePage")
})

app.use("/users", userRouter)
app.use(authentication)
app.use("/notes", noteRouter)

app.listen(process.env.port, async () => {
    try {
        await connection;
        console.log("COnnected to DB")
    } catch (e) {
        console.log(e.massege)
    }
    console.log("Server is running on port 8000");
})