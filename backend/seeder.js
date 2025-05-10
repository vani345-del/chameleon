const mongoose=require("mongoose");
const dotenv=require("dotenv");
const Product=require("./models/Products");
const User=require("./models/User")
const products=require("./data/products");
const Cart=require("./models/Cart")

dotenv.config();

//connect to mongodb;
mongoose.connect(process.env.MONGO_URI);

const seedData=async()=>{
    try {
        //claer existing data
        await Product.deleteMany();
        await User.deleteMany();
        await Cart.deleteMany();

        //cteate a default admin user

        const createdUser=await User.create({
            name:"Admin User",
            email:"admin@gmail.com",
            password:"123456",
            role:"admin",
        });
        //Assign the default user Id to each product

        const userID=createdUser._id;
        const sampleProducts=products.map((product)=>{
            return {...product,user:userID};
        });

        //Insert the products into the database

        await Product.insertMany(sampleProducts);

        console.log("product data seeded successfully");
        process.exit();

    } catch (error) {
        console.error("Error seeding the data",error);
        process.exit(1);

        
    }
}

seedData();