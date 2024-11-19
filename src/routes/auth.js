const express = require("express");
const { validateData } = require("../utils/validation");
const bcrypt = require("bcrypt");
const userModel = require("../models/user");

const authRouter = express.Router();

//Signup user
authRouter.post("/signup", async (req, res) => {
  try {
    // validate the data
    validateData(req);
    
    const { name, emailId, password } = req.body;
    console.log(req.body);
    //Encrypt the password
    const hashPassword = await bcrypt.hash(password, 10);

    const user = new userModel({
      name,
      emailId,
      password: hashPassword,
    });

    const savedUser = await user.save();
    // Create a JWT Token
    const token = await savedUser.getJWT();
    // Add the token to cookie and send the response back to the user
    res.cookie("token", token, {
      expires: new Date(Date.now() + 8 * 3600000),
    });
    res.json({ message: "user added successfully", data: savedUser });
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

module.exports = authRouter;