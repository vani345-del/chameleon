const mongoose=require("mongoose");
const subcriberSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
    },
    subcriberAt:{
        type:Date,
        default:Date.now,
    },
})
module.exports=mongoose.model("Subcriber", subcriberSchema);