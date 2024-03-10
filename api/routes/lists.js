const router = require("express").Router();
const List = require("../models/List");
const verify = require("../verifyToken");

//CREATE
router.post("/", verify, async (req, res) => {
  if (req.user.isAdmin) {
    const newList = new List(req.body);
    try {
      const savedList = await newList.save();
      res.status(201).json(savedList);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("Not authorized to take this action");
  }
});

//DELETE
router.delete("/:id", verify, async (req, res) =>  {
    if (req.user.isAdmin) {
        try {
            await List.findByIdAndDelete(req.params.id);
            res.status(201).json("Deletion Successful");
        } catch (err) {
            res.status(500).json(err);
        }
    }
})

//GET
router.get("/", verify, async (req, res) => {
    const typeQuery = req.query.type;
    const genreQuery = req.query.genre;
    let list = [];
    try {
        
    } catch (err) {
        res.status(500).json(err);
    }
})


module.exports = router;