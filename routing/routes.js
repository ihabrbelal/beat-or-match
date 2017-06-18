var path = require('path');
var amazon = require('amazon-product-api');
var connection = require('../server.js');
var express = require('express');
var app = express();
// amazon npm
var client = amazon.createClient({
    awsId: "AKIAIZPB6VXBSVCLMROA",
    awsSecret: "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",
    // awsTag: "logylink-20"
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

    app.get("/about", function(req, res) {
        // res.redirect("/index.html");
        res.sendFile(path.join(__dirname, "../public/about.html"));


    });

    app.get("/contact", function(req, res) {
        // res.redirect("/index.html");
        res.sendFile(path.join(__dirname, "../public/contact.html"));


    });
    app.post("/admin/items", function(req, res) {
        const { upc, asin, quantity, category, product_name, product_desc, image, price } = req.body;

        console.log(upc, asin, category, product_name, product_desc, image, price);

        var newItem = {
            upc: upc,
            asin: asin,
            quantity: quantity,
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
            var asinArray = [];
            var theAsin;
            var theUpc;
            //pull UPC from data


            //pull UPC from data
            for (i = 0; i < products.length; i++) {
                product = products[i];
                theUpc = product.upc;
                theAsin = product.asin;
                console.log('this is ASIN: ', theAsin);
                array.push(theUpc);
                asinArray.push(theAsin);
            }
            var queryItems;
            // console.log(queryItems);
            //  making call to amazon
            client.itemLookup({
                idType: 'ASIN',
                itemId: asinArray.join(','),
                responseGroup: 'ItemAttributes, Offers'
            }, function(err, results, response) {
                if (err) {
                    console.log(JSON.stringify(err))
                } else {
                    for (var i = 0; i < array.length; i++) {
                        if (results[i].ItemAttributes[0].ListPrice) {
                            products[i].amazonPrice = parseFloat((results[i].ItemAttributes[0].ListPrice[0].FormattedPrice[0]).substr(1).replace(/,/g, '')).toFixed(2);
                            var amazonPrice = parseFloat((results[i].ItemAttributes[0].ListPrice[0].FormattedPrice[0]).substr(1).replace(/,/g, '')).toFixed(2);
                            console.log("amazonPrice: " + amazonPrice);
                            var ourPrice = products[i].price;
                            // console.log("You out here! " + theUpc);
                            if (amazonPrice < ourPrice) {
                                // console.log("You got here! " + theUpc);
                                connection.query("UPDATE products SET ? WHERE ?", [{
                                    price: amazonPrice
                                }, {
                                    asin: asinArray[i]
                                }], function(err, res) {});
                            }
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
