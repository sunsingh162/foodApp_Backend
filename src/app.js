const express = require("express");
const connectDB = require("./config/database");
const app = express();

const cookiesParser = require("cookie-parser");
const cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookiesParser());

const authRouter = require("./routes/auth");
const restaurantRouter = require("./routes/restaurant");
const productRouter = require("./routes/product");
const cartRouter = require("./routes/cart");
const profileRouter = require("./routes/profile");

app.use("/", authRouter);
app.use("/", restaurantRouter);
app.use("/", productRouter);
app.use("/", cartRouter);
app.use("/", profileRouter);

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
