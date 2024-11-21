const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 30,
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
        if (!validator.isEmail(value)) {
          throw new Error("Email id is not valid: " + value);
        }
      },
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
      maxLength: 100,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Your password is not strong: " + value);
        }
      },
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Gender data is not valid");
        }
      },
    },
    photoUrl: {
      type: String,
      default: "https://geographyandyou.com/images/user-profile.png",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Photo URL is not valid: " + value);
        }
      },
    },
    country: {
      type: String,
    },
    phoneNo: {
      type: Number,
      required: true,
      minLength: 7,
      maxLength: 10,
    },
  },
  { timestamps: true }
);

userSchema.methods.getJWT = function () {
  const user = this;
  const token = jwt.sign({ _id: user._id }, "FoodApp@6798", {
    expiresIn: "1d",
  });
  return token;
};

userSchema.methods.validatePassword = async function (passwordInputByUser) {
  const user = this;
  const hashedPassword = user.password;
  const isPasswordValid = await bcrypt.compare(
    passwordInputByUser,
    hashedPassword
  );
  return isPasswordValid;
};

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
