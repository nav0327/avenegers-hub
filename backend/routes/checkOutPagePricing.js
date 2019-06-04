var express = require('express');
var router = express.Router();
var product=require('../models/dbModels'); 

// var getCartDetailsQuery = 'SELECT * from CART where user_id = ? AND isPurchased = 0';

router.post('/', function (req, res, next) {
  var userId = req.body.userId;
    product.cart.find({"user_id":userId,"isPurchased":0}, function (error, results) {
    console.log(results);
      if (error) {
        res.send({
          "code": 400,
          "failed": "error ocurred"
        })
      } else {
        console.log('The solution is: ', results); 
        res.send(JSON.stringify(results));      
      }
    });
  
  });


module.exports = router;