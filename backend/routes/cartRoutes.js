const express=require("express");
const Cart=require("../models/Cart")
const {protect}=require("../middleware/authMiddleware")
const Product=require("../models/Products")

const router=express.Router();

//Helper function to get a cart by the user Id or guest Id
const getCart=async(userId,guestId)=>{
    if(userId){
        return await Cart.findOne({user:userId});
    }else if(guestId){
        return await Cart.findOne({guestId})

    }
    return null;
}


//@router Post/api/cart
//@desc Add a product ti the cart for a guest otr the logged in user
//Access public

router.post('/',async(req,res)=>{
    const {productId,quantity,size,color,guestId,userId}=req.body;
    try {
        const product=await Product.findById(productId);
        if(!product)return res.status(404).json({message:"Product not found"});
        //determine if the user is logged in or guest
        let cart=await getCart(userId,guestId);
        //if the cart exists ,update it
        if(cart){
            const productIndex=cart.products.findIndex(
                (p)=>
                    p.productId.toString()===productId &&
                    p.size===size &&
                    p.color===color
            );

            if(productIndex>-1){
                // if the product is already exists
                cart.products[productIndex].quantity+=quantity;
            }
            else{
                //add new product to the cart
                cart.products.push({
                    productId,
                    name:product.name,
                    image:product.images[0].url,
                    price:product.price,
                    size,
                    color,
                    quantity,
                });
            }
            //REcalculate the total price

            cart.totalPrice=cart.products.reduce((acc,item)=>acc+ item.price*item.quantity,0);
            await cart.save();
            return res.status(200).json(cart);
         }
         else{
            //create a new cart for the guest or user
            const newCart=await Cart.create({
                user:userId?userId:undefined,
                guestId:guestId ? guestId:"guest_"+new Date().getTime(),
                products:[
                    {
                        productId,
                        name:product.name,
                        image:product.images[0].url,
                        price:product.price,
                        size,
                        color,
                        quantity
                    },
                ],
                totalPrice:product.price*quantity,
            });
            return res.status(201).json(newCart);


         }
        
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"server Error"});
        
    }
});


//@route PUT/api/cart
//@desc Update product quantity in the cart for a guest or the logged in the user
//@access public

router.put("/",async(req,res)=>{
    const {productId,quantity,size,color,guestId,userId}=req.body;
    try {
        let cart=await getCart(userId,guestId);
        if(!cart) return res.status(404).json({message:"cart not found"});


        const productIndex=cart.products.findIndex(
            (p)=>p.productId.toString()===productId && p.size===size && p.color ===color
        );
        if(productIndex>-1){
            if(quantity>0){
                cart.products[productIndex].quantity=quantity;

            }
            else{
                cart.products.splice(productIndex,1);
            }
            cart.totalPrice=cart.products.reduce(
                (acc,item)=> acc+item.price*item.quantity,0
            );
            await cart.save();
            return res.status(200).json(cart);

        }else{
            return res.status(404).json({message:"product not found in cart"});
        }

    } catch (error) {
        console.error(error)
        return res.status(500).json({message:"server error"})
    }
})

//@route DELETE/api/cart
//@desc remove a product from the cart
//@access public

router.delete("/",async(req,res)=>{
    const {productId,size,color,guestId,userId}=req.body;
    try {
        
        let cart=await getCart(userId,guestId);
        if(!cart) return res.status(404).json({message:"cart not found"});
        const productIndex=cart.products.findIndex(
            (p)=>
            p.productId.toString()===productId &&
            p.size===size &&
            p.color===color
        );
        if(productIndex>-1){
            cart.products.splice(productIndex,1);
            cart.totalPrice=cart.products.reduce(
                (acc,item)=>acc+item.price*item.quantity,0
            );
            await cart.save();
            return res.status(200).json(cart);
        }else{
            return res.status(404).json({message:"product not found in the cart"})
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({message:"server error"});
        
    }
})

//@route GET /api/cart
//@desc GET logged-in uses or the guest user cart
//@access Public

router.get("/",async(req,res)=>{
    const {userId,guestId}=req.query;
    try {
        const cart=await getCart(userId,guestId);
        if(cart){
            res.json(cart);
        }
        else{
            res.status(404).json({message:"Cart not found"});
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"server error"})
    }
})

//@router POST/api/cart/merge
//@desc MERge guest cart into the user cart on login
//@access private

router.post("/merge",protect,async(req,res)=>{
    const {guestId} =req.body;
    try {
        //find the guest cart and the user cart
        const guestCart=await Cart.findOne({guestId});
        const userCart=await Cart.findOne({user:req.user._id});
        if(guestCart){
            if(guestCart.products.length===0){
                return res.status(400).json({message:"guest cart is empty"});
            }
            if(userCart){
                //Merge guest cart into user cart
                guestCart.products.forEach((guestItem)=>{
                    const productIndex=userCart.products.findIndex((item)=>
                        item.productId.toString()===guestItem.productId.toString() &&
                        item.size===guestItem.size && 
                        item.color===guestItem.color
                    );
                 if(productIndex>-1){
                    //if the item exists inn the user cart, update the quantity
                    userCart.products[productIndex].quantity+=guestItem.quantity;
                 }else{
                    //otherwise add the guest item to the caart
                    userCart.products.push(guestItem);
                 }
                });
                userCart.totalPrice=userCart.products.reduce(
                    (acc,item)=>acc +item.price * item.quantity,0
                )
                await userCart.save();

                //remove the guest cart after merging
                try {
                    
                    await Cart.findOneAndDelete({guestId});
                } catch (error) {
                    console.error("Error deleting guest cart: ",error);
                    
                }
                res.status(200).json(userCart);


            }else{
                // if the user has no existing cart,assign the guest cart to the user
                guestCart.user=req.user._id;
                guestCart.guestId=undefined;
                await guestCart.save();
                res.status(200).json(guestCart);
            }
        }else{
            if(userCart){
                //guest cart has alresdy been merged return user cart
                return res.status(200).json(userCart);
            }
            res.status(404).json({message:"guest cart not found"});
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"Server error"});
        
    }
})





module.exports=router;