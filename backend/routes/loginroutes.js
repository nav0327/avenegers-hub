var express = require('express');
var router = express.Router();
var product=require('../models/dbModels'); 

var userSelectQuery = 'SELECT * FROM UserDetails WHERE email = ?';
const User = require('../models/userDetails');

router.post('/', function (req, res, next) {
  var email = req.body.email;
  var password = req.body.password;
  console.log("email"+email);
  console.log("password"+password);
  // res.locals.connection.query(userSelectQuery, [email]
    product.userdetails.find({"email":email}, function (error, results, fields) {
    if (error) {
      res.send({
        "code": 400,
        "failed": "error ocurred"
      })
    } else {
      console.log('The solution is: ', results);
      if (results.length > 0) {
        let newUser = new User(results[0].first_name, results[0].last_name, results[0].middle_name, results[0].email, results[0].password, results[0].isAdmin,results[0].created, results[0].modified, results[0].salt,results[0].Address,results[0].City,results[0].State,results[0].Zip);
        console.log(newUser);
        let loggedInUser = newUser.getUserDetails(results[0].id,newUser.first_name,newUser.last_name,newUser.middle_name,newUser.email,newUser.isAdmin,newUser.created,newUser.modified,newUser.address,newUser.city,newUser.state,newUser.zip);
        console.log(loggedInUser);
        if (newUser.validPassword(password)) {
          res.send({
            "code": 200,
            "success": "login sucessfull",
            "user": loggedInUser
          });
        }        
        else {
          res.send({
            "code": 204,
            "success": "Email and password does not match"
          });
        }
      }
      else {
        res.send({
          "code": 204,
          "success": "Email does not exits"
        });
      }
    }
  });

});

module.exports = router;
