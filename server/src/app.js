const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const axios = require("axios");
//const fs = require('fs');
//const https = require('https');

const app = express();

app.use(morgan("combined"));
app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

const mongoose = require("mongoose");
const uri = "mongodb+srv://dbUser:dbUserPassword@cluster0.bmuyh.mongodb.net/bulletinDB?retryWrites=true&w=majority";

try {
  mongoose.connect(
    uri,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log("Connected to Bulletin DB")
  );
} catch (error) {
  console.log("Unable to connect to Bulletin DB");
}

const cookieParser = require("cookie-parser");
app.use(cookieParser());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.get("/", async (req, res) => {
  res.send("IM RECIEVING YOU.");
});

const users = require('./userRoutes.js');
app.use("/api/users", users.routes);

// const product = require('./productsRoutes.js');
// app.use('/api/product', product.routes);

app.listen(3001, () => {
  console.debug("Server listening on 3001");
});

// https.createServer({
//   key: fs.readFileSync('server.key'),
//   cert: fs.readFileSync('server.cert')
// }),app.listen(8080, () => console.log('Server listening on port 8080'))
