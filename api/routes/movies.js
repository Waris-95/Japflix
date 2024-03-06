const router = require("express").Router();
const Movie = require("../models/Movie");
const verify = require("../verifyTokens");

//CREATE
router.post("/", verify, async (req, res)=> {
    if (req.user.isAdmin) {
        const newMovie = new Movie(req.body);
        try {
            const savedMovie = await newMovie.save();
            res.status(201).json(savedMovie);
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("Not authorized to take this action");
    }
})

//UPDATE

//DELETE

//GET

//GET RANDOM

//GET ALL