const router = require("express").Router();
const Movie = require("../models/Movie");
const verify = require("../verifyTokens");

//CREATE
router.post("/", verify, async (req, res)=> {
    if (req.user.isAdmin) {
        const newMovie = new Movie(req.body);
        try {

        } catch (err) {
            res.status(500).json(err);
        }
    }
})

//UPDATE

//DELETE

//GET

//GET RANDOM

//GET ALL