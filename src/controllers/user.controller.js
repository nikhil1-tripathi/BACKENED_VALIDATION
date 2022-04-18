const express = require("express");

  const {body , validationResult} = require("express-validator");
  const formatErrors = require("../error.js");

  const router = express.Router(); 

const User = require("../models/user.model");

  router.get("" , async (req ,res) =>{
        
    try{
        const user = await User.find().lean().exec();
        return res.status(401).send(user);
    } catch(e){
        return res.status(200).send(e.message);
    }
       
  });


  router.post("" ,
  body("first_name").notEmpty().withMessage("FIRST_NAME IS REQUIRED"),
  body("last_name").notEmpty().withMessage("LAST_NAME IS REQUIRED"),
  body("email").notEmpty().withMessage("Email is required"),
  body("pincode").isLength({min: 5,max:6}).withMessage("pincode should be exact 6 number"),
  body("age").notEmpty().withMessage("Age should not be empty").isLength({min: 1,max:100}).withMessage("Age should be Between 1 to 100"),
  body("gender").notEmpty().withMessage("Gender should not be empty"),

  async(req, res)=>{
      try{
        const errors = validationResult(req);

        if(!errors.isEmpty()){
          return res.status(400).json({errors: formatErrors(errors.array())});
        }
        const user = await User.create(req.body);
        return res.status(201).send(user);
      } catch(e){
        return res.status(500).send(e.message);
      }
   
  })
module.exports = router