const express=require("express")
const cors=require("cors");
const dotenv=require("dotenv");
const connectDB=require("./config/db")
const userRoutes=require("./routes/UserRoutes");
const productRoutes=require("./routes/ProductRoutes");
const cartRoutes=require("./routes/cartRoutes");
const checkoutRoutes=require("./routes/cheakoutRoutes");
const orderRouters=require("./routes/orderRoutes");
const uploadRoutes=require("./routes/uploadRoutes");
const subscriberRouters=require("./routes/subcriberRouter");
const adminRoutes=require("./routes/adminRouts");
const productAdminRouters=require("./routes/productAdminRoutes")
const adminorderRouters=require("./routes/adminOrderRoutes")





const app=express();
app.use(express.json());
app.use(cors());
dotenv.config();




const PORT=process.env.PORT || 3000;
//connect to mongo db
connectDB();

app.get('/',(req,res)=>{
    res.send("Wlcome to the page");
});
//APi routes

app.use("/api/users",userRoutes);
app.use("/api/products",productRoutes);
app.use("/api/cart",cartRoutes);
app.use("/api/checkout",checkoutRoutes);
app.use("/api/orders",orderRouters)
app.use("/api/upload",uploadRoutes)
app.use("/api",subscriberRouters)


//Admin routes
app.use("/api/admin/users",adminRoutes);
app.use("/api/admin/products",productAdminRouters);
app.use("/api/admin/orders",adminorderRouters)







app.listen(PORT,()=>{
    console.log(`server is running on the http://localhost:${PORT}`);

});