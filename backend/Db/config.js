const  mongoose  = require("mongoose");
const dotenv = require('dotenv')
dotenv.config();
const uri = process.env.MONGO_URL

 
mongoose.set('strictQuery', false);


   const connectDb = async()=>{
    try {
     mongoose.connect(uri,{
        useNewUrlParser: true,
      useUnifiedTopology: true,
    })
        console.log("database connected") 
    } catch (error) {
        console.log(error) 
    }
   }
module.exports = connectDb; 