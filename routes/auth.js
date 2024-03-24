const router = require("express").Router()
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");


// Register
router.post("/register",async(req, res)=>{
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString()
    });
    try {
        const savedUser = await newUser.save();
        res.status(200).json(savedUser)
        
    } catch (error) {
        res.status(500).json(error)
    }
});

// Login
router.post("/login", async(req, res)=>{
    try {
        const user = await User.findOne({email: req.body.email})
        !user && res.status(401).json("Wrong Credentails")
        const hassedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC)
        const originalPassword = hassedPassword.toString(CryptoJS.enc.Utf8)
        originalPassword !== req.body.password && res.status(401).json("Wrong credentails")
       const accessToken = jwt.sign({id:user._id, isAdmin:user.isAdmin}, process.env.JWT_SEC, {expiresIn:"30d"})
        const {password, ...others} = user._doc;
       res.status(200).json({accessToken, ...others});

    } catch (error) {
        
    }
} );

module.exports = router;