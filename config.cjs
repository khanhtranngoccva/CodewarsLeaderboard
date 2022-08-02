const port = process.env.PORT || 5000;

const mongodb = require("mongodb");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

dotenv.config();
const app = express();

// This route leads to production frontend.
app.use(express.static(path.join(__dirname, "dist")));

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

const mongoClient = new mongodb.MongoClient(process.env.MONGODB_CONNECTION_STRING, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    serverApi: mongodb.ServerApiVersion.v1,
});

mongoClient.connect().then(client => {
    console.log(process.env.MONGODB_CONNECTION_STRING);
    app.listen(port, () => console.log("Server ready."));
});

module.exports = {app, mongoClient};