const express=require("express");
const Order=require("../models/Order");
const {protect,admin}=require("../middleware/authMiddleware")


const router=express.Router();
//@router /GET/api/admin/orders
//@desc Get all the ordres(admin only)
//@access Private/admin

router.get("/",protect,admin,async(req,res)=>{
try {
    const orders=await Order.find({}).populate("user","name email");
    res.json(orders);
    
} catch (error) {
    console.error(error)
    res.status(500).json({message:"server Error"})
    
}
})

//@route put/api/admin/orders/:id
//@desc update order status
//@accesss private /admin

router.put("/:id",protect,admin,async(req,res)=>{
    try {
        const order=await Order.findById(req.params.id).populate("user","name");
        if(order){
            order.status=req.body.status|| order.status;
            order.isDelivered=req.body.status==="Delivered"? true:order.isDelivered;
            order.deliveredAt=req.body.status==="Delivered" ? Date.now():order.deliveredAt;

            const updateOrder=await order.save();
            res.json(updateOrder);
        }
        else{
            res.status(404).json({message:"Order not found"});
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"SEver error"})
    }
})

//@route DELETE/api/admin/orders/:id
//@desc DELETE an order
//@access private /Admin

router.delete("/:id",protect,admin,async(req,res)=>{
    try {
        const order=await Order.findById(req.params.id);
        if(order){
            await order.deleteOne();
            res.json({message:"Order removed"});

        }else{
            res.status(404).json({message:"order not found"})
        }
        
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"Server error"})
        
    }

})

module.exports=router