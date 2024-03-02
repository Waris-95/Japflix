const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const verify  = require("../verifyTokens");

//UPDATE 
router.put("/:id", verify, async (req, res)=> {
    if (req.user.id === req.params.id || req.user.isAdmin) {
        if (req.body.password) {
          req.body.password = CryptoJS.AES.encrypt(
            req.body.password,
            process.env.SECRET_KEY
          ).toString();
        }
        try {
          const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
              $set: req.body,
            },
            { new: true }
          );
          res.status(200).json(updatedUser);
        } catch (err) {
          res.status(500).json(err);
        }
      } else {
        res.status(403).json("Not authorized to take this action");
      }
    });

//DELETE
router.delete("/find/:id", verify, async (req, res) => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("Sucessfully Deleted");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("Not authorized to take this action");
    }
  });

//GET
router.get("/", verify, async (req, res)=> {
    try{
        const user = await User.findById(req.params.id);
        const { password, ...info} = user._doc;
        res.status(200).json(info);
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET ALL
router.get("/", verify, async (req, res)=> {
    const query = req.query.new;
    if (req.user.isAdmin) {
        try {
            const users = query ? await User.find().limit(10) : await User.find();
            res.status(200).json(users);
    } catch(err) {
        res.status(500).json(err);
        }
    } else {
        res.status(403).json("Not authorized to take this action");
    }
});

//GET USER STATS

module.exports = router;