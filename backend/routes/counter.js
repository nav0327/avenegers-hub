var express = require('express');
var router = express.Router();
var productCount_query = 'SELECT COUNT(*) AS PRODUCTCOUNT FROM cart WHERE user_id = ? AND productId=? AND isPurchased = 0';
var product=require('../models/dbModels'); 

router.post('/', function (req, res, next) {
    console.log("product details backend query part");
    // res.locals.connection.query("UPDATE cart SET quantity= ? WHERE user_id = ? AND price = ? AND productId=?", [req.body.quantity, req.body.user_id, req.body.price, req.body.product_id]
    product.cart.updateMany({"user_id": req.body.user_id,"price":req.body.price,"productId":req.body.product_id},{$set:{"quantity":req.body.quantity}}, function (error, results, fields) {
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
});
module.exports = router;