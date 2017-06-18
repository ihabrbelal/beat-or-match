// dependicies requires

var amazon = require('amazon-product-api');
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var mysql = require("mysql");
// var mongoose = require("mongoose");
// var logger = require("morgan");



// assign PORT number and app
var app = express();
var PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
app.use(express.static(`${__dirname}/public`));




// ========================================================//
// setting up database connections//
// ========================================================//


var connection;
var JAWSDB_URL = "mysql://ppo8sqsnr9wb3u5j:wxcyx4idk997mevf@r4919aobtbi97j46.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/y6ldkh8b8ak8dhix"

if (process.env.JAWSDB_URL) {
    connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
    connection = mysql.createConnection({
        host: "localhost",
        port: 3306,
        user: "root",
        password: "root",
        database: "beatormatch_db"
    });
};

// amazon npm
// var client = amazon.createClient({
//     awsId: " AKIAJJ6NIRW4TL6FF4UA",
//     awsSecret: "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",
//     awsTag: "logylink"
//         // awsTag: "logylink-20"
// });



var client = amazon.createClient({
    awsId: "AKIAIAWUUUGIAB7KOQBQ",
    awsSecret: "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",
    awsTag: "logylink-20"
});

// ======================================================== //
// exports //
// ======================================================== //

module.exports = connection;
module.exports.client;

connection.connect(function(err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }

    console.log("connected as id " + connection.threadId);

});

// ======================================================== //
// app path //
// ========================================================//

require("./routing/routes.js")(app);

// ======================================================== //
// server lisetnner //
// ======================================================== //

app.listen(PORT, function() {
    console.log('this is port ' + PORT);

});
