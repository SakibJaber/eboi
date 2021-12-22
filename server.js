require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const expressLayouts = require("express-ejs-layouts");
const indexRoute = require("./routes/index");

//MONGODB_SETUP
const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connection established");
  })
  .catch((error) => {
    console.log(error);
  });
//MONGODB_SETUP

const app = express();

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");
app.set(expressLayouts);
app.set(express.static("public"));

app.use("/", indexRoute);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is Running on Prot ${port} ...`);
});
