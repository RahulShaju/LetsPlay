const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const connectDb = require('./Db/config')
const userRouter = require('./Routes/userRouter')
const app = express()
// const mongoose = require('mongoose')
connectDb();
app.use(express.urlencoded({extended: true}));
app.use(express.json());

const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));
dotenv.config();

app.use("/api/users", userRouter);

const PORT = process.env.PORT || 6001;  

// mongoose.set('strictQuery', false)

app.listen(PORT,console.log(`server runing on ${PORT}`))

