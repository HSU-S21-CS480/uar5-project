const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const axios = require('axios');

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://dbUser:dbUserPassword@cluster0.bmuyh.mongodb.net/bulletinDB?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

const articleSchema = new mongoose.Schema({
    "_id": Number,
    "title": String,
    "author": String,
    "points": Number,
});

const Article = mongoose.model('Article', articleSchema,'articles');



module.exports = {
    model: Article,
    routes: router
}