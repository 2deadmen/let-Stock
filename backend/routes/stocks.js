const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Stock = require('../models/stocks');
const { body, validationResult } = require('express-validator');

// ROUTE 1: Get All the Notes using: GET "/api/auth/getuser". Login required
router.get('/fetchall', fetchuser, async (req, res) => {
    try {
        const stocks = await Stock.find({ user: req.user.id });
        res.json(stocks)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 2: Add a new Note using: POST "/api/auth/addnote". Login required
router.post('/addstock', fetchuser, async (req, res) => {
        try {

            const { title,name } = req.body;
            const stocks = await Stock.findOne({ user: req.user.id ,title:title});
            if(stocks)
             { return res.status(400).json({error:"Stock already exists "});
        }
            // If there are errors, return Bad request and the errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const stock = new Stock({
                title,name, user: req.user.id
            })
            const savedNote = await stock.save()

            res.json(savedNote.title)

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    })

       //  delete an existing Note using: POST "/api/notes/deletenote". Login required
router.delete('/deletestock/:id', fetchuser, async (req, res) => {
    
    try {
     
   
     // Find the note and delete it
     let note = await Stock.findById(req.params.id);
     if(!note){return res.status(404).send("Not Found")}
 
     if(note.user.toString() !== req.user.id){
         return res.status(401).send("Not Allowed");
     }
 
     note = await Stock.findByIdAndDelete(req.params.id)
     res.json({"success":"note has been deleted"});
 } catch (error) {
     console.error(error.message);
     res.status(500).send("Internal Server Error");
 }
     })
 

module.exports = router