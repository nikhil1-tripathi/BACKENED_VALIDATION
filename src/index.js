const express = require("express");
const mongoose = require("mongoose");

const userController = require("./controllers/user.controller");
// const productController = require("./controller/product.controller");
// const formatErrors = require("./error.js");
//  console.log(userController)

const connect = () => {
    return mongoose.connect("mongodb://127.0.0.1:27017/validation");
}

const app = express();
app.use(express.json());   

app.use("/user" , userController);

app.listen( 2388 , async () =>{
    try{
         await connect();
         console.log("listening on post 2388");
    } catch(e){
        console.log(e.message);
    }
    })