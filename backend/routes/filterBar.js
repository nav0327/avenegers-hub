var express = require('express');
var router = express.Router();

router.get('/',function(req, res, next) {
    console.log("query part");
    res.locals.connection.query('SELECT distinct parent_category FROM categories ', function (error, results, fields) {
      console.log('after query in homepage.js backend');  
      if (error) {
          console.log("error ocurred",error);
          res.send({
            "code":400,
            "failed":"error ocurred"
          })
        }else{
          console.log('in else part');
          console.log(results);
          res.send(results);
        }
        });
      
      });
module.exports = router;