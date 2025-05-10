const express=require("express");
const router=express.Router();
const Subscriber=require("../models/Subcriber");
const { subscribe } = require("./uploadRoutes");

//@route POST/api/subcribe
//@desc handle newletter suncription
//@access Public

router.post("/subscribe",async(req,res)=>{
    const {email}=req.body;
    if(!email){
        return res.status(400).json({message:"Email is required"});
    }
    try {
        //check if the email is already suncribe
        let subscriber=await Subscriber.findOne({email});
        if(subscriber){
            return res.status(400).json({message:"email is already subscribed"});

        }
        //Create a new subscriber
        subscriber=new Subscriber({email});
        await subscriber.save();

        res.status(201).json({message:"Successfully subcribed to the newsletter!"});
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"Server error"})
    }
});
module.exports=router;
