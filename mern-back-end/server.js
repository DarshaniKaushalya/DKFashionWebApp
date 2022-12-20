const express = require("express"); //adding express
const env = require("dotenv"); // create and call for environment variables
const app = express(); //create an app
const bodyParser = require("body-parser"); // import body parser
const mongoose = require("mongoose");
const routes = require("./server/routes/router");
const connectDatabase = require("./server/database/database");
const path = require("path");
const cors = require("cors");

//environment variable
env.config();

const PORT = process.env.PORT;

//connectDB
connectDatabase();

app.use(cors());
//json format
app.use(bodyParser.json({ extended: true })); //using middleware, to sending json data
//set view engine
app.set("view engine", "ejs"); //you can specify your tamplate in here ejs/html/pug

app.use(express.json()); //using middleware, to sending json data
app.use("/public", express.static(path.join(__dirname, "server/uploads"))); //Worked
//to loading images on browser || not working
// app.use('/public', express.static(path.join(__dirname, 'uploads')));

app.get("/", (req, res, next) => {
  res.status(200).json({
    message: "Hello From server",
  });
});

app.post("/data", (req, res, next) => {
  res.status(200).json({
    message: req.body,
  });
});
//Route
app.use("/", routes);

//It s going to listen on server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
