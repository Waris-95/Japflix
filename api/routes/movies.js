const router = require("express").Router();
const Movie = require("../models/Movie");
const verify = require("../verifyTokens");

//CREATE
router.post("/", verify, async (req, res) => {
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
  });
  
  //UPDATE
  router.put("/:id", verify, async (req, res) => {
    if (req.user.isAdmin) {
      try {
        const updatedMovie = await Movie.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedMovie);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("Not authorized to take this action");
    }
  });
  
  //DELETE
  router.delete("/:id", verify, async (req, res) => {
    if (req.user.isAdmin) {
      try {
        await Movie.findByIdAndDelete(req.params.id);
        res.status(200).json("Successfully Deleted");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("Not authorized to take this action");
    }
  });
  
  //GET
  router.get("/find/:id", verify, async (req, res) => {
    try {
      const movie = await Movie.findById(req.params.id);
      res.status(200).json(movie);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  

//GET RANDOM

//GET ALL