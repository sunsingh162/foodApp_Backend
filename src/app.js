const express = require('express');
const connectDB = require("./config/database")
const app = express();

const cookiesParser = require("cookie-parser");


app.use(express.json());
app.use(cookiesParser());


const authRouter = require("./routes/auth")

app.use("/", authRouter)


connectDB()
  .then(() => {
    console.log("DB connected Successfully");
    app.listen(3000, () => {
      console.log("Server is successfully listening to port 3000");
    });
  })
  .catch((err) => {
    console.log("Connection not established");
  });