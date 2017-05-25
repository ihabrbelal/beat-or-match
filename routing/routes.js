var path = require('path');
var amazon = require('amazon-product-api');
var connection = require('../server.js');
var express = require('express');
var app = express();
// amazon npm
var client = amazon.createClient({
    awsId: "AKIAITLLCYPY6ARKPO5A",
    awsSecret: "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",
    awsTag: "logylink-20"
});

module.exports = function(app) {
    // home page route
    app.get("/", function(req, res) {
        // res.redirect("/index.html");
        res.sendFile(path.join(__dirname, "../public/index.html"));



    });

    app.get("/admin", function(req, res) {
        // res.redirect("/index.html");
        res.sendFile(path.join(__dirname, "../public/admin.html"));


    });

    app.post("/admin/items", function(req, res) {
        const { upc, category, product_name, product_desc, image, price } = req.body;

        console.log(upc, category, product_name, product_desc, image, price);

        var newItem = {
            upc: upc,
            category: category,
            product_name: product_name,
            product_desc: product_desc,
            image: image,
            price: price
        }

        connection.query("INSERT INTO products SET ?", newItem, function(err, res) {
            // res.status(200).json({ success: true });
        });


    });

    app.get("/api/ourproducts", function(req, res) {
        connection.query("SELECT * FROM products;", function(err, data) {

            if (err) {
                throw err;
            }
            var products = data;
            var array = [];
            var theUpc;
            //pull UPC from data
            for (i = 0; i < products.length; i++) {
                product = products[i];
                theUpc = product.upc;
                array.push(theUpc);
            }
            //  making call to amazon
            client.itemLookup({
                idType: 'UPC',
                itemId: array.join(','),
                responseGroup: 'ItemAttributes'
            }, function(err, results, response) {
                if (err) {
                    console.log(JSON.stringify(err))
                } else {
                    for (var i = 0; i < array.length; i++) {
                        if (results[i].ItemAttributes[0].ListPrice) {
                            products[i].amazonPrice = results[i].ItemAttributes[0].ListPrice[0].FormattedPrice;
                        } else {
                            products[i].amazonPrice = "Not available on amazon"
                        }
                    }
                    res.json(products);
                };
            });
        });
    });


}
