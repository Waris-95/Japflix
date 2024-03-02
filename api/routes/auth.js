const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

// REGISTER
router.post('/register', async (req, res) => {
    try {
        // console.log('Request body password:', req.body.password);
        // console.log('SECRET_KEY:', process.env.SECRET_KEY);
        const encryptedPassword = CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString();
        // console.log('Encrypted password:', encryptedPassword);
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: encryptedPassword,
        });

        const user = await newUser.save();
        res.status(201).json(user);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: error.message });
    }
});

// LOGIN
router.post("/login", async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      !user && res.status(401).json("Invalid Credentials");
  
      const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
      const originalPassword = bytes.toString(CryptoJS.enc.Utf8);
  
      originalPassword !== req.body.password &&
        // res.status(401).json("Wrong password or username!");
        res.status(401).json("Invalid Credentials");

        const accessToken = jwt.sign({id: user._id, isAdmin: user.isAdmin}, 
            process.env.SECRET_KEY,{ expiresIn: "5d" }
            );

        const {password, ...info } = user._doc;

        res.status(200).json({ ...info, accessToken });
    }catch(err){
        res.status(500).json(err);
    }
})

module.exports = router;
