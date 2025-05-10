const express =require("express");
const Order=require("../models/Order");
const {protect}=require("../middleware/authMiddleware");

const router=express.Router();

//@route GEt /api/order/my-order
//@desc get logged-in users order
//@access private

router.get("/my-orders",protect,async(req,res)=>{
    try {
        //find orders for the authentication user
        const orders=await Order.find({user:req.user._id}).sort({
            createdAt:-1,
        });//sort by most recent order
        res.json(orders);


    } catch (error) {
        console.error(error);
        res.status(500).json({massage:"Server Error"});
        
    }
});
//@router get /api/order/:id
//@desc v get order details ny id
//@ access private

router.get("/:id",protect,async(req,res)=>{
    try {
        
        const order=await Order.findById(req.params.id).populate(
            "user",
            "name email"
        );
        if(!order){
            return res.status(404).json({message:"Order not found"});
        }
        //return the full order details
        res.json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"Server error"});
        
    }

});
module.exports=router;