var express = require('express');
var router = express.Router();
var product=require('../models/dbModels'); 

// var userDetailsUpdate_query = 'UPDATE UserDetails SET first_name=?,last_name=?,middle_name=?,email=?,modified=?,address=?,city=?,state=?,zip=? WHERE Id = ?';

router.post('/', function (req, res, next) {
  console.log(req.body);
  var today = new Date();
  
  // res.locals.connection.query(userDetailsUpdate_query,[,,, ,,,,,,req.body.userId],function (error, results, fields){
    product.userdetails.updateOne(
      {"_id":req.body.userId},
      {$set:{first_name:req.body.firstname,last_name:req.body.lastname,middle_name:req.body.middlename,email:req.body.email,modified:today,Address:req.body.address,City:req.body.city,State:req.body.state,Zip:req.body.zip}},function(error,results){
    console.log(results);
    if (error) {
      console.log("error ocurred", error);
      res.send({
        "code": 400,
        "failed": "error ocurred"
      })
    } else {
      console.log('The solution is: ', results);
      //if(results[0].EMAILCOUNT>0){
        res.send({
          "code": 200,
          "message": "User successfully updated"
        });
      //}
    }
  });

});

module.exports = router;