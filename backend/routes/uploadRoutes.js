const express=require("express");
const multer=require("multer");
const cloudinary=require("cloudinary").v2;
const streamifier=require("streamifier");

require("dotenv").config();

const router=express.Router();

//Cloudnary configuration

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
});

//multer setup using memory storage

const storage=multer.memoryStorage();
const upload=multer({storage});

router.post("/",upload.single("image"),async(req,res)=>{
    try {
        if(!req.file){
            return res.status(404).json({message:"no file uploaded"});

        }
        //Function to the handle the stream upload to cloundinary

        const streamUpload=(fileBuffer)=>{
            return new Promise((resolve,reject)=>{
                const stream=cloudinary.uploader.upload_stream((error,result)=>{
                    if(result){
                        resolve(result);
                    }else{
                        reject(error);
                    }

                });
                //Use streamifier to convert file buffer to a stream
                streamifier.createReadStream(fileBuffer).pipe(stream);
            })
        };
        //call the streamUpload function

        const result=await streamUpload(req.file.buffer);
        // Respond with the upload image URL
        res.json({imageUrl:result.secure_url});
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"server error"});
        
    }
})
module.exports=router