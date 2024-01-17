const express = require('express');
const router = express.Router()
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');
const Fetchuser = require('../middleware/fetchuser');


// routes 1 ::: Get all the notes using: GET "localhost:7000/api/notes/fetchallnotes". login reqeried
router.get("/fetchallnotes", Fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id })
        res.json(notes)
    }
    catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error")
    }
})


// routes 2 ::: Add new notes using: POST "localhost:7000/api/notes/addnote". login reqeried
router.post("/addnote", Fetchuser, [
    body('title', 'Enter valid title').isLength({ min: 3 }),
    body('description', 'Enter min 5 characters in description').isLength({ min: 5 })
],
    async (req, res) => {

        try {
            const { title, description, tag } = req.body

            // if there are errors, return bad request and the errors
            const result = validationResult(req);
            if (!result.isEmpty()) {
                return res.status(400).json({ errors: result.array() });
            }

            // add new note
            const note = new Note({
                title,
                description,
                tag,
                user: req.user.id
            })
            const saveNote = await note.save()
            res.json(saveNote)
        }
        catch (error) {
            console.error(error.message)
            res.status(500).send("Internal Server Error")
        }
    })



// routes 3 ::: Update notes using: PUT "localhost:7000/api/notes/updatenote". login reqeried
router.put("/updatenote/:id", Fetchuser, async (req, res) => {
    const { title, description, tag } = req.body

    try {
        // create a newNote object
        const newNote = {};
        if (title) {
            newNote.title = title
        }
        if (description) {
            newNote.description = description
        }
        if (tag) {
            newNote.tag = tag
        }

        // find the note to be updated and update it
        let note = await Note.findById(req.params.id)
        // note is not exist
        if (!note) {
            return res.status(404).send("Not Found")
        }

        // check existing note user is same or not
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note })
    }
    catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error")
    }
})




// routes 4 ::: Delete notes using: DELETE "localhost:7000/api/notes/deletenote". login reqeried
router.delete("/deletenote/:id", Fetchuser, async (req, res) => {
    
    try {
        // find the note to be deleted and delete it
        let note = await Note.findById(req.params.id)
        // note is not exist
        if (!note) {
            return res.status(404).send("Not Found")
        }

        // allow deletion only if user owns this note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await Note.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note has been deleted successfully", note: note })
    }
    catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error")
    }
})

module.exports = router