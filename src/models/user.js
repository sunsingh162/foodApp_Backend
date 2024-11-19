const mongoose = require("mongoose");
const validator = require('validator');
const jwt = require("jsonwebtoken")


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        minLength: 10,
        maxLength: 30,
        validate(value) {
          if(!validator.isEmail(value)){
              throw new Error("Email id is not valid: " + value)
          }
        }
      },
      password: {
        type: String,
        required: true,
        minLength: 8,
        maxLength: 100,
        validate(value) {
          if(!validator.isStrongPassword(value)){
              throw new Error("Your password is not strong: " + value)
          }
        }
      },
})

userSchema.methods.getJWT = function() {
    const user = this;
    const token = jwt.sign({ _id: user._id }, "DevTinder@6798", { expiresIn : "1d"});
    return token
}

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;