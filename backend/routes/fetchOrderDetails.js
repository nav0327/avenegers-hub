var express = require('express');
var router = express.Router();
var product=require('../models/dbModels'); 

var getOrderDetailsQuery = 'SELECT * from Orders where user_id = ?';

router.post('/', function (req, res, next) {
  var userId = req.body.userId;
    // res.locals.connection.query(getOrderDetailsQuery, [userId]
      product.orders.find({"user_id":userId}, function (error, results, fields) {
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