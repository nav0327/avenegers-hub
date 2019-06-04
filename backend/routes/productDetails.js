var express = require('express');
var router = express.Router();
var product=require('../models/dbModels'); 

var productCount_query = 'SELECT COUNT(*) AS PRODUCTCOUNT FROM cart WHERE user_id = ? AND productId=? AND isPurchased = 0';

router.post('/', function (req, res, next) {
    console.log("product details backend query part");
    console.log("user_id"+req.body.user_id+typeof req.body.user_id)
    console.log("product_id"+req.body.product_id+typeof req.body.product_id)
    // res.locals.connection.query(productCount_query, [req.body.user_id, req.body.product_id]
        product.cart.count({"user_id":req.body.user_id,"productId":req.body.product_id,"isPurchased":0}, function (error, results, fields) {
        if (error) {
            console.log("error ocurred", error);
            res.send({
                "code": 400,
                "failed": "error ocurred"
            })
        } else {
            console.log('The solution is: ', results);
            if (results > 0) {
                res.send({
                    "code": 204,
                    "message": "Cannot enter"
                });
            } else {
                console.log("user_id"+req.body.user_id+typeof(req.body.user_id))
                // res.locals.connection.query("INSERT into cart (user_id, product_names,price, isPurchased,productId) values(?,?,?,'0',?)",[req.body.user_id,req.body.product_name,req.body.price,req.body.product_id]
                product.cart.insertMany({"user_id":req.body.user_id,"product_names":req.body.product_name,"price":req.body.price, "isPurchased":0,"productId":req.body.product_id}, function (error, results, fields) {
                    
                    console.log('after query in homepage.js backend');
                    if (error) {
                        console.log("error ocurred", error);
                        res.send({
                            "code": 400,
                            "failed": "error ocurred"
                        })
                    } else {
                        //console.log(query.sql);
                        console.log('in else part');
                        console.log(results);
                        res.send(results);
                    }
                    //console.log(query.sql);
                });
            }

        }
    });
});
module.exports = router;
