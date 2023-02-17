const express = require("express");
const { NoteModel } = require("../model/Note.model");

const noteRouter = express.Router();

noteRouter.get("/", async (req, res) => {
    try {
        const notes = await NoteModel.find();
        res.send(notes)
    } catch (err) {
        res.send({ "msg": "Please Login", "error": err.message })
    }
})

noteRouter.post("/create", async (req, res) => {
    const payload = req.body;
    try {
        const note = new NoteModel(payload);
        await note.save()
        res.send({ "msg": "Note has been created" })
    } catch (err) {
        res.send({ "msg": "Something went Wrong", "Error": err.message })
    }

})


noteRouter.patch("/update/:id", async (req, res) => {
    payload = req.body
    const noteID = req.params.id;
    const note = await NoteModel.findOne({ "_id": noteID });
    const userID_in_note = note.userID;
    const userID_making_req = req.body.userID
    try {
        if (userID_making_req === userID_in_note) {
            await NoteModel.findByIdAndUpdate({ _id: noteID }, payload);
            res.send({ "msg": `Note id with ${noteID} has been updated` })
        } else {
            res.send({ "msg": "You are not authorized" })
        }

    } catch (err) {
        res.send({ "msg": "unable to update note", "error": err.message })
    }

})

noteRouter.delete("/delete/:id", async (req, res) => {
    const noteID = req.params.id;
    try {
        await NoteModel.findByIdAndDelete({ _id: noteID });
        res.send("Note has beend Deleted")
    } catch (err) {
        res.send({ "msg": "unable to Delete the note" })
    }
})



module.exports = {
    noteRouter
}