const express=require("express");
const User=require("../models/User")
const jwt=require("jsonwebtoken");
const {protect}=require("../middleware/authMiddleware")
const dotEnv=require('dotenv');
dotEnv.config();

const router=express.Router();

//@route post/api/users/register
//@desc register a new user
//@access public

router.post("/register",async(req,res)=>{
    const {name,email,password}=req.body;
    try {
        //Register logic
        let user=await User.findOne({email});
        if(user) return res.status(400).json({message:"user already exists"});
        user=new User({name,email,password});
        await user.save();
        

        const payload={user:{
            id:user._id,
            role:user.role,
        }}
        // sign and return the token along with user data

        jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:"40h"},(err,token)=>{
            if (err) {
                console.error(err);
                return res.status(500).json({ message: "Error signing token" });
            }
            //Send the user  and token in response

            res.status(201).json({
                user:{
                    _id:user._id,
                    name:user.name,
                    email:user.email,
                    role:user.role,

                },
                token,
            })
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Server Error' });
        
    }
});



//@route POST/api/users/login
//@desc Authentication user
//@access public


router.post("/login",async(req,res)=>{
    const{email,password}=req.body;
    try {
        //findingthe user by email

        let user=await User.findOne({email});
        if(!user) return res.status(400).json({message:"Invalid Crediantials"});
        const isMatch=await user.matchPassword(password);
        if(!isMatch) return res.status(400).json({message:"Invalid CRedentials"});

        
        const payload={user:{
            id:user._id,
            role:user.role,
        }}


        jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:"24h"},(err,token)=>{
            if(err) throw err;
            //Send the user  and token in response

            res.json({
                user:{
                    _id:user._id,
                    name:user.name,
                    email:user.email,
                    role:user.role,

                },
                token,
            })
        })

    } catch (error) {
        console.error(error);
        res.status(500).send("server Error");
        
    }
})


// @route GET /api/users/profile
//@desc Get logged-in user profile(protected route)
//@acess private

router.get("/profile",protect,async(req,res)=>{
    res.json(req.user);
})



module.exports=router;