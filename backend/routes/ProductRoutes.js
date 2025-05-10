const express=require("express");
const Product=require("../models/Products");
const {protect,admin} =require("../middleware/authMiddleware");
const mongoose=require("mongoose")
const router=express.Router();
// route POST /api/products
//@desc Create a new Product
//@access Prvate/Admin


router.post('/',protect,admin,async(req,res)=>{
    try {
        const{name,description,price,discountPrice,countInStock,category,brand,sizes,colors,collections,material,gender,images,isFeatured,isPublished,tags,dimensions,weight,sku}=req.body

        const product=new Product({name,description,price,discountPrice,countInStock,category,brand,sizes,colors,collections,material,gender,images,isFeatured,isPublished,tags,dimensions,weight,sku,user:req.user._id,//referece to the admin user who created it

        });
        const createdProduct=await product.save();
        res.status(201).json(createdProduct);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error")
        
    }
})

//@route PUT//api/products/:id
//@desc update an existing product Id
//@access private/admin

router.put("/:id",protect,admin,async(req,res)=>{
    try {
        const{name,description,price,discountPrice,countInStock,category,brand,sizes,colors,collections,material,gender,images,isFeatured,isPublished,tags,dimensions,weight,sku}=req.body
       //find the product by id
       const product=await Product.findById(req.params.id);
       if(product){
        //update the product feild
        product.name=name||product.name;
        product.description=description||product.description;
        product.price=price||product.price;
        product.discountPrice=discountPrice||product.discountPrice;
        product.countInStock=countInStock||product.countInStock;
        product.category=category||product.category;
        product.brand=brand||product.brand;
        product.sizes=sizes||product.sizes;
        product.colors=colors||product.colors;
        product.collections=collections||product.collections;
        product.material=material||product.material;
        product.gender=gender||product.gender;
        product.images=images||product.images;
        product.isFeatured=isFeatured!==undefined?isFeatured:product.isFeatured;
        product.isPublished=isPublished!==undefined?isPublished:product.isPublished;
        product.tags=tags||product.tags;
        product.dimensions=dimensions||product.dimensions;
        product.weight=weight||product.weight;
        product.sku=sku||product.sku;

        //save the data product
        const updateProduct=await product.save();
            res.json(updateProduct);
       }else{
        res.status(404).json({message:"Product not found"})
       }
        
    } catch (error) {
        console.error(error);
        res.status(500).send("SErver, error")
    }
})

//@route DELETE/api/products
//@desc DELETE a priduct by id
//@access private /admin

router.delete("/:id",protect,admin,async(req,res)=>{
    try {
        //find the product id
        const product =await Product.findById(req.params.id);
        if(product){
            //remove the product from db;
            await product.deleteOne();
            res.json({message:"product remove"});
        }else{
            res.status(404).json({message:"product not found"});
        }
        
    } catch (error) {
        console.error(error);
        res.status(500).send("server Errror");
        
    }
})

//route GET/api/products
//desc GET all the products with optional query filters

router.get("/",async(req,res)=>{
    try {
        const{collection,size,color,gender,minPrice,maxPrice,sortBy,search,category,material,brand,limit}=req.query;
        
        let query={};
        //Filter logic

        if(collection && collection.toLocaleLowerCase()!== "all"){
            query.collections=collection;
        }
        if(category && category.toLocaleLowerCase()!== "all"){
            query.category=category;
        }
        if(material){
            query.material={$in:material.split(",")};
        }
        if(brand){
            query.brand={$in:brand.split(",")};
        }
        if(size){
            query.sizes={$in:size.split(",")};
        }
        if(color){
            query.colors={$in:[color]};
        }
        if(gender){
            query.gender=gender;
        }
        if(minPrice||maxPrice){
            query.price={};
            if(minPrice) query.price.$gte=Number(minPrice);
            if(maxPrice) query.price.$lte=Number(maxPrice);
        }
        if(search){
            query.$or=[
                {name:{$regex:search,$options:"i"}},
                {description:{$regex:search,$options:"i"}},


            ]
        }
        // sort Logic
        let sort={};
        if(sortBy){
            switch(sortBy){
                case "priceAsc":
                    sort={price:1};
                    break;
                case "priceDesc":
                    sort={price:-1};
                    break;
                case "popularity":
                    sort={rating:-1};
                    break;
                    default:
                        break;
                
            }
        }
        //fetch produts from the database
        let products=await Product.find(query).sort(sort).limit(Number(limit)||0);
        res.json(products)
        


        
    } catch (error) {
        console.error(error);
        res.status(500).send("server error");

    }
})

//@route GET/api?product/bestSEller
//desc retrive the product with hight rating
//@access public

router.get("/best-seller",async(req,res)=>{
    try {
        const bestSeller=await Product.findOne().sort({rating:-1});
        if(bestSeller){
            res.json(bestSeller);
        }
        else{
            res.status(404).json({message:"no best seller Found"});
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("server Error");
    }
})


//@route GET/api/products/new Arrivals
//@desc retriveve latest 8 products -Creation date
//@access public

router.get("/new-arrivals",async(req,res)=>{
    try {
        const newArrivals=await Product.find().sort({createdAt:-1}).limit(8);
        res.json(newArrivals)
        
    } catch (error) {
        console.error(500).send("server Error");
        res.status(500).send("server Error")
        
    }
})



//@route GET/api/products
//@desc get a single product by id
//@access public

router.get("/:id",async(req,res)=>{
    try {
        const product=await Product.findById(req.params.id);
        if(product){
            res.json(product);
        }else{
            res.status(404).json({message:"product not found"});
        }
        
    } catch (error) {
        
        console.error(error);
        res.status(500).send("server Error");
    }
})



//@routr GET/api/product/similar/:id
//desc retrives similar products based on the current productds gender and category
//@access public

router.get("/similar/:id",async(req,res)=>{
    const {id}=req.params;
    try {
        const product=await Product.findById(id);
        if(!product){
            return res.status(404).json({message:"product not found"})
        }
        const similarProducts=await Product.find({
            _id:{$ne:id},//Exclude the current product Id
            gender:product.gender,
            category:product.category
        }).limit(4);
        res.json(similarProducts)
        
    } catch (error) {
        console.error(error);
        res.status(500).send("Sever error");

        
    }
})




module.exports=router;