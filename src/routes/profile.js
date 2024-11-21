const express = require("express");
const { userAuth } = require("../middlewares/auth");
const { validateEditProfileData } = require("../utils/validation");

const profileRouter = express.Router();

//Get profile of loggedIn User
profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    console.log(user);
    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("Editing is not allowed");
    }
    const loggedInUser = req.user;
    Object.keys(req.body).map(
      (field) => (loggedInUser[field] = req.body[field])
    );
    await loggedInUser.save();
    res.json({ message: "Profile updated successfully", data: loggedInUser });
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});
module.exports = profileRouter;
