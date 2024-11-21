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

    const { name, emailId, password, phoneNo } = req.body;
    //Encrypt the password
    const hashPassword = await bcrypt.hash(password, 10);

    const user = new userModel({
      name,
      emailId,
      password: hashPassword,
      phoneNo
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

//Login User by Email and password
authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await userModel.findOne({ emailId: emailId });

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isPasswordValid = await user.validatePassword(password);

    if (isPasswordValid) {
      // Create a JWT Token
      const token = await user.getJWT();
      // Add the token to cookie and send the response back to the user
      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });

      //   res.send(user);
      res.json({ message: "Login successful", data: user });
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

//Logout user
authRouter.post("/logout", (req, res) => {
  //Just make token as null to logout
  res.cookie("token", null, { expires: new Date(Date.now()) });
  res.send("Logout Successfully");
});

module.exports = authRouter;
