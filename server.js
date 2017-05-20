// dependicies requires

var bodyParser = require("body-parser");
var express = require("express");
var mongojs = require("mongojs");
// var mongoose = require("mongoose");
// var logger = require("morgan");



// assign PORT number and app
var app = express();
var PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));


// Database configuration
// Save the URL of our database as well as the name of our collection
var databaseUrl = "beatormatch";
var collections = ["inventory", "orders"];

// // app path
// require("./app/routing/apiRoutes")(app);
// require("./app/routing/htmlRoutes")(app);
app.use(express.static("public"));

// Use mongojs to hook the database to the db variable
var db = mongojs(databaseUrl, collections);

// This makes sure that any errors are logged if mongodb runs into an issue
db.on("error", function(error) {
    console.log("Database Error:", error);
});

// Routes


app.get("/all", function(req, res) {
    db.inventory.insert({ "upc": 89859485, "name": "toshiba laptop 15inc" }, function(err, doc) {

        db.inventory.find({}, function(error, found) {
            // Log any errors if the server encounters one
            if (error) {
                console.log(error);
            }
            // Otherwise, send the result of this query to the browser
            else {
                res.json(found);
            }
        });
    });
});

// server lisetnner 
app.listen(PORT, function() {
    console.log('this is port ' + PORT);

});
