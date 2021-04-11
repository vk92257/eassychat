const express = require("express");
require("dotenv").config();
const userRoute = require("./routes/userRoutes");
const app = express();
app.use(express.json());
const mongoose = require("mongoose");
let password = process.env.DB_PASSWORD;
let userName = process.env.DB_USERNAME;
const url =
  "mongodb+srv://" +
  userName +
  ":" +
  password +
  "@cluster0.j6567.mongodb.net/EassyChat?retryWrites=true&w=majority";
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((conn) => {
    console.log("mongo db is connected");
  });

app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "server is listenign to the server",
  });
});

app.use("/eassyChat/api/v1", userRoute);
const server = app.listen(process.env.PORT, () => {
  console.log("server is listening => " + process.env.PORT);
});
