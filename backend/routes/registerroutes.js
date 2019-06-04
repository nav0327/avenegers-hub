var express = require('express');
var router = express.Router();
var product=require('../models/dbModels'); 

const User = require('../models/userDetails');
var crypto = require('crypto'); 

var emailCount_query = 'SELECT COUNT(*) AS EMAILCOUNT FROM UserDetails WHERE EMAIL = ? ';
var userInsert_query = 'INSERT INTO UserDetails SET ?';

router.post('/', function (req, res, next) {
  console.log(req.body);
  var today = new Date();
  let newUser = new User(req.body.first_name,req.body.last_name,req.body.middle_name,req.body.email,req.body.password,req.body.isAdmin,today,today,crypto.randomBytes(16).toString('hex'),null,null,null,null);
  console.log(newUser);
  newUser.setPassword(newUser.password);
  password = newUser.password;
  console.log("password"+password)
  var users = {
    "first_name": newUser.first_name,
    "last_name": newUser.last_name,
    "middle_name": newUser.middle_name,
    "email": newUser.email,
    "password": newUser.password,
    "isAdmin": newUser.isAdmin,
    "created": new Date(),
    "modified": new Date(),
    "salt":newUser.salt
  }

  // res.locals.connection.query(emailCount_query,req.body.email
    product.userdetails.count({"email":req.body.email},function (error, results, fields){
    if (error) {
      console.log("error ocurred", error);
      res.send({
        "code": 400,
        "failed": "error ocurred"
      })
    } else {
      console.log('The solution is: ', results);
      if(results>0){
        res.send({
          "code": 204,
          "message": "Email already exists. Login with your username"
        });
      }else{
        // res.locals.connection.query(userInsert_query, users
        // console.log("users"+users)
        // console.log(typeof users)
        // ,,today,null,null,null,null
        console.log("first_name"+req.body.first_name+"("+typeof req.body.first_name+")")
        console.log("last_name"+req.body.last_name+"("+typeof req.body.last_name+")")
        console.log("middle_name"+req.body.middle_name+"("+typeof req.body.middle_name+")")
        console.log("email"+req.body.email+"("+typeof req.body.email+")")
        console.log("password"+req.body.password+"("+typeof req.body.password+")")
        console.log("isAdmin"+req.body.isAdmin+"("+typeof req.body.isAdmin+")")
        console.log("created"+today+"("+typeof today+")")
        console.log("modified"+today+"("+typeof today+")")
        console.log("salt"+crypto.randomBytes(16).toString('hex')+"("+typeof crypto.randomBytes(16).toString('hex')+")")
        console.log("address"+null)
        console.log("city"+null)
        console.log("state"+null)
        console.log("zip"+null)
          product.userdetails.insertMany({
          "first_name": newUser.first_name,
          "last_name": newUser.last_name,
          "middle_name": newUser.middle_name,
          "email": newUser.email,
          "password": newUser.password,
          "isAdmin": newUser.isAdmin,
          "created": new Date(),
          "modified": new Date(),
          "salt":newUser.salt,
          "Address": null,
          "City": null,
          "State": null,
          "Zip": null
          }, function (error, results, fields) {
          if (error) {
            console.log("error ocurred", error);
            res.send({
              "code": 400,
              "message": "Error ocurred try again!!!"
            })
          } else {
            console.log('The solution is: ', results);
            res.send({
              "code": 200,
              "message": "User registered sucessfully"
            });
          }
        });
      }
    }
  });

});

module.exports = router;